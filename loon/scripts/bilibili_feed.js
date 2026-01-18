/*
脚本名称：Bilibili 首页推荐流去广告
接口路径：/x/v2/feed/index
功能：
1. 去除 card_type 为 banner_v8 的内容
2. 去除 player_args.type 为 live 的直播内容
3. 去除 goto 为 vertical_av 的竖屏视频
4. 去除 card_goto 为 ad_web_s 的广告卡片
*/

const url = $request.url;
let body = $response.body;

if (!body) {
    $done({});
}

try {
    let obj = JSON.parse(body);

    if (obj.data && obj.data.items) {
        const initialLength = obj.data.items.length;
        
        obj.data.items = obj.data.items.filter(item => {
            // 1. 去除 card_type 为 banner_v8 的内容
            if (item.card_type === "banner_v8") return false;
            
            // 2. items里面的元素player_args属性包含 "type": "live", 也就是我要剔除跳转到直播的卡片
            if (item.player_args && item.player_args.type === "live") return false;
            
            // 3. items里面的元素包含 "goto": "vertical_av" 这个属性的, 也就是我要剔除竖屏视频
            if (item.goto === "vertical_av") return false;
            
            // 4. items里面的元素包含 "card_goto": "ad_web_s" 这个属性的, 也就是我要剔除跳转广告的卡片
            if (item.card_goto === "ad_web_s") return false;
            
            return true;
        });

        const finalLength = obj.data.items.length;
        
        if (initialLength !== finalLength) {
            console.log(`[Bilibili Feed] Removed ${initialLength - finalLength} items`);
        }
    }
    
    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("[Bilibili Feed] Script error: " + e);
    $done({});
}