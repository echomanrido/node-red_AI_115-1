@echo off
chcp 65001 > NUL
echo ===================================================
echo   五股職訓局 - 機電AI_115-1期 Node-RED 教學網頁部署
echo ===================================================
echo.

echo [Step 1] 檢查 Git 狀態...
git status

echo.
echo [Step 2] 暫存變更檔案 (git add)...
git add .

echo.
set /p commit_msg="請輸入 Commit 訊息 (直接按下 Enter 預設為 'Update Node-RED Labs'): "
if "%commit_msg%"=="" set commit_msg=Update Node-RED Labs

git commit -m "%commit_msg%"

echo.
echo [Step 3] 推送變更至 GitHub (git push)...
git push origin main

echo.
echo ===================================================
echo ✅ 代碼已推送至 GitHub !
echo.
echo 📌 若為首次部署 GitHub Pages，請至 GitHub 儲存庫設定：
echo    1. 開啟 GitHub 專案頁面 -> Settings -> Pages
echo    2. 在 Build and deployment Source 選擇 "Deploy from a branch"
echo    3. Branch 選擇 "main" / (root)，並點擊 Save
echo    4. 約 1-2 分鐘後即可透過網址存取教學網頁！
echo ===================================================
pause
