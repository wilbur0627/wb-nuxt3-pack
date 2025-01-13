import fs from "fs";
import path from "path";
import { getTargetProjectPath } from "../global.js";

export const validateNuxtProject = async () => {
  // 檢查目標專案是否有 package.json
  const packageJsonPath = path.join(getTargetProjectPath(), "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error("Cannot find package.json in the target project.");
  }

  // 檢查專案是否是 Nuxt
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  if (!packageJson.dependencies?.nuxt && !packageJson.devDependencies?.nuxt) {
    throw new Error("Nuxt dependency is not found in the target project.");
  } else {
    console.log("Detected Nuxt dependency. Proceeding with setup...");
  }
};
