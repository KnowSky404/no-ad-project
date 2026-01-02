/*
脚本名称：Bilibili 我的页面去广告
接口路径：/x/v2/account/mine
功能：移除 rework_v1、modular_vip_section 以及 sections_v2 中的“创作中心”和“我的服务”
*/

const url = $request.url;
let body = $response.body;

if (!body) {
    $done({});
}

try {
    let obj = JSON.parse(body);

    if (obj.data) {
        // 1. 去除 rework_v1 里面的所有内容
        if (obj.data.rework_v1) {
            delete obj.data.rework_v1;
        }

        // 2. 去除 modular_vip_section 里面的所有内容
        if (obj.data.modular_vip_section) {
            delete obj.data.modular_vip_section;
        }

        // 3. 去除 sections_v2 里面的一级目录 title 为 创作中心、我的服务 的所有内容
        if (obj.data.sections_v2 && Array.isArray(obj.data.sections_v2)) {
            const removeTitles = ["创作中心", "我的服务"];
            obj.data.sections_v2 = obj.data.sections_v2.filter(item => !removeTitles.includes(item.title));
        }

        console.log("[Bilibili Mine] Cleaned up rework_v1, modular_vip_section, and filtered sections_v2");
    }
    
    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("[Bilibili Mine] Script error: " + e);
    $done({});
}
