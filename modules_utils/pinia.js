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

  fs.writeFileSync(
    nuxtConfigPath,
    (() => {
      let configContent = fs.readFileSync(nuxtConfigPath, "utf-8");
      const insertPosition =
        configContent.indexOf("export default defineNuxtConfig({") + 36;
      return (
        configContent.slice(0, insertPosition) +
        `imports: { dirs: ['store'] }, \n  ` +
        configContent.slice(insertPosition)
      );
    })()
  );

  console.log("Pinia module added to nuxt.config!");
};
