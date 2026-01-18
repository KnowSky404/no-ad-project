# Bilibili

## 20260103

目前我正在开发针对iOS上Loon的一个针对哔哩哔哩的插件功能,之前已经完成了去开屏广告的脚本,现在需要开发针对UI上的调整脚本.目前针对UI调整的接口我放在 dev 目录下,其中 @dev/request_header_raw.txt 是接口的请求头信息, @dev/response_header_raw.txt 是接口的响应头信息, @dev/response_body_raw.json 是接口的body中的具体内容,我需要写一下脚本, 将body中的内容修改一下, tab 只保留 直播、推荐、热门、动画、影视; top 只保留 消息; bottom 只保留 首页、关注、我的;top_more只保留我的;top_left信息保持不变; 请以上述背景,为我生成脚本文件放在 loon/scripts目录下,并根据规则更新 @loon/plugins/bilibili.plugin 的内容

目前我又已经把另一个接口的信息放到了dev目录下, 这个接口是获取首页内容流的接口,我需要依据返回的内容,去除"card_type": "banner_v8"的内容

目前我又已经把另一个接口的信息放到了dev目录下, 这个接口是获取我的tab页下面的操作菜单信息, 我需要依据返回的内容,去除 rework_v1 里面的所有内容、 modular_vip_section 里面的所有内容、sections_v2 里面的一集目录title为 创作中心、我的服务的所有内容

## 20260103

目前我发现哔哩哔哩开屏广告同时还由另一个接口控制,这个接口信息我也已经抓到了, 请读取接口信息, 再为我补充一下去开屏广告的脚本内容吧

我之前可能说的有点不清楚,目前两个接口都是涉及开屏广告的,都需要处理,这样的话是不是得写两个脚本,还是说你那边已经做了接口兼容,针对这两个接口脚本都做了适配

## 20260118

目前我发现哔哩哔哩信息流里面也夹在着一些广告, @dev/response_body.json 这个是原始的返回信息, 这是当前脚本处理之后的信息 @dev/replace_response_body.json .经过我人工识别,我还想去除以下几个内容: 
1. items里面的元素player_args属性包含 "type": "live", 也就是我要剔除跳转到直播的卡片
2. items里面的元素包含 "goto": "vertical_av" 这个属性的, 也就是我要剔除竖屏视频
2. items里面的元素包含 "card_goto": "ad_web_s" 这个属性的, 也就是我要剔除跳转广告的卡片
请依据上述背景已经已有的上下文,为我更新一下 @loon/scripts/bilibili_feed.js 这个脚本吧

现在 @dev 目录下是关于 https://grpc.biliapi.net/bilibili.app.dynamic.v1.Dynamic/DynRed 这个接口抓去的请求, 看这个能看出一些什么信息吗


目前我还遇到一个问题就是, 一旦我在Loon中吧 grpc.biliapi.net 这个域名加入到MITM列表里面,哔哩哔哩APP的点击视频跳转到详情页里面页面信息就会刷新的特别慢,似乎是遇到阻塞一般. 然后我还观察到一个奇怪的现象是, grpc.biliapi.net 的 抓包抓到的请求或响应包里面的显示的MITM域名是 passport.bilibili.com 不知道响应缓慢是否是跟这个有关系

那现在我该怎么去抓视频详情页里面的tab广告呢, 我已经明确了没有 /view 这样的接口,能给我再提供一些其他的思路吗

我刚又抓去了这个接口的请求和响应, 能帮我简单分析一下吗  cm.bilibili.com/cm/api/fees/wise

我抓取到了这个接口 https://grpc.biliapi.net/bilibili.app.viewunite.v1.View/View 的请求,能帮我分析一下吗

目前来看测试似乎那个视频详情页烦人的tab广告被去除了, 我再观察测试几天,感谢你

我现在还想更新一下 @loon/scripts/bilibili_splash.js 这个脚本, 当前@dev目录下就是针对 /x/v2/splash/list 这个接口的请求和响应已经修改后的响应包,但是似乎偶尔还是会有开屏广告, 能先帮我分析一下吗, 我同时想把 min_interval 和 pull_interval 这两个同步调大一些再试试,不知道这样是否可行
