let targetProjectPath;
let cwd_stdio;

export const initializeGlobalVariables = async () => {
  targetProjectPath = process.cwd();
  cwd_stdio = { cwd: targetProjectPath, stdio: "inherit" };
};
export const getTargetProjectPath = () => targetProjectPath;
export const getCwdStdio = () => cwd_stdio;
export const module_add = ["module", "add"];
