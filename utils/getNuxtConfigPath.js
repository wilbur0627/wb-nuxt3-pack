import fs from "fs";
import path from "path";
import { getTargetProjectPath } from "../global.js";

let nuxtConfigPath;

export const setNuxtConfigPath = async () => {
  const targetProjectPath = getTargetProjectPath();

  const nuxtConfigTSPath = path.join(targetProjectPath, "nuxt.config.ts");
  const nuxtConfigJSPath = path.join(targetProjectPath, "nuxt.config.js");
  if (!fs.existsSync(nuxtConfigTSPath) && !fs.existsSync(nuxtConfigJSPath)) {
    throw new Error(
      "Cannot find nuxt.config.js or nuxt.config.ts in the target project."
    );
  } else {
    nuxtConfigPath = fs.existsSync(nuxtConfigTSPath)
      ? nuxtConfigTSPath
      : nuxtConfigJSPath;
    console.log(`Detected nuxt.config file at ${nuxtConfigPath}...`);
  }
  return nuxtConfigPath;
};

export const getNuxtConfigPath = () => nuxtConfigPath;
