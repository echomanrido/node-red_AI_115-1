# -*- coding: utf-8 -*-
"""
build_html.py
將 Anthropic《The AI-Native SDLC Playbook》所有大綱資料、章節流程圖與 220 頁詳細投影片
組裝為單一完全獨立、離線可用、深淺主題切換、支援 SVG 心智圖與流程圖拖曳縮放的 HTML 互動教學簡報系統。
"""
import json
import os
import shutil

import data_flowcharts
import data_overview
import data_chapters_1_to_5
import data_chapters_6_to_10
import data_chapters_11_to_15
import data_chapters_16_to_20

def generate_html():
    overview_slides = data_overview.overview_slides
    flowcharts = data_flowcharts.chapter_flowcharts
    
    detailed_slides = []
    detailed_slides.extend(data_chapters_1_to_5.detailed_slides_ch1_to_5)
    detailed_slides.extend(data_chapters_6_to_10.detailed_slides_ch6_to_10)
    detailed_slides.extend(data_chapters_11_to_15.detailed_slides_ch11_to_15)
    detailed_slides.extend(data_chapters_16_to_20.detailed_slides_ch16_to_20)

    print(f"Overview slides: {len(overview_slides)}")
    print(f"Detailed slides: {len(detailed_slides)}")
    print(f"Chapter flowcharts: {len(flowcharts)}")

    # 轉為 JSON 字串
    overview_json = json.dumps(overview_slides, ensure_ascii=False)
    detailed_json = json.dumps(detailed_slides, ensure_ascii=False)
    flowcharts_json = json.dumps(flowcharts, ensure_ascii=False)

    html_content = f'''<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>The AI-Native SDLC Playbook - 互動式教學簡報系統</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Anthropic《The AI-Native SDLC Playbook》互動式教學簡報系統，含 220+ 頁技術拆解、麥肯錫 SCQA 大綱模式、全域可縮放心智圖與各章 SVG 流程圖。">
  <style>
    :root {{
      --bg-main: #f1f5f9;
      --bg-card: #ffffff;
      --bg-item: #f8fafc;
      --border-color: #e2e8f0;
      --text-main: #1e293b;
      --text-muted: #64748b;
      --color-primary: #d97706; /* Anthropic Terracotta Gold */
      --color-primary-hover: #b45309;
      --color-accent-bg: #f0fdf4; /* 綠色生活化類比卡片 */
      --color-accent-border: #bbf7d0;
      --color-accent-text: #166534;
      --color-accent-icon: #22c55e;
      --color-badge-bg: #fef3c7;
      --color-badge-text: #92400e;
      --color-num-bg: #fef3c7;
      --color-num-text: #b45309;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }}

    [data-theme="dark"] {{
      --bg-main: #0f172a;
      --bg-card: #1e293b;
      --bg-item: #334155;
      --border-color: #475569;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --color-primary: #fbbf24;
      --color-primary-hover: #f59e0b;
      --color-accent-bg: #14532d;
      --color-accent-border: #15803d;
      --color-accent-text: #bbf7d0;
      --color-accent-icon: #4ade80;
      --color-badge-bg: #78350f;
      --color-badge-text: #fde68a;
      --color-num-bg: #78350f;
      --color-num-text: #fde68a;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", "Microsoft JhengHei", sans-serif;
      background-color: var(--bg-main);
      color: var(--text-main);
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: background-color 0.3s, color 0.3s;
    }}

    /* Header styling matching McKinsey/Anthropic aesthetic */
    header {{
      background-color: var(--bg-card);
      border-bottom: 1px solid var(--border-color);
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
      box-shadow: var(--shadow-sm);
      transition: background-color 0.3s, border-color 0.3s;
    }}

    .header-logo {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .logo-icon {{
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #d97706, #b45309);
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: bold;
      font-size: 15px;
      box-shadow: 0 2px 4px rgba(217, 119, 6, 0.3);
    }}

    .header-logo h1 {{
      font-size: 16px;
      font-weight: 700;
      color: var(--text-main);
      letter-spacing: -0.01em;
    }}

    .header-logo .version-badge {{
      font-size: 11px;
      font-weight: 600;
      background-color: var(--color-badge-bg);
      color: var(--color-badge-text);
      padding: 2px 8px;
      border-radius: 12px;
    }}

    /* Tabs in the header center */
    .tab-container {{
      display: flex;
      background-color: var(--bg-item);
      border: 1px solid var(--border-color);
      padding: 3px;
      border-radius: 8px;
      gap: 4px;
    }}

    .tab-btn {{
      padding: 6px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      background: none;
      color: var(--text-muted);
      transition: all 0.2s;
    }}

    .tab-btn.active {{
      background-color: var(--bg-card);
      color: var(--color-primary);
      box-shadow: var(--shadow-sm);
    }}

    .tab-btn:hover:not(.active) {{
      color: var(--text-main);
    }}

    .header-controls {{
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    /* Chapter select dropdown */
    .chapter-select {{
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 7px 12px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main);
      cursor: pointer;
      outline: none;
      min-width: 200px;
      max-width: 280px;
      transition: all 0.2s;
    }}

    .chapter-select:focus {{
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.15);
    }}

    .icon-btn {{
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      width: 36px;
      height: 36px;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: var(--text-main);
      transition: all 0.2s;
    }}

    .icon-btn:hover {{
      background-color: var(--bg-item);
      border-color: var(--text-muted);
    }}

    /* Main Container & Slide Layout */
    .main-container {{
      flex: 1;
      display: flex;
      overflow: hidden;
      position: relative;
    }}

    /* Slide Sidebar list */
    .sidebar {{
      width: 320px;
      background-color: var(--bg-card);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: margin-left 0.3s ease;
      z-index: 5;
    }}

    .sidebar.collapsed {{
      margin-left: -320px;
    }}

    .search-box {{
      padding: 12px;
      border-bottom: 1px solid var(--border-color);
    }}

    .search-input-wrapper {{
      position: relative;
      width: 100%;
    }}

    .search-input {{
      width: 100%;
      padding: 8px 12px 8px 34px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 13px;
      background-color: var(--bg-item);
      color: var(--text-main);
      outline: none;
      transition: border 0.2s;
    }}

    .search-input:focus {{
      border-color: var(--color-primary);
      background-color: var(--bg-card);
    }}

    .search-icon {{
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }}

    .sidebar-list {{
      flex: 1;
      overflow-y: auto;
      padding: 10px;
    }}

    .chapter-group {{
      margin-bottom: 12px;
    }}

    .chapter-header {{
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 6px 8px;
      margin-bottom: 2px;
      border-bottom: 1px solid var(--border-color);
    }}

    .page-item {{
      padding: 7px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--text-main);
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.15s;
      margin-bottom: 2px;
    }}

    .page-item:hover {{
      background-color: var(--bg-item);
      color: var(--color-primary);
    }}

    .page-item.active {{
      background-color: var(--color-badge-bg);
      color: var(--color-badge-text);
      font-weight: 600;
    }}

    .page-badge {{
      font-size: 10px;
      padding: 1px 5px;
      background-color: var(--bg-main);
      color: var(--text-muted);
      border-radius: 4px;
      font-weight: 600;
    }}

    .page-item.active .page-badge {{
      background-color: var(--color-primary);
      color: #ffffff;
    }}

    /* Slide area */
    .slide-area {{
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }}

    .slide-container-wrapper {{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      overflow-y: auto;
    }}

    /* The Presentation Card (matching the mockup) */
    .slide-card {{
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      width: 100%;
      max-width: 1240px;
      min-height: 640px;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-md);
      padding: 24px 28px;
      position: relative;
      transition: background-color 0.3s, border-color 0.3s;
    }}

    /* Top Meta Badge Row */
    .card-meta-row {{
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }}

    .chapter-badge {{
      background-color: var(--color-badge-bg);
      color: var(--color-badge-text);
      font-size: 11.5px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 9999px;
    }}

    .page-indicator-text {{
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 600;
    }}

    /* Slide Titles */
    .slide-title-block {{
      margin-bottom: 16px;
    }}

    .slide-title {{
      font-size: 22px;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.3;
      margin-bottom: 4px;
    }}

    .slide-subtitle {{
      font-size: 14px;
      font-weight: 600;
      color: var(--color-primary);
    }}

    /* Slide Content Columns */
    .slide-content-columns {{
      flex: 1;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 24px;
      margin-bottom: 16px;
    }}

    .left-col {{
      display: flex;
      flex-direction: column;
      gap: 14px;
    }}

    .right-col {{
      display: flex;
      flex-direction: column;
      gap: 16px;
    }}

    /* Points Header */
    .section-header {{
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }}

    .section-header::before {{
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--color-primary);
    }}

    /* Numbered boxes list (matching mockup) */
    .numbered-points-list {{
      display: flex;
      flex-direction: column;
      gap: 9px;
    }}

    .numbered-point-item {{
      display: flex;
      align-items: stretch;
      gap: 10px;
    }}

    .num-badge {{
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background-color: var(--color-num-bg);
      color: var(--color-num-text);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-weight: 700;
      flex-shrink: 0;
      margin-top: 3px;
    }}

    .point-text-box {{
      flex: 1;
      background-color: var(--bg-item);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      line-height: 1.5;
      font-weight: 500;
      color: var(--text-main);
    }}

    /* Metaphor card (matching green card in mockup) */
    .metaphor-card {{
      background-color: var(--color-accent-bg);
      border: 1px solid var(--color-accent-border);
      border-radius: 10px;
      padding: 14px 16px;
      box-shadow: var(--shadow-sm);
    }}

    .metaphor-header {{
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--color-accent-text);
      margin-bottom: 6px;
    }}

    .metaphor-icon {{
      color: var(--color-accent-icon);
      display: flex;
      align-items: center;
    }}

    .metaphor-text {{
      font-size: 12.5px;
      line-height: 1.5;
      color: var(--color-accent-text);
      font-weight: 500;
    }}

    /* Flowchart / Layout panel */
    .visual-layout-panel {{
      background-color: var(--bg-item);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      height: 100%;
    }}

    .visual-header-row {{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}

    .visual-title {{
      font-size: 11.5px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }}

    .visual-desc {{
      font-size: 12px;
      line-height: 1.4;
      color: var(--text-muted);
    }}

    .flowchart-wrapper {{
      flex: 1;
      min-height: 240px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background-color: #ffffff;
      overflow: hidden;
      cursor: grab;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }}

    /* Card Bottom Control bar */
    .card-bottom-bar {{
      border-top: 1px solid var(--border-color);
      padding-top: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12.5px;
    }}

    .shortcut-tips {{
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .key-badge {{
      background-color: var(--bg-item);
      border: 1px solid var(--border-color);
      padding: 1px 5px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 11px;
      font-weight: 600;
    }}

    .slide-counter {{
      font-weight: 700;
      color: var(--text-main);
    }}

    .slide-counter span {{
      color: var(--color-primary);
    }}

    .nav-btns {{
      display: flex;
      gap: 8px;
    }}

    .nav-btn {{
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 7px 14px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-main);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s;
    }}

    .nav-btn:hover:not(:disabled) {{
      background-color: var(--bg-item);
      border-color: var(--text-muted);
    }}

    .nav-btn:disabled {{
      opacity: 0.4;
      cursor: not-allowed;
    }}

    /* Fullscreen Mindmap Outer (Slide 2 in Overview) */
    .mindmap-outer-container {{
      flex: 1;
      height: 100%;
      min-height: 520px;
      position: relative;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
      background-color: #f8fafc;
    }}

    .mindmap-controls {{
      position: absolute;
      top: 10px;
      left: 10px;
      display: flex;
      gap: 6px;
      z-index: 15;
    }}

    .mindmap-control-btn {{
      width: 28px;
      height: 28px;
      border-radius: 4px;
      background-color: #ffffff;
      border: 1px solid #cbd5e1;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      color: var(--text-main);
      transition: all 0.2s;
      box-shadow: var(--shadow-sm);
    }}

    .mindmap-control-btn:hover {{
      border-color: var(--color-primary);
      color: var(--color-primary);
    }}

    .mindmap-tooltip {{
      position: absolute;
      bottom: 12px;
      right: 12px;
      background-color: rgba(15, 23, 42, 0.95);
      color: #ffffff;
      padding: 12px 14px;
      border-radius: 8px;
      max-width: 320px;
      font-size: 12px;
      line-height: 1.5;
      pointer-events: none;
      z-index: 15;
      display: none;
      box-shadow: var(--shadow-lg);
    }}

    .mindmap-tooltip-title {{
      font-weight: 700;
      color: #fbbf24;
      margin-bottom: 4px;
      font-size: 13px;
    }}

    .link-active {{
      stroke: #d97706 !important;
      stroke-width: 3.5px !important;
      filter: drop-shadow(0 0 4px rgba(217, 119, 6, 0.6));
    }}

    .node-active {{
      stroke: #d97706 !important;
      stroke-width: 3px !important;
      filter: drop-shadow(0 0 6px rgba(217, 119, 6, 0.5));
    }}

    /* Code block styling in slides */
    pre code {{
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
    }}
  </style>
</head>
<body data-theme="light">

  <header>
    <div class="header-logo">
      <div class="logo-icon">C</div>
      <div>
        <h1>The AI-Native SDLC Playbook</h1>
      </div>
      <span class="version-badge">Anthropic Official Engineering</span>
    </div>
    
    <!-- Tab container: Overview vs Detailed -->
    <div class="tab-container">
      <button class="tab-btn" id="tab-overview" onclick="switchMode('overview')">簡報大綱 (Overview)</button>
      <button class="tab-btn active" id="tab-detailed" onclick="switchMode('detailed')">詳細說明 (220+ Slides)</button>
    </div>
    
    <div class="header-controls">
      <!-- Chapter Dropdown -->
      <select class="chapter-select" id="chapter-select" onchange="handleChapterSelect(this.value)">
        <option value="all">所有章節導覽 (20 章)</option>
        <option value="1">第 1 章：範式轉移 (Paradigm Shift)</option>
        <option value="2">第 2 章：核心原則 (Core Principles)</option>
        <option value="3">第 3 章：CLAUDE.md 憲章規範</option>
        <option value="4">第 4 章：自訂斜線指令 (Custom Commands)</option>
        <option value="5">第 5 章：專有工具擴展 (MCP Extensibility)</option>
        <option value="6">第 6 章：安全防護網 (Hooks & Safeguards)</option>
        <option value="7">第 7 章：Stage 1: Inception (意圖對齊)</option>
        <option value="8">第 8 章：Stage 2: Design (原型驗證)</option>
        <option value="9">第 9 章：Stage 3: Plan (計畫拆解)</option>
        <option value="10">第 10 章：Stage 3: Plan (Subagents & Tasks)</option>
        <option value="11">第 11 章：Stage 4: Test (反饋迴圈)</option>
        <option value="12">第 12 章：Stage 4: Test (CI 持續評測)</option>
        <option value="13">第 13 章：Stage 5: Deploy (PR 審查循環)</option>
        <option value="14">第 14 章：Stage 5: Deploy (零停機發佈)</option>
        <option value="15">第 15 章：Stage 5: Deploy (藍綠灰度部署)</option>
        <option value="16">第 16 章：Stage 6: Maintain (閉環修復)</option>
        <option value="17">第 17 章：Stage 6: Maintain (定期弱點掃描)</option>
        <option value="18">第 18 章：Stage 6: Maintain (線上值班與除錯)</option>
        <option value="19">第 19 章：Enterprise Governance (企業治理與路線圖)</option>
        <option value="20">第 20 章：Future Vision (自主軟體製造工廠)</option>
      </select>

      <!-- Sidebar toggler (Grid icon) -->
      <button class="icon-btn" id="grid-btn" title="檢索大綱清單 (M)" onclick="toggleSidebar()">
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>

      <!-- Theme button -->
      <button class="icon-btn" id="theme-btn" title="切換深淺主題 (D)" onclick="toggleTheme()">
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
      </button>

      <!-- Fullscreen button -->
      <button class="icon-btn" id="fullscreen-btn" title="全螢幕模式 (F)" onclick="toggleFullscreen()">
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4h4M4 16v4h4M20 8V4h-4M20 16v4h-4"></path></svg>
      </button>
    </div>
  </header>

  <div class="main-container">
    <!-- Sidebar Drawer (Grid slides list) -->
    <div class="sidebar collapsed" id="sidebar">
      <div class="search-box">
        <div class="search-input-wrapper">
          <svg class="search-icon" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" class="search-input" id="search-input" placeholder="搜尋主題、關鍵字或頁碼..." oninput="handleSearch()">
        </div>
      </div>
      <div class="sidebar-list" id="sidebar-list">
        <!-- Injected dynamically -->
      </div>
    </div>

    <!-- Presentation Area -->
    <div class="slide-area">
      <div class="slide-container-wrapper">
        <div class="slide-card" id="slide-card">
          <!-- Slide Content Injected Here -->
        </div>
      </div>
    </div>
  </div>

  <script>
    const overviewSlides = {overview_json};
    const detailedSlides = {detailed_json};
    const flowcharts = {flowcharts_json};

    let currentMode = 'detailed'; // 'overview' or 'detailed'
    let currentDetailedIdx = 0;
    let currentOverviewIdx = 0;

    let flowchartTransform = {{ x: 0, y: 0, scale: 1 }};
    let mindmapTransform = {{ x: 0, y: 0, scale: 1 }};

    // 初始化載入
    document.addEventListener("DOMContentLoaded", () => {{
      buildSidebar();
      renderSlide();
      setupKeyboardShortcuts();
    }});

    // 切換模式：大綱 vs 詳細
    function switchMode(mode) {{
      currentMode = mode;
      document.getElementById("tab-overview").classList.toggle("active", mode === 'overview');
      document.getElementById("tab-detailed").classList.toggle("active", mode === 'detailed');
      buildSidebar();
      renderSlide();
    }}

    // 切換章節下拉選單
    function handleChapterSelect(chVal) {{
      if (chVal === 'all') return;
      const targetCh = parseInt(chVal);
      
      if (currentMode === 'overview') {{
        switchMode('detailed');
      }}
      
      const targetIdx = detailedSlides.findIndex(s => s.chapter_id === targetCh);
      if (targetIdx !== -1) {{
        currentDetailedIdx = targetIdx;
        renderSlide();
      }}
    }}

    // 建構側邊欄列表
    function buildSidebar() {{
      const listContainer = document.getElementById("sidebar-list");
      listContainer.innerHTML = "";

      const slides = (currentMode === 'detailed') ? detailedSlides : overviewSlides;

      // Group by chapter
      const groups = {{}};
      slides.forEach((slide, idx) => {{
        const chName = slide.chapter_name || `Chapter ${{slide.chapter_id}}`;
        if (!groups[chName]) groups[chName] = [];
        groups[chName].push({{ slide, idx }});
      }});

      for (const [chName, items] of Object.entries(groups)) {{
        const groupDiv = document.createElement("div");
        groupDiv.className = "chapter-group";

        const headerDiv = document.createElement("div");
        headerDiv.className = "chapter-header";
        headerDiv.textContent = chName;
        groupDiv.appendChild(headerDiv);

        items.forEach(item => {{
          const itemDiv = document.createElement("div");
          itemDiv.className = `page-item page-item-${{item.idx}}`;
          
          const currentIdx = (currentMode === 'detailed') ? currentDetailedIdx : currentOverviewIdx;
          if (item.idx === currentIdx) itemDiv.classList.add("active");

          itemDiv.onclick = () => {{
            if (currentMode === 'detailed') {{
              currentDetailedIdx = item.idx;
            }} else {{
              currentOverviewIdx = item.idx;
            }}
            renderSlide();
          }};

          const titleSpan = document.createElement("span");
          titleSpan.style.overflow = "hidden";
          titleSpan.style.textOverflow = "ellipsis";
          titleSpan.style.whiteSpace = "nowrap";
          titleSpan.style.marginRight = "8px";
          titleSpan.textContent = item.slide.title;

          const badgeSpan = document.createElement("span");
          badgeSpan.className = "page-badge";
          badgeSpan.textContent = `P.${{item.slide.page_num}}`;

          itemDiv.appendChild(titleSpan);
          itemDiv.appendChild(badgeSpan);
          groupDiv.appendChild(itemDiv);
        }});

        listContainer.appendChild(groupDiv);
      }}
    }}

    // 渲染投影片
    function renderSlide() {{
      const card = document.getElementById("slide-card");
      const slides = (currentMode === 'detailed') ? detailedSlides : overviewSlides;
      const idx = (currentMode === 'detailed') ? currentDetailedIdx : currentOverviewIdx;
      const slide = slides[idx];

      if (!slide) return;

      // 更新側邊欄高亮
      document.querySelectorAll(".page-item").forEach(el => el.classList.remove("active"));
      const activeItem = document.querySelector(`.page-item-${{idx}}`);
      if (activeItem) {{
        activeItem.classList.add("active");
        activeItem.scrollIntoView({{ block: "nearest", behavior: "smooth" }});
      }}

      // 更新 Header 下拉選單同步
      const chSelect = document.getElementById("chapter-select");
      if (chSelect && slide.chapter_id) {{
        chSelect.value = slide.chapter_id.toString();
      }}

      // 檢查是否為大綱第 2 頁心智圖特殊處理
      if (currentMode === 'overview' && slide.is_mindmap) {{
        renderMindmapSlide(card, slide, idx, slides.length);
        return;
      }}

      // 一般投影片渲染
      const currentChapterFlowchart = flowcharts[slide.chapter_id] || "";

      let detailsHtml = "";
      if (Array.isArray(slide.details)) {{
        detailsHtml = slide.details.map((d, i) => `
          <div class="numbered-point-item">
            <div class="num-badge">${{i + 1}}</div>
            <div class="point-text-box">${{d}}</div>
          </div>
        `).join("");
      }}

      let metaphorHtml = "";
      if (slide.metaphor) {{
        metaphorHtml = `
          <div class="metaphor-card">
            <div class="metaphor-header">
              <span class="metaphor-icon">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.9-7.898 4 4 0 017.8 0A4 4 0 0112 14z" />
                </svg>
              </span>
              <span>實務概念類比 (Conceptual Metaphor)</span>
            </div>
            <div class="metaphor-text">${{slide.metaphor}}</div>
          </div>
        `;
      }}

      let rightColContent = "";
      if (currentChapterFlowchart) {{
        rightColContent = `
          <div class="visual-layout-panel">
            <div class="visual-header-row">
              <span class="visual-title">章節架構流程圖 (Flowchart)</span>
              <button class="mindmap-control-btn" style="width:22px;height:22px;font-size:11px;" title="重置縮放" onclick="resetFlowchartZoom()">↺</button>
            </div>
            <div class="visual-desc">${{slide.layout || "滾輪縮放、拖曳平移觀察各階段架構演進"}}</div>
            <div class="flowchart-wrapper" id="flowchart-wrapper">
              ${{currentChapterFlowchart}}
            </div>
          </div>
        `;
      }} else {{
        rightColContent = `
          <div class="visual-layout-panel">
            <span class="visual-title">視覺版面設計與配置建言</span>
            <div class="visual-desc" style="font-size:13px;line-height:1.6;color:var(--text-main);margin-top:10px;">${{slide.layout || "暫無特別排版說明"}}</div>
          </div>
        `;
      }}

      card.innerHTML = `
        <div class="card-meta-row">
          <span class="chapter-badge">${{slide.chapter_name || `Chapter ${{slide.chapter_id}}`}}</span>
          <span class="page-indicator-text">Page ${{slide.page_num}}</span>
        </div>

        <div class="slide-title-block">
          <h2 class="slide-title">${{slide.title}}</h2>
          <div class="slide-subtitle">${{slide.subtitle || slide.takeaway || ""}}</div>
        </div>

        <div class="slide-content-columns">
          <div class="left-col">
            <div class="section-header">關鍵核心技術要點 (Core Takeaways)</div>
            <div class="numbered-points-list">
              ${{detailsHtml}}
            </div>
            ${{metaphorHtml}}
          </div>
          <div class="right-col">
            ${{rightColContent}}
          </div>
        </div>

        <div class="card-bottom-bar">
          <div class="shortcut-tips">
            <span>快捷鍵：</span>
            <span><kbd class="key-badge">←</kbd> <kbd class="key-badge">→</kbd> 翻頁</span>
            <span><kbd class="key-badge">M</kbd> 目錄</span>
            <span><kbd class="key-badge">D</kbd> 主題</span>
            <span><kbd class="key-badge">F</kbd> 全螢幕</span>
          </div>
          <div class="slide-counter">
            <span>${{idx + 1}}</span> / ${{slides.length}}
          </div>
          <div class="nav-btns">
            <button class="nav-btn" onclick="prevSlide()" ${{idx === 0 ? 'disabled' : ''}}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
              上一頁
            </button>
            <button class="nav-btn" onclick="nextSlide()" ${{idx === slides.length - 1 ? 'disabled' : ''}}>
              下一頁
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      `;

      if (currentChapterFlowchart) {{
        setupFlowchartInteraction();
      }}
    }}

    // 大綱第 2 頁心智圖渲染
    function renderMindmapSlide(card, slide, idx, totalCount) {{
      card.innerHTML = `
        <div class="card-meta-row">
          <span class="chapter-badge">全書架構導覽</span>
          <span class="page-indicator-text">Overview Mindmap (Slide 2)</span>
        </div>

        <div class="slide-title-block" style="margin-bottom:10px;">
          <h2 class="slide-title">${{slide.title}}</h2>
          <div class="slide-subtitle">${{slide.subtitle}}</div>
        </div>

        <div class="mindmap-outer-container" id="mindmap-svg-wrapper">
          <div class="mindmap-controls">
            <button class="mindmap-control-btn" title="放大" onclick="zoomMindmap(1.2)">+</button>
            <button class="mindmap-control-btn" title="縮小" onclick="zoomMindmap(0.8)">-</button>
            <button class="mindmap-control-btn" title="重置" onclick="resetMindmap()">↺</button>
          </div>
          
          <div class="mindmap-tooltip" id="mindmap-tooltip">
            <div class="mindmap-tooltip-title" id="mm-title">模組標題</div>
            <div id="mm-desc">模組詳細說明文字...</div>
            <div style="font-size:10px;color:#94a3b8;margin-top:4px;">💡 提示：點擊節點可直接跳轉至該章詳細投影片</div>
          </div>

          ${{slide.svg_content}}
        </div>

        <div class="card-bottom-bar" style="margin-top:10px;">
          <div class="shortcut-tips">
            <span>操作指南：滑鼠拖曳平移、滾輪縮放、懸停高亮連線、點擊節點跳轉各章</span>
          </div>
          <div class="slide-counter">
            <span>${{idx + 1}}</span> / ${{totalCount}}
          </div>
          <div class="nav-btns">
            <button class="nav-btn" onclick="prevSlide()" ${{idx === 0 ? 'disabled' : ''}}>上一頁</button>
            <button class="nav-btn" onclick="nextSlide()" ${{idx === totalCount - 1 ? 'disabled' : ''}}>下一頁</button>
          </div>
        </div>
      `;

      setupMindmapInteraction();
    }}

    // 下一頁
    function nextSlide() {{
      if (currentMode === 'detailed') {{
        if (currentDetailedIdx < detailedSlides.length - 1) {{
          currentDetailedIdx++;
          renderSlide();
        }}
      }} else {{
        if (currentOverviewIdx < overviewSlides.length - 1) {{
          currentOverviewIdx++;
          renderSlide();
        }}
      }}
    }}

    // 上一頁
    function prevSlide() {{
      if (currentMode === 'detailed') {{
        if (currentDetailedIdx > 0) {{
          currentDetailedIdx--;
          renderSlide();
        }}
      }} else {{
        if (currentOverviewIdx > 0) {{
          currentOverviewIdx--;
          renderSlide();
        }}
      }}
    }}

    // 搜尋功能
    function handleSearch() {{
      const query = document.getElementById("search-input").value.toLowerCase();
      const groups = document.querySelectorAll(".chapter-group");
      const slides = (currentMode === 'detailed') ? detailedSlides : overviewSlides;

      slides.forEach((slide, idx) => {{
        const node = document.querySelector(`.page-item-${{idx}}`);
        if (!node) return;

        const matchTitle = slide.title.toLowerCase().includes(query);
        const matchSubtitle = (slide.subtitle || "").toLowerCase().includes(query);
        const matchTakeaway = (slide.takeaway || "").toLowerCase().includes(query);
        const matchPage = slide.page_num.toString() === query;
        const matchDetails = Array.isArray(slide.details) && slide.details.some(d => d.toLowerCase().includes(query));

        if (matchTitle || matchSubtitle || matchTakeaway || matchPage || matchDetails || query === '') {{
          node.style.display = 'flex';
        }} else {{
          node.style.display = 'none';
        }}
      }});

      groups.forEach(group => {{
        const visibleItems = group.querySelectorAll('.page-item[style*="display: flex"], .page-item:not([style])');
        if (visibleItems.length === 0 && query !== '') {{
          group.style.display = 'none';
        }} else {{
          group.style.display = 'block';
        }}
      }});
    }}

    // 流程圖互動 (拖曳平移與滾輪縮放)
    function resetFlowchartZoom() {{
      const svg = document.querySelector(".flowchart-wrapper svg");
      if (svg) {{
        flowchartTransform = {{ x: 0, y: 0, scale: 1 }};
        svg.style.transform = 'translate(0px, 0px) scale(1)';
      }}
    }}

    function setupFlowchartInteraction() {{
      const wrapper = document.getElementById("flowchart-wrapper");
      if (!wrapper) return;
      const svg = wrapper.querySelector("svg");
      if (!svg) return;

      let dragging = false;
      let start = {{ x: 0, y: 0 }};

      svg.style.transition = "transform 0.08s ease-out";
      svg.style.transformOrigin = "center center";

      wrapper.onmousedown = (e) => {{
        dragging = true;
        start = {{ x: e.clientX - flowchartTransform.x, y: e.clientY - flowchartTransform.y }};
        wrapper.style.cursor = "grabbing";
      }};

      window.onmousemove = (e) => {{
        if (!dragging) return;
        flowchartTransform.x = e.clientX - start.x;
        flowchartTransform.y = e.clientY - start.y;
        svg.style.transform = `translate(${{flowchartTransform.x}}px, ${{flowchartTransform.y}}px) scale(${{flowchartTransform.scale}})`;
      }};

      window.onmouseup = () => {{
        dragging = false;
        if (wrapper) wrapper.style.cursor = "grab";
      }};

      wrapper.onwheel = (e) => {{
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.12 : 0.88;
        flowchartTransform.scale *= factor;
        flowchartTransform.scale = Math.max(0.5, Math.min(3.5, flowchartTransform.scale));
        svg.style.transform = `translate(${{flowchartTransform.x}}px, ${{flowchartTransform.y}}px) scale(${{flowchartTransform.scale}})`;
      }};
    }}

    // 心智圖互動 (縮放、平移、懸停連線高亮、點擊跳轉)
    function zoomMindmap(factor) {{
      const container = document.getElementById("mindmap-container");
      if (!container) return;
      mindmapTransform.scale *= factor;
      mindmapTransform.scale = Math.max(0.4, Math.min(3.5, mindmapTransform.scale));
      container.setAttribute("transform", `translate(${{mindmapTransform.x}}, ${{mindmapTransform.y}}) scale(${{mindmapTransform.scale}})`);
    }}

    function resetMindmap() {{
      const container = document.getElementById("mindmap-container");
      if (!container) return;
      mindmapTransform = {{ x: 0, y: 0, scale: 1 }};
      container.setAttribute("transform", `translate(0, 0) scale(1)`);
    }}

    function setupMindmapInteraction() {{
      const wrapper = document.getElementById("mindmap-svg-wrapper");
      const container = document.getElementById("mindmap-container");
      if (!wrapper || !container) return;

      let dragging = false;
      let start = {{ x: 0, y: 0 }};

      wrapper.onmousedown = (e) => {{
        if (e.target.closest('.ch-node-group')) return;
        dragging = true;
        start = {{ x: e.clientX - mindmapTransform.x, y: e.clientY - mindmapTransform.y }};
        wrapper.style.cursor = "grabbing";
      }};

      window.onmousemove = (e) => {{
        if (!dragging) return;
        mindmapTransform.x = e.clientX - start.x;
        mindmapTransform.y = e.clientY - start.y;
        container.setAttribute("transform", `translate(${{mindmapTransform.x}}, ${{mindmapTransform.y}}) scale(${{mindmapTransform.scale}})`);
      }};

      window.onmouseup = () => {{
        dragging = false;
        if (wrapper) wrapper.style.cursor = "grab";
      }};

      wrapper.onwheel = (e) => {{
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        zoomMindmap(factor);
      }};

      // 節點懸停與點擊跳轉
      const nodeGroups = document.querySelectorAll(".ch-node-group");
      const tooltip = document.getElementById("mindmap-tooltip");
      const mmTitle = document.getElementById("mm-title");
      const mmDesc = document.getElementById("mm-desc");

      const nodeInfoText = {{
        "1": "探討傳統手寫代碼模式向 AI 原生架構驅動的百年範式轉移，開發者轉變為高階指揮官。",
        "2": "Anthropic 官方五大核心工程哲學：Small Loops、Clean Context、Spec-Driven 等原則。",
        "3": "專案代碼庫的最高治理憲章：如何撰寫高品質、可自動驗證的 CLAUDE.md。",
        "4": "自訂命令與自適應工作流：封裝重複任務與多步驟編排的斜線指令架構。",
        "5": "Model Context Protocol：打破模型孤島，連接本地工具、資料庫與外部 API 的標準協議。",
        "6": "安全防護網：Pre/Post Tool Use Hooks 與不可篡改的安全審查防火牆體系。",
        "7": "Stage 1 概念構思：從模糊需求到確定性 intent.md 與需求澄清對齊。",
        "8": "Stage 2 原型設計：極速打造可交互原型、視覺驗證與消除歧義的反饋閉環。",
        "9": "Stage 3 系統架構：編寫嚴謹的 spec.md 與可落地的 plan.md 實施藍圖。",
        "10": "Stage 3 任務編排：Subagents 隔離分工與 Tasks 模組化自主推進機制。",
        "11": "Stage 4 驗證閉環：Non-zero 退出碼、TDD 失敗測試先行與自我驗證循環。",
        "12": "Stage 4 持續評測：在 CI 中運行 Continuous Evals，建立永不磨損的模型度量衡。",
        "13": "Stage 5 程式碼審查：託管審查服務、REVIEW.md 憲章與 @claude 互動修復循環。",
        "14": "Stage 5 自動化部署：自動化部署流水線配置、發佈守護與異常快速回滾。",
        "15": "Stage 5 進階發佈：藍綠部署、金絲雀灰度發佈與全自動健康監控網。",
        "16": "Stage 6 線上維護：從線上異常警報自動定位修復並建立長效防範措施。",
        "17": "Stage 6 定期掃描：代碼漂移與模型躍遷下的全自動週期性弱點檢測巡檢。",
        "18": "Stage 6 即時除錯：在 Slack/PagerDuty 中透過 Claude Tag 即時召喚值班專家救火。",
        "19": "企業級治理架構：Zero Data Retention 隱私、MCP 沙盒授權與四階段落地轉型路線圖。",
        "20": "未來願景展望：多 Agent 集群協同、自癒演化代碼庫與自主軟體製造工廠。"
      }};

      nodeGroups.forEach(group => {{
        const chId = group.getAttribute("data-ch");

        group.onmouseenter = () => {{
          const linksStr = group.getAttribute("data-links") || "";
          const linkIds = linksStr.split(",");
          linkIds.forEach(id => {{
            const path = document.getElementById(id.trim());
            if (path) path.classList.add("link-active");
          }});
          const rect = group.querySelector("rect");
          if (rect) rect.classList.add("node-active");

          const textEl = group.querySelector("text");
          if (textEl) mmTitle.textContent = textEl.textContent;
          mmDesc.textContent = nodeInfoText[chId] || "點擊跳轉至該章詳細投影片。";
          tooltip.style.display = "block";
        }};

        group.onmouseleave = () => {{
          const linksStr = group.getAttribute("data-links") || "";
          const linkIds = linksStr.split(",");
          linkIds.forEach(id => {{
            const path = document.getElementById(id.trim());
            if (path) path.classList.remove("link-active");
          }});
          const rect = group.querySelector("rect");
          if (rect) rect.classList.remove("node-active");
          tooltip.style.display = "none";
        }};

        group.onclick = () => {{
          const firstSlideIdx = detailedSlides.findIndex(s => s.chapter_id.toString() === chId);
          if (firstSlideIdx !== -1) {{
            currentDetailedIdx = firstSlideIdx;
            switchMode('detailed');
          }}
        }};
      }});
    }}

    // 鍵盤快捷鍵
    function setupKeyboardShortcuts() {{
      window.addEventListener("keydown", (e) => {{
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

        if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {{
          e.preventDefault();
          nextSlide();
        }} else if (e.key === "ArrowLeft" || e.key === "PageUp") {{
          e.preventDefault();
          prevSlide();
        }} else if (e.key.toLowerCase() === "m") {{
          toggleSidebar();
        }} else if (e.key.toLowerCase() === "d") {{
          toggleTheme();
        }} else if (e.key.toLowerCase() === "f") {{
          toggleFullscreen();
        }}
      }});
    }}

    // 切換側邊欄
    function toggleSidebar() {{
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("collapsed");
    }}

    // 切換主題 (深色 / 淺色)
    function toggleTheme() {{
      const currentTheme = document.body.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      document.body.setAttribute("data-theme", nextTheme);
    }}

    // 全螢幕切換
    function toggleFullscreen() {{
      if (!document.fullscreenElement) {{
        document.documentElement.requestFullscreen().catch(() => {{}});
      }} else {{
        if (document.exitFullscreen) {{
          document.exitFullscreen();
        }}
      }}
    }}
  </script>
</body>
</html>
'''

    out_file = r"D:\00000.知識\Claude_The AI-Native SDLC playbook\Claude_The_AI-Native_SDLC_playbook_Slides.html"
    index_file = r"D:\00000.知識\Claude_The AI-Native SDLC playbook\index.html"

    with open(out_file, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Generated successfully: {out_file} ({os.path.getsize(out_file):,} bytes)")

    shutil.copyfile(out_file, index_file)
    print(f"Copied to: {index_file} ({os.path.getsize(index_file):,} bytes)")

if __name__ == "__main__":
    generate_html()
