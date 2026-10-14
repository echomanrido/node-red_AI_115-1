import os
import json

def main():
    # 定義檔案路徑
    base_dir = r"d:\00000.知識\5-Day AI Agents Intensive Vibe Coding Course With Google\Day_02_Agent Tools & Interoperability"
    data_dir = os.path.join(base_dir, "data")
    
    # 載入所有 JSON 資料
    with open(os.path.join(data_dir, "overview.json"), "r", encoding="utf-8") as f:
        overview_data = json.load(f)
        
    chapter1_3 = []
    chapter4_6 = []
    chapter7_9 = []
    chapter10_12 = []
    chapter_additional = []
    
    with open(os.path.join(data_dir, "chapter1_3.json"), "r", encoding="utf-8") as f:
        chapter1_3 = json.load(f)
    with open(os.path.join(data_dir, "chapter4_6.json"), "r", encoding="utf-8") as f:
        chapter4_6 = json.load(f)
    with open(os.path.join(data_dir, "chapter7_9.json"), "r", encoding="utf-8") as f:
        chapter7_9 = json.load(f)
    with open(os.path.join(data_dir, "chapter10_12.json"), "r", encoding="utf-8") as f:
        chapter10_12 = json.load(f)
    with open(os.path.join(data_dir, "chapter_additional.json"), "r", encoding="utf-8") as f:
        chapter_additional = json.load(f)
        
    # 合併所有詳細投影片
    detailed_slides = chapter1_3 + chapter4_6 + chapter7_9 + chapter10_12 + chapter_additional
    
    # 1. 產生 agent_tools_slides.md 檔案
    md_path = os.path.join(base_dir, "agent_tools_slides.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write("# Agent Tools & Interoperability 投影片內容大綱與詳細說明\n\n")
        f.write("本檔案由自動化編譯腳本產生，內含簡報大綱 (Overview) 與詳細說明兩大部分。\n\n")
        
        f.write("## (1) 投影片大綱 (Overview Slides)\n\n")
        for i, slide in enumerate(overview_data):
            f.write("---\n")
            f.write(f"#### 投影片 [{i+1}]：{slide['title']}\n")
            f.write(f"- **核心宣示（Takeaway）**：{slide['takeaway']}\n")
            f.write("- **論證細節**：\n")
            for detail in slide['details']:
                f.write(f"  - {detail}\n")
            f.write(f"- **概念類比與實例**：{slide['metaphor']}\n")
            f.write(f"- **視覺版面配置建議**：{slide['layout']}\n")
        f.write("---\n\n")
        
        f.write("## (2) 詳細說明 (Step-by-Step Slides)\n\n")
        for slide in detailed_slides:
            f.write("---\n")
            f.write(f"#### 投影片 [{slide['id']}]：{slide['title']} (PDF 第 {slide['pdf_page']} 頁)\n")
            f.write(f"- **章節**：{slide['chapter']}\n")
            f.write(f"- **核心宣示（Takeaway）**：{slide['takeaway']}\n")
            f.write("- **論證細節**：\n")
            for detail in slide['details']:
                f.write(f"  - {detail}\n")
            metaphor = slide.get('metaphor', '')
            layout = slide.get('layout', '')
            if not layout:
                print(f"警告: 詳細投影片 ID {slide.get('id', 'unknown')} 缺少 layout 欄位!")
            f.write(f"- **概念類比與實例**：{metaphor}\n")
            f.write(f"- **視覺版面配置建議**：{layout}\n")
        f.write("---\n")
        
    print(f"成功產生 Markdown 檔案: {md_path}")
    
    # 2. 產生 index.html 檔案
    # 我們將投影片數據直接注入 JavaScript 陣列中，以利流暢播放。
    html_path = os.path.join(base_dir, "index.html")
    
    html_content = """<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Tools & Interoperability - 互動式投影片</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-muted: #475569;
            --primary: #2563eb;
            --primary-light: #eff6ff;
            --primary-border: #bfdbfe;
            --success-bg: #f0fdf4;
            --success-border: #bbf7d0;
            --success-text: #166534;
            --border: #e2e8f0;
            --shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-theme="dark"] {
            --bg-color: #0b0f19;
            --card-bg: #131c2e;
            --text-main: #f1f5f9;
            --text-muted: #94a3b8;
            --primary: #3b82f6;
            --primary-light: #1e293b;
            --primary-border: #334155;
            --success-bg: #064e3b;
            --success-border: #047857;
            --success-text: #a7f3d0;
            --border: #1e293b;
            --shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', 'Noto Sans TC', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            height: 100vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: var(--transition);
        }

        /* 頂部導覽列 */
        header {
            height: 64px;
            background-color: var(--card-bg);
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 24px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.01);
            z-index: 100;
            transition: var(--transition);
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo-icon {
            width: 32px;
            height: 32px;
            background-color: var(--primary);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-family: 'Outfit', sans-serif;
            font-size: 18px;
        }

        .logo-title {
            font-size: 16px;
            font-weight: 600;
            font-family: 'Outfit', sans-serif;
            color: var(--text-main);
        }

        /* 分頁 Tab */
        .tab-container {
            display: flex;
            background-color: var(--bg-color);
            padding: 4px;
            border-radius: 10px;
            border: 1px solid var(--border);
        }

        .tab-btn {
            padding: 8px 16px;
            border: none;
            background: none;
            font-size: 13px;
            font-weight: 500;
            color: var(--text-muted);
            cursor: pointer;
            border-radius: 8px;
            transition: var(--transition);
        }

        .tab-btn.active {
            background-color: var(--card-bg);
            color: var(--primary);
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        /* 控制項 */
        .controls-section {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .chapter-select {
            padding: 8px 16px;
            border-radius: 8px;
            border: 1px solid var(--border);
            background-color: var(--card-bg);
            color: var(--text-main);
            font-size: 13px;
            cursor: pointer;
            outline: none;
            max-width: 250px;
            transition: var(--transition);
        }

        .icon-btn {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            border: 1px solid var(--border);
            background-color: var(--card-bg);
            color: var(--text-main);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition);
        }

        .icon-btn:hover {
            border-color: var(--primary);
            color: var(--primary);
        }

        /* 投影片主區域 */
        main {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            position: relative;
        }

        .slide-container {
            width: 100%;
            max-width: 1200px;
            height: 100%;
            max-height: 720px;
            background-color: var(--card-bg);
            border-radius: 24px;
            box-shadow: var(--shadow);
            border: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
            transition: var(--transition);
        }

        /* 投影片頁首標籤 */
        .slide-header {
            padding: 20px 32px 10px 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .slide-tag {
            background-color: var(--primary-light);
            color: var(--primary);
            border: 1px solid var(--primary-border);
            padding: 4px 12px;
            border-radius: 100px;
            font-size: 12px;
            font-weight: 500;
        }

        .slide-page-indicator {
            font-size: 13px;
            color: var(--text-muted);
            font-weight: 500;
        }

        /* 投影片主內容 */
        .slide-body {
            flex: 1;
            padding: 0 32px 24px 32px;
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 32px;
            overflow-y: auto;
        }

        .slide-body.full-width {
            grid-template-columns: 1fr;
        }

        /* 左側資訊 */
        .left-content {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 20px;
        }

        .slide-title {
            font-size: 28px;
            font-weight: 700;
            color: var(--text-main);
            line-height: 1.25;
            font-family: 'Noto Sans TC', sans-serif;
        }

        .slide-takeaway {
            font-size: 16px;
            font-weight: 500;
            color: var(--primary);
            line-height: 1.5;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--border);
        }

        .details-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .details-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .details-item {
            position: relative;
            padding-left: 28px;
            font-size: 14px;
            line-height: 1.6;
            color: var(--text-muted);
        }

        .details-item::before {
            content: "";
            position: absolute;
            left: 0;
            top: 4px;
            width: 16px;
            height: 16px;
            background-color: var(--primary-light);
            border: 2px solid var(--primary);
            border-radius: 50%;
        }

        /* 右側資訊 (概念類比與流程圖) */
        .right-content {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .metaphor-box {
            background-color: var(--success-bg);
            border: 1px solid var(--success-border);
            padding: 16px;
            border-radius: 16px;
            color: var(--success-text);
            font-size: 13.5px;
            line-height: 1.6;
            font-weight: 500;
        }

        .chart-box {
            flex: 1;
            border: 1px solid var(--border);
            border-radius: 16px;
            background-color: var(--bg-color);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            min-height: 220px;
        }

        .chart-header {
            padding: 10px 16px;
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            font-weight: 600;
            color: var(--text-muted);
        }

        .chart-zoom-controls {
            display: flex;
            gap: 4px;
        }

        .zoom-btn {
            width: 22px;
            height: 22px;
            border-radius: 4px;
            border: 1px solid var(--border);
            background-color: var(--card-bg);
            color: var(--text-muted);
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .chart-viewport {
            flex: 1;
            position: relative;
            cursor: grab;
            overflow: hidden;
        }

        .chart-viewport:active {
            cursor: grabbing;
        }

        .svg-canvas {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: 0 0;
            user-select: none;
        }

        /* 心智圖面板專屬 */
        .mindmap-panel {
            width: 100%;
            height: 100%;
            position: relative;
            background-color: var(--bg-color);
            cursor: grab;
        }

        .mindmap-panel:active {
            cursor: grabbing;
        }

        .mindmap-node {
            cursor: pointer;
            transition: var(--transition);
        }

        .mindmap-node rect {
            fill: var(--card-bg);
            stroke: var(--border);
            stroke-width: 1.5;
            rx: 8px;
            transition: var(--transition);
        }

        .mindmap-node:hover rect {
            stroke: var(--primary);
            filter: drop-shadow(0 4px 12px rgba(37,99,235,0.15));
        }

        .mindmap-node.active rect {
            stroke: var(--primary);
            stroke-width: 2.5;
            fill: var(--primary-light);
        }

        .mindmap-node text {
            fill: var(--text-main);
            font-size: 12px;
            font-weight: 500;
        }

        .mindmap-node.center-node rect {
            fill: var(--primary);
            stroke: var(--primary);
            rx: 50%;
        }

        .mindmap-node.center-node text {
            fill: #ffffff;
            font-weight: 700;
            font-size: 13px;
        }

        .mindmap-link {
            stroke: var(--border);
            stroke-width: 1;
            stroke-dasharray: 4,4;
            fill: none;
            transition: var(--transition);
        }

        .mindmap-link.highlight {
            stroke: var(--primary);
            stroke-width: 2.5;
            stroke-dasharray: none;
        }

        .mindmap-info-popup {
            position: absolute;
            bottom: 24px;
            right: 24px;
            width: 320px;
            background-color: var(--card-bg);
            border: 1px solid var(--primary-border);
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            display: none;
            z-index: 10;
            animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
            from { transform: translateY(10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .mindmap-info-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 6px;
        }

        .mindmap-info-desc {
            font-size: 12px;
            color: var(--text-muted);
            line-height: 1.5;
        }

        /* 底部控制面板 */
        .footer-controls {
            height: 56px;
            background-color: var(--card-bg);
            border-top: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 24px;
            z-index: 100;
            transition: var(--transition);
        }

        .shortcut-tips {
            font-size: 12px;
            color: var(--text-muted);
        }

        .shortcut-tips kbd {
            background-color: var(--bg-color);
            border: 1px solid var(--border);
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 10px;
            font-weight: 600;
            font-family: inherit;
        }

        .slide-counter {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-main);
        }

        .nav-buttons {
            display: flex;
            gap: 12px;
        }

        .nav-btn {
            padding: 8px 16px;
            border-radius: 8px;
            border: 1px solid var(--border);
            background-color: var(--card-bg);
            color: var(--text-main);
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: var(--transition);
        }

        .nav-btn:hover {
            border-color: var(--primary);
            color: var(--primary);
        }

        .nav-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        .nav-btn:disabled:hover {
            border-color: var(--border);
            color: var(--text-main);
        }

        /* 全螢幕樣式 */
        :-webkit-full-screen .slide-container {
            width: 100vw;
            height: 100vh;
            max-width: 100%;
            max-height: 100%;
            border-radius: 0;
            border: none;
        }
        :-moz-full-screen .slide-container {
            width: 100vw;
            height: 100vh;
            max-width: 100%;
            max-height: 100%;
            border-radius: 0;
            border: none;
        }
        :fullscreen .slide-container {
            width: 100vw;
            height: 100vh;
            max-width: 100%;
            max-height: 100%;
            border-radius: 0;
            border: none;
        }
    </style>
</head>
<body>

    <header>
        <div class="logo-section">
            <div class="logo-icon">Q</div>
            <div class="logo-title">Agent Tools & Interoperability</div>
        </div>

        <div class="tab-container">
            <button class="tab-btn active" id="btn-overview">簡報大綱 (Overview)</button>
            <button class="tab-btn" id="btn-detail">詳細說明 (Step-by-Step)</button>
        </div>

        <div class="controls-section">
            <select class="chapter-select" id="chapter-selector">
                <option value="all">所有章節目錄</option>
            </select>
            <button class="icon-btn" id="btn-theme" title="切換深色/淺色模式">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a7 7 0 1 1-7.64-7.64c.44.06.9.1 1.36.1z"/></svg>
            </button>
            <button class="icon-btn" id="btn-fullscreen" title="全螢幕">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            </button>
        </div>
    </header>

    <main id="presentation-root">
        <div class="slide-container" id="slide-wrapper">
            <!-- 投影片內容將由 JavaScript 動態注入 -->
        </div>
    </main>

    <div class="footer-controls">
        <div class="shortcut-tips">
            切換：<kbd>←</kbd> / <kbd>→</kbd> / <kbd>Space</kbd> &nbsp;|&nbsp; 目錄：<kbd>M</kbd> &nbsp;|&nbsp; 全螢幕：<kbd>F</kbd>
        </div>

        <div class="slide-counter" id="slide-counter-text">
            投影片 1 / 15
        </div>

        <div class="nav-buttons">
            <button class="nav-btn" id="btn-prev" disabled>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> 上一頁
            </button>
            <button class="nav-btn" id="btn-next">
                下一頁 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
        </div>
    </div>

    <!-- 注入投影片數據 -->
    <script>
        const overviewSlides = __OVERVIEW_SLIDES__;
        const detailSlides = __DETAIL_SLIDES__;
    </script>

    <!-- 投影片核心邏輯 -->
    <script>
        let currentMode = 'overview'; // 'overview' | 'detail'
        let currentSlideIndex = 0;
        let activeTheme = 'light';
        
        // DOM Elements
        const slideWrapper = document.getElementById('slide-wrapper');
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        const btnOverview = document.getElementById('btn-overview');
        const btnDetail = document.getElementById('btn-detail');
        const chapterSelector = document.getElementById('chapter-selector');
        const slideCounterText = document.getElementById('slide-counter-text');
        const btnTheme = document.getElementById('btn-theme');
        const btnFullscreen = document.getElementById('btn-fullscreen');

        // 章節定義
        const chapters = [
            { id: 'ch1', name: '第一章：Agent 時代的範式轉移 (PDF 6-9)' },
            { id: 'ch2', name: '第二章：MCP 發現、配置與連接 (PDF 10-12)' },
            { id: 'ch3', name: '第三章：破解 NxM 整合危機與傳輸層 (PDF 13-14)' },
            { id: 'ch4', name: '第四章：MCP 伺服器除錯與最佳實務 (PDF 15-17)' },
            { id: 'ch5', name: '第五章：從單體到微服務的多 Agent 演進 (PDF 17-21)' },
            { id: 'ch6', name: '第六章：A2A 協定與 Build vs. Buy 抉擇 (PDF 21-22)' },
            { id: 'ch7', name: '第七章：Bounded 與 Unbounded 領域 (PDF 23-24)' },
            { id: 'ch8', name: '第八章：虛擬員工、Agent Card 與 Registry (PDF 24-26)' },
            { id: 'ch9', name: '第九章：A2A 協定的落地實作與 ADK (PDF 26-28)' },
            { id: 'ch10', name: '第十章：AaaS 變現模型與 x402 微支付 (PDF 28-31)' },
            { id: 'ch11', name: '第十一章：A2UI 界面革命與樂譜架構 (PDF 32-35)' },
            { id: 'ch12', name: '第十二章：A2UI 元件、雙模式與 AP2/UCP 商務 (PDF 35-47)' }
        ];

        // 填充章節目錄下拉選單
        function initChapterSelector() {
            chapterSelector.innerHTML = '<option value="all">所有章節目錄</option>';
            chapters.forEach(ch => {
                const opt = document.createElement('option');
                opt.value = ch.id;
                opt.textContent = ch.name;
                chapterSelector.appendChild(opt);
            });
        }

        function getCurrentSlides() {
            return currentMode === 'overview' ? overviewSlides : detailSlides;
        }

        // 渲染投影片
        function renderSlide() {
            const slides = getCurrentSlides();
            const slide = slides[currentSlideIndex];
            
            // 更新計數器
            slideCounterText.textContent = `投影片 ${currentSlideIndex + 1} / ${slides.length}`;
            btnPrev.disabled = currentSlideIndex === 0;
            btnNext.disabled = currentSlideIndex === slides.length - 1;

            // 特殊處理詳細說明的第二頁：心智圖
            if (currentMode === 'detail' && currentSlideIndex === 1) {
                renderMindmapSlide();
                return;
            }

            // 一般投影片渲染
            let html = '';
            
            if (currentMode === 'overview') {
                html = `
                <div class="slide-header">
                    <span class="slide-tag">簡報大綱 / Overview</span>
                    <span class="slide-page-indicator">O-${currentSlideIndex + 1} / 15</span>
                </div>
                <div class="slide-body">
                    <div class="left-content">
                        <h2 class="slide-title">${slide.title}</h2>
                        <p class="slide-takeaway">${slide.takeaway}</p>
                        <h3 class="details-title">論證細節</h3>
                        <ul class="details-list">
                            ${slide.details.map(d => `<li class="details-item">${d}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="right-content">
                        <div class="metaphor-box">
                            ${slide.metaphor}
                        </div>
                        <div class="chart-box">
                            <div class="chart-header">
                                <span>版面配置與視覺化建議</span>
                            </div>
                            <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:20px; font-size:13px; color:var(--text-muted); text-align:center; font-weight:500;">
                                ${slide.layout}
                            </div>
                        </div>
                    </div>
                </div>`;
            } else {
                // 詳細說明模式
                html = `
                <div class="slide-header">
                    <span class="slide-tag">${slide.chapter} / PDF 第 ${slide.pdf_page} 頁</span>
                    <span class="slide-page-indicator">詳細說明 ${slide.id} / 215</span>
                </div>
                <div class="slide-body">
                    <div class="left-content">
                        <h2 class="slide-title">${slide.title}</h2>
                        <p class="slide-takeaway">${slide.takeaway}</p>
                        <h3 class="details-title">論證細節</h3>
                        <ul class="details-list">
                            ${slide.details.map(d => `<li class="details-item">${d}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="right-content">
                        <div class="metaphor-box">
                            ${slide.metaphor}
                        </div>
                        <div class="chart-box" id="chart-box-container">
                            <div class="chart-header">
                                <span>邏輯關係流程圖 (支援滑動與滾輪縮放)</span>
                                <div class="chart-zoom-controls">
                                    <button class="zoom-btn" onclick="zoomChart(1.1)">+</button>
                                    <button class="zoom-btn" onclick="zoomChart(0.9)">-</button>
                                    <button class="zoom-btn" onclick="resetChartZoom()">⟳</button>
                                </div>
                            </div>
                            <div class="chart-viewport" id="chart-viewport">
                                <svg class="svg-canvas" id="flowchart-svg" viewBox="0 0 400 200">
                                    <!-- 流程圖由 JavaScript 動態生成 -->
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>`;
            }

            slideWrapper.innerHTML = html;

            // 如果是詳細模式，生成該章節的流程圖
            if (currentMode === 'detail' && currentSlideIndex !== 1) {
                generateFlowchart(slide.chapter);
                initChartPanZoom();
            }
        }

        // 渲染心智圖投影片
        function renderMindmapSlide() {
            slideWrapper.innerHTML = `
            <div class="slide-header">
                <span class="slide-tag">核心章節架構心智圖</span>
                <span class="slide-page-indicator">詳細說明 2 / 215</span>
            </div>
            <div style="flex:1; display:flex; flex-direction:column; position:relative; overflow:hidden;">
                <div style="padding: 10px 32px; font-size:14px; color:var(--text-muted); font-weight:500;">
                    全書 12 章節核心互聯網狀心智圖 (可拖曳與滾輪縮放，懸停高亮連結線)
                    <div style="display:inline-flex; gap:6px; margin-left:20px;">
                        <button class="zoom-btn" onclick="zoomMindmap(1.1)">+</button>
                        <button class="zoom-btn" onclick="zoomMindmap(0.9)">-</button>
                        <button class="zoom-btn" onclick="resetMindmapZoom()">⟳</button>
                    </div>
                </div>
                <div class="mindmap-panel" id="mindmap-container">
                    <svg id="mindmap-svg" width="100%" height="100%" viewBox="0 0 1000 600">
                        <g id="mindmap-content-group">
                            <!-- 節點與連線會動態注入 -->
                        </g>
                    </svg>
                    <div class="mindmap-info-popup" id="mindmap-popup">
                        <div class="mindmap-info-title" id="popup-title">章節標題</div>
                        <div class="mindmap-info-desc" id="popup-desc">章節介紹與核心要點...</div>
                    </div>
                </div>
            </div>`;
            
            drawMindmap();
            initMindmapPanZoom();
        }

        // 繪製心智圖
        const mindmapData = {
            center: { x: 500, y: 300, name: "Agent Tools & Interoperability", desc: "本白皮書聚焦於智能體連接工具的 MCP 協定，以及多智能體之間協同通訊的 A2A 協定、A2UI 界面協議、AP2 & UCP 自主商務支付標準。" },
            nodes: [
                { id: 1, x: 200, y: 150, name: "Ch 1: 智能體範式轉移", desc: "軟體開發從寫死代碼轉變為編排 AI 生產線。核心公式：Agent = Model + Harness。" },
                { id: 2, x: 200, y: 300, name: "Ch 2: MCP 的配置與連接", desc: "Vibe Coder 一鍵消費工具。發現 (3大管道) -> 配置 (Scope/Auth) -> 連接握手。" },
                { id: 3, x: 200, y: 450, name: "Ch 3: 破解 NxM 整合危機", desc: "MCP 將複雜度從 O(N x M) 降為 O(N + M)。解析 stdio 與 SSE 雙傳輸通道原理。" },
                { id: 4, x: 420, y: 120, name: "Ch 4: MCP 伺服器除錯與規範", desc: "使用 MCP Inspector 除錯原始 JSON-RPC 2.0。Do's & Don'ts 實務與安全防線。" },
                { id: 5, x: 580, y: 120, name: "Ch 5: 多 Agent 演進與微服務", desc: "單體 Agent 撞上 Monolithic Ceiling。分散式多智能體微服務架構，以 specialization 擴展。" },
                { id: 6, x: 800, y: 150, name: "Ch 6: A2A 協定通用語", desc: "解決 3P 平台 Agent 技術棧碎片化 (Fragmentation)。A2A 作為 lingua franca 消除維護稅。" },
                { id: 7, x: 800, y: 300, name: "Ch 7: Bounded 與 Unbounded", desc: "被動工具 (即發即忘) vs 協同夥伴 (多輪協商)。A2A 狀態隔離破解 Orchestrator GOTO 瓶頸。" },
                { id: 8, x: 800, y: 450, name: "Ch 8: 虛擬員工與 Agent Card", desc: "Agent Card 作為標準履歷 (CV)。Registry 註冊表實現全球 Marketplace 與私有安全共享。" },
                { id: 9, x: 420, y: 480, name: "Ch 9: A2A ADK 落地代碼", desc: "Exposing Server 供應端 vs Connecting Client 需求端。Google ADK 硬編碼與 Registry 動態發現代碼。" },
                { id: 10, x: 580, y: 480, name: "Ch 10: AaaS 與 x402 微支付", desc: "GCP Marketplace 混合計費變現生命週期。HTTP 402/L402 免許可機器間微支付與 Proof-of-Payment。" },
                { id: 11, x: 500, y: 220, name: "Ch 11: A2UI 與 Generative UI", desc: "消除人機 JSON 鴻溝。A2UI 宣告式『樂譜』安全適配渲染，SoC 關注點分離避免 XSS 注入。" },
                { id: 12, x: 500, y: 380, name: "Ch 12: Basic Catalog 與 AP2/UCP", desc: "18 種基礎元件組裝與 updateDataModel 資料流。UCP 採購大腦與 AP2 限額數位期票錢包協同。" }
            ],
            links: [
                { source: 1, target: 2 },
                { source: 2, target: 3 },
                { source: 3, target: 4 },
                { source: 4, target: 5 },
                { source: 5, target: 6 },
                { source: 6, target: 7 },
                { source: 7, target: 8 },
                { source: 8, target: 9 },
                { source: 9, target: 10 },
                { source: 10, target: 11 },
                { source: 11, target: 12 },
                { source: 12, target: 1 },
                // 互聯線 (跨章節網絡)
                { source: 2, target: 5 },
                { source: 3, target: 9 },
                { source: 6, target: 9 },
                { source: 7, target: 11 },
                { source: 10, target: 12 }
            ]
        };

        function drawMindmap() {
            const svgGroup = document.getElementById('mindmap-content-group');
            let content = '';

            // 1. 繪製中心點到所有節點的放射線 (灰色)
            mindmapData.nodes.forEach(node => {
                content += `<line class="mindmap-link" x1="${mindmapData.center.x}" y1="${mindmapData.center.y}" x2="${node.x}" y2="${node.y}" />`;
            });

            // 2. 繪製節點間的互聯線 (虛線，懸停可高亮)
            mindmapData.links.forEach((link, idx) => {
                const s = mindmapData.nodes.find(n => n.id === link.source);
                const t = mindmapData.nodes.find(n => n.id === link.target);
                if (s && t) {
                    content += `<path class="mindmap-link" d="M ${s.x} ${s.y} Q ${(s.x+t.x)/2 + 20} ${(s.y+t.y)/2 - 20} ${t.x} ${t.y}" id="link-${idx}" data-source="${link.source}" data-target="${link.target}"/>`;
                }
            });

            // 3. 繪製節點卡片
            mindmapData.nodes.forEach(node => {
                content += `
                <g class="mindmap-node" transform="translate(${node.x}, ${node.y})" onclick="showMindmapPopup(${node.id})" onmouseover="highlightNodeLinks(${node.id}, true)" onmouseout="highlightNodeLinks(${node.id}, false)" id="node-${node.id}">
                    <rect x="-90" y="-20" width="180" height="40" />
                    <text x="0" y="5" text-anchor="middle">${node.name}</text>
                </g>`;
            });

            // 4. 繪製中心節點
            content += `
            <g class="mindmap-node center-node" transform="translate(${mindmapData.center.x}, ${mindmapData.center.y})" onclick="showMindmapPopup('center')">
                <circle cx="0" cy="0" r="55" fill="var(--primary)" stroke="var(--primary)" />
                <text x="0" y="-8" text-anchor="middle">Agent Tools &</text>
                <text x="0" y="12" text-anchor="middle">Interoperability</text>
            </g>`;

            svgGroup.innerHTML = content;
        }

        // 高亮節點相連的連線
        function highlightNodeLinks(nodeId, highlight) {
            const links = document.querySelectorAll('.mindmap-link');
            links.forEach(link => {
                const src = link.getAttribute('data-source');
                const tgt = link.getAttribute('data-target');
                if (src == nodeId || tgt == nodeId) {
                    if (highlight) {
                        link.classList.add('highlight');
                    } else {
                        link.classList.remove('highlight');
                    }
                }
            });
            const nodeG = document.getElementById(`node-${nodeId}`);
            if (nodeG) {
                if (highlight) {
                    nodeG.classList.add('active');
                } else {
                    nodeG.classList.remove('active');
                }
            }
        }

        // 顯示心智圖彈窗說明
        function showMindmapPopup(id) {
            const popup = document.getElementById('mindmap-popup');
            const titleEl = document.getElementById('popup-title');
            const descEl = document.getElementById('popup-desc');

            if (id === 'center') {
                titleEl.textContent = mindmapData.center.name;
                descEl.textContent = mindmapData.center.desc;
            } else {
                const node = mindmapData.nodes.find(n => n.id === id);
                if (node) {
                    titleEl.textContent = node.name;
                    descEl.textContent = node.desc;
                }
            }
            popup.style.display = 'block';
        }

        // 心智圖 Pan & Zoom 實作
        let mindmapScale = 1;
        let mindmapX = 0;
        let mindmapY = 0;
        
        function initMindmapPanZoom() {
            const container = document.getElementById('mindmap-container');
            const svgContent = document.getElementById('mindmap-content-group');
            if (!container || !svgContent) return;

            let isDragging = false;
            let startX, startY;

            container.addEventListener('mousedown', (e) => {
                // 如果點擊的是節點本身，不觸發拖拽
                if (e.target.closest('.mindmap-node') || e.target.closest('.mindmap-info-popup')) return;
                isDragging = true;
                container.style.cursor = 'grabbing';
                startX = e.clientX - mindmapX;
                startY = e.clientY - mindmapY;
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                mindmapX = e.clientX - startX;
                mindmapY = e.clientY - startY;
                updateMindmapTransform();
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
                if (container) container.style.cursor = 'grab';
            });

            container.addEventListener('wheel', (e) => {
                e.preventDefault();
                const zoomFactor = 1.1;
                if (e.deltaY < 0) {
                    mindmapScale *= zoomFactor;
                } else {
                    mindmapScale /= zoomFactor;
                }
                mindmapScale = Math.min(Math.max(mindmapScale, 0.4), 3.0);
                updateMindmapTransform();
            });
        }

        function updateMindmapTransform() {
            const svgContent = document.getElementById('mindmap-content-group');
            if (svgContent) {
                svgContent.setAttribute('transform', `translate(${mindmapX}, ${mindmapY}) scale(${mindmapScale})`);
            }
        }

        function zoomMindmap(factor) {
            mindmapScale *= factor;
            mindmapScale = Math.min(Math.max(mindmapScale, 0.4), 3.0);
            updateMindmapTransform();
        }

        function resetMindmapZoom() {
            mindmapScale = 1;
            mindmapX = 0;
            mindmapY = 0;
            updateMindmapTransform();
            const popup = document.getElementById('mindmap-popup');
            if (popup) popup.style.display = 'none';
        }


        // ------------------ 流程圖繪製 ------------------
        const flowchartData = {
            '第一章': `
                <rect x="20" y="75" width="80" height="50" rx="8" fill="var(--primary)" stroke="var(--primary)" />
                <text x="60" y="105" fill="white" font-size="10" font-weight="600" text-anchor="middle">軟體範式轉移</text>
                
                <path d="M 100 100 L 140 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />
                
                <rect x="140" y="75" width="100" height="50" rx="8" fill="var(--card-bg)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="190" y="98" fill="var(--text-main)" font-size="10" font-weight="600" text-anchor="middle">Agent Formula</text>
                <text x="190" y="112" fill="var(--primary)" font-size="9" text-anchor="middle">Model + Harness</text>
                
                <path d="M 240 100 L 280 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />
                
                <rect x="280" y="75" width="100" height="50" rx="8" fill="var(--success-bg)" stroke="var(--success-border)" stroke-width="1.5" />
                <text x="330" y="98" fill="var(--success-text)" font-size="10" font-weight="600" text-anchor="middle">統一工業標準</text>
                <text x="330" y="112" fill="var(--success-text)" font-size="9" text-anchor="middle">MCP / A2A / A2UI</text>
            `,
            '第二章': `
                <rect x="10" y="75" width="90" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="55" y="98" fill="var(--primary)" font-size="10" font-weight="600" text-anchor="middle">1. Discovery 發現</text>
                <text x="55" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">Public / 3P / Internal</text>

                <path d="M 100 100 L 130 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="130" y="75" width="110" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="185" y="98" fill="var(--primary)" font-size="10" font-weight="600" text-anchor="middle">2. Configuration 配置</text>
                <text x="185" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">Scopes / Credentials</text>

                <path d="M 240 100 L 270 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="270" y="75" width="110" height="50" rx="8" fill="var(--success-bg)" stroke="var(--success-border)" stroke-width="1.5" />
                <text x="325" y="98" fill="var(--success-text)" font-size="10" font-weight="600" text-anchor="middle">3. Connection 連接</text>
                <text x="325" y="112" fill="var(--success-text)" font-size="8" text-anchor="middle">Handshake & Tool List</text>
            `,
            '第三章': `
                <rect x="15" y="40" width="120" height="40" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
                <text x="75" y="65" fill="#991b1b" font-size="9" font-weight="600" text-anchor="middle">傳統整合 Effort: O(N x M)</text>
                
                <rect x="15" y="120" width="120" height="40" rx="6" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
                <text x="75" y="145" fill="#166534" font-size="9" font-weight="600" text-anchor="middle">MCP 整合 Effort: O(N + M)</text>

                <path d="M 135 60 L 200 60 L 200 80" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />
                <path d="M 135 140 L 200 140 L 200 120" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="220" y="75" width="150" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="295" y="98" fill="var(--primary)" font-size="10" font-weight="600" text-anchor="middle">傳輸通道選擇</text>
                <text x="295" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">stdio (本地) vs SSE (遠端)</text>
            `,
            '第四章': `
                <rect x="10" y="75" width="90" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="55" y="98" fill="var(--primary)" font-size="10" font-weight="600" text-anchor="middle">出現故障異常</text>
                <text x="55" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">幻覺 / 連線失敗</text>

                <path d="M 100 100 L 130 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="130" y="75" width="110" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="185" y="98" fill="var(--primary)" font-size="10" font-weight="600" text-anchor="middle">Inspector / DevTools</text>
                <text x="185" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">捕獲 JSON-RPC 原始包</text>

                <path d="M 240 100 L 270 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="270" y="75" width="110" height="50" rx="8" fill="var(--success-bg)" stroke="var(--success-border)" stroke-width="1.5" />
                <text x="325" y="98" fill="var(--success-text)" font-size="10" font-weight="600" text-anchor="middle">遵循 Do's & Don'ts</text>
                <text x="325" y="112" fill="var(--success-text)" font-size="8" text-anchor="middle">RAG for Tools / HITL</text>
            `,
            '第五章': `
                <rect x="10" y="75" width="90" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
                <text x="55" y="95" fill="#991b1b" font-size="9" font-weight="600" text-anchor="middle">Swiss Army Knife</text>
                <text x="55" y="108" fill="#991b1b" font-size="8" text-anchor="middle">單體 Agent 瓶頸</text>
                <text x="55" y="118" fill="#991b1b" font-size="7" text-anchor="middle">上下文超載/故障連鎖</text>

                <path d="M 100 100 L 130 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="130" y="75" width="110" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="185" y="98" fill="var(--primary)" font-size="9" font-weight="600" text-anchor="middle">Internal Specialization</text>
                <text x="185" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">邏輯拆解 Sub-agents</text>

                <path d="M 240 100 L 270 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="270" y="75" width="110" height="50" rx="8" fill="var(--success-bg)" stroke="var(--success-border)" stroke-width="1.5" />
                <text x="325" y="98" fill="var(--success-text)" font-size="9" font-weight="600" text-anchor="middle">Distributed Architecture</text>
                <text x="325" y="112" fill="var(--success-text)" font-size="8" text-anchor="middle">跨網絡委派 A2A 專家</text>
            `,
            '第六章': `
                <rect x="15" y="75" width="100" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="65" y="98" fill="var(--primary)" font-size="9" font-weight="600" text-anchor="middle">3P Agents 碎片化</text>
                <text x="65" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">Python / Go / Java</text>

                <path d="M 115 100 L 155 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="155" y="75" width="90" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
                <text x="200" y="98" fill="#991b1b" font-size="9" font-weight="600" text-anchor="middle">Bespoke 橋接碼</text>
                <text x="200" y="112" fill="#991b1b" font-size="8" text-anchor="middle">沈重 Maintenance Tax</text>

                <path d="M 245 100 L 285 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="285" y="75" width="100" height="50" rx="8" fill="var(--success-bg)" stroke="var(--success-border)" stroke-width="1.5" />
                <text x="335" y="98" fill="var(--success-text)" font-size="10" font-weight="600" text-anchor="middle">A2A 統一語言</text>
                <text x="335" y="112" fill="var(--success-text)" font-size="8" text-anchor="middle">Standardized Workforce</text>
            `,
            '第七章': `
                <rect x="10" y="30" width="110" height="50" rx="6" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="65" y="53" fill="var(--primary)" font-size="9" font-weight="600" text-anchor="middle">被動工具 (Bounded)</text>
                <text x="65" y="65" fill="var(--text-muted)" font-size="8" text-anchor="middle">Fire-and-Forget / 單次</text>

                <rect x="10" y="120" width="110" height="50" rx="6" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="65" y="143" fill="var(--primary)" font-size="9" font-weight="600" text-anchor="middle">專家夥伴 (Unbounded)</text>
                <text x="65" y="155" fill="var(--text-muted)" font-size="8" text-anchor="middle">多輪對話 / Crooked Walls</text>

                <path d="M 120 145 L 180 145 L 180 110" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="200" y="75" width="180" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
                <text x="290" y="98" fill="#991b1b" font-size="9" font-weight="600" text-anchor="middle">Orchestrator GOTO 瓶頸</text>
                <text x="290" y="112" fill="#991b1b" font-size="8" text-anchor="middle">控制流懸空死鎖 -> A2A 隔離破解</text>
            `,
            '第八章': `
                <rect x="15" y="75" width="90" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="60" y="98" fill="var(--primary)" font-size="10" font-weight="600" text-anchor="middle">Agent Card</text>
                <text x="60" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">Capabilities/Security/Specs</text>

                <path d="M 105 100 L 145 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="145" y="75" width="100" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="195" y="98" fill="var(--primary)" font-size="10" font-weight="600" text-anchor="middle">Agent Registry</text>
                <text x="195" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">服務發現與索引</text>

                <path d="M 245 100 L 285 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="285" y="75" width="100" height="50" rx="8" fill="var(--success-bg)" stroke="var(--success-border)" stroke-width="1.5" />
                <text x="335" y="98" fill="var(--success-text)" font-size="10" font-weight="600" text-anchor="middle">Marketplaces</text>
                <text x="335" y="112" fill="var(--success-text)" font-size="8" text-anchor="middle">一鍵動態 onboard 雇用</text>
            `,
            '第九章': `
                <rect x="15" y="75" width="90" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="60" y="98" fill="var(--primary)" font-size="9" font-weight="600" text-anchor="middle">A2A Exposing</text>
                <text x="60" y="112" fill="var(--text-muted)" font-size="7" text-anchor="middle">Card/Executor/Endpoint</text>

                <path d="M 105 100 L 145 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="145" y="75" width="100" height="50" rx="8" fill="var(--success-bg)" stroke="var(--success-border)" stroke-width="1.5" />
                <text x="195" y="98" fill="var(--success-text)" font-size="10" font-weight="600" text-anchor="middle">A2A Connecting</text>
                <text x="195" y="112" fill="var(--success-text)" font-size="8" text-anchor="middle">硬編碼 vs 註冊表發現</text>

                <path d="M 245 100 L 285 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="285" y="75" width="100" height="50" rx="8" fill="var(--card-bg)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="335" y="98" fill="var(--text-main)" font-size="9" font-weight="600" text-anchor="middle">Google ADK 實作</text>
                <text x="335" y="112" fill="var(--primary)" font-size="8" text-anchor="middle">RemoteA2aAgent</text>
            `,
            '第十章': `
                <rect x="15" y="75" width="95" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="62.5" y="98" fill="var(--primary)" font-size="9" font-weight="600" text-anchor="middle">GCP Marketplace</text>
                <text x="62.5" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">混合計費 (Flat + Usage)</text>

                <path d="M 110 100 L 145 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="145" y="75" width="105" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="197.5" y="98" fill="var(--primary)" font-size="9" font-weight="600" text-anchor="middle">HTTP 402 Intercept</text>
                <text x="197.5" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">Payment Required</text>

                <path d="M 250 100 L 285 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="285" y="75" width="100" height="50" rx="8" fill="var(--success-bg)" stroke="var(--success-border)" stroke-width="1.5" />
                <text x="335" y="98" fill="var(--success-text)" font-size="9" font-weight="600" text-anchor="middle">L402 / x402 支付</text>
                <text x="335" y="112" fill="var(--success-text)" font-size="8" text-anchor="middle">Cryptographic Proof</text>
            `,
            '第十一章': `
                <rect x="15" y="75" width="90" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
                <text x="60" y="95" fill="#991b1b" font-size="9" font-weight="600" text-anchor="middle">JSON 溝通鴻溝</text>
                <text x="60" y="108" fill="#991b1b" font-size="8" text-anchor="middle">Generative UI 安全紅線</text>
                <text x="60" y="118" fill="#991b1b" font-size="7" text-anchor="middle">XSS / Code Injection</text>

                <path d="M 105 100 L 145 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="145" y="75" width="100" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="195" y="98" fill="var(--primary)" font-size="10" font-weight="600" text-anchor="middle">A2UI 宣告式 JSON</text>
                <text x="195" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">SoC 關注點分離</text>

                <path d="M 245 100 L 285 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="285" y="75" width="100" height="50" rx="8" fill="var(--success-bg)" stroke="var(--success-border)" stroke-width="1.5" />
                <text x="335" y="98" fill="var(--success-text)" font-size="10" font-weight="600" text-anchor="middle">Native 渲染</text>
                <text x="335" y="112" fill="var(--success-text)" font-size="8" text-anchor="middle">Lego 積木 / 樂譜適配</text>
            `,
            '第十二章': `
                <rect x="10" y="75" width="90" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="55" y="98" fill="var(--primary)" font-size="9" font-weight="600" text-anchor="middle">A2UI 18種元件</text>
                <text x="55" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">雙模式 / Data Bind</text>

                <path d="M 100 100 L 130 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="130" y="75" width="110" height="50" rx="8" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="1.5" />
                <text x="185" y="98" fill="var(--primary)" font-size="9" font-weight="600" text-anchor="middle">UCP 採購大腦</text>
                <text x="185" y="112" fill="var(--text-muted)" font-size="8" text-anchor="middle">詢價 / 購物車 / 訂單流</text>

                <path d="M 240 100 L 270 100" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow)" />

                <rect x="270" y="75" width="110" height="50" rx="8" fill="var(--success-bg)" stroke="var(--success-border)" stroke-width="1.5" />
                <text x="325" y="98" fill="var(--success-text)" font-size="9" font-weight="600" text-anchor="middle">AP2 安全錢包</text>
                <text x="325" y="112" fill="var(--success-text)" font-size="8" text-anchor="middle">Mandate 限額 / 期票簽章</text>
            `
        };

        // 繪製各章節流程圖
        function generateFlowchart(chapter) {
            const svg = document.getElementById('flowchart-svg');
            if (!svg) return;
            
            // 清理舊標記
            svg.innerHTML = `
            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text-muted)"/>
                </marker>
            </defs>
            <g id="flowchart-content-group">
                ${flowchartData[chapter.substring(0, 3)] || ''}
            </g>`;
        }

        // 流程圖 Pan & Zoom 實作
        let chartScale = 1;
        let chartX = 0;
        let chartY = 0;
        
        function initChartPanZoom() {
            const viewport = document.getElementById('chart-viewport');
            const svgContent = document.getElementById('flowchart-content-group');
            if (!viewport || !svgContent) return;

            let isDragging = false;
            let startX, startY;

            viewport.addEventListener('mousedown', (e) => {
                isDragging = true;
                viewport.style.cursor = 'grabbing';
                startX = e.clientX - chartX;
                startY = e.clientY - chartY;
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                chartX = e.clientX - startX;
                chartY = e.clientY - startY;
                updateChartTransform();
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
                if (viewport) viewport.style.cursor = 'grab';
            });

            viewport.addEventListener('wheel', (e) => {
                e.preventDefault();
                const zoomFactor = 1.1;
                if (e.deltaY < 0) {
                    chartScale *= zoomFactor;
                } else {
                    chartScale /= zoomFactor;
                }
                chartScale = Math.min(Math.max(chartScale, 0.5), 4.0);
                updateChartTransform();
            });
        }

        function updateChartTransform() {
            const svgContent = document.getElementById('flowchart-content-group');
            if (svgContent) {
                svgContent.setAttribute('transform', `translate(${chartX}, ${chartY}) scale(${chartScale})`);
            }
        }

        window.zoomChart = function(factor) {
            chartScale *= factor;
            chartScale = Math.min(Math.max(chartScale, 0.5), 4.0);
            updateChartTransform();
        }

        window.resetChartZoom = function() {
            chartScale = 1;
            chartX = 0;
            chartY = 0;
            updateChartTransform();
        }


        // ------------------ 播放器路由控制 ------------------
        function setMode(mode) {
            if (currentMode === mode) return;
            currentMode = mode;
            currentSlideIndex = 0;

            if (mode === 'overview') {
                btnOverview.classList.add('active');
                btnDetail.classList.remove('active');
                chapterSelector.style.display = 'none';
            } else {
                btnOverview.classList.remove('active');
                btnDetail.classList.add('active');
                chapterSelector.style.display = 'block';
            }

            renderSlide();
        }

        function navigateSlide(dir) {
            const slides = getCurrentSlides();
            const newIndex = currentSlideIndex + dir;
            if (newIndex >= 0 && newIndex < slides.length) {
                currentSlideIndex = newIndex;
                renderSlide();
                
                // 如果是詳細模式，同步章節下拉選單的選中狀態
                if (currentMode === 'detail' && currentSlideIndex !== 1) {
                    const slide = slides[currentSlideIndex];
                    syncChapterSelector(slide.chapter);
                }
            }
        }

        // 同步章節下拉選單選中狀態
        function syncChapterSelector(chapterName) {
            const cleanName = chapterName.substring(0, 3); // "第一章", "第二章"
            const options = chapterSelector.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].textContent.includes(cleanName)) {
                    chapterSelector.selectedIndex = i;
                    break;
                }
            }
        }

        // 綁定 DOM 事件
        btnOverview.addEventListener('click', () => setMode('overview'));
        btnDetail.addEventListener('click', () => setMode('detail'));
        btnPrev.addEventListener('click', () => navigateSlide(-1));
        btnNext.addEventListener('click', () => navigateSlide(1));

        // 章節選擇事件
        chapterSelector.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === 'all') {
                currentSlideIndex = 0;
                renderSlide();
                return;
            }
            
            // 找出對應章節的第一張投影片 index
            const targetCh = chapters.find(ch => ch.id === val);
            if (targetCh) {
                const cleanName = targetCh.name.split('：')[0]; // "第一章", "第二章"
                const idx = detailSlides.findIndex(s => s.chapter && s.chapter.includes(cleanName));
                if (idx !== -1) {
                    currentSlideIndex = idx;
                    renderSlide();
                }
            }
        });

        // 鍵盤控制
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                navigateSlide(1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigateSlide(-1);
            } else if (e.key.toLowerCase() === 'm') {
                // 切換章節目錄下拉
                chapterSelector.focus();
            } else if (e.key.toLowerCase() === 'f') {
                toggleFullscreen();
            }
        });

        // 深淺色主題切換
        btnTheme.addEventListener('click', () => {
            if (activeTheme === 'light') {
                document.body.setAttribute('data-theme', 'dark');
                activeTheme = 'dark';
                btnTheme.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
            } else {
                document.body.removeAttribute('data-theme');
                activeTheme = 'light';
                btnTheme.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a7 7 0 1 1-7.64-7.64c.44.06.9.1 1.36.1z"/></svg>`;
            }
            // 重新繪製當前投影片，以適應主題顏色
            renderSlide();
        });

        // 全螢幕切換
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`無法開啟全螢幕模式: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }
        btnFullscreen.addEventListener('click', toggleFullscreen);

        // 初始化
        initChapterSelector();
        chapterSelector.style.display = 'none'; // 預設 overview 隱藏目錄
        renderSlide();
    </script>
</body>
</html>
"""
    
    # 將投影片 JSON 數據嵌入到 HTML 對應的位置
    html_content = html_content.replace("__OVERVIEW_SLIDES__", json.dumps(overview_data, ensure_ascii=False))
    html_content = html_content.replace("__DETAIL_SLIDES__", json.dumps(detailed_slides, ensure_ascii=False))
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    print(f"成功產生 HTML 投影片檔案: {html_path}")
    print(f"總共寫入 {len(overview_data)} 張大綱投影片，以及 {len(detailed_slides)} 張詳細說明投影片！")

if __name__ == "__main__":
    main()
