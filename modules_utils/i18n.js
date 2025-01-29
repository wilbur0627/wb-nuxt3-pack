import { execa } from "execa";
import { getCwdStdio, module_add } from "../global.js";
import { updateModulesConfigHandler } from "../utils/updateNuxtConfigModules.js";

export const installI18n = async () => {
  console.log("Adding i18n module...");
  await execa("npx", ["nuxi@latest", ...module_add, "i18n"], getCwdStdio());
  updateModulesConfigHandler("@nuxtjs/i18n");
};
