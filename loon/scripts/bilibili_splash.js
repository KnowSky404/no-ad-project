/*
脚本名称：Bilibili 开屏去广告
接口路径：
1. https://app.bilibili.com/x/v2/splash/list
2. https://app.bilibili.com/x/v2/splash/show
功能：清空开屏广告缓存列表
*/

const url = $request.url;
let body = $response.body;

if (!body) {
    $done({});
}

try {
    let obj = JSON.parse(body);

    if (obj.data) {
        // 核心逻辑：直接把广告列表清空
        // B站 App 读到空列表，就不会下载广告，下次启动直接进首页

        // 1. 针对 /x/v2/splash/list 接口
        // 清空主要广告列表
        if (obj.data.list) {
            obj.data.list = [];
        }
        // 移除 keep_ids
        if (obj.data.keep_ids) {
            obj.data.keep_ids = [];
        }
        // 修改时间参数
        if (obj.data.max_time) {
            obj.data.max_time = 0;
        }
        if (obj.data.pull_interval) {
            obj.data.pull_interval = 31536000;
        }

        // 2. 针对 /x/v2/splash/show 接口 (以及 list 接口中的 show 字段)
        // 清空展示控制列表
        if (obj.data.show) {
            obj.data.show = [];
        }
        
        console.log("[Bilibili] 开屏广告配置已清空");
    }

    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("[Bilibili] 开屏脚本处理出错: " + e);
    $done({});
}