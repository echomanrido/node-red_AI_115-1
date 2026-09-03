document.addEventListener('DOMContentLoaded', () => {
  let labsData = [];
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

  // 載入 Lab 資料 (優先 fetch labs.json，若 file:// 或 network 失敗則使用 window.INITIAL_LABS_DATA 備援)
  function loadData() {
    fetch('labs.json')
      .then(res => {
        if (!res.ok) throw new Error('HTTP error ' + res.status);
        return res.json();
      })
      .then(data => {
        initApp(data);
      })
      .catch(err => {
        console.warn('fetch labs.json 失敗，改用本機備援資料 INITIAL_LABS_DATA:', err);
        if (window.INITIAL_LABS_DATA && window.INITIAL_LABS_DATA.length > 0) {
          initApp(window.INITIAL_LABS_DATA);
        } else {
          contentBodyEl.innerHTML = `
            <div class="section-card" style="text-align:center; padding: 40px;">
              <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: var(--accent-red); margin-bottom: 16px;"></i>
              <h2>載入 Lab 資料失敗</h2>
              <p style="color: var(--text-muted); margin-top: 8px;">請確認 labs.json 檔案是否存在且格式正確。</p>
            </div>
          `;
        }
      });
  }

  function initApp(data) {
    labsData = data;
    labCountBadge.textContent = labsData.length;
    renderSidebar(labsData);
    
    // 預設選取第一個 Lab
    if (labsData.length > 0) {
      selectLab(labsData[0].id);
    }
  }

  loadData();

  // 搜尋過濾功能
  searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = labsData.filter(lab => 
      lab.title.toLowerCase().includes(keyword) || 
      lab.summary.toLowerCase().includes(keyword) ||
      lab.category.toLowerCase().includes(keyword)
    );
    renderSidebar(filtered);
  });

  // 渲染側邊欄選單
  function renderSidebar(labs) {
    labListEl.innerHTML = '';
    if (labs.length === 0) {
      labListEl.innerHTML = '<div style="padding: 12px; color: var(--text-dim); font-size: 0.85rem; text-align: center;">查無相關 Lab</div>';
      return;
    }

    labs.forEach(lab => {
      const item = document.createElement('a');
      item.className = `lab-item ${lab.id === currentLabId ? 'active' : ''}`;
      item.dataset.id = lab.id;
      item.innerHTML = `
        <div class="lab-badge">${lab.labNumber}</div>
        <div class="lab-info">
          <div class="lab-title-text">${lab.title}</div>
          <div class="lab-meta-text">${lab.category} • ${lab.date}</div>
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
    const lab = labsData.find(item => item.id === labId);
    if (!lab) return;

    // 更新側邊欄 Active 狀態
    document.querySelectorAll('.lab-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === labId);
    });

    // 更新 Breadcrumb
    breadcrumbActiveName.textContent = lab.title;

    // 渲染主頁面
    renderLabContent(lab);
  }

  // 動態渲染 Lab 詳細內容
  function renderLabContent(lab) {
    const jsonString = typeof lab.nodeRedJson === 'string' 
      ? lab.nodeRedJson 
      : JSON.stringify(lab.nodeRedJson, null, 2);

    const stepsHtml = lab.tutorialSteps.map(step => `
      <div class="step-card">
        <div class="step-header"><i class="fa-solid fa-angle-right"></i> ${escapeHtml(step.step)}</div>
        <div class="step-desc">${escapeHtml(step.description)}</div>
      </div>
    `).join('');

    const referencesHtml = lab.references ? lab.references.map(ref => `
      <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-item">
        <i class="fa-solid fa-book-bookmark"></i>
        <span>${escapeHtml(ref.title)}</span>
        <i class="fa-solid fa-arrow-up-right-from-square external-icon"></i>
      </a>
    `).join('') : '<p style="color:var(--text-dim);">無延伸連結</p>';
    
    const appsHtml = lab.applications ? lab.applications.map(app => `
      <div class="app-scenario-card">
        <div class="app-scenario-header">
          <i class="${escapeHtml(app.icon || 'fa-solid fa-cubes')}"></i>
          <span>${escapeHtml(app.scenario)}</span>
        </div>
        <div class="app-scenario-desc">${escapeHtml(app.description)}</div>
      </div>
    `).join('') : '<p style="color:var(--text-dim);">暫無實務情境應用</p>';

    contentBodyEl.innerHTML = `
      <!-- (1) Lab Header -->
      <section class="lab-header-card">
        <div class="lab-tags">
          <span class="tag tag-cat">${escapeHtml(lab.category)}</span>
          <span class="tag tag-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(lab.date)}</span>
        </div>
        <h2 class="lab-main-title">Lab ${lab.labNumber}: ${escapeHtml(lab.title)}</h2>
        <p class="lab-summary">${escapeHtml(lab.summary)}</p>
      </section>

      <!-- (2) 程式 flow 照片 & 執行結果 -->
      <section class="gallery-section">
        <div class="image-card">
          <div class="image-header">
            <span class="image-title"><i class="fa-solid fa-diagram-project"></i> Node-RED 程式 Flow 截圖</span>
            <span class="zoom-hint"><i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大</span>
          </div>
          <div class="image-wrapper" id="flowImgWrapper">
            <img src="${lab.flowImage}" alt="Flow 程式截圖" onerror="this.src='https://via.placeholder.com/600x300?text=Flow+Image+Not+Found'">
          </div>
        </div>

        <div class="image-card">
          <div class="image-header">
            <span class="image-title"><i class="fa-solid fa-terminal"></i> 程式執行結果 (網頁 / Debug 視窗)</span>
            <span class="zoom-hint"><i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大</span>
          </div>
          <div class="image-wrapper" id="resultImgWrapper">
            <img src="${lab.resultImage}" alt="Result 執行結果截圖" onerror="this.src='https://via.placeholder.com/600x300?text=Result+Image+Not+Found'">
          </div>
        </div>

        ${lab.funcImage ? `
        <div class="image-card">
          <div class="image-header">
            <span class="image-title"><i class="fa-solid fa-code"></i> Function 函式程式碼截圖</span>
            <span class="zoom-hint"><i class="fa-solid fa-magnifying-glass-plus"></i> 點擊放大</span>
          </div>
          <div class="image-wrapper" id="funcImgWrapper">
            <img src="${lab.funcImage}" alt="Function 程式碼截圖" onerror="this.src='https://via.placeholder.com/600x300?text=Function+Image+Not+Found'">
          </div>
        </div>
        ` : ''}
      </section>

      <!-- (3) Lab 目標 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-bullseye"></i> Lab 學習目標</h3>
        <ul class="objective-list">
          ${lab.objective.split('\n').map(obj => obj.trim() ? `<li class="objective-item"><i class="fa-solid fa-circle-check"></i> <span>${escapeHtml(obj)}</span></li>` : '').join('')}
        </ul>
      </section>

      <!-- (4) 教學步驟說明 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-list-check"></i> Flow 實作步驟與邏輯解析</h3>
        <div class="steps-timeline">
          ${stepsHtml}
        </div>
      </section>

      <!-- (4-1) SCADA 實務情境應用 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-industry"></i> SCADA 實務情境應用 (三大應用領域)</h3>
        <div class="apps-grid">
          ${appsHtml}
        </div>
      </section>

      <!-- (5) AI 提示詞 (Prompt) -->
      <section class="section-card">
        <div class="code-box-header">
          <h3 class="section-title" style="margin-bottom:0; border-bottom:none;"><i class="fa-solid fa-wand-magic-sparkles"></i> AI 提示詞 (LLM Prompt)</h3>
          <button class="copy-btn" id="copyPromptBtn">
            <i class="fa-regular fa-copy"></i> 複製 Prompt
          </button>
        </div>
        <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 12px;">將以下提示詞貼給 ChatGPT / Claude / Gemini，即可快速生成對應的 Node-RED Flow JSON 程式碼：</p>
        <pre class="prompt-content">${escapeHtml(lab.aiPrompt)}</pre>
      </section>

      <!-- (6) Node-RED JSON 程式碼 -->
      <section class="section-card">
        <div class="code-box-header">
          <h3 class="section-title" style="margin-bottom:0; border-bottom:none;"><i class="fa-solid fa-code"></i> Node-RED 匯入程式碼 (JSON)</h3>
          <button class="copy-btn" id="copyJsonBtn">
            <i class="fa-regular fa-copy"></i> 複製 JSON 程式碼
          </button>
        </div>
        <p style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 12px;">可在 Node-RED 點擊右上角選單 -> 「匯入 (Import)」，將此 JSON 貼上並部署：</p>
        <pre class="code-content"><code>${escapeHtml(jsonString)}</code></pre>
      </section>

      <!-- (7) 相關說明與延伸連結 -->
      <section class="section-card">
        <h3 class="section-title"><i class="fa-solid fa-link"></i> 相關說明與參考連結</h3>
        <div class="ref-list">
          ${referencesHtml}
        </div>
      </section>
    `;

    // 綁定複製事件
    const copyPromptBtn = document.getElementById('copyPromptBtn');
    const copyJsonBtn = document.getElementById('copyJsonBtn');

    if (copyPromptBtn) {
      copyPromptBtn.addEventListener('click', () => {
        performCopy(lab.aiPrompt, 'AI 提示詞已成功複製到剪貼簿！');
      });
    }

    if (copyJsonBtn) {
      copyJsonBtn.addEventListener('click', () => {
        performCopy(jsonString, 'Node-RED JSON 已成功複製到剪貼簿！');
      });
    }

    // 綁定 Lightbox 點擊事件
    const flowImgWrapper = document.getElementById('flowImgWrapper');
    const resultImgWrapper = document.getElementById('resultImgWrapper');
    const funcImgWrapper = document.getElementById('funcImgWrapper');

    if (flowImgWrapper) {
      flowImgWrapper.addEventListener('click', () => {
        openLightbox(lab.flowImage, `Lab ${lab.labNumber} - Node-RED 程式 Flow`);
      });
    }

    if (resultImgWrapper) {
      resultImgWrapper.addEventListener('click', () => {
        openLightbox(lab.resultImage, `Lab ${lab.labNumber} - 執行結果`);
      });
    }

    if (funcImgWrapper && lab.funcImage) {
      funcImgWrapper.addEventListener('click', () => {
        openLightbox(lab.funcImage, `Lab ${lab.labNumber} - Function 程式碼`);
      });
    }
  }

  // 跨瀏覽器相容全功能複製函式
  function performCopy(text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(successMsg))
        .catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showToast(successMsg);
      } else {
        showToast('複製失敗，請手動選取文字複製');
      }
    } catch (err) {
      console.error('fallback copy 失敗:', err);
      showToast('複製失敗，請手動選取文字複製');
    }
    document.body.removeChild(textarea);
  }

  // Lightbox 全域函式
  function openLightbox(imgSrc, captionText) {
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText;
    lightboxModal.classList.add('active');
  }

  lightboxClose.addEventListener('click', () => {
    lightboxModal.classList.remove('active');
  });

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove('active');
    }
  });

  // Toast 提示函式
  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-green);"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // 工具函式
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 測試用：若 URL 帶有 scroll=1，自動滾動至實務情境應用區塊
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('scroll') === '1') {
    setTimeout(() => {
      const target = document.querySelector('.apps-grid');
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }, 800);
  }
});
