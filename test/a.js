let output = `{
    modules: ["nuxt/pinia", "tailwindcss"],
  }`;

// 新的模块值
let newModule = "qqder";

// 提取现有的 modules 数组内容
let updatedOutput = output.replace(
  /(modules:\s*\[)([^\]]*)\]/,
  (_, prefix, modules) => {
    console.log(`_ = ${_}`);
    console.log(`prefix = ${prefix}`);
    console.log(`modules = ${modules}`);
    // 去掉多余的空格和换行符，拼接新的模块
    const updatedModules = `${modules.trim()}, "${newModule}"`;
    return `${prefix}${updatedModules}]`;
  }
);

console.log(updatedOutput)