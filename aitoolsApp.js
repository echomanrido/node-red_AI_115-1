document.addEventListener('DOMContentLoaded', () => {
  let toolsData = [];
  let currentToolId = null;

  // DOM Elements
  const toolListEl = document.getElementById('toolList');
  const contentBodyEl = document.getElementById('contentBody');
  const searchInput = document.getElementById('searchInput');
  const toolCountBadge = document.getElementById('toolCountBadge');
  const breadcrumbActiveName = document.querySelector('.active-lab-name');
  
  // Sidebar Mobile Toggle
  const sidebar = document.getElementById('sidebar');
  const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  
  // Toast container
  const toastContainer = document.getElementById('toastContainer');

  if (sidebarOpenBtn) {
    sidebarOpenBtn.addEventListener('click', () => sidebar.classList.add('open'));
  }
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', () => sidebar.classList.remove('open'));
  }

  // 載入 AI 工具資料
  function loadData() {
    fetch('aitools.json')
      .then(res => {
        if (!res.ok) throw new Error('HTTP error ' + res.status);
        return res.json();
      })
      .then(data => {
        initApp(data);
      })
      .catch(err => {
        console.warn('fetch aitools.json 失敗，改用本機備援資料 INITIAL_AITOOLS_DATA / INITIAL_TOOLS_DATA:', err);
        const fallbackData = window.INITIAL_AITOOLS_DATA || window.INITIAL_TOOLS_DATA;
        if (fallbackData && fallbackData.length > 0) {
          initApp(fallbackData);
        } else {
          contentBodyEl.innerHTML = `
            <div class="section-card" style="text-align:center; padding: 40px;">
              <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: var(--accent-red); margin-bottom: 16px;"></i>
              <h2>載入 AI 工具資料失敗</h2>
              <p style="color: var(--text-muted); margin-top: 8px;">請確認 aitools.json 檔案是否存在且格式正確。</p>
            </div>
          `;
        }
      });
  }

  function initApp(data) {
    toolsData = data;
    toolCountBadge.textContent = toolsData.length;
    renderSidebar(toolsData);
    
    // 預設選取第一個工具
    if (toolsData.length > 0) {
      selectTool(toolsData[0].id);
    }
  }

  loadData();

  // 搜尋過濾功能
  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = toolsData.filter(tool => 
      tool.title.toLowerCase().includes(keyword) || 
      tool.summary.toLowerCase().includes(keyword) ||
      tool.category.toLowerCase().includes(keyword)
    );
    renderSidebar(filtered);
  });

  // 渲染側邊欄選單 (只有多於 1 個的同類工具才渲染分組標題，平鋪工具與群組間會加入分界線)
  function renderSidebar(tools) {
    toolListEl.innerHTML = '';
    if (tools.length === 0) {
      toolListEl.innerHTML = '<div style="padding: 12px; color: var(--text-dim); font-size: 0.85rem; text-align: center;">查無相關 AI 工具</div>';
      return;
    }

    // 依據 category 進行分組
    const groups = {};
    tools.forEach(tool => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category].push(tool);
    });

    // 依類別渲染項目
    Object.keys(groups).forEach(category => {
      const groupTools = groups[category];
      const hasGroupHeader = groupTools.length > 1; // 只有大於 1 個工具的分類才顯示大標題

      if (hasGroupHeader) {
        // 1. 建立並插入分類小標題
        const groupTitle = document.createElement('div');
        groupTitle.className = 'sidebar-group-title';
        groupTitle.textContent = category;
        toolListEl.appendChild(groupTitle);
      }

      // 2. 建立並插入該類別下的所有工具項目
      groupTools.forEach(tool => {
        const item = document.createElement('a');
        item.className = `lab-item ${tool.id === currentToolId ? 'active' : ''}`;
        item.dataset.id = tool.id;
        
        // 只有在沒有顯示大標題時，卡片內才展示 category 字樣，否則隱去以防累贅
        const metaText = hasGroupHeader 
          ? tool.date 
          : `${tool.category} • ${tool.date}`;

        item.innerHTML = `
          <div class="lab-badge" style="background: rgba(236, 72, 153, 0.1); color: #ec4899;">${tool.toolNumber}</div>
          <div class="lab-info">
            <div class="lab-title-text">${tool.title}</div>
            <div class="lab-meta-text">${metaText}</div>
          </div>
        `;

        item.addEventListener('click', (e) => {
          e.preventDefault();
          selectTool(tool.id);
          if (window.innerWidth <= 900) {
            sidebar.classList.remove('open');
          }
        });

        toolListEl.appendChild(item);
      });
    });
  }

  // 切換工具
  function selectTool(toolId) {
    currentToolId = toolId;
    const tool = toolsData.find(item => item.id === toolId);
    if (!tool) return;

    // 更新側邊欄 Active 狀態
    document.querySelectorAll('.lab-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === toolId);
    });

    // 更新 Breadcrumb
    breadcrumbActiveName.textContent = tool.title;

    // 渲染主頁面
    renderToolContent(tool);
  }

  // 動態渲染 AI 工具詳細內容
  function renderToolContent(tool) {
    const stepsHtml = tool.tutorialSteps.map(step => `
      <div class="step-card">
        <div class="step-header" style="color:#ec4899;"><i class="fa-solid fa-angle-right"></i> ${escapeHtml(step.step)}</div>
        <div class="step-desc">${escapeHtml(step.description)}</div>
      </div>
    `).join('');

    const referencesHtml = tool.references ? tool.references.map(ref => `
      <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-item" style="border-left-color:#ec4899;">
        <i class="fa-solid fa-book-bookmark" style="color:#ec4899;"></i>
        <span>${escapeHtml(ref.title)}</span>
        <i class="fa-solid fa-arrow-up-right-from-square external-icon"></i>
      </a>
    `).join('') : '<p style="color:var(--text-dim);">無延伸連結</p>';
    
    const appsHtml = tool.applications ? tool.applications.map(app => `
      <div class="app-scenario-card" style="border-top:3px solid #ec4899;">
        <div class="app-scenario-header">
          <i class="${escapeHtml(app.icon || 'fa-solid fa-cubes')}" style="color:#ec4899;"></i>
          <span>${escapeHtml(app.scenario)}</span>
        </div>
        <div class="app-scenario-desc">${escapeHtml(app.description)}</div>
      </div>
    `).join('') : '<p style="color:var(--text-dim);">暫無實務情境應用</p>';

    // 檢查是否有獨立的 Turbo Mode 與 Always Proceed 設定步驟
    const turboStep = tool.tutorialSteps ? tool.tutorialSteps.find(s => s.step && (s.step.includes('Turbo Mode') || s.step.includes('Always Proceed'))) : null;
    const turboImgUrl = 'images_src/ok/20261006_antigravity_settings_turbo_mode.png';

    // 檢查是否有獨立的 Models & Usage 設定步驟
    const usageStep = tool.tutorialSteps ? tool.tutorialSteps.find(s => s.step && (s.step.includes('Models & Usage') || s.step.includes('模型額度'))) : null;
    const usageImgUrl = 'images_src/ok/20261006_antigravity_settings_models_usage.png';

    let turboHighlightHtml = '';
    if (turboStep) {
      turboHighlightHtml = `
        <!-- (2.5) 核心特寫：配置全域權限 (Turbo Mode) 與 Agent 行為 (Always Proceed) 獨立專區 -->
        <section class="section-card" style="border: 2px solid #ec4899; background: linear-gradient(145deg, rgba(236, 72, 153, 0.06), rgba(15, 23, 42, 0.5)); border-radius: 14px; padding: 22px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(236, 72, 153, 0.15);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px dashed rgba(236, 72, 153, 0.4); padding-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <h3 class="section-title" style="margin-bottom: 0; border-bottom: none; color: #ec4899; font-size: 1.15rem; display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-bolt-lightning" style="color: #ec4899; font-size: 1.2rem;"></i>
              <span>配置全域權限 (Turbo Mode) 與 Agent 行為 (Always Proceed)</span>
            </h3>
            <span style="font-size: 0.75rem; background: rgba(236, 72, 153, 0.2); color: #ec4899; padding: 4px 12px; border-radius: 999px; font-weight: 700; border: 1px solid rgba(236, 72, 153, 0.3);">
              <i class="fa-solid fa-shield-halved"></i> 核心極速權限配置
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; align-items: center;">
            <!-- 獨立圖片框 -->
            <div style="border-radius: 10px; overflow: hidden; border: 1.5px solid rgba(236, 72, 153, 0.4); background: #0b0f19; box-shadow: 0 6px 16px rgba(0,0,0,0.3);">
              <img src="${turboImgUrl}" alt="配置全域權限 Turbo Mode 與 Always Proceed 介面截圖" class="zoomable-img" style="width: 100%; display: block; cursor: zoom-in;" onerror="this.src='https://via.placeholder.com/600x300?text=Turbo+Mode+Settings'" />
              <div style="padding: 8px 12px; font-size: 0.75rem; color: #94a3b8; text-align: center; background: rgba(15, 23, 42, 0.95); border-top: 1px solid rgba(255,255,255,0.06);">
                <i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大檢視 Antigravity Settings 設定面板截圖
              </div>
            </div>

            <!-- 獨立說明框 -->
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(236, 72, 153, 0.25); border-radius: 10px; padding: 14px; border-left: 4px solid #ec4899;">
                <div style="font-weight: 700; color: #f8fafc; font-size: 0.95rem; margin-bottom: 5px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-gauge-high" style="color: #ec4899;"></i>
                  <span>Global Permissions ➔ Security Preset</span>
                </div>
                <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.65;">
                  設定為 <strong style="color: #ec4899; font-size: 0.95rem;">「Turbo Mode」</strong>：全面解鎖本機檔案讀寫、終端機命令 (Terminal) 與 MCP 工具之全自主執行權限，免除頻繁手動確認彈跳視窗，保證 Agent 高吞吐量連續作業。
                </div>
              </div>

              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: 10px; padding: 14px; border-left: 4px solid #06b6d4;">
                <div style="font-weight: 700; color: #f8fafc; font-size: 0.95rem; margin-bottom: 5px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-sliders" style="color: #06b6d4;"></i>
                  <span>Tool Permissions (細部工具自訂)</span>
                </div>
                <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.65;">
                  點擊右側 <strong style="color: #06b6d4;">「Open」</strong> 按鈕，可個別針對 File、Terminal 與 MCP Tools 細項自訂微調權限，確保安全彈性。
                </div>
              </div>

              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 10px; padding: 14px; border-left: 4px solid #10b981;">
                <div style="font-weight: 700; color: #f8fafc; font-size: 0.95rem; margin-bottom: 5px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-forward-fast" style="color: #10b981;"></i>
                  <span>Agent Behavior ➔ Plan Review Policy</span>
                </div>
                <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.65;">
                  設定為 <strong style="color: #10b981; font-size: 0.95rem;">「Always Proceed」</strong>：產出實作計畫後一律自動繼續執行，無須等待使用者手動核准中斷；若需讓 Agent 生成結構化計畫，可隨時在對話框輸入 <code style="background: rgba(0,0,0,0.4); padding: 2px 6px; border-radius: 4px; color: #a7f3d0;">/plan</code> 指令。
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    
    let geminiModelsHighlightHtml = '';
    if (tool.id === 'tool-gemini-models-thinking') {
      geminiModelsHighlightHtml = `
        <!-- (2.7) 核心特寫：Gemini Enterprise Agent Platform 官方受管 Google 模型矩陣 -->
        <section class="section-card" style="border: 2px solid #38bdf8; background: linear-gradient(145deg, rgba(14, 165, 233, 0.08), rgba(15, 23, 42, 0.6)); border-radius: 14px; padding: 22px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(56, 189, 248, 0.15);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; border-bottom: 1px dashed rgba(56, 189, 248, 0.4); padding-bottom: 14px; flex-wrap: wrap; gap: 12px;">
            <div>
              <h3 class="section-title" style="margin-bottom: 0; border-bottom: none; color: #38bdf8; font-size: 1.25rem; display: flex; align-items: center; gap: 10px;">
                <i class="fa-solid fa-layer-group" style="color: #38bdf8; font-size: 1.3rem;"></i>
                <span>Gemini Enterprise Agent Platform - 官方 Google 模型全景架構</span>
              </h3>
              <p style="color: var(--text-dim); font-size: 0.85rem; margin-top: 4px; margin-bottom: 0;">
                依據 Google Cloud 官方最新架構規範，全面解析四大受管無伺服器 (Serverless) 模型與「思考程度」調控心法
              </p>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <a href="https://ai.google.dev/gemini-api/docs/thinking?hl=zh-tw" target="_blank" rel="noopener noreferrer" style="font-size: 0.82rem; background: rgba(236, 72, 153, 0.18); color: #f472b6; padding: 6px 14px; border-radius: 999px; font-weight: 700; border: 1px solid rgba(236, 72, 153, 0.4); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;">
                <i class="fa-solid fa-brain"></i> 控制思考官方文檔
              </a>
              <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models?hl=zh_tw" target="_blank" rel="noopener noreferrer" style="font-size: 0.82rem; background: rgba(14, 165, 233, 0.18); color: #38bdf8; padding: 6px 14px; border-radius: 999px; font-weight: 700; border: 1px solid rgba(56, 189, 248, 0.4); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Agent Platform 官方文檔
              </a>
            </div>
          </div>

          <!-- 四大模型卡片網格 -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 22px;">
            <!-- 卡片 1: 4 Argon -->
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(168, 85, 247, 0.4); border-top: 3px solid #a855f7; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: 800; font-size: 1.05rem; color: #e9d5ff;">4 Argon</span>
                  <span style="font-size: 0.7rem; background: rgba(168, 85, 247, 0.2); color: #c084fc; padding: 2px 8px; border-radius: 4px; font-weight: 700;">複雜任務 · 旗艦推理</span>
                </div>
                <div style="font-size: 0.82rem; color: #a855f7; font-weight: 600; margin-bottom: 6px;">Flagship Reasoning & Agentic Model</div>
                <p style="font-size: 0.84rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 10px;">
                  Google 最頂尖的旗艦級推理自主代理核心，具備統一超長上下文視窗、超長輸出生成與長程多步驟規劃 (Long-horizon Planning) 能力。
                </p>
              </div>
              <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px 10px; font-size: 0.78rem; color: #d8b4fe;">
                <i class="fa-solid fa-bullseye"></i> <strong>工控實戰</strong>：遠端瀏覽器全自主網頁探勘、全站架構逆向、多模組跨系統重構。
              </div>
            </div>

            <!-- 卡片 2: 3.1 Pro -->
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(56, 189, 248, 0.4); border-top: 3px solid #38bdf8; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: 800; font-size: 1.05rem; color: #bae6fd;">3.1 Pro</span>
                  <span style="font-size: 0.7rem; background: rgba(56, 189, 248, 0.2); color: #38bdf8; padding: 2px 8px; border-radius: 4px; font-weight: 700;">進階推論 · 大腦核心</span>
                </div>
                <div style="font-size: 0.82rem; color: #38bdf8; font-weight: 600; margin-bottom: 6px;">Deep Multi-step Reasoning</div>
                <p style="font-size: 0.84rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 10px;">
                  高階多模態推論主力，擅長數理邏輯、多步驟因果推演與複雜系統分析，搭配「思考程度：高」可觸發深度思維鏈自我驗證。
                </p>
              </div>
              <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px 10px; font-size: 0.78rem; color: #7dd3fc;">
                <i class="fa-solid fa-bullseye"></i> <strong>工控實戰</strong>：C# 異步並發死鎖排查、Modbus CRC 封包除錯、S-Curve 運動演算法推導。
              </div>
            </div>

            <!-- 卡片 3: 3.8 Flash -->
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(16, 185, 129, 0.4); border-top: 3px solid #10b981; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: 800; font-size: 1.05rem; color: #a7f3d0;">3.8 Flash</span>
                  <span style="font-size: 0.7rem; background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 2px 8px; border-radius: 4px; font-weight: 700;">全方位協助 · 黃金平衡</span>
                </div>
                <div style="font-size: 0.82rem; color: #10b981; font-weight: 600; margin-bottom: 6px;">Intelligence-Dense & Balanced</div>
                <p style="font-size: 0.84rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 10px;">
                  高智能密度的通用主力模型，在極致響應速度、經濟成本與推理品質間取得完美平衡，是多數日常工程開發的最佳預設選項。
                </p>
              </div>
              <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px 10px; font-size: 0.78rem; color: #6ee7b7;">
                <i class="fa-solid fa-bullseye"></i> <strong>工控實戰</strong>：Node-RED 常用 Flow 撰寫、HTML/JS 儀表板生成、設備數據摘要統計。
              </div>
            </div>

            <!-- 卡片 4: 3.5 Flash-Lite -->
            <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(245, 158, 11, 0.4); border-top: 3px solid #f59e0b; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: 800; font-size: 1.05rem; color: #fde68a;">3.5 Flash-Lite</span>
                  <span style="font-size: 0.7rem; background: rgba(245, 158, 11, 0.2); color: #fbbf24; padding: 2px 8px; border-radius: 4px; font-weight: 700;">回覆最快 · 極致輕量</span>
                </div>
                <div style="font-size: 0.82rem; color: #f59e0b; font-weight: 600; margin-bottom: 6px;">High-Throughput & Low-Latency</div>
                <p style="font-size: 0.84rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 10px;">
                  專為高吞吐量 (High-Throughput) 與超低延遲設計的輕量級模型，毫秒級即時返回，有效消除等待延遲。
                </p>
              </div>
              <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px 10px; font-size: 0.78rem; color: #fef08a;">
                <i class="fa-solid fa-bullseye"></i> <strong>工控實戰</strong>：現場即時進制轉換 (Hex/Dec)、正則表達式快速檢驗、單行語法校正。
              </div>
            </div>
          </div>

          <!-- ★ 控制思考 (Controlling Thinking) 與 thinking_level 參數支援對照表 -->
          <div style="background: rgba(11, 15, 25, 0.85); border: 1px solid rgba(236, 72, 153, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.35);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
              <div>
                <h4 style="font-size: 1.15rem; font-weight: 800; color: #ffffff; margin: 0; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-brain" style="color: #ec4899;"></i>
                  <span>控制思考 (Controlling Thinking)</span>
                </h4>
                <p style="color: #cbd5e1; font-size: 0.88rem; margin: 6px 0 0; line-height: 1.6;">
                  Gemini 模型預設會進行動態思考，根據要求的複雜程度，自動調整推論工作量。您可以使用 <code style="background: rgba(236, 72, 153, 0.15); color: #f472b6; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.9em; border: 1px solid rgba(236, 72, 153, 0.3);">thinking_level</code> 參數控制這項行為。
                </p>
              </div>
              <span style="font-size: 0.75rem; background: rgba(236, 72, 153, 0.15); color: #f472b6; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(236, 72, 153, 0.3); font-weight: 600;">
                <i class="fa-solid fa-sliders"></i> thinking_level 參數矩陣
              </span>
            </div>

            <!-- 12款模型思考規格完整對照表格 -->
            <div style="overflow-x: auto; margin-top: 14px; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px;">
              <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.86rem;">
                <thead>
                  <tr style="background: rgba(255, 255, 255, 0.04); border-bottom: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8;">
                    <th style="padding: 10px 16px; font-weight: 700;">模型 (Model)</th>
                    <th style="padding: 10px 16px; font-weight: 700;">預設思考 (Default Thinking)</th>
                    <th style="padding: 10px 16px; font-weight: 700;">支援的層級 (Supported Levels)</th>
                  </tr>
                </thead>
                <tbody style="color: #e2e8f0;">
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: rgba(168, 85, 247, 0.04);">
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 700; color: #c084fc;">gemini-4-argon</td>
                    <td style="padding: 9px 16px;"><span style="color: #38bdf8; font-weight: 600;">開啟 (中)</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">低、中、高</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: rgba(16, 185, 129, 0.04);">
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 700; color: #34d399;">gemini-3.8-flash</td>
                    <td style="padding: 9px 16px;"><span style="color: #38bdf8; font-weight: 600;">開啟 (中)</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">低、中、高</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 600;">gemini-3.6-flash</td>
                    <td style="padding: 9px 16px;"><span style="color: #38bdf8; font-weight: 600;">開啟 (中)</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">極低、低、中、高</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: rgba(245, 158, 11, 0.04);">
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 700; color: #fbbf24;">gemini-3.5-flash-lite</td>
                    <td style="padding: 9px 16px;"><span style="color: #fde047; font-weight: 600;">開啟 (極簡)</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">極低、低、中、高</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); background: rgba(56, 189, 248, 0.04);">
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 700; color: #38bdf8;">gemini-3.1-pro-preview</td>
                    <td style="padding: 9px 16px;"><span style="color: #fb7185; font-weight: 600;">開啟 (高)</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">低、中、高</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 600;">gemini-3.1-flash-lite-image</td>
                    <td style="padding: 9px 16px;"><span style="color: #fde047; font-weight: 600;">開啟 (極簡)</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">極低、高</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 600;">gemini-3-flash-preview</td>
                    <td style="padding: 9px 16px;"><span style="color: #fb7185; font-weight: 600;">開啟 (高)</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">極低、低、中、高</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 600;">gemini-3-pro-preview</td>
                    <td style="padding: 9px 16px;"><span style="color: #fb7185; font-weight: 600;">開啟 (高)</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">低、高</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 600;">gemini-2.5-pro</td>
                    <td style="padding: 9px 16px;"><span style="color: #34d399; font-weight: 600;">開啟</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">低、中、高</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 600;">gemini-2.5-flash</td>
                    <td style="padding: 9px 16px;"><span style="color: #34d399; font-weight: 600;">開啟</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">低、中、高</span></td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 600; color: #94a3b8;">gemini-2.5-flash-lite</td>
                    <td style="padding: 9px 16px;"><span style="color: #ef4444; font-weight: 600;">關閉</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">低、中、高</span></td>
                  </tr>
                  <tr>
                    <td style="padding: 9px 16px; font-family: monospace; font-weight: 700; color: #f43f5e;">gemini-robotics-er-2-preview</td>
                    <td style="padding: 9px 16px;"><span style="color: #fb7185; font-weight: 600;">開啟 (高)</span></td>
                    <td style="padding: 9px 16px;"><span style="background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px;">極低、低、中、高</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 官方截圖放大按鈕 -->
            <div style="margin-top: 14px; text-align: right;">
              <span class="zoom-hint" style="cursor: pointer; color: #f472b6; font-size: 0.8rem; font-weight: 600;" onclick="const img = document.querySelector('img[src*=\'thinking_levels_control_table\']'); if (img) img.click();">
                <i class="fa-solid fa-magnifying-glass-plus"></i> 點擊下方截圖可放大檢視 Google 官方完整對照表
              </span>
            </div>
          </div>

          <!-- 思考程度 (Thinking Levels) 動態調節機制說明 -->
          <div style="background: rgba(11, 15, 25, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 16px;">
            <div style="font-weight: 700; color: #f8fafc; font-size: 0.95rem; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-sliders" style="color: #ec4899;"></i>
              <span>思考程度層級說明 (Thinking Levels Deep Dive)</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
              <div style="background: rgba(255,255,255,0.02); padding: 10px 12px; border-radius: 8px; border-left: 3px solid #f59e0b;">
                <div style="font-weight: 700; color: #fbbf24; font-size: 0.85rem; margin-bottom: 3px;">• 極低 (Minimal)</div>
                <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">極簡推論，優先追求極限低延遲，適用於正則表達式、單行指令語法校正。</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); padding: 10px 12px; border-radius: 8px; border-left: 3px solid #10b981;">
                <div style="font-weight: 700; color: #34d399; font-size: 0.85rem; margin-bottom: 3px;">• 低 (高效 / Low)</div>
                <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">幾乎無額外思考延遲，AI 直接輸出結果，適合已知固定解的標準樣板與即時問答。</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); padding: 10px 12px; border-radius: 8px; border-left: 3px solid #38bdf8;">
                <div style="font-weight: 700; color: #38bdf8; font-size: 0.85rem; margin-bottom: 3px;">• 中等 (適中 / Medium)</div>
                <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">展開 5~15 秒邏輯推導與步驟拆解，在速度與解答嚴謹度間達到最佳平衡。</div>
              </div>
              <div style="background: rgba(255,255,255,0.02); padding: 10px 12px; border-radius: 8px; border-left: 3px solid #f43f5e;">
                <div style="font-weight: 700; color: #fb7185; font-size: 0.85rem; margin-bottom: 3px;">• 高 (詳盡 / High)</div>
                <div style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.5;">啟動深度思維鏈 (Chain of Thought)，逐步驗證假設邊界並反思修正，專攻高安全工控演算法。</div>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    let usageHighlightHtml = '';
    if (usageStep) {
      usageHighlightHtml = `
        <!-- (2.6) 核心特寫：Models & Usage (模型額度與用量管理) 獨立專區 -->
        <section class="section-card" style="border: 2px solid #06b6d4; background: linear-gradient(145deg, rgba(6, 182, 212, 0.06), rgba(15, 23, 42, 0.5)); border-radius: 14px; padding: 22px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(6, 182, 212, 0.15);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px dashed rgba(6, 182, 212, 0.4); padding-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <h3 class="section-title" style="margin-bottom: 0; border-bottom: none; color: #06b6d4; font-size: 1.15rem; display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-chart-pie" style="color: #06b6d4; font-size: 1.2rem;"></i>
              <span>Models & Usage (模型額度與使用量監控)</span>
            </h3>
            <span style="font-size: 0.75rem; background: rgba(6, 182, 212, 0.2); color: #06b6d4; padding: 4px 12px; border-radius: 999px; font-weight: 700; border: 1px solid rgba(6, 182, 212, 0.3);">
              <i class="fa-solid fa-gauge"></i> 方案與速率上限管理
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; align-items: center;">
            <!-- 獨立圖片框 -->
            <div style="border-radius: 10px; overflow: hidden; border: 1.5px solid rgba(6, 182, 212, 0.4); background: #0b0f19; box-shadow: 0 6px 16px rgba(0,0,0,0.3);">
              <img src="${usageImgUrl}" alt="Models & Usage 模型額度與用量面板截圖" class="zoomable-img" style="width: 100%; display: block; cursor: zoom-in;" onerror="this.src='https://via.placeholder.com/600x300?text=Models+Usage+Settings'" />
              <div style="padding: 8px 12px; font-size: 0.75rem; color: #94a3b8; text-align: center; background: rgba(15, 23, 42, 0.95); border-top: 1px solid rgba(255,255,255,0.06);">
                <i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大檢視 Models & Usage 額度儀表板
              </div>
            </div>

            <!-- 獨立說明框 -->
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: 10px; padding: 14px; border-left: 4px solid #06b6d4;">
                <div style="font-weight: 700; color: #f8fafc; font-size: 0.95rem; margin-bottom: 5px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-gem" style="color: #06b6d4;"></i>
                  <span>Plan (方案管理) ➔ Google AI Pro</span>
                </div>
                <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.65;">
                  顯示當前訂閱等級為 <strong style="color: #06b6d4;">Google AI Pro</strong>；如需更高請求頻率上限 (Rate Limits) 與並發請求數，可點擊右側 <strong>「Upgrade」</strong> 按鈕升級至 <strong>Google AI Ultra</strong> 方案。
                </div>
              </div>

              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 10px; padding: 14px; border-left: 4px solid #f59e0b;">
                <div style="font-weight: 700; color: #f8fafc; font-size: 0.95rem; margin-bottom: 5px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-credit-card" style="color: #f59e0b;"></i>
                  <span>Model Credits ➔ Enable AI Credit Overages</span>
                </div>
                <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.65;">
                  <strong>「啟用點數超額自動扣抵」</strong>開關。開啟時，若本月/每週標準模型配額用盡，系統將自動以儲備 AI 點數滿足後續請求。Antigravity <strong>保證優先耗用方案配額</strong>，不會提早扣除點數。
                </div>
              </div>

              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 10px; padding: 14px; border-left: 4px solid #10b981;">
                <div style="font-weight: 700; color: #f8fafc; font-size: 0.95rem; margin-bottom: 5px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-clock-rotate-left" style="color: #10b981;"></i>
                  <span>Gemini / Claude / GPT 模型滾動額度儀表板</span>
                </div>
                <div style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.65;">
                  • <strong style="color: #10b981;">Weekly Limit Remaining</strong>：監控每週模型額度（如 99%），標註重置倒數（如 6 days, 22 hours）。<br>
                  • <strong style="color: #10b981;">Five Hour Limit Remaining</strong>：精準追蹤 5 小時滾動頻率限制（如 92%），防範高頻呼叫觸發 Rate Limit，明確預知冷卻時間。
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    let galleryHtml = '';
    if (tool.flowImage) {
      const rawImages = Array.isArray(tool.flowImage) ? tool.flowImage : [tool.flowImage];
      // 若已有獨立展示 Turbo Mode 與 Models & Usage 圖片，則在頂部通用畫廊中過濾掉，避免重複
      const images = rawImages.filter(url => !url.includes('antigravity_settings_turbo_mode') && !url.includes('antigravity_settings_models_usage'));

      const imgCardsHtml = images.map((imgUrl, index) => `
        <div class="image-wrapper" style="flex: 1; min-width: 280px; max-width: 100%;">
          <img src="${imgUrl}" alt="AI工具介面截圖 ${index + 1}" onerror="this.src='https://via.placeholder.com/600x300?text=Image+Not+Found'" class="zoomable-img" style="cursor: pointer; width: 100%; border-radius: 8px;">
        </div>
      `).join('');

      galleryHtml = `
        <!-- 圖片展示 -->
        <section class="gallery-section" style="margin-bottom: 24px;">
          <div class="image-card" style="width: 100%; max-width: 900px; margin: 0 auto; border-top: 3px solid #ec4899;">
            <div class="image-header">
              <span class="image-title" style="color:#ec4899;"><i class="fa-solid fa-image"></i> AI 工具功能與介面展示</span>
              <span class="zoom-hint"><i class="fa-solid fa-magnifying-glass-plus"></i> 點擊圖片可放大預覽</span>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; padding: 16px; background: rgba(0,0,0,0.15); border-radius: 0 0 12px 12px;">
              ${imgCardsHtml}
            </div>
          </div>
        </section>
      `;
    }

    contentBodyEl.innerHTML = `
      <!-- (1) Tool Header -->
      <section class="lab-header-card" style="border-left-color:#ec4899;">
        <div class="lab-tags">
          <span class="tag tag-cat" style="background: rgba(236, 72, 153, 0.1); color:#ec4899;">${escapeHtml(tool.category)}</span>
          <span class="tag tag-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(tool.date)}</span>
        </div>
        <h2 class="lab-main-title">工具 ${tool.toolNumber}: ${escapeHtml(tool.title)}</h2>
        <p class="lab-summary">${escapeHtml(tool.summary)}</p>
        <div style="margin-top: 16px;">
          <a href="${tool.webUrl}" target="_blank" class="tool-action-btn" style="background:#ec4899; color:#fff; border-color:#ec4899; display:inline-flex; align-items:center; gap:8px; padding:10px 20px; font-weight:600; border-radius:8px; text-decoration:none; transition:all 0.2s;">
            <span>點此開啟 ${escapeHtml(tool.title)} 官網</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </section>

      <!-- (1.5) 圖片畫廊 (動態) -->
      ${galleryHtml}

      <!-- (2) 學習目標 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-bullseye" style="color:#ec4899;"></i> AI 工具學習目標</h3>
        <ul class="objective-list">
          ${tool.objective.split('\n').map(obj => obj.trim() ? `<li class="objective-item"><i class="fa-solid fa-circle-check" style="color:#ec4899;"></i> <span>${escapeHtml(obj)}</span></li>` : '').join('')}
        </ul>
      </section>

      <!-- (2.5) 獨立設定專區框框：Turbo Mode -->
      ${turboHighlightHtml}

      <!-- (2.6) 獨立設定專區框框：Models & Usage -->
      ${usageHighlightHtml}

      <!-- (2.7) 核心特寫：Gemini Enterprise Agent Platform 官方受管模型 -->
      ${geminiModelsHighlightHtml}

      <!-- (3) 教學步驟說明 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-list-check" style="color:#ec4899;"></i> AI 工具操作步驟與技巧</h3>
        <div class="steps-timeline">
          ${stepsHtml}
        </div>
      </section>

      <!-- (4) 專題與實務情境應用 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-industry" style="color:#ec4899;"></i> 智慧機電/專題 實務應用情境</h3>
        <div class="apps-grid">
          ${appsHtml}
        </div>
      </section>

      <!-- (5) AI 提示詞 (Prompt) -->
      <section class="section-card">
        <div class="code-box-header">
          <h3 class="section-title" style="margin-bottom:0; border-bottom:none;"><i class="fa-solid fa-wand-magic-sparkles" style="color:#ec4899;"></i> 協作發問 Prompt 範例</h3>
          <button class="copy-btn" id="copyPromptBtn" style="border-color: rgba(236, 72, 153, 0.3); color:#ec4899;">
            <i class="fa-regular fa-copy"></i> 複製 Prompt
          </button>
        </div>
        <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 12px;">複製以下發問提示詞貼入專屬 GPT 助理中，快速產出 Node-RED 程式邏輯或解決方案：</p>
        <pre class="prompt-content" style="border-left-color:#ec4899;">${escapeHtml(tool.aiPrompt)}</pre>
      </section>

      <!-- (6) 相關說明與延伸連結 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-link" style="color:#ec4899;"></i> 相關說明與參考連結</h3>
        <div class="ref-list">
          ${referencesHtml}
        </div>
      </section>
    `;

    // 綁定複製按鈕事件
    const copyPromptBtn = document.getElementById('copyPromptBtn');
    if (copyPromptBtn) {
      copyPromptBtn.addEventListener('click', () => {
        copyToClipboard(tool.aiPrompt, 'Prompt 範例已成功複製到剪貼簿！');
      });
    }

    // Lightbox 放大預覽事件綁定
    const modal = document.getElementById("lightboxModal");
    const modalImg = document.getElementById("lightboxImg");
    const captionText = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("lightboxClose");

    document.querySelectorAll(".zoomable-img").forEach(img => {
      img.addEventListener("click", function() {
        if (modal && modalImg) {
          modal.style.display = "flex";
          modalImg.src = this.src;
          if (captionText) captionText.innerHTML = this.alt || "AI 工具介面展示";
        }
      });
    });

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
      });
    }

    if (modal) {
      modal.addEventListener("click", function(e) {
        if (e.target === modal || e.target === closeBtn) {
          modal.style.display = "none";
        }
      });
    }
  }

  // 輔助函式：複製到剪貼簿
  function copyToClipboard(text, successMsg) {
    navigator.clipboard.writeText(text)
      .then(() => {
        showToast(successMsg);
      })
      .catch(err => {
        console.error('無法複製文字: ', err);
        showToast('複製失敗，請手動複製。', 'error');
      });
  }

  // 輔助函式：顯示 Toast 訊息
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    // 100ms 後加入 active 觸發動畫
    setTimeout(() => toast.classList.add('active'), 100);

    // 3.5 秒後移除
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // HTML 安全轉義
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
