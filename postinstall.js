#!/usr/bin/env node
import { installPinia } from "./modules_utils/pinia.js";
import { installNuxtImage } from "./modules_utils/nuxt_image.js";
import { installI18n } from "./modules_utils/i18n.js";
import { installTailwindcss } from "./modules_utils/tailwindcss.js";
import { installEslint } from "./modules_utils/eslint.js";
import { initializeGlobalVariables } from "./global.js";
import { validateNuxtProject } from "./utils/validateNuxtProject.js";
import { setNuxtConfigPath } from "./utils/getNuxtConfigPath.js";
import { addEslintAutoSave } from "./utils/addEslintAutoSave.js";

(async () => {
  try {
    addEslintAutoSave();
    // 先取得全域變數
    await initializeGlobalVariables();

    // 檢查目標專案是否有 package.json 以及專案是否是 Nuxt
    await validateNuxtProject();

    // 取得nuxt.config.{js,ts}路徑
    await setNuxtConfigPath();

    // 安裝 @nuxt/eslint 模組
    await installEslint();

    // 安裝 pinia、@nuxt/pinia、pinia-plugin-persistedstate 模組
    await installPinia();

    // 安裝 @nuxt/image 模組
    await installNuxtImage();

    // 安裝 i18n 模組
    await installI18n();

    // 安裝 Tailwind CSS 和 Prettier 模組
    await installTailwindcss();

    console.log("Setup complete!");
  } catch (error) {
    console.error("An error occurred during setup:", error.message);
    process.exit(1);
  }
})();
