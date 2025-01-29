import { execa } from "execa";
import { getCwdStdio, module_add } from "../global.js";
import { updateModulesConfigHandler } from "../utils/updateNuxtConfigModules.js";

export const installNuxtImage = async () => {
  console.log("Adding @nuxt/image module...");
  await execa("npx", ["nuxi@latest", ...module_add, "image"], getCwdStdio());
  updateModulesConfigHandler("@nuxt/image");
};
