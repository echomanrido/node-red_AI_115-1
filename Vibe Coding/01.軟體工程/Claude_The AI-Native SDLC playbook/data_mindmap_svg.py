# -*- coding: utf-8 -*-
mindmap_svg = """<svg id="mindmap-svg" viewBox="0 0 1400 850" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="cursor: grab; transition: transform 0.08s ease-out;">
  <defs>
    <filter id="node-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.08" />
    </filter>
    <filter id="center-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#d97706" flood-opacity="0.25" />
    </filter>
    <linearGradient id="center-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="stage-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#f1f5f9" />
    </linearGradient>
  </defs>

  <g id="mindmap-container" transform="translate(0, 0) scale(1)">
    <!-- 連接線組 (Background Links) -->
    <g id="mindmap-links" stroke="#cbd5e1" stroke-width="2" fill="none" stroke-linecap="round">
      <!-- 中心到 6 大階段 -->
      <path id="link-center-s1" d="M 770 400 C 830 380, 850 320, 890 300" />
      <path id="link-center-s2" d="M 800 425 C 860 425, 900 425, 940 425" />
      <path id="link-center-s3" d="M 770 450 C 830 470, 850 530, 890 550" />
      <path id="link-center-s4" d="M 630 450 C 570 470, 550 530, 510 550" />
      <path id="link-center-s5" d="M 600 425 C 540 425, 500 425, 460 425" />
      <path id="link-center-s6" d="M 630 400 C 570 380, 550 320, 510 300" />

      <!-- Stage 1 延伸 -->
      <path id="link-ch-7" d="M 990 280 C 1050 250, 1080 200, 1140 180" />
      <path id="link-ch-8" d="M 1010 300 C 1070 290, 1100 270, 1150 260" />

      <!-- Stage 2 / 3 延伸 -->
      <path id="link-ch-3" d="M 1040 410 C 1100 390, 1120 370, 1160 350" />
      <path id="link-ch-4" d="M 1050 425 C 1100 425, 1120 425, 1160 425" />
      <path id="link-ch-5" d="M 1040 440 C 1100 460, 1120 480, 1160 500" />
      <path id="link-ch-9" d="M 1000 560 C 1060 580, 1090 610, 1140 630" />
      <path id="link-ch-10" d="M 970 580 C 1020 620, 1040 670, 1060 700" />

      <!-- Stage 4 延伸 -->
      <path id="link-ch-11" d="M 520 580 C 580 640, 640 690, 690 720" />
      <path id="link-ch-12" d="M 460 580 C 430 630, 420 670, 430 710" />

      <!-- Stage 5 延伸 -->
      <path id="link-ch-6" d="M 400 450 C 340 500, 280 570, 240 620" />
      <path id="link-ch-13" d="M 370 440 C 310 460, 270 480, 210 500" />
      <path id="link-ch-14" d="M 360 425 C 300 425, 270 425, 210 425" />
      <path id="link-ch-15" d="M 370 410 C 310 380, 270 360, 210 340" />

      <!-- Stage 6 延伸 -->
      <path id="link-ch-16" d="M 410 290 C 340 270, 300 240, 250 210" />
      <path id="link-ch-17" d="M 440 270 C 390 220, 370 180, 360 140" />
      <path id="link-ch-18" d="M 480 260 C 490 200, 500 170, 510 130" />

      <!-- 全局與理論節點 (Ch 1, 2, 19, 20) -->
      <path id="link-ch-1" d="M 660 380 C 640 330, 620 300, 600 260" />
      <path id="link-ch-2" d="M 740 380 C 760 330, 780 300, 800 260" />
      <path id="link-ch-19" d="M 680 370 C 680 260, 690 190, 700 130" />
      <path id="link-ch-20" d="M 750 370 C 800 260, 840 180, 880 130" />

      <!-- 跨階段閉環連線 (Cross-Stage Feedback Loops: 虛線箭頭) -->
      <path d="M 230 200 C 200 150, 200 100, 500 80 C 800 60, 1100 100, 1150 160" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,4" />
      <path d="M 690 740 C 750 780, 850 780, 950 740 C 1050 700, 1120 660, 1140 630" stroke="#10b981" stroke-width="2" stroke-dasharray="6,4" />
    </g>

    <!-- 中心核心節點 (Core Center Node) -->
    <g id="center-node" transform="translate(600, 385)">
      <rect width="200" height="80" rx="14" fill="url(#center-grad)" stroke="#d97706" stroke-width="3" filter="url(#center-glow)" />
      <text x="100" y="34" fill="#fbbf24" font-size="15" font-weight="700" text-anchor="middle">AI-Native SDLC</text>
      <text x="100" y="54" fill="#e2e8f0" font-size="12" font-weight="500" text-anchor="middle">Anthropic 官方工程架構</text>
    </g>

    <!-- 第一層：6 大階段節點 (Primary Stage Nodes) -->
    <!-- Stage 1: Inception -->
    <g class="stage-node-group" transform="translate(890, 265)">
      <rect width="130" height="50" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" filter="url(#node-shadow)" />
      <text x="65" y="22" fill="#1d4ed8" font-size="11.5" font-weight="700" text-anchor="middle">Stage 1: Inception</text>
      <text x="65" y="38" fill="#475569" font-size="10" font-weight="600" text-anchor="middle">概念構思與對齊</text>
    </g>

    <!-- Stage 2: Design -->
    <g class="stage-node-group" transform="translate(940, 400)">
      <rect width="130" height="50" rx="10" fill="#f5f3ff" stroke="#8b5cf6" stroke-width="2" filter="url(#node-shadow)" />
      <text x="65" y="22" fill="#6d28d9" font-size="11.5" font-weight="700" text-anchor="middle">Stage 2: Design</text>
      <text x="65" y="38" fill="#475569" font-size="10" font-weight="600" text-anchor="middle">原型驗證與消除歧義</text>
    </g>

    <!-- Stage 3: Plan & Build -->
    <g class="stage-node-group" transform="translate(890, 535)">
      <rect width="130" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2" filter="url(#node-shadow)" />
      <text x="65" y="22" fill="#047857" font-size="11.5" font-weight="700" text-anchor="middle">Stage 3: Plan &amp; Build</text>
      <text x="65" y="38" fill="#475569" font-size="10" font-weight="600" text-anchor="middle">雙模構建與任務編排</text>
    </g>

    <!-- Stage 4: Test -->
    <g class="stage-node-group" transform="translate(410, 535)">
      <rect width="130" height="50" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" filter="url(#node-shadow)" />
      <text x="65" y="22" fill="#b45309" font-size="11.5" font-weight="700" text-anchor="middle">Stage 4: Test</text>
      <text x="65" y="38" fill="#475569" font-size="10" font-weight="600" text-anchor="middle">反饋迴圈與持續評測</text>
    </g>

    <!-- Stage 5: Deploy -->
    <g class="stage-node-group" transform="translate(360, 400)">
      <rect width="130" height="50" rx="10" fill="#fae8ff" stroke="#d946ef" stroke-width="2" filter="url(#node-shadow)" />
      <text x="65" y="22" fill="#a21caf" font-size="11.5" font-weight="700" text-anchor="middle">Stage 5: Deploy</text>
      <text x="65" y="38" fill="#475569" font-size="10" font-weight="600" text-anchor="middle">代碼審查與守護發佈</text>
    </g>

    <!-- Stage 6: Maintain -->
    <g class="stage-node-group" transform="translate(410, 265)">
      <rect width="130" height="50" rx="10" fill="#ffe4e6" stroke="#f43f5e" stroke-width="2" filter="url(#node-shadow)" />
      <text x="65" y="22" fill="#be123c" font-size="11.5" font-weight="700" text-anchor="middle">Stage 6: Maintain</text>
      <text x="65" y="38" fill="#475569" font-size="10" font-weight="600" text-anchor="middle">線上自愈與弱點巡檢</text>
    </g>

    <!-- 第二層：全 20 章技術模組節點 (Chapter Interactive Nodes) -->
    <!-- Ch 7: Inception -->
    <g class="ch-node-group" data-ch="7" data-links="link-ch-7" transform="translate(1140, 160)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 7 章：intent.md 對齊</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">非技術語意詰問捕獲</text>
    </g>

    <!-- Ch 8: Design -->
    <g class="ch-node-group" data-ch="8" data-links="link-ch-8" transform="translate(1150, 240)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 8 章：可交互原型驗證</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">消除歧義的反饋閉環</text>
    </g>

    <!-- Ch 3: CLAUDE.md -->
    <g class="ch-node-group" data-ch="3" data-links="link-ch-3" transform="translate(1160, 330)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 3 章：CLAUDE.md 憲章</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">專案唯一最高治理法規</text>
    </g>

    <!-- Ch 4: Commands -->
    <g class="ch-node-group" data-ch="4" data-links="link-ch-4" transform="translate(1160, 405)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 4 章：自訂斜線指令</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">工程工作流模組化封裝</text>
    </g>

    <!-- Ch 5: MCP -->
    <g class="ch-node-group" data-ch="5" data-links="link-ch-5" transform="translate(1160, 480)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 5 章：MCP 跨系統擴展</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">連接本地環境與企業工具</text>
    </g>

    <!-- Ch 9: Plan & Spec -->
    <g class="ch-node-group" data-ch="9" data-links="link-ch-9" transform="translate(1140, 610)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 9 章：spec.md &amp; plan.md</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">架構契約與原子任務藍圖</text>
    </g>

    <!-- Ch 10: Subagents & Tasks -->
    <g class="ch-node-group" data-ch="10" data-links="link-ch-10" transform="translate(1040, 700)" style="cursor: pointer;">
      <rect width="180" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="90" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 10 章：Subagents &amp; Tasks</text>
      <text x="90" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">隔離分工與上下文純淨度</text>
    </g>

    <!-- Ch 11: Feedback Loops -->
    <g class="ch-node-group" data-ch="11" data-links="link-ch-11" transform="translate(640, 720)" style="cursor: pointer;">
      <rect width="180" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="90" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 11 章：自我驗證反饋迴圈</text>
      <text x="90" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">Non-zero 門禁與 TDD 先行</text>
    </g>

    <!-- Ch 12: Continuous Evals -->
    <g class="ch-node-group" data-ch="12" data-links="link-ch-12" transform="translate(370, 710)" style="cursor: pointer;">
      <rect width="180" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="90" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 12 章：CI 持續評測 (Evals)</text>
      <text x="90" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">20-50 任務基準與防劣化門禁</text>
    </g>

    <!-- Ch 6: Hooks -->
    <g class="ch-node-group" data-ch="6" data-links="link-ch-6" transform="translate(150, 620)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 6 章：Hooks 安全防護網</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">不可逾越的確定性硬攔截</text>
    </g>

    <!-- Ch 13: PR Review -->
    <g class="ch-node-group" data-ch="13" data-links="link-ch-13" transform="translate(120, 500)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 13 章：PR 審查循環</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">REVIEW.md 與 @claude 修復</text>
    </g>

    <!-- Ch 14: Deployment -->
    <g class="ch-node-group" data-ch="14" data-links="link-ch-14" transform="translate(120, 410)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 14 章：自動化發佈守護</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">零停機流水線與異常回滾</text>
    </g>

    <!-- Ch 15: Blue-Green -->
    <g class="ch-node-group" data-ch="15" data-links="link-ch-15" transform="translate(120, 320)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 15 章：藍綠灰度部署</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">金絲雀流量切換與監控網</text>
    </g>

    <!-- Ch 16: Closing the Loop -->
    <g class="ch-node-group" data-ch="16" data-links="link-ch-16" transform="translate(140, 190)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 16 章：生產反饋閉環</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">線上異常轉化為長期防禦</text>
    </g>

    <!-- Ch 17: Recurring Scans -->
    <g class="ch-node-group" data-ch="17" data-links="link-ch-17" transform="translate(260, 120)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 17 章：定期弱點掃描</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">代碼漂移與模型躍遷巡檢</text>
    </g>

    <!-- Ch 18: Claude Tag -->
    <g class="ch-node-group" data-ch="18" data-links="link-ch-18" transform="translate(430, 90)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 18 章：即時線上值班</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">Claude Tag 應急救火指揮</text>
    </g>

    <!-- Ch 1: Paradigm Shift -->
    <g class="ch-node-group" data-ch="1" data-links="link-ch-1" transform="translate(540, 230)" style="cursor: pointer;">
      <rect width="150" height="40" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="75" y="18" fill="#1e293b" font-size="11" font-weight="700" text-anchor="middle">第 1 章：範式轉移</text>
      <text x="75" y="31" fill="#64748b" font-size="9" text-anchor="middle">代碼不再是系統瓶頸</text>
    </g>

    <!-- Ch 2: Principles -->
    <g class="ch-node-group" data-ch="2" data-links="link-ch-2" transform="translate(730, 230)" style="cursor: pointer;">
      <rect width="150" height="40" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="75" y="18" fill="#1e293b" font-size="11" font-weight="700" text-anchor="middle">第 2 章：核心工程原則</text>
      <text x="75" y="31" fill="#64748b" font-size="9" text-anchor="middle">Anthropic 五大開發心法</text>
    </g>

    <!-- Ch 19: Governance -->
    <g class="ch-node-group" data-ch="19" data-links="link-ch-19" transform="translate(620, 80)" style="cursor: pointer;">
      <rect width="160" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="80" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 19 章：企業級治理</text>
      <text x="80" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">ZDR 隱私與成熟度路線圖</text>
    </g>

    <!-- Ch 20: Future Vision -->
    <g class="ch-node-group" data-ch="20" data-links="link-ch-20" transform="translate(800, 80)" style="cursor: pointer;">
      <rect width="170" height="42" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" filter="url(#node-shadow)" />
      <text x="85" y="19" fill="#1e293b" font-size="11.5" font-weight="700" text-anchor="middle">第 20 章：未來自主工廠</text>
      <text x="85" y="33" fill="#64748b" font-size="9.5" text-anchor="middle">多 Agent 集群與自癒生態</text>
    </g>
  </g>
</svg>"""
