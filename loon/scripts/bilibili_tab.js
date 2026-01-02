/*
脚本名称：Bilibili Tab UI 修改
接口路径：/x/resource/show/tab/v2
功能：精简首页 Tab、顶部入口、底部导航
*/

const url = $request.url;
let body = $response.body;

if (!body) {
    $done({});
}

try {
    let obj = JSON.parse(body);

    if (obj.data) {
        // 1. Modify Tab (保留：直播、推荐、热门、动画、影视)
        if (obj.data.tab) {
            const keepTabs = ["直播", "推荐", "热门", "动画", "影视"];
            obj.data.tab = obj.data.tab.filter(item => keepTabs.includes(item.name));
        }

        // 2. Modify Top (保留：消息)
        if (obj.data.top) {
            const keepTop = ["消息"];
            obj.data.top = obj.data.top.filter(item => keepTop.includes(item.name));
        }

        // 3. Modify Bottom (保留：首页、关注、我的)
        if (obj.data.bottom) {
            const keepBottom = ["首页", "关注", "我的"];
            obj.data.bottom = obj.data.bottom.filter(item => keepBottom.includes(item.name));
        }
        
        // 4. Modify Top More (保留：我的)
        if (obj.data.top_more) {
            const keepTopMore = ["我的"];
            obj.data.top_more = obj.data.top_more.filter(item => keepTopMore.includes(item.name));
        }
        
        // 5. Top Left - 保持不变 (Keep unchanged)

        console.log("[Bilibili] Tab UI Modified");
    }
    
    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("[Bilibili] Tab script error: " + e);
    $done({});
}
