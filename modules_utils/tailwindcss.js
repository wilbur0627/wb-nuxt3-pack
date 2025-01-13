import { execa } from "execa";
import { getCwdStdio, module_add } from "../global.js";

export const installTailwindcss = async () => {
  console.log("Adding tailwindcss、prettier、prettier-plugin-tailwindcss module...");
  await execa("npx", ["nuxi@latest", ...module_add, "tailwindcss"], getCwdStdio());
  await execa("npx", ["tailwindcss", "init"], getCwdStdio());
  await execa(
    "npm",
    ["install", "-D", "prettier", "prettier-plugin-tailwindcss"],
    getCwdStdio()
  );
};

// npx nuxi@latest module add tailwindcss
// npx tailwindcss init
// npm install -D prettier prettier-plugin-tailwindcss
// .prettierrc => {
//   "plugins": ["prettier-plugin-tailwindcss"]
// }