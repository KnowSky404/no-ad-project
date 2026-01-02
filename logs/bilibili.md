# Bilibili

## 20260103

目前我正在开发针对iOS上Loon的一个针对哔哩哔哩的插件功能,之前已经完成了去开屏广告的脚本,现在需要开发针对UI上的调整脚本.目前针对UI调整的接口我放在 dev 目录下,其中 @dev/request_header_raw.txt 是接口的请求头信息, @dev/response_header_raw.txt 是接口的响应头信息, @dev/response_body_raw.json 是接口的body中的具体内容,我需要写一下脚本, 将body中的内容修改一下, tab 只保留 直播、推荐、热门、动画、影视; top 只保留 消息; bottom 只保留 首页、关注、我的;top_more只保留我的;top_left信息保持不变; 请以上述背景,为我生成脚本文件放在 loon/scripts目录下,并根据规则更新 @loon/plugins/bilibili.plugin 的内容

目前我又已经把另一个接口的信息放到了dev目录下, 这个接口是获取首页内容流的接口,我需要依据返回的内容,去除"card_type": "banner_v8"的内容
