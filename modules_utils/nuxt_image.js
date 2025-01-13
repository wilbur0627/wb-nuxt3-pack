import { execa } from "execa";
import { getCwdStdio, module_add } from "../global.js";

export const installNuxtImage = async () => {
  console.log("Adding @nuxt/image module...");
  await execa("npx", ["nuxi@latest", ...module_add, "image"], getCwdStdio());
};
