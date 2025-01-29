import { execa } from "execa";
import { getCwdStdio } from "../global.js";
import { updateModulesConfigHandler } from "../utils/updateNuxtConfigModules.js";
import fs from "fs";
import { getNuxtConfigPath } from "../utils/getNuxtConfigPath.js";

export const installPinia = async () => {
  const nuxtConfigPath = getNuxtConfigPath();
  console.log("Installing Pinia dependencies...");

  await execa(
    "npm",
    ["install", "pinia", "@pinia/nuxt", "pinia-plugin-persistedstate"],
    getCwdStdio()
  );

  console.log("Pinia setup complete!");

  updateModulesConfigHandler([
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ]);

  // 插入imports: { dirs: ['store'] }，但需要先檢查有無該屬性
  let configContent = fs.readFileSync(nuxtConfigPath, "utf-8");
  // 檢查是否已經有 `imports`
  const importsRegex = /imports\s*:\s*\{[^}]*\}/;
  const dirsRegex = /dirs\s*:\s*\[\s*['"]store['"]\s*\]/;

  if (!importsRegex.test(configContent)) {
    // 如果沒有 `imports`，則直接插入整個 imports 物件
    const insertPosition =
      configContent.indexOf("export default defineNuxtConfig({") + 36;
    configContent =
      configContent.slice(0, insertPosition) +
      `imports: { dirs: ['store'] }, \n  ` +
      configContent.slice(insertPosition);
  } else if (!dirsRegex.test(configContent)) {
    // 如果有 `imports` 但沒有 `dirs: ['store']`，則補上 `dirs`
    configContent = configContent.replace(importsRegex, (match) =>
      match.replace(/\}$/, `, dirs: ['store'] }`)
    );
  }

  fs.writeFileSync(nuxtConfigPath, configContent, "utf-8");

  console.log("Pinia module added to nuxt.config!");
};
