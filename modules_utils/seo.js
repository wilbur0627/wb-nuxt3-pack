import { execa } from "execa";
import { getCwdStdio, module_add } from "../global.js";

export const installSeo = async () => {
  console.log("Adding seo module...");
  await execa("npx", ["nuxi@latest", ...module_add, "seo"], getCwdStdio());
};
