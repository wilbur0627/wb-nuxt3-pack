import { execa } from "execa";
import { getCwdStdio, module_add } from "../global.js";
import { createFileAndContent } from "../utils/createFileAndContent.js";
import { updateModulesConfigHandler } from "../utils/updateNuxtConfigModules.js";

export const installEslint = async () => {
  console.log("Adding @nuxt/eslint module and Eslint dependencies...");
  await execa("npx", ["nuxi", ...module_add, "eslint"], getCwdStdio());
  await execa(
    "npm",
    ["install", "-D", "eslint-config-prettier", "eslint-plugin-prettier"],
    getCwdStdio()
  );

  updateModulesConfigHandler("@nuxt/eslint");
  // 新的內容

  const newContent = `
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt(
  // Your custom configs here
  prettierRecommended,
  {
    files: [
      '**/pages/**/*.{js,ts,vue}',
      '**/layouts/**/*.{js,ts,vue}',
      '**/app.{js,ts,vue}',
      '**/error.{js,ts,vue}',
      '**/.*.js'
    ],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
)`.trim();

  // 產生 `eslint.config.mjs`
  createFileAndContent("eslint.config.mjs", newContent);
  console.log("✅ `eslint.config.mjs` 完成！");
};
