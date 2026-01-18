/*
脚本名称：Bilibili 开屏去广告
接口路径：
1. https://app.bilibili.com/x/v2/splash/list
2. https://app.bilibili.com/x/v2/splash/show
功能：清空开屏广告缓存列表，并长效延迟下次拉取时间
*/

const url = $request.url;
let body = $response.body;

if (!body) {
    $done({});
}

try {
    let obj = JSON.parse(body);

    // 1. 处理 data 字段中的配置
    if (obj.data) {
        // --- 清空各类广告列表 ---
        // 核心展示列表
        if (obj.data.list) {
            obj.data.list = [];
        }
        // 强插/特定展示列表
        if (obj.data.show) {
            obj.data.show = [];
        }
        // 需要保留的广告ID (用于去重?) -> 清空
        if (obj.data.keep_ids) {
            obj.data.keep_ids = [];
        }
        // 预加载列表 (如果存在)
        if (obj.data.pre_load) {
            obj.data.pre_load = [];
        }
        // 视频广告列表 (如果存在)
        if (obj.data.video_list) {
            obj.data.video_list = [];
        }

        // --- 修改控制参数 ---
        // 广告最长展示时间 -> 0 (即不展示)
        if (obj.data.max_time) {
            obj.data.max_time = 0;
        }
        // 最小拉取间隔 -> 1年 (31536000秒)
        // 告诉 App：很长一段时间内不要再来请求这个接口
        obj.data.min_interval = 31536000;
        obj.data.pull_interval = 31536000;
    }

    // 2. 处理根节点的 TTL (Time To Live)
    // 告诉 App 这个响应的有效期是 1 年
    if (obj.ttl) {
        obj.ttl = 31536000;
    }

    console.log("[Bilibili Splash] 开屏广告清理完成，间隔已设为1年");
    
    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("[Bilibili Splash] Script error: " + e);
    $done({});
}
