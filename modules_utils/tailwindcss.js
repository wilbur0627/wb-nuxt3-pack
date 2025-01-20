import { execa } from "execa";
import { getCwdStdio, module_add } from "../global.js";
import { createFileAndContent } from "../utils/createFileAndContent.js";

export const installTailwindcss = async () => {
  console.log("Adding tailwindcss、prettier、prettier-plugin-tailwindcss module...");
  createFileAndContent(".prettierrc.mjs", `export default {
  plugins: ["prettier-plugin-tailwindcss"],
  endOfLine: "auto",
};`)
  await execa("npx", ["nuxi@latest", ...module_add, "tailwindcss"], getCwdStdio());
  await execa("npx", ["tailwindcss", "init"], getCwdStdio());
  await execa(
    "npm",
    ["install", "-D", "prettier", "prettier-plugin-tailwindcss"],
    getCwdStdio()
  );
};