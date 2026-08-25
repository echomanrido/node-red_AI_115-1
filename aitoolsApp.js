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
        console.warn('fetch aitools.json 失敗，改用本機備援資料 INITIAL_AITOOLS_DATA:', err);
        if (window.INITIAL_AITOOLS_DATA && window.INITIAL_AITOOLS_DATA.length > 0) {
          initApp(window.INITIAL_AITOOLS_DATA);
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

  // 渲染側邊欄選單
  function renderSidebar(tools) {
    toolListEl.innerHTML = '';
    if (tools.length === 0) {
      toolListEl.innerHTML = '<div style="padding: 12px; color: var(--text-dim); font-size: 0.85rem; text-align: center;">查無相關 AI 工具</div>';
      return;
    }

    tools.forEach(tool => {
      const item = document.createElement('a');
      item.className = `lab-item ${tool.id === currentToolId ? 'active' : ''}`;
      item.dataset.id = tool.id;
      item.innerHTML = `
        <div class="lab-badge" style="background: rgba(236, 72, 153, 0.1); color: #ec4899;">${tool.toolNumber}</div>
        <div class="lab-info">
          <div class="lab-title-text">${tool.title}</div>
          <div class="lab-meta-text">${tool.category} • ${tool.date}</div>
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

      <!-- (2) 學習目標 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-bullseye" style="color:#ec4899;"></i> AI 工具學習目標</h3>
        <ul class="objective-list">
          ${tool.objective.split('\n').map(obj => obj.trim() ? `<li class="objective-item"><i class="fa-solid fa-circle-check" style="color:#ec4899;"></i> <span>${escapeHtml(obj)}</span></li>` : '').join('')}
        </ul>
      </section>

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
          <h3 class="section-title" style="margin-bottom:0; border-bottom:none;"><i class="fa-solid fa-wand-magic-sparkles" style="color:#ec4899;"></i> 音樂風格與歌詞 Prompt 範例</h3>
          <button class="copy-btn" id="copyPromptBtn" style="border-color: rgba(236, 72, 153, 0.3); color:#ec4899;">
            <i class="fa-regular fa-copy"></i> 複製 Prompt
          </button>
        </div>
        <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 12px;">將以下提示詞複製，並在 Suno 啟用自訂模式 (Custom Mode) 貼入 Style of Music 與 Lyrics 中：</p>
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
