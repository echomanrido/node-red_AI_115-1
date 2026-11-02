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

  // 載入 C# 補充教材資料
  function loadData() {
    fetch('csharpSupplements.json')
      .then(res => {
        if (!res.ok) throw new Error('HTTP error ' + res.status);
        return res.json();
      })
      .then(data => {
        initApp(data);
      })
      .catch(err => {
        console.warn('fetch csharpSupplements.json 失敗，改用本機備援資料 INITIAL_CSHARP_SUPPLEMENTS_DATA:', err);
        const fallback = window.INITIAL_CSHARP_SUPPLEMENTS_DATA || window.csharpSupplementsData;
        if (fallback && fallback.length > 0) {
          initApp(fallback);
        } else {
          contentBodyEl.innerHTML = `
            <div class="section-card" style="text-align:center; padding: 40px;">
              <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: var(--accent-red); margin-bottom: 16px;"></i>
              <h2>載入 C# 補充教材失敗</h2>
              <p style="color: var(--text-muted); margin-top: 8px;">請確認 csharpSupplements.json 檔案是否存在且格式正確。</p>
            </div>
          `;
        }
      });
  }

  function initApp(data) {
    supplementsData = data;
    if (labCountBadge) labCountBadge.textContent = supplementsData.length;
    renderSidebar(supplementsData);
    
    // 支援 URL 參數 ?sup=cs-sup-01 導向
    const urlParams = new URLSearchParams(window.location.search);
    const targetSup = urlParams.get('sup');
    if (targetSup && supplementsData.some(s => s.id === targetSup)) {
      selectSupplement(targetSup);
    } else if (supplementsData.length > 0) {
      selectSupplement(supplementsData[0].id);
    }
  }

  loadData();

  // 搜尋功能
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase().trim();
      const filtered = supplementsData.filter(sup => 
        sup.title.toLowerCase().includes(keyword) || 
        sup.summary.toLowerCase().includes(keyword) ||
        sup.category.toLowerCase().includes(keyword)
      );
      renderSidebar(filtered);
    });
  }

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
      item.href = `#${sup.id}`;
      const numStr = sup.supNumber || '';
      item.innerHTML = `
        <div class="lab-badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border-color: rgba(168, 85, 247, 0.35);">${numStr || '•'}</div>
        <div class="lab-info">
          <div class="lab-title-text">${escapeHtml(sup.title)}</div>
          <div class="lab-meta-text">${escapeHtml(sup.category)} • ${escapeHtml(sup.date)}</div>
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
    if (breadcrumbActiveName) {
      breadcrumbActiveName.textContent = sup.title;
    }

    // 渲染主內容
    renderSupplementContent(sup);

    // 滾動回頂端
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 格式化步驟說明（支援 Markdown 超連結並對重要連結提供顯著底色樣式）
  function formatStepDescription(text) {
    if (!text) return '';
    let formatted = escapeHtml(text);
    
    // 將轉義後的 Markdown 連結 [文字](網址) 轉為超連結
    formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, (match, title, url) => {
      const isCopilot = url.includes('github-copilot') || title.includes('GitHub Copilot');
      const isAntigravity = url.includes('antigravity') || title.includes('Antigravity');
      const isLocalPilot = url.includes('LocalPilotFSS') || title.includes('LocalPilot');
      if (isCopilot) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="copilot-highlight-pill" style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, rgba(56, 189, 248, 0.28) 0%, rgba(168, 85, 247, 0.35) 100%); color: #ffffff; border: 1.5px solid #38bdf8; padding: 3px 10px; border-radius: 6px; font-weight: 700; text-decoration: none; box-shadow: 0 0 14px rgba(56, 189, 248, 0.35); margin: 0 4px; vertical-align: middle; transition: all 0.2s ease;"><i class="fa-brands fa-github" style="color: #38bdf8; font-size: 1rem;"></i><span>${title}</span><i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem; color: #38bdf8;"></i></a>`;
      }
      if (isAntigravity) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="antigravity-highlight-pill" style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(56, 189, 248, 0.35) 100%); color: #ffffff; border: 1.5px solid #10b981; padding: 3px 10px; border-radius: 6px; font-weight: 700; text-decoration: none; box-shadow: 0 0 14px rgba(16, 185, 129, 0.35); margin: 0 4px; vertical-align: middle; transition: all 0.2s ease;"><i class="fa-solid fa-atom" style="color: #34d399; font-size: 1rem;"></i><span>${title}</span><i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem; color: #34d399;"></i></a>`;
      }
      if (isLocalPilot) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="localpilot-highlight-pill" style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, rgba(168, 85, 247, 0.32) 0%, rgba(99, 102, 241, 0.35) 100%); color: #ffffff; border: 1.5px solid #c084fc; padding: 3px 10px; border-radius: 6px; font-weight: 700; text-decoration: none; box-shadow: 0 0 14px rgba(168, 85, 247, 0.4); margin: 0 4px; vertical-align: middle; transition: all 0.2s ease;"><i class="fa-solid fa-bolt" style="color: #c084fc; font-size: 1rem;"></i><span>${title}</span><i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem; color: #c084fc;"></i></a>`;
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="step-inline-link" style="color: #38bdf8; text-decoration: underline; font-weight: 600; padding: 1px 4px; border-radius: 4px; background: rgba(56, 189, 248, 0.12);">${title} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i></a>`;
    });

    // 若純文字中直接有 (https://visualstudio.microsoft.com/zh-hant/github-copilot/)
    formatted = formatted.replace(/\(https:\/\/visualstudio\.microsoft\.com\/zh-hant\/github-copilot\/\)/g, 
      ` (<a href="https://visualstudio.microsoft.com/zh-hant/github-copilot/" target="_blank" rel="noopener noreferrer" class="copilot-highlight-pill" style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, rgba(56, 189, 248, 0.28) 0%, rgba(168, 85, 247, 0.35) 100%); color: #ffffff; border: 1.5px solid #38bdf8; padding: 3px 10px; border-radius: 6px; font-weight: 700; text-decoration: none; box-shadow: 0 0 14px rgba(56, 189, 248, 0.35); margin: 0 4px; vertical-align: middle;"><i class="fa-brands fa-github" style="color: #38bdf8; font-size: 1rem;"></i><span>Visual Studio 中的 GitHub Copilot 功能介紹</span><i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem; color: #38bdf8;"></i></a>)`
    );

    return formatted;
  }

  // 渲染補充教材詳細內容
  function renderSupplementContent(sup) {
    const numStr = sup.supNumber || '';
    const stepsHtml = sup.tutorialSteps.map(step => `
      <div class="step-card">
        <div class="step-header" style="color: #c084fc;"><i class="fa-solid fa-circle-chevron-right" style="color: #c084fc; margin-right: 8px;"></i> ${escapeHtml(step.step)}</div>
        <div class="step-desc" style="line-height: 1.7;">${formatStepDescription(step.description)}</div>
        ${step.image ? `
        <div class="step-image-box" style="margin-top: 14px; border: 1px solid rgba(168, 85, 247, 0.25); border-radius: 8px; overflow: hidden; background: #0b0f19; cursor: zoom-in;" onclick="window.openLightbox('${step.image}', '${escapeHtml(step.imageCaption || step.step)}')">
          <div style="padding: 6px 12px; background: rgba(168, 85, 247, 0.12); border-bottom: 1px solid rgba(168, 85, 247, 0.2); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; color: #d8b4fe; font-weight: 600;"><i class="fa-solid fa-camera" style="margin-right: 6px;"></i>${escapeHtml(step.imageCaption || step.step)}</span>
            <span style="font-size: 0.72rem; color: var(--text-dim);"><i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大</span>
          </div>
          <div style="padding: 10px; display: flex; justify-content: center; align-items: center; background: #000;">
            <img src="${step.image}" alt="${escapeHtml(step.imageCaption || step.step)}" style="max-width: 100%; max-height: 400px; height: auto; object-fit: contain; border-radius: 4px; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.01)'" onmouseout="this.style.transform='scale(1)'">
          </div>
        </div>
        ` : ''}
      </div>
    `).join('');

    const referencesHtml = sup.references ? sup.references.map(ref => {
      const isCopilot = ref.url.includes('github-copilot') || ref.title.includes('GitHub Copilot 功能介紹');
      const isAntigravity = ref.url.includes('antigravity') || ref.title.includes('Antigravity');
      const isLocalPilot = ref.url.includes('LocalPilotFSS') || ref.title.includes('LocalPilot');
      if (isCopilot) {
        return `
        <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-item ref-item-copilot-highlight" style="border-left: 4px solid #38bdf8; background: linear-gradient(90deg, rgba(56, 189, 248, 0.22) 0%, rgba(168, 85, 247, 0.28) 100%); border: 1.5px solid rgba(56, 189, 248, 0.55); box-shadow: 0 0 18px rgba(56, 189, 248, 0.25);">
          <i class="fa-brands fa-github" style="color: #38bdf8; font-size: 1.15rem;"></i>
          <span style="color: #ffffff; font-weight: 700; font-size: 0.95rem;">${escapeHtml(ref.title)}</span>
          <span style="margin-left: auto; margin-right: 8px; font-size: 0.72rem; padding: 3px 10px; border-radius: 6px; background: rgba(56, 189, 248, 0.3); color: #38bdf8; font-weight: 700; border: 1px solid rgba(56, 189, 248, 0.6); display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-star"></i> 官方重點推薦</span>
          <i class="fa-solid fa-arrow-up-right-from-square external-icon" style="color: #38bdf8;"></i>
        </a>
        `;
      }
      if (isAntigravity) {
        return `
        <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-item ref-item-antigravity-highlight" style="border-left: 4px solid #10b981; background: linear-gradient(90deg, rgba(16, 185, 129, 0.22) 0%, rgba(56, 189, 248, 0.25) 100%); border: 1.5px solid rgba(16, 185, 129, 0.55); box-shadow: 0 0 18px rgba(16, 185, 129, 0.25);">
          <i class="fa-solid fa-atom" style="color: #34d399; font-size: 1.15rem;"></i>
          <span style="color: #ffffff; font-weight: 700; font-size: 0.95rem;">${escapeHtml(ref.title)}</span>
          <span style="margin-left: auto; margin-right: 8px; font-size: 0.72rem; padding: 3px 10px; border-radius: 6px; background: rgba(16, 185, 129, 0.3); color: #6ee7b7; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.6); display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-wand-magic-sparkles"></i> 官方重點推薦</span>
          <i class="fa-solid fa-arrow-up-right-from-square external-icon" style="color: #34d399;"></i>
        </a>
        `;
      }
      if (isLocalPilot) {
        return `
        <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-item ref-item-localpilot-highlight" style="border-left: 4px solid #c084fc; background: linear-gradient(90deg, rgba(168, 85, 247, 0.25) 0%, rgba(99, 102, 241, 0.28) 100%); border: 1.5px solid rgba(168, 85, 247, 0.55); box-shadow: 0 0 18px rgba(168, 85, 247, 0.25);">
          <i class="fa-solid fa-bolt" style="color: #c084fc; font-size: 1.15rem;"></i>
          <span style="color: #ffffff; font-weight: 700; font-size: 0.95rem;">${escapeHtml(ref.title)}</span>
          <span style="margin-left: auto; margin-right: 8px; font-size: 0.72rem; padding: 3px 10px; border-radius: 6px; background: rgba(168, 85, 247, 0.3); color: #d8b4fe; font-weight: 700; border: 1px solid rgba(168, 85, 247, 0.6); display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-shield-halved"></i> 100% 離線隱私推薦</span>
          <i class="fa-solid fa-arrow-up-right-from-square external-icon" style="color: #c084fc;"></i>
        </a>
        `;
      }
      return `
      <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-item" style="border-left: 3px solid #a855f7;">
        <i class="fa-solid fa-book-bookmark" style="color: #a855f7;"></i>
        <span>${escapeHtml(ref.title)}</span>
        <i class="fa-solid fa-arrow-up-right-from-square external-icon"></i>
      </a>
      `;
    }).join('') : '<p style="color:var(--text-dim);">無延伸連結</p>';

    contentBodyEl.innerHTML = `
      <!-- (1) Supplement Header -->
      <section class="lab-header-card" style="border-top: 4px solid #a855f7;">
        <div class="lab-tags">
          <span class="tag tag-cat" style="background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4);">${escapeHtml(sup.category)}</span>
          <span class="tag tag-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(sup.date)}</span>
          <span class="tag" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);"><i class="fa-solid fa-code"></i> C# 工控知識庫</span>
        </div>
        <h2 class="lab-main-title">${numStr ? `C# 補充 ${numStr}: ` : ''}${escapeHtml(sup.title)}</h2>
        <p class="lab-summary">${escapeHtml(sup.summary)}</p>
      </section>

      <!-- (2) 教材圖片展示 -->
      ${sup.image ? `
      <section class="gallery-section" style="width: 100%; margin-bottom: 24px;">
        <div class="image-card">
          <div class="image-header" style="border-bottom: 1px solid rgba(168, 85, 247, 0.2); display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <span class="image-title" style="color: #c084fc; font-size: 0.85rem;"><i class="fa-solid fa-image"></i> ${escapeHtml(sup.imageTitle || 'C# 核心架構與概念圖表')}</span>
            <div style="display: flex; align-items: center; gap: 12px;">
              ${sup.imageLink ? `
              <a href="${sup.imageLink}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; font-size: 0.78rem; text-decoration: none; display: flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 4px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25);" onclick="event.stopPropagation();">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> 開啟官方文檔
              </a>
              ` : ''}
              <span class="zoom-hint" style="font-size: 0.75rem;"><i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大</span>
            </div>
          </div>
          <div class="image-wrapper sup-img-wrapper" id="supImgWrapper" style="cursor: zoom-in; max-height: 480px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #000; width: 100%;">
            <img src="${sup.image}" alt="教材截圖" style="width: 100%; height: auto; object-fit: contain;" onerror="this.src='https://via.placeholder.com/800x400?text=Image+Not+Found'">
          </div>
        </div>
      </section>
      ` : ''}

      <!-- (3) 學習目標 -->
      <section class="section-card">
        <h3 class="section-title" style="border-bottom: 2px solid rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-bullseye" style="color: #c084fc;"></i> 學習目標</h3>
        <ul class="objective-list">
          ${sup.objective.split('\n').map(obj => obj.trim() ? `<li class="objective-item"><i class="fa-solid fa-circle-check" style="color: #c084fc;"></i> <span>${escapeHtml(obj)}</span></li>` : '').join('')}
        </ul>
      </section>

      <!-- (4) 詳細說明與操作步驟 -->
      <section class="section-card">
        <h3 class="section-title" style="border-bottom: 2px solid rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-list-check" style="color: #c084fc;"></i> 詳細觀念說明與操作架構</h3>
        <div class="tutorial-steps">
          ${stepsHtml}
        </div>
      </section>

      <!-- (5) SCADA 實務應用情境 -->
      ${sup.applications && sup.applications.length > 0 ? `
      <section class="section-card">
        <h3 class="section-title" style="border-bottom: 2px solid rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-industry" style="color: #c084fc;"></i> SCADA 工業 4.0 實務應用情境</h3>
        <div class="applications-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 16px;">
          ${sup.applications.map(app => `
            <div class="app-card" style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; padding: 16px;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(168, 85, 247, 0.15); color: #c084fc; display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                  <i class="${app.icon || 'fa-solid fa-gear'}"></i>
                </div>
                <h4 style="font-size: 0.95rem; font-weight: 700; color: #fff; margin: 0;">${escapeHtml(app.scenario)}</h4>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin: 0;">${escapeHtml(app.description)}</p>
            </div>
          `).join('')}
        </div>
      </section>
      ` : ''}

      <!-- (6) AI 提示詞 -->
      ${sup.aiPrompt ? `
      <section class="section-card">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(168, 85, 247, 0.3); padding-bottom: 8px; margin-bottom: 12px;">
          <h3 class="section-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;"><i class="fa-solid fa-robot" style="color: #a855f7;"></i> AI 協同提示詞 (LLM Prompt)</h3>
          <button class="copy-btn" id="copyAiPromptBtn" style="background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.4); color: #c084fc; padding: 5px 12px; border-radius: 6px; font-size: 0.78rem; cursor: pointer; display: flex; align-items: center; gap: 6px; font-weight: 600;">
            <i class="fa-regular fa-copy"></i> 複製提示詞
          </button>
        </div>
        <pre style="background: #090d16; border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 8px; padding: 14px; color: #38bdf8; font-family: 'Fira Code', monospace; font-size: 0.8rem; white-space: pre-wrap; word-break: break-word; line-height: 1.6;">${escapeHtml(sup.aiPrompt)}</pre>
      </section>
      ` : ''}

      <!-- (7) 參考資源 -->
      <section class="section-card" style="margin-bottom: 40px;">
        <h3 class="section-title" style="border-bottom: 2px solid rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-link" style="color: #c084fc;"></i> 延伸技術參考與手冊</h3>
        <div class="references-list">
          ${referencesHtml}
        </div>
      </section>
    `;

    // 綁定 AI 提示詞複製按鈕
    const copyAiPromptBtn = document.getElementById('copyAiPromptBtn');
    if (copyAiPromptBtn && sup.aiPrompt) {
      copyAiPromptBtn.addEventListener('click', () => {
        copyToClipboard(sup.aiPrompt, '已成功複製 AI 提示詞！');
      });
    }

    // 綁定圖片放大
    const supImgWrapper = document.getElementById('supImgWrapper');
    if (supImgWrapper && sup.image) {
      supImgWrapper.addEventListener('click', () => {
        openLightbox(sup.image, sup.title);
      });
    }
  }

  // 複製文字至剪貼簿
  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(err => {
        fallbackCopyText(text, successMsg);
      });
    } else {
      fallbackCopyText(text, successMsg);
    }
  }

  function fallbackCopyText(text, successMsg) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (err) {
      alert('複製失敗，請手動複製');
    }
    document.body.removeChild(textArea);
  }

  // 吐司通知
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #c084fc;"></i> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Lightbox 放大預覽
  function openLightbox(src, caption) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightboxModal.style.display = 'flex';
  }
  window.openLightbox = openLightbox;

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.style.display = 'none';
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.style.display = 'none';
      }
    });
  }

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
