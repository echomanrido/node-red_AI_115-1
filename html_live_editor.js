// ================= 內建範本資料庫 =================
const TEMPLATES = {
  lab14_alarm: `<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>五股機電整合班</title>
</head>
<body>
<h1>機丙機台異常報告</h1>
<p>Data received: 2026/09/03 14:30:00 : 五股機電整合班115-1AI機電班</p>
</body>
</html>`,

  lab14_styled: `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>五股機電整合班 - 異常報告</title>
  <style>
    body { font-family: Arial, "Microsoft JhengHei", sans-serif; margin: 30px; background-color: #f8fafc; color: #1e293b; }
    .card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; max-width: 600px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    h1 { color: #dc2626; border-bottom: 2px solid #fee2e2; padding-bottom: 12px; margin-top: 0; }
    .badge { display: inline-block; background-color: #fee2e2; color: #b91c1c; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: bold; }
    .info-row { margin: 16px 0; padding: 12px; background-color: #f1f5f9; border-left: 4px solid #3b82f6; border-radius: 4px; font-family: monospace; font-size: 14px; }
    .footer { margin-top: 20px; font-size: 12px; color: #64748b; text-align: right; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">工控警報等級: HIGH</span>
    <h1>機丙機台異常報告</h1>
    <p>以下為 Node-RED 自動接收並透過 write file 發布之即時異常快報：</p>
    <div class="info-row">
      <strong>Data received:</strong> 2026/09/03 14:30:00 : 五股機電整合班115-1AI機電班
    </div>
    <div class="footer">
      監控節點: Node-RED Gateway #01 | 產出路徑: C:\\xampp\\htdocs\\output.html
    </div>
  </div>
</body>
</html>`,

  scada_dashboard: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SCADA 製程即時監控儀表板</title>
  <style>
    body { background: #0f172a; color: #f8fafc; font-family: sans-serif; padding: 24px; margin: 0; }
    .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; max-width: 900px; }
    .widget { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; }
    .widget-title { font-size: 13px; color: #94a3b8; text-transform: uppercase; }
    .widget-val { font-size: 32px; font-weight: bold; color: #38bdf8; margin: 10px 0; font-family: monospace; }
    .status-ok { color: #4ade80; font-size: 13px; }
  </style>
</head>
<body>
  <h2>🏭 晶圓產線純水與溫控即時監控 (SCADA)</h2>
  <div class="dashboard-grid">
    <div class="widget">
      <div class="widget-title">超純水阻抗係數 (UPW)</div>
      <div class="widget-val">18.2 <span style="font-size: 16px;">MΩ·cm</span></div>
      <div class="status-ok">● 運作正常 (合格門檻 ≥ 18)</div>
    </div>
    <div class="widget">
      <div class="widget-title">反應爐即時溫度</div>
      <div class="widget-val">68.5 <span style="font-size: 16px;">°C</span></div>
      <div class="status-ok">● 安全區間 [14°C ~ 115°C]</div>
    </div>
  </div>
</body>
</html>`,

  smart_locker: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>智慧家庭快遞箱投遞報告</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; background-color: #f0fdf4; color: #14532d; }
    .ticket { background: white; border: 2px dashed #86efac; border-radius: 16px; padding: 24px; max-width: 480px; }
    h2 { margin-top: 0; color: #15803d; }
    .row { display: flex; justify-content: space-between; margin: 10px 0; border-bottom: 1px solid #f0fdf4; padding-bottom: 6px; }
  </style>
</head>
<body>
  <div class="ticket">
    <h2>📦 智慧快遞箱投遞成功日誌</h2>
    <div class="row"><span>快遞單號:</span><strong>TW-2026-889921</strong></div>
    <div class="row"><span>儲格編號:</span><strong>A-03 (中型儲格)</strong></div>
    <div class="row"><span>包裹重量:</span><strong>3.45 kg</strong></div>
    <div class="row"><span>投遞時間:</span><strong>2026/09/03 14:30:15</strong></div>
    <div class="row"><span>取件密碼:</span><strong style="color: #dc2626; font-size: 18px;">8942</strong></div>
  </div>
</body>
</html>`,

  esg_carbon: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ESG 廠房碳排量即時警報單</title>
  <style>
    body { font-family: Arial, sans-serif; background: #fafafa; padding: 20px; }
    .alert-box { border: 2px solid #f59e0b; background: #fffbeb; color: #78350f; border-radius: 8px; padding: 20px; max-width: 520px; }
  </style>
</head>
<body>
  <div class="alert-box">
    <h3>🌿 ISO 14064 碳盤查即時警戒報告</h3>
    <p><strong>監測區域:</strong> 廠區 B 棟空壓機房</p>
    <p><strong>當前瞬時耗電:</strong> 420.5 kW</p>
    <p><strong>等效碳排係數:</strong> 0.495 kg CO2e / 度</p>
  </div>
</body>
</html>`,

  blank_html5: `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的 HTML 報表頁面</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 30px; background-color: #f8fafc; color: #334155; }
    h1 { color: #0284c7; }
  </style>
</head>
<body>
  <h1>Hello Node-RED & XAMPP</h1>
  <p>在左側編輯器輸入 HTML 程式碼，右側將即時渲染預覽！</p>
</body>
</html>`
};

// ================= 編輯器全域狀態 =================
let codeEditorEl;
let lineNumbersEl;
let previewFrameEl;
let charCountBadgeEl;
let consoleLogsEl;
let autoRunEnabled = true;
let autoRunTimer = null;
let currentFontSize = 13;
let logCount = 0;
let errCount = 0;

// 初始化載入
document.addEventListener('DOMContentLoaded', () => {
  codeEditorEl = document.getElementById('codeEditor');
  lineNumbersEl = document.getElementById('lineNumbers');
  previewFrameEl = document.getElementById('previewFrame');
  charCountBadgeEl = document.getElementById('charCountBadge');
  consoleLogsEl = document.getElementById('consoleLogs');

  loadTemplate('lab14_alarm');

  // 綁定編輯器滾動與輸入事件
  codeEditorEl.addEventListener('input', onEditorInput);
  codeEditorEl.addEventListener('scroll', syncLineNumberScroll);
  codeEditorEl.addEventListener('keydown', handleEditorKeydown);

  // 監聽 iframe 內部 console 訊息
  window.addEventListener('message', handleIframeConsole);
});

// 載入指定範本
function loadTemplate(key) {
  if (TEMPLATES[key]) {
    codeEditorEl.value = TEMPLATES[key];
    updateLineNumbers();
    updateCharCount();
    runCode();
    showToast('已載入範本');
  }
}

function resetTemplate() {
  const select = document.getElementById('templateSelect');
  loadTemplate(select.value);
}

// 編輯器輸入防抖更新
function onEditorInput() {
  updateLineNumbers();
  updateCharCount();
  if (autoRunEnabled) {
    clearTimeout(autoRunTimer);
    autoRunTimer = setTimeout(() => {
      runCode();
    }, 300);
  }
}

// 更新行號
function updateLineNumbers() {
  const lines = codeEditorEl.value.split('\n').length;
  let lineHtml = '';
  for (let i = 1; i <= lines; i++) {
    lineHtml += '<div>' + i + '</div>';
  }
  lineNumbersEl.innerHTML = lineHtml;
}

function syncLineNumberScroll() {
  lineNumbersEl.scrollTop = codeEditorEl.scrollTop;
}

function updateCharCount() {
  const text = codeEditorEl.value;
  const chars = text.length;
  const lines = text.split('\n').length;
  charCountBadgeEl.textContent = chars + ' 字元 • ' + lines + ' 行';
}

// 快捷鍵處理 (Tab 縮排、Ctrl+Enter 執行)
function handleEditorKeydown(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;
    this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + 2;
    onEditorInput();
  } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    runCode();
  }
}

// 自動換行切換
function toggleWordWrap(checked) {
  codeEditorEl.style.whiteSpace = checked ? 'pre-wrap' : 'pre';
  codeEditorEl.style.overflowX = checked ? 'hidden' : 'auto';
}

// 字級調整
function adjustFontSize(delta) {
  currentFontSize = Math.max(10, Math.min(24, currentFontSize + delta));
  codeEditorEl.style.fontSize = currentFontSize + 'px';
  lineNumbersEl.style.fontSize = currentFontSize + 'px';
  document.getElementById('fontSizeDisplay').textContent = currentFontSize + 'px';
}

// 格式化縮排 (簡單排版)
function formatHtmlCode() {
  const lines = codeEditorEl.value.split('\n').map(l => l.trimEnd());
  codeEditorEl.value = lines.join('\n');
  showToast('已整理代碼格式');
  onEditorInput();
}

// 核心執行與渲染
function runCode() {
  clearConsole();
  const rawCode = codeEditorEl.value;

  // 產生 Console 攔截腳本 (分開字串拼裝，避免瀏覽器解析 script 標籤提前閉合)
  const openTag = '<' + 'script>';
  const closeTag = '<' + '/script>';
  const consoleScript = openTag + `
    (function() {
      const originalLog = console.log;
      const originalWarn = console.warn;
      const originalError = console.error;
      
      function postMsg(type, args) {
        try {
          const message = Array.from(args).map(arg => {
            if (typeof arg === 'object') {
              try { return JSON.stringify(arg, null, 2); } catch(e) { return String(arg); }
            }
            return String(arg);
          }).join(' ');
          window.parent.postMessage({ type: 'CONSOLE_LOG', level: type, text: message }, '*');
        } catch(err) {}
      }

      console.log = function() { postMsg('log', arguments); originalLog.apply(console, arguments); };
      console.warn = function() { postMsg('warn', arguments); originalWarn.apply(console, arguments); };
      console.error = function() { postMsg('error', arguments); originalError.apply(console, arguments); };

      window.onerror = function(msg, url, lineNo, columnNo, error) {
        postMsg('error', ['[執行錯誤] ' + msg + ' (第 ' + lineNo + ' 行)']);
        return false;
      };
    })();
  ` + closeTag;

  let finalHtml = rawCode;
  if (finalHtml.includes('<head>')) {
    finalHtml = finalHtml.replace('<head>', '<head>' + consoleScript);
  } else if (finalHtml.includes('<html>')) {
    finalHtml = finalHtml.replace('<html>', '<html><head>' + consoleScript + '</head>');
  } else {
    finalHtml = consoleScript + finalHtml;
  }

  // 1. 使用 srcdoc 渲染
  previewFrameEl.srcdoc = finalHtml;
}

function toggleAutoRun(checked) {
  autoRunEnabled = checked;
  showToast(checked ? '已開啟即時預覽' : '已關閉即時預覽 (請手動按 執行)');
}

// ================= 模擬 Node-RED 台北時間注入 =================
function injectDynamicTime() {
  const now = new Date();
  const taipeiTime = now.toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const newInfo = taipeiTime + ' : 五股機電整合班115-1AI機電班';
  
  let code = codeEditorEl.value;
  const pattern = /Data received:\s*[^<]*/i;
  if (pattern.test(code)) {
    code = code.replace(pattern, 'Data received: ' + newInfo);
    codeEditorEl.value = code;
    onEditorInput();
    runCode();
    showToast('已注入最新 UTC+8 台北時間: ' + taipeiTime);
  } else {
    if (code.includes('</body>')) {
      code = code.replace('</body>', '  <p>Data received: ' + newInfo + '</p>\n</body>');
    } else {
      code += '\n<p>Data received: ' + newInfo + '</p>';
    }
    codeEditorEl.value = code;
    onEditorInput();
    runCode();
    showToast('已插入最新 UTC+8 台北時間');
  }
}

// ================= Node-RED 程式碼生成 Modal =================
function openNodeRedModal() {
  const currentHtml = codeEditorEl.value;
  
  const escapedHtml = currentHtml
    .replace(/`/g, '\\`')
    .replace(/2026\/09\/03 14:30:00 : 五股機電整合班115-1AI機電班/g, '${myData}')
    .replace(/\${myData}/g, '${myData}');

  const nodeRedSnippet = '// === Node-RED Function 節點程式碼 (轉html格式) ===\n' +
    'var date = new Date(msg.topic || Date.now());\n\n' +
    '// 指定 UTC+8 (Asia/Taipei) 格式化\n' +
    'var localTime = date.toLocaleString("zh-TW", {\n' +
    '    timeZone: "Asia/Taipei",\n' +
    '    year: "numeric",\n' +
    '    month: "2-digit",\n' +
    '    day: "2-digit",\n' +
    '    hour: "2-digit",\n' +
    '    minute: "2-digit",\n' +
    '    second: "2-digit",\n' +
    '    hour12: false\n' +
    '});\n\n' +
    'var myData = localTime + " : " + (msg.payload || "五股機電整合班115-1AI機電班");\n\n' +
    'var htmlContent = `\n' + escapedHtml + '\n`;\n\n' +
    'msg.payload = htmlContent;\n' +
    'return msg;';

  document.getElementById('nodeRedCodeBlock').textContent = nodeRedSnippet;
  document.getElementById('nodeRedModal').classList.remove('hidden');
}

function closeNodeRedModal() {
  document.getElementById('nodeRedModal').classList.add('hidden');
}

function copyNodeRedCode() {
  const text = document.getElementById('nodeRedCodeBlock').textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast('Node-RED 程式碼已複製到剪貼簿！');
  }).catch(() => {
    showToast('複製失敗，請手動全選複製');
  });
}

// ================= 檔案操作 =================
function copyCurrentCode() {
  navigator.clipboard.writeText(codeEditorEl.value).then(() => {
    showToast('HTML 程式碼已成功複製！');
  });
}

function downloadHtmlFile() {
  const blob = new Blob([codeEditorEl.value], { type: 'text/html;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'output.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('output.html 下載完成！');
}

function openInNewTab() {
  const finalHtml = codeEditorEl.value;
  const newWin = window.open('', '_blank');
  if (newWin) {
    newWin.document.open();
    newWin.document.write(finalHtml);
    newWin.document.close();
  } else {
    showToast('請允許瀏覽器彈出式視窗');
  }
}

// ================= 視角與版面切換 =================
function setViewportWidth(w) {
  const container = document.getElementById('previewContainer');
  container.style.maxWidth = w;
  ['vp-full', 'vp-tablet', 'vp-mobile'].forEach(id => {
    document.getElementById(id).classList.remove('text-cyan-400', 'bg-slate-800');
    document.getElementById(id).classList.add('text-slate-400');
  });
  if (w === '100%') {
    document.getElementById('vp-full').classList.add('text-cyan-400', 'bg-slate-800');
  } else if (w === '768px') {
    document.getElementById('vp-tablet').classList.add('text-cyan-400', 'bg-slate-800');
  } else {
    document.getElementById('vp-mobile').classList.add('text-cyan-400', 'bg-slate-800');
  }
}

function setLayout(mode) {
  const ws = document.getElementById('mainWorkspace');
  const ed = document.getElementById('editorSection');
  const pv = document.getElementById('previewSection');

  ['btn-layout-h', 'btn-layout-v', 'btn-layout-code', 'btn-layout-preview'].forEach(id => {
    document.getElementById(id).classList.remove('text-cyan-400', 'bg-slate-800');
    document.getElementById(id).classList.add('text-slate-400');
  });

  if (mode === 'split-h') {
    ws.className = 'flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-950';
    ed.classList.remove('hidden');
    pv.classList.remove('hidden');
    document.getElementById('btn-layout-h').classList.add('text-cyan-400', 'bg-slate-800');
  } else if (mode === 'split-v') {
    ws.className = 'flex-1 flex flex-col overflow-hidden bg-slate-950';
    ed.classList.remove('hidden');
    pv.classList.remove('hidden');
    document.getElementById('btn-layout-v').classList.add('text-cyan-400', 'bg-slate-800');
  } else if (mode === 'code-only') {
    ws.className = 'flex-1 flex flex-col overflow-hidden bg-slate-950';
    ed.classList.remove('hidden');
    pv.classList.add('hidden');
    document.getElementById('btn-layout-code').classList.add('text-cyan-400', 'bg-slate-800');
  } else if (mode === 'preview-only') {
    ws.className = 'flex-1 flex flex-col overflow-hidden bg-slate-950';
    ed.classList.add('hidden');
    pv.classList.remove('hidden');
    document.getElementById('btn-layout-preview').classList.add('text-cyan-400', 'bg-slate-800');
  }
}

// ================= Console 訊息處理 =================
function handleIframeConsole(event) {
  if (event.data && event.data.type === 'CONSOLE_LOG') {
    const item = document.createElement('div');
    item.className = 'flex items-start gap-2 leading-relaxed';
    
    if (event.data.level === 'error') {
      item.innerHTML = '<span class="text-red-400 font-bold">[ERROR]</span> <span class="text-red-300">' + escapeHtml(event.data.text) + '</span>';
      errCount++;
      document.getElementById('errCountBadge').textContent = errCount + ' errors';
      document.getElementById('errCountBadge').classList.remove('hidden');
    } else if (event.data.level === 'warn') {
      item.innerHTML = '<span class="text-amber-400 font-bold">[WARN]</span> <span class="text-amber-300">' + escapeHtml(event.data.text) + '</span>';
    } else {
      item.innerHTML = '<span class="text-cyan-400 font-bold">[LOG]</span> <span class="text-slate-200">' + escapeHtml(event.data.text) + '</span>';
    }

    logCount++;
    document.getElementById('logCountBadge').textContent = logCount + ' logs';
    consoleLogsEl.appendChild(item);
    consoleLogsEl.scrollTop = consoleLogsEl.scrollHeight;
  }
}

function clearConsole() {
  consoleLogsEl.innerHTML = '<div class="text-slate-600 italic">系統就緒，JavaScript 執行記錄與錯誤將顯示於此...</div>';
  logCount = 0;
  errCount = 0;
  document.getElementById('logCountBadge').textContent = '0 logs';
  document.getElementById('errCountBadge').classList.add('hidden');
}

function toggleConsole() {
  const c = document.getElementById('consoleContainer');
  const icon = document.getElementById('consoleChevron');
  if (c.style.height === '32px') {
    c.style.height = '120px';
    icon.className = 'ph ph-caret-down text-slate-400 text-xs';
  } else {
    c.style.height = '32px';
    icon.className = 'ph ph-caret-up text-slate-400 text-xs';
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ================= Toast 浮動通知 =================
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2500);
}
