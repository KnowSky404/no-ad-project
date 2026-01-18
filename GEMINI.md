# Project Context

这是一个存放 Loon、QuantumultX、Shadowrocket等应用分类规则、重写规则、插件等信息的仓库

## 约定式配置

1. `dev` 目录下是原始的抓包文件, 其目录中的 `request_header_raw.txt` 是原始请求头信息; `response_body_raw` 是响应body的json数据,只不过没有格式化,是放在一行内容中; `response_body.json` 则是针对`response_body_raw`的格式化后的文件,`response_header_raw.txt`则是响应头信息. 带有replace前缀的文件则是代理软件处理过的内容,比如 `response_body.json` 经过代理软件比如 `Loon` 处理过的文件就是 `replace_response_body.json`
2. 目前暂时只有适用于 Loon 的文件
3. `loon` 目录下的`rules`用来存放规则分流文件, `plugins`用来存放插件文件, `scripts`用来存放重写脚本文件
4. 当更新重写脚本文件时,如若有涉及的插件,除了更新插件的引用脚本外,也应该在对应的插件的顶部注释中更新 `#!date=2026-01-03 09:44 `中的时间为当前修改时间
