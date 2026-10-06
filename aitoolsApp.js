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
