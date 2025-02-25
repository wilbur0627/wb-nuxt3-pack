import fs from "fs";
import { getNuxtConfigPath } from "../utils/getNuxtConfigPath.js";
/**
 * 更新 nuxt.config 的 modules 配置
 * @param {string} configContent 原始文件内容
 * @param {string | string[]} updateContent 要加入到 modules 的內容
 * @param {boolean} returnRaw 是否保持原始格式插入
 * @returns {string} 更新後的文件内容
 */

function updateModulesConfig(
  configContent,
  updateContent,
  returnRaw
) {
  configContent = fs.readFileSync(configContent, "utf-8");
  const moduleRegex = /modules:\s*\[(?!\s*\])/;
  try {
    if (moduleRegex.test(configContent)) {
      return configContent.replace(
        /(modules:\s*\[)([\s\S]*)(\])/,
        (_, prefix, modules) => {
          const updatedModules = returnRaw
            ? `${modules.trim()}, ${JSON.stringify(updateContent, null, 2)
                .replace(/"([^"]+)":/g, "$1:") // 去掉 key 的引號
                .replace(/"/g, "'")}`
            : `${modules.trim()}, '${
                Array.isArray(updateContent)
                  ? updateContent.join("', '")
                  : updateContent
              }'`;
          return `${prefix}${updatedModules}]`;
        }
      );
    } else {
      // 如果 modules 不存在，添加 modules 配置
      console.log("modules not found, adding modules...");
      configContent = configContent.replace(/modules:\s*\[\],?\s*/g, "");
      const insertPosition =
        configContent.indexOf("export default defineNuxtConfig({") + 36;
      return (
        configContent.slice(0, insertPosition) +
        `modules: [${
          returnRaw
            ? JSON.stringify(updateContent, null, 2)
                .replace(/"([^"]+)":/g, "$1:") // 去掉 key 的引号
                .replace(/"/g, "'")
            : `'${
                Array.isArray(updateContent)
                  ? updateContent.join("', '")
                  : updateContent
              }'`
        }], \n  ` +
        configContent.slice(insertPosition)
      );
    }
  } catch (e) {
    console.error("Error updating Nuxt config file:", e.message);
    return configContent;
  }
}

export function updateModulesConfigHandler(content, returnRaw = false) {
  const nuxtConfigPath = getNuxtConfigPath();
  const fileContent = fs.readFileSync(nuxtConfigPath, "utf-8");
  
  if (Array.isArray(content)) {
    if (content.some((item) => fileContent.includes(item))) return;
  } else if (fileContent.includes(content)) {
    return;
  }

  fs.writeFileSync(
    nuxtConfigPath,
    updateModulesConfig(nuxtConfigPath, content, returnRaw)
  );
}