// 五股職訓局 - 機電AI_115-1期 (作者：Rido老師)
// Node-RED 實戰專題專區 前端應用主程式
document.addEventListener('DOMContentLoaded', () => {
  let projData = [];
  let currentProjId = null;
  let currentCategory = 'all';
  let currentDeckIndex = 0;

  // DOM 元素快取
  const projListEl = document.getElementById('projList');
  const projCountBadge = document.getElementById('projCountBadge');
  const searchInput = document.getElementById('searchInput');
  const categoryTabBtns = document.querySelectorAll('.proj-tab-btn');
  const contentBody = document.getElementById('contentBody');
  const breadcrumbActiveName = document.querySelector('.active-lab-name');

  // Sidebar 移動端切換
  const sidebar = document.getElementById('sidebar');
  const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

  if (sidebarOpenBtn && sidebarCloseBtn && sidebar) {
    sidebarOpenBtn.addEventListener('click', () => sidebar.classList.add('open'));
    sidebarCloseBtn.addEventListener('click', () => sidebar.classList.remove('open'));
  }

  // 載入資料
  async function loadData() {
    if (window.noderedProjectsData && window.noderedProjectsData.length > 0) {
      projData = window.noderedProjectsData;
    } else {
      try {
        const res = await fetch('noderedProjects.json');
        projData = await res.json();
      } catch (err) {
        console.error('無法載入 noderedProjects.json:', err);
        return;
      }
    }

    // 處理 URL 參數
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    const idParam = urlParams.get('id');

    if (catParam) {
      currentCategory = catParam;
      categoryTabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === currentCategory);
      });
    }

    applyFilter();

    if (idParam && projData.some(p => p.id === idParam)) {
      selectProject(idParam);
    } else {
      const filtered = getFilteredList();
      if (filtered.length > 0) {
        selectProject(filtered[0].id);
      }
    }
  }

  // 分類 Tab 點擊
  categoryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      applyFilter();

      const filtered = getFilteredList();
      if (filtered.length > 0) {
        if (!filtered.some(p => p.id === currentProjId)) {
          selectProject(filtered[0].id);
        }
      }
    });
  });

  // 搜尋過濾
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyFilter();
      const filtered = getFilteredList();
      if (filtered.length > 0 && !filtered.some(p => p.id === currentProjId)) {
        selectProject(filtered[0].id);
      }
    });
  }

  function getFilteredList() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    return projData.filter(item => {
      const matchCat = (currentCategory === 'all') || (item.category === currentCategory);
      const matchQuery = !q || 
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.projNumber.toLowerCase().includes(q) ||
        item.tutorialSteps.some(s => s.step.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }

  function applyFilter() {
    const items = getFilteredList();
    renderSidebarList(items);
    if (projCountBadge) projCountBadge.textContent = items.length;
  }

  // 渲染側邊欄清單
  function renderSidebarList(items) {
    projListEl.innerHTML = '';
    if (items.length === 0) {
      projListEl.innerHTML = '<div style="padding: 16px; color: var(--text-dim); font-size: 0.85rem; text-align: center;">查無相關專題</div>';
      return;
    }

    items.forEach(proj => {
      const el = document.createElement('a');
      el.className = `lab-item ${proj.id === currentProjId ? 'active' : ''}`;
      el.href = `#${proj.id}`;
      el.dataset.id = proj.id;

      // 提取編號數字
      const numOnly = proj.projNumber.replace(/[^0-9]/g, '');

      el.innerHTML = `
        <div class="lab-badge" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; border-color: rgba(239, 68, 68, 0.4);">${numOnly}</div>
        <div class="lab-info" style="flex: 1;">
          <div class="lab-title-text" style="font-weight: 700;">${escapeHtml(proj.title)}</div>
          <div class="lab-meta-text">
            <span class="tag" style="padding: 1px 6px; font-size: 0.68rem; border-radius: 4px; background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); display: inline-block;">${escapeHtml(proj.category)}</span>
            • ${escapeHtml(proj.slideRange)}
          </div>
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.preventDefault();
        selectProject(proj.id);
        if (window.innerWidth <= 768 && sidebar) {
          sidebar.classList.remove('open');
        }
      });

      projListEl.appendChild(el);
    });
  }

  // 選取特定專題
  function selectProject(id) {
    const proj = projData.find(p => p.id === id);
    if (!proj) return;

    currentProjId = id;
    currentDeckIndex = 0;

    // 更新側邊欄 active 狀態
    const items = projListEl.querySelectorAll('.lab-item');
    items.forEach(item => {
      item.classList.toggle('active', item.dataset.id === id);
    });

    if (breadcrumbActiveName) {
      breadcrumbActiveName.textContent = `${proj.projNumber} - ${proj.title}`;
    }

    renderProjectContent(proj);

    // 捲動至頂部
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;
  }

  // 渲染專題詳細內容
  function renderProjectContent(proj) {
    const slides = proj.allSlides || [];
    const totalSlides = slides.length;

    let stepsHtml = proj.tutorialSteps.map(s => `
      <div class="step-card" style="border-left: 3px solid #ef4444; background: rgba(15, 23, 42, 0.5); padding: 14px 16px; margin-bottom: 12px; border-radius: 6px;">
        <h4 style="color: #fca5a5; font-size: 0.95rem; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-circle-check" style="color: #ef4444;"></i> ${escapeHtml(s.step)}
        </h4>
        <p style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.6; margin: 0;">${escapeHtml(s.description)}</p>
      </div>
    `).join('');

    let appsHtml = proj.applications.map(app => `
      <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <i class="${app.icon}" style="color: #ef4444; font-size: 1.2rem;"></i>
          <h4 style="color: #ffffff; font-size: 0.92rem; margin: 0; font-weight: 700;">${escapeHtml(app.scenario)}</h4>
        </div>
        <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.55; margin: 0;">${escapeHtml(app.description)}</p>
      </div>
    `).join('');

    let refsHtml = proj.references.map(r => `
      <li style="margin-bottom: 6px;">
        <a href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; font-size: 0.85rem;">
          <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem;"></i> ${escapeHtml(r.title)}
        </a>
      </li>
    `).join('');

    const jsonString = JSON.stringify(proj.nodeRedJson || [], null, 2);

    // 縮圖 HTML
    let thumbsHtml = slides.map((imgUrl, idx) => `
      <img src="${imgUrl}" alt="投影片第 ${idx + 1} 頁" class="slide-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}" />
    `).join('');

    contentBody.innerHTML = `
      <!-- 標題與標籤列 -->
      <div class="lab-detail-header" style="border-bottom: 1px solid var(--border-color); padding-bottom: 18px; margin-bottom: 22px;">
        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 10px; flex-wrap: wrap;">
          <span style="background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; padding: 3px 10px; border-radius: 4px; font-size: 0.78rem; font-weight: 700;">
            <i class="fa-solid fa-diagram-project"></i> ${escapeHtml(proj.projNumber)}
          </span>
          <span style="background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.35); padding: 3px 10px; border-radius: 4px; font-size: 0.78rem; font-weight: 600;">
            ${escapeHtml(proj.category)}
          </span>
          <span style="color: var(--text-dim); font-size: 0.78rem;">
            <i class="fa-solid fa-file-powerpoint" style="color: #ef4444;"></i> ${escapeHtml(proj.slideRange)}
          </span>
          <span style="color: var(--text-dim); font-size: 0.78rem;">
            <i class="fa-regular fa-calendar"></i> ${escapeHtml(proj.date)}
          </span>
        </div>
        <h2 style="font-size: 1.5rem; font-weight: 800; color: #ffffff; margin: 0 0 10px 0; line-height: 1.4;">${escapeHtml(proj.title)}</h2>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.65; margin: 0;">${escapeHtml(proj.summary)}</p>
      </div>

      <!-- 核心架構與成果截圖展示 -->
      <div class="lab-images-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div class="image-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #fca5a5; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-sitemap" style="color: #ef4444;"></i> 核心流程架構截圖 (點擊放大)
          </div>
          <div style="height: 240px; background: #000; border-radius: 6px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            <img src="${proj.flowImage}" alt="${escapeHtml(proj.title)} 架構截圖" class="zoomable-img" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" />
          </div>
        </div>
        <div class="image-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #fca5a5; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-chart-line" style="color: #ef4444;"></i> 執行結果 / 成果展示 (點擊放大)
          </div>
          <div style="height: 240px; background: #000; border-radius: 6px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            <img src="${proj.resultImage}" alt="${escapeHtml(proj.title)} 成果截圖" class="zoomable-img" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" />
          </div>
        </div>
      </div>

      <!-- 專題投影片全覽播放器 -->
      <div class="slide-deck-viewer">
        <div class="slide-deck-header">
          <div class="slide-deck-title">
            <i class="fa-solid fa-file-powerpoint" style="color: #ef4444;"></i> 本專題所有投影片全覽播放器 (共 ${totalSlides} 頁)
          </div>
          <div class="slide-deck-counter" id="deckCounter">第 1 / ${totalSlides} 頁</div>
        </div>
        <div class="slide-deck-screen">
          <img src="${slides[0] || ''}" alt="投影片全覽" class="slide-deck-img zoomable-img" id="deckMainImg" />
          <button class="slide-deck-nav-btn prev" id="deckPrevBtn" aria-label="上一頁"><i class="fa-solid fa-chevron-left"></i></button>
          <button class="slide-deck-nav-btn next" id="deckNextBtn" aria-label="下一頁"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="slide-deck-footer">
          <span><i class="fa-solid fa-circle-info"></i> 可直接點擊縮圖快速跳頁，或點擊大圖全螢幕放大預覽。</span>
        </div>
        <div class="slide-deck-thumbnails" id="deckThumbs">
          ${thumbsHtml}
        </div>
      </div>

      <!-- 學習目標區 -->
      <div class="section-box" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 18px; margin-bottom: 22px;">
        <h3 style="color: #ffffff; font-size: 1.05rem; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-bullseye" style="color: #ef4444;"></i> 本專題核心學習目標
        </h3>
        <div style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.7; white-space: pre-line;">${escapeHtml(proj.objective)}</div>
      </div>

      <!-- 詳細操作步驟 -->
      <div class="section-box" style="margin-bottom: 24px;">
        <h3 style="color: #ffffff; font-size: 1.05rem; margin: 0 0 14px 0; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-list-check" style="color: #ef4444;"></i> 詳細實作步驟引導
        </h3>
        <div class="steps-container">${stepsHtml}</div>
      </div>

      <!-- SCADA 三大情境實務應用 -->
      <div class="section-box" style="margin-bottom: 24px;">
        <h3 style="color: #ffffff; font-size: 1.05rem; margin: 0 0 14px 0; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-industry" style="color: #ef4444;"></i> SCADA 工業自動化實務應用場景
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
          ${appsHtml}
        </div>
      </div>

      <!-- AI 提示詞 -->
      <div class="section-box" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 18px; margin-bottom: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h3 style="color: #fca5a5; font-size: 0.98rem; margin: 0; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-wand-magic-sparkles" style="color: #ef4444;"></i> LLM 生成式 AI 協作提示詞 (可直接貼入 ChatGPT/Gemini)
          </h3>
          <button class="btn-copy-prompt" id="btnCopyPrompt" style="background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.4); color: #fca5a5; font-size: 0.78rem; padding: 4px 10px; border-radius: 4px; cursor: pointer; transition: all 0.2s;">
            <i class="fa-regular fa-copy"></i> 複製提示詞
          </button>
        </div>
        <pre style="background: #090d16; padding: 12px; border-radius: 6px; color: #e2e8f0; font-size: 0.85rem; font-family: 'Fira Code', monospace; white-space: pre-wrap; line-height: 1.6; margin: 0;">${escapeHtml(proj.aiPrompt)}</pre>
      </div>

      <!-- Node-RED Flow 程式碼 -->
      <div class="section-box" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 18px; margin-bottom: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h3 style="color: #ffffff; font-size: 0.98rem; margin: 0; display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-code" style="color: #ef4444;"></i> Node-RED 標準 Flow JSON 程式碼
          </h3>
          <button class="btn-copy-json" id="btnCopyJson" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); color: #ffffff; font-size: 0.78rem; padding: 4px 10px; border-radius: 4px; cursor: pointer; transition: all 0.2s;">
            <i class="fa-regular fa-copy"></i> 複製 JSON
          </button>
        </div>
        <pre style="background: #090d16; padding: 12px; border-radius: 6px; color: #38bdf8; font-size: 0.82rem; font-family: 'Fira Code', monospace; max-height: 280px; overflow-y: auto; margin: 0;"><code>${escapeHtml(jsonString)}</code></pre>
      </div>

      <!-- 參考資源 -->
      <div class="section-box" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 18px;">
        <h3 style="color: #ffffff; font-size: 0.98rem; margin: 0 0 10px 0; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-book-bookmark" style="color: #ef4444;"></i> 官方手冊與參考學習資源
        </h3>
        <ul style="margin: 0; padding-left: 20px; list-style-type: square;">${refsHtml}</ul>
      </div>
    `;

    // 綁定投影片輪播器控制
    setupSlideDeck(slides);

    // 綁定複製事件
    const btnCopyPrompt = document.getElementById('btnCopyPrompt');
    if (btnCopyPrompt) {
      btnCopyPrompt.addEventListener('click', () => {
        navigator.clipboard.writeText(proj.aiPrompt).then(() => {
          showToast('已複製 AI 提示詞至剪貼簿！');
        });
      });
    }

    const btnCopyJson = document.getElementById('btnCopyJson');
    if (btnCopyJson) {
      btnCopyJson.addEventListener('click', () => {
        navigator.clipboard.writeText(jsonString).then(() => {
          showToast('已複製 Node-RED JSON 程式碼！');
        });
      });
    }

    // 綁定所有 zoomable-img 的 Lightbox 放大事件
    document.querySelectorAll('.zoomable-img').forEach(img => {
      img.addEventListener('click', function() {
        openLightbox(this.src, this.alt);
      });
    });
  }

  // 設定投影片播放器
  function setupSlideDeck(slides) {
    if (!slides || slides.length === 0) return;

    const deckMainImg = document.getElementById('deckMainImg');
    const deckCounter = document.getElementById('deckCounter');
    const deckPrevBtn = document.getElementById('deckPrevBtn');
    const deckNextBtn = document.getElementById('deckNextBtn');
    const deckThumbs = document.querySelectorAll('.slide-thumb');

    function updateDeck(idx) {
      if (idx < 0) idx = slides.length - 1;
      if (idx >= slides.length) idx = 0;
      currentDeckIndex = idx;

      deckMainImg.style.opacity = 0;
      setTimeout(() => {
        deckMainImg.src = slides[idx];
        deckMainImg.alt = `投影片第 ${idx + 1} 頁`;
        deckCounter.textContent = `第 ${idx + 1} / ${slides.length} 頁`;
        deckThumbs.forEach((th, tIdx) => {
          th.classList.toggle('active', tIdx === idx);
          if (tIdx === idx) {
            th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        });
        deckMainImg.style.opacity = 1;
      }, 120);
    }

    if (deckPrevBtn) deckPrevBtn.addEventListener('click', () => updateDeck(currentDeckIndex - 1));
    if (deckNextBtn) deckNextBtn.addEventListener('click', () => updateDeck(currentDeckIndex + 1));

    deckThumbs.forEach(th => {
      th.addEventListener('click', function() {
        updateDeck(parseInt(this.dataset.index, 10));
      });
    });
  }

  // Lightbox Modal
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  function openLightbox(src, caption) {
    if (!modal) return;
    modal.style.display = 'flex';
    modalImg.src = src;
    modalCaption.textContent = caption || '投影片照片放大預覽';
  }

  if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target === closeBtn) modal.style.display = 'none';
    });
  }

  // Toast 提示
  function showToast(msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #22c55e;"></i> ${escapeHtml(msg)}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  // 初始化啟動
  loadData();
});
