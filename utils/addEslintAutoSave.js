import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const vscodeDir = join(process.cwd(), ".vscode");
const settingsPath = join(vscodeDir, "settings.json");

export const addEslintAutoSave = () => {
    // 預設要加入的設定
    const newSettings = {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
      },
    };
    
    // 確保 .vscode 資料夾存在
    if (!existsSync(vscodeDir)) {
      console.log("🔹 .vscode 資料夾不存在，正在創建...");
      mkdirSync(vscodeDir);
    }
    
    // 讀取現有的 settings.json，若不存在則使用空物件
    let settings = {};
    if (existsSync(settingsPath)) {
      try {
        const fileContent = readFileSync(settingsPath, "utf8").trim();
    
        // 檢查 settings.json 是否是空白
        if (fileContent) {
          settings = JSON.parse(fileContent);
        } else {
          console.log("⚠️ settings.json 是空的，將初始化為 {}");
        }
      } catch (error) {
        console.error("❌ 解析 settings.json 失敗:", error);
        process.exit(1);
      }
    }
    
    // 如果 editor.codeActionsOnSave 沒有定義，則初始化它
    if (!settings["editor.codeActionsOnSave"]) {
      settings["editor.codeActionsOnSave"] = {};
    }
    
    // 如果 source.fixAll.eslint 已經存在，則跳過
    if (settings["editor.codeActionsOnSave"]["source.fixAll.eslint"]) {
      console.log("✅ source.fixAll.eslint 已經存在，跳過更新！");
    } else {
      // 加入 source.fixAll.eslint 設定
      settings["editor.codeActionsOnSave"]["source.fixAll.eslint"] = "explicit";
    
      // 將更新後的內容寫回 settings.json
      writeFileSync(settingsPath, JSON.stringify(settings, null, 4), "utf8");
      console.log("✅ 已成功更新 .vscode/settings.json！");
    }
}
