import fs from "fs";
import { yarg } from "./config/plugins/argv-adapter.plugin";

const { b: base, l: limit, s: show } = yarg;
let outPutMessage = "";
//const base = 5;
const headerMessage = `
==================================
    Tabla del ${base}
==================================\n
`;

for (let index = 1; index <= limit; index++) {
  outPutMessage += `${base} x ${index} = ${base * index}\n`;
}

outPutMessage = headerMessage + outPutMessage;
const outputPath = "outputs";
fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outPutMessage);
show && console.log(outPutMessage);
console.log("File created succesfuly!!!");
