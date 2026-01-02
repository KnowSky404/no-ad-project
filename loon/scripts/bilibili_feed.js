/*
脚本名称：Bilibili 首页推荐流去广告
接口路径：/x/v2/feed/index
功能：去除 card_type 为 banner_v8 的内容
*/

const url = $request.url;
let body = $response.body;

if (!body) {
    $done({});
}

try {
    let obj = JSON.parse(body);

    if (obj.data && obj.data.items) {
        // 过滤掉 card_type 为 banner_v8 的项
        const initialLength = obj.data.items.length;
        obj.data.items = obj.data.items.filter(item => item.card_type !== "banner_v8");
        const finalLength = obj.data.items.length;
        
        if (initialLength !== finalLength) {
            console.log(`[Bilibili Feed] Removed ${initialLength - finalLength} banner_v8 items`);
        }
    }
    
    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("[Bilibili Feed] Script error: " + e);
    $done({});
}
