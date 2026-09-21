// 合并 hashmap.json（图片尺寸映射）：服务器现有条目打底，本地构建新条目补齐。
import fs from "node:fs";
const [serverFile, localFile, outFile] = process.argv.slice(2);
const server = JSON.parse(fs.readFileSync(serverFile, "utf8"));
const local = JSON.parse(fs.readFileSync(localFile, "utf8"));
const merged = Object.assign({}, server, local);
fs.writeFileSync(outFile, JSON.stringify(merged, null, 1), "utf8");
console.log(`hashmap: server=${Object.keys(server).length} local=${Object.keys(local).length} merged=${Object.keys(merged).length}`);
