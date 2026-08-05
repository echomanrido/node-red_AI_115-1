/**
 * process_labs.js
 * 輔助自動掃描 images_src/new 資料夾中的圖片，
 * 配對 [flow] 與 [result] / [Result] 圖片，協助移至 images_src/ok 並更新 labs.json。
 */

const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../../../');
const newDir = path.join(baseDir, 'images_src/new');
const okDir = path.join(baseDir, 'images_src/ok');
const labsJsonPath = path.join(baseDir, 'labs.json');

function main() {
  console.log('🔍 開始檢查 images_src/new 資料夾...');
  
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
  }
  if (!fs.existsSync(okDir)) {
    fs.mkdirSync(okDir, { recursive: true });
  }

  const files = fs.readdirSync(newDir);
  if (files.length === 0) {
    console.log('ℹ️  images_src/new 中沒有新的圖片檔案。');
    return;
  }

  console.log(`📸 找到 ${files.length} 個檔案：`, files);

  // 分組配對 flow 與 result
  const pairs = {};

  files.forEach(file => {
    const ext = path.extname(file);
    const basename = path.basename(file, ext);

    let match = basename.match(/^(.*?)\[(flow|result)\]$/i);
    if (match) {
      const prefix = match[1].trim();
      const type = match[2].toLowerCase(); // 'flow' or 'result'

      if (!pairs[prefix]) {
        pairs[prefix] = { prefix };
      }
      pairs[prefix][type] = file;
    }
  });

  console.log('🧩 檔案配對結果：', JSON.stringify(pairs, null, 2));
}

main();
