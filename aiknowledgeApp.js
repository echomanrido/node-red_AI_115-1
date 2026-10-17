document.addEventListener('DOMContentLoaded', () => {
  let knowledgeData = [];
  let currentItemId = null;

  // DOM 元素
  const knowledgeListEl = document.getElementById('knowledgeList');
  const contentBodyEl = document.getElementById('contentBody');
  const searchInput = document.getElementById('searchInput');
  const knowledgeCountBadge = document.getElementById('knowledgeCountBadge');
  const breadcrumbActiveName = document.querySelector('.active-lab-name');

  // 側邊欄切換 (手機版)
  const sidebar = document.getElementById('sidebar');
  const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

  // Lightbox 元素
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  // 分類 Tabs 按鈕
  const tabBtns = document.querySelectorAll('.vibe-tab-btn');
  let activeCategory = 'all';

  if (sidebarOpenBtn) {
    sidebarOpenBtn.addEventListener('click', () => sidebar.classList.add('open'));
  }
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', () => sidebar.classList.remove('open'));
  }

  // Toast 提示訊息
  function showToast(message) {
    const existing = document.querySelector('.vibe-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'vibe-toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #fb7185;"></i> <span>${escapeHtml(message)}</span>`;
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1e1b4b;
      color: #fff;
      border: 1px solid rgba(244, 63, 94, 0.4);
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.9rem;
      font-weight: 500;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2400);
  }

  // 載入資料 (優先 fetch aiknowledge.json，失敗時退回 window.INITIAL_AI_KNOWLEDGE_DATA)
  function loadData() {
    fetch('aiknowledge.json')
      .then(res => {
        if (!res.ok) throw new Error('HTTP error ' + res.status);
        return res.json();
      })
      .then(data => {
        initApp(data);
      })
      .catch(err => {
        console.warn('fetch aiknowledge.json 失敗，改用本機備援資料 INITIAL_AI_KNOWLEDGE_DATA:', err);
        const fallback = window.INITIAL_AI_KNOWLEDGE_DATA || [];
        if (fallback.length > 0) {
          initApp(fallback);
        } else {
          contentBodyEl.innerHTML = `
            <div class="section-card" style="text-align:center; padding: 40px;">
              <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #f43f5e; margin-bottom: 16px;"></i>
              <h2>載入 AI 知識專區資料失敗</h2>
              <p style="color: var(--text-muted); margin-top: 8px;">請確認 aiknowledge.json 或 aiknowledgeData.js 檔案是否存在。</p>
            </div>
          `;
        }
      });
  }

  function initApp(data) {
    knowledgeData = data;
    if (knowledgeCountBadge) {
      knowledgeCountBadge.textContent = knowledgeData.length;
    }

    // 解析 URL 參數
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    const idParam = urlParams.get('id');

    if (catParam) {
      activeCategory = catParam;
      tabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === activeCategory);
      });
    }

    renderSidebar(filterItems());

    if (idParam && knowledgeData.some(item => item.id === idParam)) {
      selectItem(idParam);
    } else if (knowledgeData.length > 0) {
      const filtered = filterItems();
      selectItem(filtered.length > 0 ? filtered[0].id : knowledgeData[0].id);
    }
  }

  loadData();

  // 分類 Tab 切換
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderSidebar(filterItems());
      
      const filtered = filterItems();
      if (filtered.length > 0 && !filtered.some(i => i.id === currentItemId)) {
        selectItem(filtered[0].id);
      }
    });
  });

  // 搜尋過濾功能
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderSidebar(filterItems());
    });
  }

  function filterItems() {
    const keyword = (searchInput ? searchInput.value : '').toLowerCase().trim();
    return knowledgeData.filter(item => {
      const matchCat = (activeCategory === 'all') || (item.category === activeCategory);
      const matchKey = !keyword || 
        item.title.toLowerCase().includes(keyword) ||
        item.summary.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(keyword));
      return matchCat && matchKey;
    });
  }

  // 渲染側邊欄選單
  function renderSidebar(items) {
    knowledgeListEl.innerHTML = '';
    if (items.length === 0) {
      knowledgeListEl.innerHTML = '<div style="padding: 16px; color: var(--text-dim); font-size: 0.85rem; text-align: center;">查無相關專題單元</div>';
      return;
    }

    items.forEach(item => {
      const el = document.createElement('a');
      el.className = `lab-item ${item.id === currentItemId ? 'active' : ''}`;
      el.dataset.id = item.id;
      el.href = `#${item.id}`;

      el.innerHTML = `
        <div class="lab-badge" style="background: rgba(244, 63, 94, 0.15); color: #fb7185; border-color: rgba(244, 63, 94, 0.35);">
          ${escapeHtml(item.itemNumber || 'AI')}
        </div>
        <div class="lab-info">
          <div class="lab-title-text" style="font-weight: 600;">${escapeHtml(item.shortTitle || item.title)}</div>
          <div class="lab-meta-text">
            <span class="tag-category-aiknowledge" style="font-size: 0.68rem; padding: 1px 6px; border-radius: 4px; display: inline-block;">${escapeHtml(item.category)}</span>
            <span style="opacity: 0.6; margin-left: 4px;">• ${escapeHtml(item.date || '')}</span>
          </div>
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.preventDefault();
        selectItem(item.id);
        if (window.innerWidth <= 900 && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }
      });

      knowledgeListEl.appendChild(el);
    });
  }

  // 選取單元
  function selectItem(id) {
    const item = knowledgeData.find(i => i.id === id);
    if (!item) return;
    currentItemId = id;

    // 更新側邊欄高亮
    document.querySelectorAll('#knowledgeList .lab-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === id);
    });

    if (breadcrumbActiveName) {
      breadcrumbActiveName.textContent = item.title;
    }

    renderContent(item);

    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;
  }

  // 渲染主內容 (全面參考 Vibe Coding 的排版結構)
  function renderContent(item) {
    const hasSlide = !!item.slideUrl;
    const slideUrl = item.slideUrl || '';

    // 核心步驟 HTML
    const stepsHtml = (item.tutorialSteps || []).map(step => `
      <div class="step-card">
        <div class="step-header"><i class="fa-solid fa-angle-right" style="color: #fb7185;"></i> ${escapeHtml(step.step)}</div>
        <div class="step-desc">${escapeHtml(step.description)}</div>
      </div>
    `).join('');

    // 實務應用情境 HTML
    const appsHtml = (item.applications || []).map(app => `
      <div class="app-scenario-card">
        <div class="app-scenario-header">
          <i class="${escapeHtml(app.icon || 'fa-solid fa-brain')}" style="color: #fb7185;"></i>
          <span>${escapeHtml(app.scenario)}</span>
        </div>
        <div class="app-scenario-desc">${escapeHtml(app.description)}</div>
      </div>
    `).join('');

    // 延伸參考資源 HTML
    const referencesHtml = (item.references || []).map(ref => `
      <a href="${escapeHtml(ref.url)}" target="_blank" rel="noopener noreferrer" class="ref-item" style="border-color: rgba(244, 63, 94, 0.3); background: rgba(244, 63, 94, 0.05);">
        <i class="fa-solid fa-arrow-up-right-from-square" style="color: #fb7185;"></i>
        <span>${escapeHtml(ref.title)}</span>
        <i class="fa-solid fa-arrow-up-right-from-square external-icon"></i>
      </a>
    `).join('');

    contentBodyEl.innerHTML = `
      <!-- (1) 單元 Header 卡片 (參考 Vibe Coding) -->
      <section class="lab-header-card">
        <div class="lab-tags">
          <span class="tag tag-category-aiknowledge"><i class="fa-solid fa-brain"></i> ${escapeHtml(item.category)}</span>
          ${item.subCategory ? `<span class="tag" style="background: rgba(244, 63, 94, 0.18); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.4);"><i class="fa-solid fa-code-compare"></i> ${escapeHtml(item.subCategory)}</span>` : ''}
          <span class="tag tag-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(item.date || '')}</span>
        </div>
        <h2 class="lab-main-title">單元 ${escapeHtml(item.itemNumber || '01')}: ${escapeHtml(item.title)}</h2>
        <p class="lab-summary">${escapeHtml(item.summary)}</p>
      </section>

      <!-- (2) 雙欄卡片展演區 (左: 核心架構流程圖 / 右: 互動專題網頁) -->
      <section class="gallery-section">
        <!-- 左卡片: 核心架構流程圖 / 思維模型 -->
        <div class="image-card">
          <div class="image-header">
            <span class="image-title"><i class="fa-solid fa-diagram-project" style="color: #fb7185;"></i> ${escapeHtml(item.flowTitle || '核心架構流程圖 / 思維模型')}</span>
            <span class="zoom-hint" id="flowZoomBtn" style="cursor: pointer;"><i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大</span>
          </div>
          <div class="image-wrapper" id="flowImgWrapper" style="cursor: pointer; background: #0b1522; padding: 12px;">
            <img src="${item.flowImage}" alt="架構流程圖" id="flowImgElement" style="max-width: 100%; border-radius: 6px;">
          </div>
        </div>

        <!-- 右卡片: 互動專題工作台 / 實戰即時視窗 -->
        <div class="image-card">
          <div class="image-header">
            <span class="image-title"><i class="fa-solid fa-chalkboard-user" style="color: #38bdf8;"></i> ${escapeHtml(item.resultTitle || '互動專題網頁 / 實戰工作台')}</span>
            ${hasSlide ? `
              <a href="${slideUrl}" target="_blank" rel="noopener noreferrer" class="btn-open-external" title="另開獨立視窗瀏覽">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> 獨立全螢幕開啟
              </a>
            ` : `<span class="zoom-hint"><i class="fa-solid fa-circle-check"></i> 即時狀態</span>`}
          </div>
          <div class="image-wrapper" style="padding: 0; overflow: hidden; background: #0b1522; min-height: 290px;">
            ${hasSlide ? `
              <iframe src="${slideUrl}" class="slide-iframe-container" title="專題工作台即時預覽" loading="lazy"></iframe>
            ` : `
              <div style="height: 290px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); gap: 12px; padding: 20px; text-align: center;">
                <i class="fa-solid fa-brain" style="font-size: 3rem; color: #fb7185; opacity: 0.7;"></i>
                <div style="font-size: 1rem; font-weight: 600; color: #ffffff;">${escapeHtml(item.title)}</div>
                <div style="font-size: 0.85rem; max-width: 400px;">本單元包含完整架構定義與思維模型，可點擊下方規格代碼直接複製使用。</div>
              </div>
            `}
          </div>
        </div>
      </section>

      <!-- (3) 單元學習目標 -->
      ${item.objective ? `
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-bullseye" style="color: #10b981;"></i> 單元學習目標與本質洞察</h3>
        <ul class="objective-list">
          ${item.objective.split('\n').map(obj => obj.trim() ? `<li class="objective-item"><i class="fa-solid fa-circle-check" style="color: #fb7185;"></i> <span>${escapeHtml(obj)}</span></li>` : '').join('')}
        </ul>
      </section>
      ` : ''}

      <!-- (4) 核心實踐步驟與架構拆解 -->
      ${stepsHtml ? `
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-list-check" style="color: #fb7185;"></i> 核心實踐步驟與理論維度</h3>
        <div class="steps-timeline">
          ${stepsHtml}
        </div>
      </section>
      ` : ''}

      <!-- (5) AI Agent 提示詞實務 (LLM Prompt) -->
      ${item.promptTemplate ? `
      <section class="section-card prompt-card" style="border-left: 3px solid #fb7185;">
        <div class="prompt-header">
          <h3 class="section-title" style="margin-bottom: 0;"><i class="fa-solid fa-robot" style="color: #fb7185;"></i> AI Agent 協作提示詞 (Prompt Template)</h3>
          <button class="copy-btn" id="copyPromptBtn">
            <i class="fa-regular fa-copy"></i> 複製提示詞
          </button>
        </div>
        <p class="prompt-subtext">可直接將此 Prompt 複製貼給 Claude / Gemini / ChatGPT，驅動 AI 進行高階系統架構設計與因果檢驗：</p>
        <pre class="prompt-box"><code id="promptCodeText">${escapeHtml(item.promptTemplate)}</code></pre>
      </section>
      ` : ''}

      <!-- (6) 規格文件與程式範例 (Spec / Code) -->
      ${item.codeSnippet && item.codeSnippet.code ? `
      <section class="section-card code-card" style="border-left: 3px solid #a855f7;">
        <div class="code-header">
          <h3 class="section-title" style="margin-bottom: 0;"><i class="fa-solid fa-code" style="color: #c084fc;"></i> 核心概念與程式範例 (${escapeHtml(item.codeSnippet.language || 'Code')})</h3>
          <button class="copy-btn" id="copyCodeBtn">
            <i class="fa-regular fa-copy"></i> 複製代碼
          </button>
        </div>
        <div class="code-box">
          <pre><code id="codeSnippetText">${escapeHtml(item.codeSnippet.code)}</code></pre>
        </div>
      </section>
      ` : ''}

      <!-- (7) 工業實務應用情境 -->
      ${appsHtml ? `
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-compass-drafting" style="color: #fb7185;"></i> 工業機電工控與智慧製造落地實務</h3>
        <div class="app-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
          ${appsHtml}
        </div>
      </section>
      ` : ''}

      <!-- (8) 延伸學習資源與專案入口 -->
      ${referencesHtml ? `
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-book-bookmark" style="color: #38bdf8;"></i> 延伸學習資源與專案入口</h3>
        <div class="ref-list">
          ${referencesHtml}
        </div>
      </section>
      ` : ''}
    `;

    // 綁定 Lightbox 放大功能 (點擊圖片或「點擊放大」按鈕)
    const flowImgElement = document.getElementById('flowImgElement');
    const flowImgWrapper = document.getElementById('flowImgWrapper');
    const flowZoomBtn = document.getElementById('flowZoomBtn');

    function openLightbox() {
      if (lightboxModal && flowImgElement) {
        lightboxImg.src = flowImgElement.src;
        lightboxCaption.textContent = item.flowTitle || item.title;
        lightboxModal.classList.add('active', 'show');
      }
    }

    if (flowImgWrapper) flowImgWrapper.addEventListener('click', openLightbox);
    if (flowZoomBtn) flowZoomBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox();
    });

    // 綁定複製按鈕
    const copyPromptBtn = document.getElementById('copyPromptBtn');
    if (copyPromptBtn && item.promptTemplate) {
      copyPromptBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(item.promptTemplate).then(() => {
          showToast('已複製 AI 提示詞到剪貼簿！');
        });
      });
    }

    const copyCodeBtn = document.getElementById('copyCodeBtn');
    if (copyCodeBtn && item.codeSnippet && item.codeSnippet.code) {
      copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(item.codeSnippet.code).then(() => {
          showToast('已複製程式碼範例到剪貼簿！');
        });
      });
    }
  }

  // Lightbox 關閉事件
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active', 'show');
    });
  }
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active', 'show');
      }
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && (lightboxModal.classList.contains('active') || lightboxModal.classList.contains('show'))) {
      lightboxModal.classList.remove('active', 'show');
    }
  });

  // HTML 轉義工具
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
});
