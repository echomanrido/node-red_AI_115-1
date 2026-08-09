document.addEventListener('DOMContentLoaded', () => {
  let supplementsData = [];
  let currentSupId = null;

  // DOM Elements
  const labListEl = document.getElementById('labList');
  const contentBodyEl = document.getElementById('contentBody');
  const searchInput = document.getElementById('searchInput');
  const labCountBadge = document.getElementById('labCountBadge');
  const breadcrumbActiveName = document.querySelector('.active-lab-name');
  
  // Sidebar Mobile Toggle
  const sidebar = document.getElementById('sidebar');
  const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  
  // Lightbox Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (sidebarOpenBtn) {
    sidebarOpenBtn.addEventListener('click', () => sidebar.classList.add('open'));
  }
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', () => sidebar.classList.remove('open'));
  }

  // 載入補充教材資料 (優先 fetch supplements.json，若 file:// 失敗則使用 window.INITIAL_SUPPLEMENTS_DATA 備援)
  function loadData() {
    fetch('supplements.json')
      .then(res => {
        if (!res.ok) throw new Error('HTTP error ' + res.status);
        return res.json();
      })
      .then(data => {
        initApp(data);
      })
      .catch(err => {
        console.warn('fetch supplements.json 失敗，改用本機備援資料 INITIAL_SUPPLEMENTS_DATA:', err);
        if (window.INITIAL_SUPPLEMENTS_DATA && window.INITIAL_SUPPLEMENTS_DATA.length > 0) {
          initApp(window.INITIAL_SUPPLEMENTS_DATA);
        } else {
          contentBodyEl.innerHTML = `
            <div class="section-card" style="text-align:center; padding: 40px;">
              <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: var(--accent-red); margin-bottom: 16px;"></i>
              <h2>載入補充教材失敗</h2>
              <p style="color: var(--text-muted); margin-top: 8px;">請確認 supplements.json 檔案是否存在且格式正確。</p>
            </div>
          `;
        }
      });
  }

  function initApp(data) {
    supplementsData = data;
    labCountBadge.textContent = supplementsData.length;
    renderSidebar(supplementsData);
    
    // 預設選取第一個項目
    if (supplementsData.length > 0) {
      selectSupplement(supplementsData[0].id);
    }
  }

  loadData();

  // 搜尋功能
  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = supplementsData.filter(sup => 
      sup.title.toLowerCase().includes(keyword) || 
      sup.summary.toLowerCase().includes(keyword) ||
      sup.category.toLowerCase().includes(keyword)
    );
    renderSidebar(filtered);
  });

  // 渲染側邊欄選單
  function renderSidebar(sups) {
    labListEl.innerHTML = '';
    if (sups.length === 0) {
      labListEl.innerHTML = '<div style="padding: 12px; color: var(--text-dim); font-size: 0.85rem; text-align: center;">查無相關補充教材</div>';
      return;
    }

    sups.forEach(sup => {
      const item = document.createElement('a');
      item.className = `lab-item ${sup.id === currentSupId ? 'active' : ''}`;
      item.dataset.id = sup.id;
      item.innerHTML = `
        <div class="lab-badge" style="background: var(--primary-alpha); color: var(--primary); border-color: rgba(56,189,248,0.25);">${sup.supNumber}</div>
        <div class="lab-info">
          <div class="lab-title-text">${sup.title}</div>
          <div class="lab-meta-text">${sup.category} • ${sup.date}</div>
        </div>
      `;

      item.addEventListener('click', (e) => {
        e.preventDefault();
        selectSupplement(sup.id);
        if (window.innerWidth <= 900) {
          sidebar.classList.remove('open');
        }
      });

      labListEl.appendChild(item);
    });
  }

  // 切換教材
  function selectSupplement(supId) {
    currentSupId = supId;
    const sup = supplementsData.find(item => item.id === supId);
    if (!sup) return;

    // 更新側邊欄 Active
    document.querySelectorAll('.lab-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === supId);
    });

    // 更新 Breadcrumb
    breadcrumbActiveName.textContent = sup.title;

    // 渲染主內容
    renderSupplementContent(sup);
  }

  // 渲染補充教材詳細內容
  function renderSupplementContent(sup) {
    const stepsHtml = sup.tutorialSteps.map(step => `
      <div class="step-card">
        <div class="step-header"><i class="fa-solid fa-circle-chevron-right" style="color: var(--primary); margin-right: 8px;"></i> ${escapeHtml(step.step)}</div>
        <div class="step-desc">${escapeHtml(step.description)}</div>
      </div>
    `).join('');

    const referencesHtml = sup.references ? sup.references.map(ref => `
      <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-item" style="border-left: 3px solid var(--primary); hover: { border-color: var(--primary); }">
        <i class="fa-solid fa-book-bookmark" style="color: var(--primary);"></i>
        <span>${escapeHtml(ref.title)}</span>
        <i class="fa-solid fa-arrow-up-right-from-square external-icon"></i>
      </a>
    `).join('') : '<p style="color:var(--text-dim);">無延伸連結</p>';

    contentBodyEl.innerHTML = `
      <!-- (1) Supplement Header -->
      <section class="lab-header-card" style="border-top: 4px solid var(--primary);">
        <div class="lab-tags">
          <span class="tag tag-cat" style="background: var(--primary-alpha); color: var(--primary);">${escapeHtml(sup.category)}</span>
          <span class="tag tag-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(sup.date)}</span>
        </div>
        <h2 class="lab-main-title">補充 ${sup.supNumber}: ${escapeHtml(sup.title)}</h2>
        <p class="lab-summary">${escapeHtml(sup.summary)}</p>
      </section>

      <!-- (2) 單張教材大圖展示 -->
      <section class="gallery-section" style="grid-template-columns: 1fr;">
        <div class="image-card">
          <div class="image-header" style="border-bottom: 1px solid rgba(56, 189, 248, 0.15);">
            <span class="image-title" style="color: var(--primary);"><i class="fa-solid fa-image"></i> 教材內容圖片</span>
            <span class="zoom-hint"><i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大</span>
          </div>
          <div class="image-wrapper" id="supImgWrapper" style="cursor: zoom-in; max-height: 480px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #000;">
            <img src="${sup.image}" alt="教材截圖" style="width: 100%; height: auto; object-fit: contain;" onerror="this.src='https://via.placeholder.com/800x400?text=Image+Not+Found'">
          </div>
        </div>
      </section>

      <!-- (3) 學習目標 -->
      <section class="section-card">
        <h3 class="section-title" style="border-bottom: 2px solid var(--primary-alpha);"><i class="fa-solid fa-bullseye" style="color: var(--primary);"></i> 學習目標</h3>
        <ul class="objective-list">
          ${sup.objective.split('\n').map(obj => obj.trim() ? `<li class="objective-item"><i class="fa-solid fa-circle-check" style="color: var(--primary);"></i> <span>${escapeHtml(obj)}</span></li>` : '').join('')}
        </ul>
      </section>

      <!-- (4) 詳細說明與操作步驟 -->
      <section class="section-card">
        <h3 class="section-title" style="border-bottom: 2px solid var(--primary-alpha);"><i class="fa-solid fa-list-check" style="color: var(--primary);"></i> 詳細說明與操作步驟</h3>
        <div class="tutorial-steps">
          ${stepsHtml}
        </div>
      </section>

      <!-- (5) 參考資源 -->
      <section class="section-card" style="margin-bottom: 40px;">
        <h3 class="section-title" style="border-bottom: 2px solid var(--primary-alpha);"><i class="fa-solid fa-link" style="color: var(--primary);"></i> 延伸參考連結</h3>
        <div class="references-list">
          ${referencesHtml}
        </div>
      </section>
    `;

    // 重新綁定 Lightbox 放大事件
    document.getElementById('supImgWrapper').addEventListener('click', () => {
      openLightbox(sup.image, `補充 ${sup.supNumber}: ${sup.title}`);
    });
  }

  // Lightbox 放大邏輯
  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxCaption.textContent = alt;
    lightboxModal.style.display = 'flex';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightboxModal.style.display = 'none');
  }
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target === lightboxClose) {
        lightboxModal.style.display = 'none';
      }
    });
  }

  // HTML 轉義防 XSS
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
