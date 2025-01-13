import { execa } from "execa";
import { getCwdStdio, module_add } from "../global.js";

export const installPWA = async () => {
  console.log("Adding @vite-pwa/nuxt module...");
  await execa("npx", ["nuxi@latest", ...module_add, "@vite-pwa/nuxt"], getCwdStdio());
};
