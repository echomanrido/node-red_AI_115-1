document.addEventListener('DOMContentLoaded', () => {
  let csharpData = [];
  let currentLabId = null;

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

  // 載入 C# 課程資料 (優先 fetch csharp.json，若本地 file:// 則使用 window.INITIAL_CSHARP_DATA 備援)
  function loadData() {
    fetch('csharp.json')
      .then(res => {
        if (!res.ok) throw new Error('HTTP error ' + res.status);
        return res.json();
      })
      .then(data => {
        initApp(data);
      })
      .catch(err => {
        console.warn('fetch csharp.json 失敗，改用本機備援資料 INITIAL_CSHARP_DATA:', err);
        const fallback = window.INITIAL_CSHARP_DATA || window.csharpData;
        if (fallback && fallback.length > 0) {
          initApp(fallback);
        } else {
          contentBodyEl.innerHTML = `
            <div class="section-card" style="text-align:center; padding: 40px;">
              <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: var(--accent-red); margin-bottom: 16px;"></i>
              <h2>載入 C# 課程資料失敗</h2>
              <p style="color: var(--text-muted); margin-top: 8px;">請確認 csharp.json 檔案是否存在且格式正確。</p>
            </div>
          `;
        }
      });
  }

  function initApp(data) {
    csharpData = data;
    if (labCountBadge) labCountBadge.textContent = csharpData.length;
    renderSidebar(csharpData);
    
    // 支援 URL 參數 ?lab=csharp-01 導向
    const urlParams = new URLSearchParams(window.location.search);
    const targetLab = urlParams.get('lab');
    if (targetLab && csharpData.some(l => l.id === targetLab)) {
      selectLab(targetLab);
    } else if (csharpData.length > 0) {
      selectLab(csharpData[0].id);
    }
  }

  loadData();

  // 搜尋過濾功能
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase().trim();
      const filtered = csharpData.filter(lab => 
        lab.title.toLowerCase().includes(keyword) || 
        lab.summary.toLowerCase().includes(keyword) ||
        lab.category.toLowerCase().includes(keyword) ||
        (lab.csharpCode && lab.csharpCode.toLowerCase().includes(keyword))
      );
      renderSidebar(filtered);
    });
  }

  // 渲染側邊欄選單
  function renderSidebar(labs) {
    labListEl.innerHTML = '';
    if (labs.length === 0) {
      labListEl.innerHTML = '<div style="padding: 12px; color: var(--text-dim); font-size: 0.85rem; text-align: center;">查無相關 C# 課程</div>';
      return;
    }

    labs.forEach(lab => {
      const item = document.createElement('a');
      item.className = `lab-item ${lab.id === currentLabId ? 'active' : ''}`;
      item.dataset.id = lab.id;
      item.href = `#${lab.id}`;
      item.innerHTML = `
        <div class="lab-badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border-color: rgba(168, 85, 247, 0.35);">${lab.labNumber}</div>
        <div class="lab-info">
          <div class="lab-title-text">${escapeHtml(lab.title)}</div>
          <div class="lab-meta-text">${escapeHtml(lab.category)} • ${escapeHtml(lab.date)}</div>
        </div>
      `;

      item.addEventListener('click', (e) => {
        e.preventDefault();
        selectLab(lab.id);
        if (window.innerWidth <= 900) {
          sidebar.classList.remove('open');
        }
      });

      labListEl.appendChild(item);
    });
  }

  // 切換與呈現指定的 Lab
  function selectLab(labId) {
    currentLabId = labId;
    const lab = csharpData.find(item => item.id === labId);
    if (!lab) return;

    // 更新側邊欄 Active 狀態
    document.querySelectorAll('.lab-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === labId);
    });

    // 更新 Breadcrumb
    if (breadcrumbActiveName) {
      breadcrumbActiveName.textContent = `Lab ${lab.labNumber}: ${lab.title}`;
    }

    // 渲染主頁面
    renderLabContent(lab);

    // 滾動回頂端
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 動態渲染 Lab 詳細內容
  function renderLabContent(lab) {
    const stepsHtml = lab.tutorialSteps.map(step => `
      <div class="step-card">
        <div class="step-header" style="color: #c084fc;"><i class="fa-solid fa-angle-right"></i> ${escapeHtml(step.step)}</div>
        <div class="step-desc">${escapeHtml(step.description)}</div>
      </div>
    `).join('');

    const referencesHtml = lab.references ? lab.references.map(ref => `
      <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-item" style="border-left: 3px solid #a855f7;">
        <i class="fa-solid fa-code" style="color: #a855f7;"></i>
        <span>${escapeHtml(ref.title)}</span>
        <i class="fa-solid fa-arrow-up-right-from-square external-icon"></i>
      </a>
    `).join('') : '<p style="color:var(--text-dim);">無延伸連結</p>';
    
    const appsHtml = lab.applications ? lab.applications.map(app => `
      <div class="app-scenario-card" style="background: rgba(168, 85, 247, 0.05); border-color: rgba(168, 85, 247, 0.2);">
        <div class="app-scenario-header">
          <i class="${escapeHtml(app.icon || 'fa-solid fa-cubes')}" style="color: #c084fc;"></i>
          <span>${escapeHtml(app.scenario)}</span>
        </div>
        <div class="app-scenario-desc">${escapeHtml(app.description)}</div>
      </div>
    `).join('') : '<p style="color:var(--text-dim);">暫無實務情境應用</p>';

    contentBodyEl.innerHTML = `
      <!-- (1) Lab Header -->
      <section class="lab-header-card" style="border-top: 4px solid #a855f7;">
        <div class="lab-tags">
          <span class="tag tag-cat" style="background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4);">${escapeHtml(lab.category)}</span>
          <span class="tag tag-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(lab.date)}</span>
          <span class="tag" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);"><i class="fa-solid fa-microchip"></i> C# .NET 8 WinForms</span>
        </div>
        <h2 class="lab-main-title">Lab ${lab.labNumber}: ${escapeHtml(lab.title)}</h2>
        <p class="lab-summary">${escapeHtml(lab.summary)}</p>
      </section>

      <!-- (2) 架構圖 & 執行結果截圖 -->
      <section class="gallery-section">
        ${lab.flowImage ? `
        <div class="image-card">
          <div class="image-header">
            <span class="image-title" style="color: #c084fc;"><i class="fa-solid fa-diagram-project"></i> ${escapeHtml(lab.flowTitle || 'C# 系統架構 / 投影片說明')}</span>
            <span class="zoom-hint"><i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大</span>
          </div>
          <div class="image-wrapper" id="flowImgWrapper">
            <img src="${lab.flowImage}" alt="架構截圖" onerror="this.src='https://via.placeholder.com/600x300?text=Flow+Image+Not+Found'">
          </div>
        </div>
        ` : ''}

        ${lab.resultImage ? `
        <div class="image-card">
          <div class="image-header">
            <span class="image-title" style="color: #38bdf8;"><i class="fa-solid fa-window-maximize"></i> ${escapeHtml(lab.resultTitle || 'WinForms 人機介面 / 實體控制結果')}</span>
            <span class="zoom-hint"><i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大</span>
          </div>
          <div class="image-wrapper" id="resultImgWrapper">
            <img src="${lab.resultImage}" alt="執行結果截圖" onerror="this.src='https://via.placeholder.com/600x300?text=Result+Image+Not+Found'">
          </div>
        </div>
        ` : ''}
      </section>

      <!-- (3) Lab 學習目標 -->
      <section class="section-card">
        <h3 class="section-title" style="border-bottom: 2px solid rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-bullseye" style="color: #c084fc;"></i> Lab 學習目標</h3>
        <ul class="objective-list">
          ${lab.objective.split('\n').map(obj => obj.trim() ? `<li class="objective-item"><i class="fa-solid fa-circle-check" style="color: #c084fc;"></i> <span>${escapeHtml(obj)}</span></li>` : '').join('')}
        </ul>
      </section>

      <!-- (4) 教學步驟說明 -->
      <section class="section-card">
        <h3 class="section-title" style="border-bottom: 2px solid rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-list-check" style="color: #c084fc;"></i> 實作步驟與程式邏輯解析</h3>
        <div class="steps-timeline">
          ${stepsHtml}
        </div>
      </section>

      <!-- (5) C# 原始程式碼展示與一鍵複製 -->
      ${lab.csharpCode ? `
      <section class="section-card">
        <div class="code-box-header" style="border-bottom: 2px solid rgba(168, 85, 247, 0.3); padding-bottom: 8px;">
          <h3 class="section-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;"><i class="fa-brands fa-microsoft" style="color: #a855f7;"></i> C# 核心原始碼 (Form1.cs / Service)</h3>
          <button class="copy-btn" id="copyCodeBtn" style="background: rgba(168, 85, 247, 0.15); border-color: rgba(168, 85, 247, 0.4); color: #c084fc;">
            <i class="fa-regular fa-copy"></i> 複製 C# 程式碼
          </button>
        </div>
        <pre class="code-content" id="csharpCodeBlock" style="color: #d8b4fe; background: #0b0f19; border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 8px; padding: 16px; font-family: 'Fira Code', monospace; font-size: 0.85rem; line-height: 1.6; max-height: 480px; overflow-y: auto;"><code>${escapeHtml(lab.csharpCode)}</code></pre>
      </section>
      ` : ''}

      <!-- (6) AI 提示詞 (LLM Prompt) -->
      ${lab.aiPrompt ? `
      <section class="section-card">
        <div class="code-box-header" style="border-bottom: 2px solid rgba(168, 85, 247, 0.3); padding-bottom: 8px;">
          <h3 class="section-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;"><i class="fa-solid fa-robot" style="color: #a855f7;"></i> AI 協同提示詞 (Copilot / ChatGPT / Gemini)</h3>
          <button class="copy-btn" id="copyPromptBtn" style="background: rgba(168, 85, 247, 0.15); border-color: rgba(168, 85, 247, 0.4); color: #c084fc;">
            <i class="fa-regular fa-copy"></i> 複製提示詞
          </button>
        </div>
        <div class="prompt-content" style="background: #090d16; border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 8px; color: #38bdf8;">${escapeHtml(lab.aiPrompt)}</div>
      </section>
      ` : ''}

      <!-- (7) SCADA 實務應用情境 -->
      <section class="section-card">
        <h3 class="section-title" style="border-bottom: 2px solid rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-industry" style="color: #c084fc;"></i> SCADA 工業 4.0 實務應用情境</h3>
        <div class="app-scenario-grid">
          ${appsHtml}
        </div>
      </section>

      <!-- (8) 參考資源 -->
      <section class="section-card" style="margin-bottom: 40px;">
        <h3 class="section-title" style="border-bottom: 2px solid rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-link" style="color: #c084fc;"></i> 延伸技術參考與手冊</h3>
        <div class="references-list">
          ${referencesHtml}
        </div>
      </section>
    `;

    // 綁定複製按鈕事件
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    if (copyCodeBtn && lab.csharpCode) {
      copyCodeBtn.addEventListener('click', () => {
        copyToClipboard(lab.csharpCode, '已成功複製 C# 程式碼至剪貼簿！');
      });
    }

    const copyPromptBtn = document.getElementById('copyPromptBtn');
    if (copyPromptBtn && lab.aiPrompt) {
      copyPromptBtn.addEventListener('click', () => {
        copyToClipboard(lab.aiPrompt, '已成功複製 AI 協同提示詞！');
      });
    }

    // 綁定圖片放大預覽事件
    const flowWrapper = document.getElementById('flowImgWrapper');
    if (flowWrapper) {
      flowWrapper.addEventListener('click', () => {
        openLightbox(lab.flowImage, lab.flowTitle || lab.title);
      });
    }

    const resultWrapper = document.getElementById('resultImgWrapper');
    if (resultWrapper) {
      resultWrapper.addEventListener('click', () => {
        openLightbox(lab.resultImage, lab.resultTitle || `${lab.title} 成果截圖`);
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

  // 吐司通知 (Toast)
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

  // HTML 字元轉義防 XSS
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
