/**
 * Vibe Coding 專區前端控制器 (支援 Google 5-Day 群組與子群組手風琴)
 * 支援分類 Tab 篩選、關鍵字即時搜尋、子模組分頁導航、SVG 流程圖放大、投影片嵌入與代碼複製
 */
document.addEventListener('DOMContentLoaded', () => {
  let vibeData = [];
  let flatLabMap = new Map();
  let currentLabId = null;
  let currentCategory = 'all';

  // DOM 元素
  const vibeListEl = document.getElementById('vibeList');
  const contentBodyEl = document.getElementById('contentBody');
  const searchInput = document.getElementById('searchInput');
  const vibeCountBadge = document.getElementById('vibeCountBadge');
  const breadcrumbActiveName = document.querySelector('.active-lab-name');
  const categoryTabBtns = document.querySelectorAll('.vibe-tab-btn');

  // 行動端選單切換
  const sidebar = document.getElementById('sidebar');
  const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

  // Lightbox 元素
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const toastContainer = document.getElementById('toastContainer');

  if (sidebarOpenBtn) {
    sidebarOpenBtn.addEventListener('click', () => sidebar.classList.add('open'));
  }
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', () => sidebar.classList.remove('open'));
  }

  // Toast 提示函數
  function showToast(message, icon = 'fa-solid fa-circle-check') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.style.cssText = `
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid #38bdf8;
      box-shadow: 0 4px 20px rgba(56, 189, 248, 0.35);
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 0.88rem;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
      animation: fadeInToast 0.3s ease;
      z-index: 9999;
    `;
    toast.innerHTML = `<i class="${icon}" style="color: #38bdf8;"></i> <span>${escapeHtml(message)}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2400);
  }

  // 載入資料 (優先 fetch vibecoding.json，失敗時退回 window.INITIAL_VIBE_DATA)
  function loadData() {
    fetch('vibecoding.json')
      .then(res => {
        if (!res.ok) throw new Error('HTTP error ' + res.status);
        return res.json();
      })
      .then(data => {
        initApp(data);
      })
      .catch(err => {
        console.warn('fetch vibecoding.json 失敗，改用本機備援資料 INITIAL_VIBE_DATA:', err);
        const fallback = window.INITIAL_VIBE_DATA || [];
        if (fallback.length > 0) {
          initApp(fallback);
        } else {
          contentBodyEl.innerHTML = `
            <div class="section-card" style="text-align:center; padding: 50px;">
              <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #ef4444; margin-bottom: 16px;"></i>
              <h2>載入 Vibe Coding 資料失敗</h2>
              <p style="color: var(--text-muted); margin-top: 8px;">請確認 vibecoding.json 或 vibecodingData.js 檔案是否存在。</p>
            </div>
          `;
        }
      });
  }

  function initApp(data) {
    vibeData = data;
    buildFlatMap();

    // 解析 URL 參數 (例如 ?cat=軟體工程 或 ?id=vibe-google-d1)
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

    if (idParam && flatLabMap.has(idParam)) {
      selectLab(idParam);
    } else {
      const filtered = getFilteredList();
      if (filtered.length > 0) {
        selectLab(filtered[0].id);
      }
    }
  }

  // 建立扁平對照表
  function buildFlatMap() {
    flatLabMap.clear();
    vibeData.forEach(item => {
      flatLabMap.set(item.id, item);
      if (item.children && item.children.length > 0) {
        item.children.forEach(child => {
          flatLabMap.set(child.id, child);
        });
      }
    });
  }

  loadData();

  // 分類 Tab 點擊切換事件
  categoryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      applyFilter();

      // 若目前選取的 Lab 不在篩選結果中，自動選取篩選後的第一個
      const filtered = getFilteredList();
      if (filtered.length > 0) {
        const isCurrentInFiltered = filtered.some(d => {
          if (d.id === currentLabId) return true;
          if (d.children && d.children.some(c => c.id === currentLabId)) return true;
          return false;
        });
        if (!isCurrentInFiltered) {
          selectLab(filtered[0].id);
        }
      }
    });
  });

  // 搜尋過濾事件
  searchInput.addEventListener('input', () => {
    applyFilter();
  });

  // 取得當前篩選後的資料
  function getFilteredList() {
    const keyword = searchInput.value.toLowerCase().trim();
    return vibeData.filter(item => {
      const matchCat = (currentCategory === 'all') || (item.category === currentCategory);
      if (!matchCat) return false;

      if (!keyword) return true;

      // 檢查主項目
      const matchMain = item.title.toLowerCase().includes(keyword) || 
        item.summary.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        (item.objective && item.objective.toLowerCase().includes(keyword));

      // 若主項目有子項目，也檢查子項目
      let matchChild = false;
      if (item.children && item.children.length > 0) {
        matchChild = item.children.some(child => 
          child.title.toLowerCase().includes(keyword) || 
          child.summary.toLowerCase().includes(keyword)
        );
      }

      return matchMain || matchChild;
    });
  }

  function applyFilter() {
    const filtered = getFilteredList();
    // 計算總數 (包含子單元)
    let totalCount = 0;
    filtered.forEach(item => {
      if (item.children && item.children.length > 0) {
        totalCount += 1 + item.children.length;
      } else {
        totalCount += 1;
      }
    });
    vibeCountBadge.textContent = totalCount;
    renderSidebar(filtered);
  }

  // 渲染側邊欄選單 (支援群組手風琴與子單元縮排)
  function renderSidebar(items) {
    vibeListEl.innerHTML = '';
    if (items.length === 0) {
      vibeListEl.innerHTML = '<div style="padding: 16px; color: var(--text-dim); font-size: 0.85rem; text-align: center;">查無相關單元</div>';
      return;
    }

    let lastSubCategory = null;
    items.forEach(lab => {
      // 若該單元有指定子分類 (如「逆向工程」或「AI Coding 新時代的團隊開發」)，且與上一項目不同時渲染分組小標題 (類似 AI 工具的 ● 分組標題風格)
      if (lab.subCategory && lab.subCategory !== lastSubCategory) {
        const groupTitle = document.createElement('div');
        groupTitle.className = 'sidebar-group-title';
        groupTitle.textContent = lab.subCategory;
        vibeListEl.appendChild(groupTitle);
        lastSubCategory = lab.subCategory;
      } else if (!lab.subCategory) {
        lastSubCategory = null;
      }

      let catClass = 'tag-category-eng';
      if (lab.category.includes('Skills') || lab.category.includes('技能')) {
        catClass = 'tag-category-skills';
      } else if (lab.category.includes('AI知識') || lab.category.includes('常識')) {
        catClass = 'tag-category-aiknowledge';
      } else if (lab.category.includes('其他')) {
        catClass = 'tag-category-other';
      }

      // 判斷是否為含有子項目的群組 (如 Google 5-Day)
      if (lab.children && lab.children.length > 0) {
        const isChildActive = lab.children.some(c => c.id === currentLabId);
        const isSelfActive = lab.id === currentLabId;
        const isGroupOpen = isSelfActive || isChildActive;

        const groupWrapper = document.createElement('div');
        groupWrapper.className = `lab-group-wrapper ${isGroupOpen ? 'open' : ''}`;
        groupWrapper.dataset.groupId = lab.id;

        // 母群組按鈕列
        const headerEl = document.createElement('div');
        headerEl.className = `lab-item ${isSelfActive ? 'active' : ''}`;
        headerEl.style.cursor = 'pointer';
        headerEl.innerHTML = `
          <div class="lab-badge">${lab.labNumber}</div>
          <div class="lab-info" style="flex: 1;">
            <div class="lab-title-text" style="font-weight: 700;">${escapeHtml(lab.shortTitle || lab.title)}</div>
            <div class="lab-meta-text">
              <span class="tag ${catClass}" style="padding: 1px 6px; font-size: 0.68rem; border-radius: 4px; display: inline-block;">${escapeHtml(lab.category)}</span>
              • 5 個子模組
            </div>
          </div>
          <i class="fa-solid fa-chevron-down group-toggle-arrow"></i>
        `;

        headerEl.addEventListener('click', (e) => {
          e.preventDefault();
          // 若點擊時已在群組中，切換折疊狀態；否則展開並選取母項目總覽
          if (groupWrapper.classList.contains('open') && isSelfActive) {
            groupWrapper.classList.toggle('open');
          } else {
            groupWrapper.classList.add('open');
            selectLab(lab.id);
          }
        });

        // 子項目容器
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'group-children-list';

        lab.children.forEach(child => {
          const isThisChildActive = child.id === currentLabId;
          const childLink = document.createElement('a');
          childLink.className = `sub-lab-item ${isThisChildActive ? 'active' : ''}`;
          childLink.dataset.id = child.id;
          childLink.innerHTML = `
            <span class="sub-badge">${child.subNumber}</span>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(child.shortTitle || child.title)}</span>
          `;

          childLink.addEventListener('click', (e) => {
            e.preventDefault();
            selectLab(child.id);
            if (window.innerWidth <= 900) {
              sidebar.classList.remove('open');
            }
          });

          childrenContainer.appendChild(childLink);
        });

        groupWrapper.appendChild(headerEl);
        groupWrapper.appendChild(childrenContainer);
        vibeListEl.appendChild(groupWrapper);
      } else {
        // 普通單元項目
        const item = document.createElement('a');
        item.className = `lab-item ${lab.id === currentLabId ? 'active' : ''}`;
        item.dataset.id = lab.id;
        item.innerHTML = `
          <div class="lab-badge">${lab.labNumber}</div>
          <div class="lab-info">
            <div class="lab-title-text">${escapeHtml(lab.title)}</div>
            <div class="lab-meta-text">
              <span class="tag ${catClass}" style="padding: 1px 6px; font-size: 0.68rem; border-radius: 4px; display: inline-block;">${escapeHtml(lab.category)}</span>
              ${lab.subCategory ? `<span class="tag" style="padding: 1px 6px; font-size: 0.68rem; border-radius: 4px; display: inline-block; background: rgba(6,182,212,0.18); color: #22d3ee; border: 1px solid rgba(6,182,212,0.4);"><i class="fa-solid fa-code-compare" style="margin-right:2px;"></i>${escapeHtml(lab.subCategory)}</span>` : ''}
              • ${escapeHtml(lab.date)}
            </div>
          </div>
        `;

        item.addEventListener('click', (e) => {
          e.preventDefault();
          selectLab(lab.id);
          if (window.innerWidth <= 900) {
            sidebar.classList.remove('open');
          }
        });

        vibeListEl.appendChild(item);
      }
    });
  }

  // 切換選取指定單元 (支援母項目與子項目)
  function selectLab(labId) {
    currentLabId = labId;
    const lab = flatLabMap.get(labId);
    if (!lab) return;

    // 重新渲染側邊欄高亮狀態
    document.querySelectorAll('.lab-item').forEach(el => {
      const isParentActive = (lab.isGroup && el.dataset.id === labId) || (!lab.parentId && el.dataset.id === labId);
      el.classList.toggle('active', isParentActive);
    });
    document.querySelectorAll('.sub-lab-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === labId);
    });

    // 若選取的是子項目，確保其母群組展開
    if (lab.parentId) {
      const parentGroupEl = document.querySelector(`.lab-group-wrapper[data-group-id="${lab.parentId}"]`);
      if (parentGroupEl) parentGroupEl.classList.add('open');
    }

    // 更新頂部麵包屑
    if (breadcrumbActiveName) {
      if (lab.parentId) {
        const parent = flatLabMap.get(lab.parentId);
        breadcrumbActiveName.innerHTML = `<span>${escapeHtml(parent.shortTitle || parent.title)}</span> / <span style="color:#38bdf8;">${escapeHtml(lab.shortTitle || lab.title)}</span>`;
      } else {
        breadcrumbActiveName.textContent = lab.title;
      }
    }

    // 渲染主內容區
    renderLabContent(lab);

    // 平滑滾動至頂部
    const mainContent = document.querySelector('.main-content');
    if (mainContent) mainContent.scrollTop = 0;
  }

  // 渲染單元詳細內容 (支援 Google 5-Day 子模組分頁導覽列)
  function renderLabContent(lab) {
    let catClass = 'tag-category-eng';
    let catIcon = 'fa-solid fa-laptop-code';
    if (lab.category.includes('Skills') || lab.category.includes('技能')) {
      catClass = 'tag-category-skills';
      catIcon = 'fa-solid fa-puzzle-piece';
    } else if (lab.category.includes('AI知識') || lab.category.includes('常識')) {
      catClass = 'tag-category-aiknowledge';
      catIcon = 'fa-solid fa-brain';
    } else if (lab.category.includes('其他')) {
      catClass = 'tag-category-other';
      catIcon = 'fa-solid fa-cubes-stacked';
    }

    // 若屬於 Google 5-Day 群組 (母項目或其子項目)，產生子模組切換導覽列
    const isGoogleRelated = (lab.id === 'vibe-google-course') || (lab.parentId === 'vibe-google-course');
    let submoduleNavHtml = '';

    if (isGoogleRelated) {
      const parentLab = flatLabMap.get('vibe-google-course');
      const isOverviewActive = lab.id === 'vibe-google-course';

      const childTabsHtml = parentLab.children.map(child => {
        const isChildActive = child.id === lab.id;
        return `
          <button class="submodule-tab-link ${isChildActive ? 'active' : ''}" data-target-id="${child.id}">
            <span class="sub-badge" style="font-size:0.65rem;">${child.subNumber}</span>
            <span>${escapeHtml(child.shortTitle)}</span>
          </button>
        `;
      }).join('');

      submoduleNavHtml = `
        <div class="submodule-tabs-nav">
          <div class="submodule-nav-title">
            <i class="fa-brands fa-google"></i> Google 5-Day 子模組
          </div>
          <button class="submodule-tab-link ${isOverviewActive ? 'active' : ''}" data-target-id="vibe-google-course">
            <i class="fa-solid fa-list-check"></i> 課程總覽
          </button>
          ${childTabsHtml}
        </div>
      `;
    }

    // 實作步驟 HTML
    const stepsHtml = (lab.tutorialSteps || []).map(step => `
      <div class="step-card">
        <div class="step-header"><i class="fa-solid fa-angle-right"></i> ${escapeHtml(step.step)}</div>
        <div class="step-desc">${escapeHtml(step.description)}</div>
      </div>
    `).join('');

    // 延伸資源連結
    const referencesHtml = (lab.references || []).map(ref => `
      <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-item" style="border-color: rgba(56, 189, 248, 0.3); background: rgba(56, 189, 248, 0.05);">
        <i class="fa-solid fa-laptop-code" style="color: #38bdf8;"></i>
        <span>${escapeHtml(ref.title)}</span>
        <i class="fa-solid fa-arrow-up-right-from-square external-icon"></i>
      </a>
    `).join('');

    // 實務應用情境
    const appsHtml = (lab.applications || []).map(app => `
      <div class="app-scenario-card">
        <div class="app-scenario-header">
          <i class="${escapeHtml(app.icon || 'fa-solid fa-cubes')}"></i>
          <span>${escapeHtml(app.scenario)}</span>
        </div>
        <div class="app-scenario-desc">${escapeHtml(app.description)}</div>
      </div>
    `).join('');

    // 右側卡片：若是投影片/獨立 HTML，提供 iframe 嵌入與外部開啟按鈕
    const hasSlide = !!lab.slideUrl;
    const slideUrl = lab.slideUrl || '';

    contentBodyEl.innerHTML = `
      <!-- (1) 單元 Header 卡片 -->
      <section class="lab-header-card">
        <div class="lab-tags">
          <span class="tag ${catClass}"><i class="${catIcon}"></i> ${escapeHtml(lab.category)}</span>
          ${lab.subCategory ? `<span class="tag" style="background: rgba(6,182,212,0.18); color: #22d3ee; border: 1px solid rgba(6,182,212,0.4);"><i class="fa-solid fa-code-compare"></i> ${escapeHtml(lab.subCategory)}</span>` : ''}
          ${lab.parentId ? `<span class="tag" style="background: rgba(37,99,235,0.2); color:#60a5fa; border:1px solid rgba(96,165,250,0.4);"><i class="fa-brands fa-google"></i> Google 5-Day 子模組</span>` : ''}
          <span class="tag tag-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(lab.date)}</span>
        </div>
        <h2 class="lab-main-title">${lab.labNumber ? `單元 ${lab.labNumber}: ` : (lab.subNumber ? `子模組 ${lab.subNumber}: ` : '')}${escapeHtml(lab.title)}</h2>
        <p class="lab-summary">${escapeHtml(lab.summary)}</p>
      </section>

      <!-- (1.5) Google 5-Day 子模組快捷切換列 (若屬於此系列) -->
      ${submoduleNavHtml}

      <!-- (2) 雙欄卡片展演區 (仿照片 Flow 截圖與 Debug 結果設計！) -->
      <section class="gallery-section">
        <!-- 左卡片: 核心架構流程圖 / 思維模型 -->
        <div class="image-card">
          <div class="image-header">
            <span class="image-title"><i class="fa-solid fa-diagram-project"></i> ${escapeHtml(lab.flowTitle || '核心架構流程圖 / 思維模型')}</span>
            <span class="zoom-hint" id="flowZoomBtn" style="cursor: pointer;"><i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大</span>
          </div>
          <div class="image-wrapper" id="flowImgWrapper" style="cursor: pointer;">
            <img src="${lab.flowImage}" alt="架構流程圖" id="flowImgElement">
          </div>
        </div>

        <!-- 右卡片: 投影片簡報 / 實戰互動視窗 -->
        <div class="image-card">
          <div class="image-header">
            <span class="image-title"><i class="fa-solid fa-chalkboard-user"></i> ${escapeHtml(lab.resultTitle || '互動投影片 / 實戰成果即時視窗')}</span>
            ${hasSlide ? `
              <a href="${slideUrl}" target="_blank" rel="noopener noreferrer" class="btn-open-external" title="另開獨立視窗瀏覽">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> 獨立全螢幕開啟
              </a>
            ` : `<span class="zoom-hint"><i class="fa-solid fa-circle-check"></i> 即時狀態</span>`}
          </div>
          <div class="image-wrapper" style="padding: 0; overflow: hidden; background: #0b1522;">
            ${hasSlide ? `
              <iframe src="${slideUrl}" class="slide-iframe-container" title="簡報投影片即時預覽" loading="lazy"></iframe>
            ` : `
              <div style="height: 290px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); gap: 12px; padding: 20px; text-align: center;">
                <i class="fa-solid fa-laptop-code" style="font-size: 3rem; color: #38bdf8; opacity: 0.7;"></i>
                <div style="font-size: 1rem; font-weight: 600; color: #ffffff;">${escapeHtml(lab.title)}</div>
                <div style="font-size: 0.85rem; max-width: 400px;">本單元包含完整架構定義與規格工件，可點擊下方規格代碼直接複製使用。</div>
              </div>
            `}
          </div>
        </div>
      </section>

      <!-- (3) 單元學習目標 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-bullseye"></i> 單元學習目標</h3>
        <ul class="objective-list">
          ${lab.objective.split('\n').map(obj => obj.trim() ? `<li class="objective-item"><i class="fa-solid fa-circle-check" style="color: #38bdf8;"></i> <span>${escapeHtml(obj)}</span></li>` : '').join('')}
        </ul>
      </section>

      <!-- (4) 核心步驟與階段拆解 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-list-check"></i> 核心實踐步驟與架構拆解</h3>
        <div class="steps-timeline">
          ${stepsHtml}
        </div>
      </section>

      <!-- (5) AI Agent 提示詞實務 (LLM Prompt) -->
      ${lab.promptTemplate ? `
      <section class="section-card prompt-card">
        <div class="prompt-header">
          <h3 class="section-title" style="margin-bottom: 0;"><i class="fa-solid fa-robot"></i> AI Agent 協作提示詞 (Prompt Template)</h3>
          <button class="copy-btn" id="copyPromptBtn">
            <i class="fa-regular fa-copy"></i> 複製提示詞
          </button>
        </div>
        <p class="prompt-subtext">可直接將此 Prompt 複製貼給 Claude / Gemini / ChatGPT，驅動 AI 進行高階系統架構設計與規格編寫：</p>
        <pre class="prompt-box"><code id="promptCodeText">${escapeHtml(lab.promptTemplate)}</code></pre>
      </section>
      ` : ''}

      <!-- (6) 規格文件與程式範例 (Spec / Code) -->
      ${lab.codeSnippet ? `
      <section class="section-card code-card">
        <div class="code-header">
          <h3 class="section-title" style="margin-bottom: 0;"><i class="fa-solid fa-code"></i> 工件規格與程式範例 (${escapeHtml(lab.codeSnippet.language || 'markdown')})</h3>
          <button class="copy-btn" id="copyCodeBtn">
            <i class="fa-regular fa-copy"></i> 複製內容
          </button>
        </div>
        <div class="code-box">
          <pre><code id="codeSnippetText">${escapeHtml(lab.codeSnippet.code)}</code></pre>
        </div>
      </section>
      ` : ''}

      <!-- (7) 延伸資源與投影片入口 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-book-bookmark"></i> 延伸學習資源與專案入口</h3>
        <div class="ref-links-container" style="display: flex; flex-direction: column; gap: 10px;">
          ${referencesHtml}
        </div>
      </section>

      <!-- (8) 工業情境實務應用 -->
      ${lab.applications && lab.applications.length > 0 ? `
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-cubes"></i> 實務情境應用 (Industrial Applications)</h3>
        <div class="app-scenarios-grid">
          ${appsHtml}
        </div>
      </section>
      ` : ''}
    `;

    // 綁定子模組切換按鈕事件
    document.querySelectorAll('.submodule-tab-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.targetId;
        if (targetId) selectLab(targetId);
      });
    });

    // 綁定複製按鈕事件
    const copyPromptBtn = document.getElementById('copyPromptBtn');
    if (copyPromptBtn && lab.promptTemplate) {
      copyPromptBtn.addEventListener('click', () => {
        copyToClipboard(lab.promptTemplate, copyPromptBtn, '提示詞已成功複製！');
      });
    }

    const copyCodeBtn = document.getElementById('copyCodeBtn');
    if (copyCodeBtn && lab.codeSnippet) {
      copyCodeBtn.addEventListener('click', () => {
        copyToClipboard(lab.codeSnippet.code, copyCodeBtn, '程式碼規格已成功複製！');
      });
    }

    // 綁定 Lightbox 放大圖片事件
    const flowImgWrapper = document.getElementById('flowImgWrapper');
    const flowZoomBtn = document.getElementById('flowZoomBtn');
    const openLightbox = () => {
      lightboxImg.src = lab.flowImage;
      lightboxCaption.textContent = `${lab.title} - ${lab.flowTitle || '架構流程圖'}`;
      lightboxModal.classList.add('show');
    };

    if (flowImgWrapper) flowImgWrapper.addEventListener('click', openLightbox);
    if (flowZoomBtn) flowZoomBtn.addEventListener('click', openLightbox);
  }

  // 複製到剪貼簿功能
  function copyToClipboard(text, btnElement, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        handleCopySuccess(btnElement, successMsg);
      }).catch(err => {
        fallbackCopyTextToClipboard(text, btnElement, successMsg);
      });
    } else {
      fallbackCopyTextToClipboard(text, btnElement, successMsg);
    }
  }

  function fallbackCopyTextToClipboard(text, btnElement, successMsg) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      handleCopySuccess(btnElement, successMsg);
    } catch (err) {
      alert("複製失敗，請手動複製！");
    }
    document.body.removeChild(textArea);
  }

  function handleCopySuccess(btnElement, successMsg) {
    const originalText = btnElement.innerHTML;
    btnElement.innerHTML = `<i class="fa-solid fa-check"></i> 已複製！`;
    btnElement.classList.add('copy-success-pulse');
    showToast(successMsg);
    setTimeout(() => {
      btnElement.innerHTML = originalText;
      btnElement.classList.remove('copy-success-pulse');
    }, 2000);
  }

  // 關閉 Lightbox 模態框
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightboxModal.classList.remove('show'));
  }
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('show');
      }
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('show')) {
      lightboxModal.classList.remove('show');
    }
  });

  // 工具函式：HTML 跳脫防護
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
