import fs from "fs";
import path from "path";
import { execa } from "execa";
import { getCwdStdio, module_add } from "../global.js";

export const installEslint = async () => {
  let eslintConfigPath;
  console.log("Adding @nuxt/eslint module and Eslint dependencies...");
  await execa("npx", ["nuxi", ...module_add, "eslint"], getCwdStdio());
  await execa(
    "npm",
    ["install", "-D", "eslint-config-prettier", "eslint-plugin-prettier"],
    getCwdStdio()
  );
  // 等待 `eslint.config.mjs` 產生
  const waitForFile = (interval = 500, maxAttempts = 20) => {
    return new Promise((resolve, reject) => {
      let attempts = 0;

      const checkFile = () => {
        eslintConfigPath = path.join(process.cwd(), "eslint.config.mjs");
        if (fs.existsSync(eslintConfigPath)) {
          resolve(true);
        } else if (attempts >= maxAttempts) {
          reject(new Error("❌ 等待 `eslint.config.mjs` 失敗，檔案未生成！"));
        } else {
          attempts++;
          setTimeout(checkFile, interval);
        }
      };

      checkFile();
    });
  };

  try {
    console.log("⏳ 等待 `eslint.config.mjs` 產生...");
    await waitForFile();
    console.log("✅ `eslint.config.mjs` 已產生，正在修改內容...");

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

    // 覆寫檔案
    fs.writeFileSync(eslintConfigPath, newContent, "utf8");
    console.log("✅ `eslint.config.mjs` 內容修改完成！");
  } catch (error) {
    console.error(error.message);
  }
};
