import fs from "fs";
import path from "path";
import { getTargetProjectPath } from "../global.js";

export const createFileAndContent = async (fileName, fileContent) => {
  const filePath = path.join(getTargetProjectPath(), fileName);

  const content = fileContent;

  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error(`❌ Cannot Create File name ${fileName}:`, err);
      return;
    }
    console.log(`✅ ${fileName} Create Success！`);
  });
};
