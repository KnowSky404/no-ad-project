/*
脚本名称：Bilibili 动态页去红点
接口路径：/bilibili.app.dynamic.v1.Dynamic/DynRed
功能：
1. 强制返回无新内容的响应 (update_num: 0)
2. 去除动态 Tab 的红点/气泡提示
*/

// 这是一个 "干净" 的响应体 (Gzipped Protobuf)，对应的 JSON 内容关键字段为：
// update_num: 0, corner_text: "", bubble_text: ""
// 也就是告诉客户端：没有新动态，不要显示红点。
const cleanResponseHex = "01000000c01f8b08000000000000ff748e4d6a03310c854b7b8b2eb52cb398b52f23645b534c35b6f1c8d0a1749f658e913b24d709b946989f304c20cbf7e9499f3e3f4804debe4eef7fa064510bb91f0c1e0c40039e3baaa2a864c1c0ed7cb91e0fd0cc45fb8d3a6606d336e0c3908546d4d02fa0664fca186b3f47974ae4b2f51f997f75f14c073b728c6932b77bb0edd96aadf0d38f2b2cec48045d8aca5177a31afcb0039b78052e492aec51437ec531b814c1b4fff7000000fffff9aae5a132010000";

// 将 Hex 转换为 Binary String
let binaryString = "";
for (let i = 0; i < cleanResponseHex.length; i += 2) {
    binaryString += String.fromCharCode(parseInt(cleanResponseHex.substr(i, 2), 16));
}

$done({ body: binaryString });
