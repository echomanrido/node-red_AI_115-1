// C# 學習補充教材資料庫 (離線 file:/// 模式備援)
var INITIAL_CSHARP_SUPPLEMENTS_DATA = [
  {
    "id": "cs-sup-01",
    "supNumber": "01",
    "title": "Visual Studio 2026社群版安裝與 .NET 桌面開發環境配置",
    "date": "2026-08-12",
    "category": "環境建置",
    "summary": "工控 PC-Based 程式開發首選工具 Visual Studio 2026 完整安裝與實戰配置指南。收錄官方 Community 免費下載路徑、工作負載「必選項目」（.NET 桌面開發與 GitHub Copilot）、Epson 工控人機五大版面配置，以及 GitHub Copilot Agent 模式最新實戰技巧。",
    "image": "images_src/csharp_supplements/vs_copilot_chat_guide.png",
    "objective": "1. 掌握 Visual Studio 2026 Community (社群版) 官方免費下載與安裝流程。\n2. 熟記安裝精靈中的工作負載「必選項目」：.NET 桌面開發、GitHub Copilot、GitHub Copilot 應用程式現代化，以及 C++ 桌面擴充。\n3. 精通工控人機介面開發標準五大版面配置：工具箱、設計畫布、方案總管、屬性面板與輸出偵錯視窗。\n4. 掌握 GitHub Copilot Agent 模式、多模型切換 (如 Claude Haiku 4.5) 與自動化提示詞協作技巧。",
    "tutorialSteps": [
      {
        "step": "1. Visual Studio 2026 下載與社群版 (Community) 選擇",
        "description": "前往微軟官方 Visual Studio 下載專區 (https://visualstudio.microsoft.com/zh-hant/downloads/)。在「Visual Studio 2026」產品分類下，選擇「Community (社群版)」點擊「免費下載」。該版本功能強大完整，免費提供給學生、開放原始碼參與者及個人開發者使用。",
        "image": "images_src/csharp_supplements/vs2026_download_community.png",
        "imageCaption": "圖 1：Visual Studio 2026 官方下載頁面，選擇 Community 社群版免費下載"
      },
      {
        "step": "2. GitHub Copilot 現代化 AI 開發功能啟用",
        "description": "Visual Studio 2026 深度整合免費的 [Visual Studio 中的 GitHub Copilot 功能介紹](https://visualstudio.microsoft.com/zh-hant/github-copilot/)。引入全新的「Agent 模式」，能在背景協調編程步驟、即時因應問題、自動套用跨檔案變更並逐一排查代碼錯誤，大幅提升工控軟體開發效能。",
        "image": "images_src/csharp_supplements/vs2026_copilot_free.png",
        "imageCaption": "圖 2：Visual Studio 中免費的 Copilot 功能介紹與 Agent 模式增強"
      },
      {
        "step": "3. 安裝精靈工作負載「必選項目」完整勾選",
        "description": "啟動 Visual Studio Installer 後，請務必依序確認並勾選以下核心元件：\n• 【必選工作負載】：勾選「.NET 桌面開發」（支援 C#、Visual Basic、WPF、Windows Forms 與主控台應用程式）。\n• 【右側安裝詳細資料】：在「選擇性」清單中，務必勾選「GitHub Copilot」與「GitHub Copilot 應用程式現代化」。\n• 【傳統與原生支援】：建議勾選「使用 C++ 的桌面開發」，便於日後引用或編譯機械手臂、視覺相機與 PLC 原生動態鏈結庫 (DLL)。",
        "image": "images_src/csharp_supplements/vs2026_installer_workloads.png",
        "imageCaption": "圖 3：Visual Studio Installer 必選工作負載與 GitHub Copilot 詳細安裝項目"
      },
      {
        "step": "4. 工控 HMI 系統五大標準版面配置 (IDE Layout)",
        "description": "進入 Visual Studio 後，建議依照工控人機（如 EpsonRobotRC7 專案）配置最順手的五大區塊：\n1. 【左側 - 工具箱 (Toolbox)】：釘選 Windows Forms 控制項（Button, Label, TextBox, CheckBox, ComboBox, DataGridView 等）。\n2. 【中間 - 設計畫布與代碼視窗】：上層切換 FormMain.cs [設計]* 視覺化排版與 FormMain.cs 邏輯代碼。\n3. 【右側 - 方案總管 (Solution Explorer)】：檢視專案結構 (Forms, Models, Services, Program.cs)，並整合「GitHub Copilot 聊天」分頁。\n4. 【右下 - 屬性視窗 (Properties)】：調整所選元件的屬性（如 btnMotorOn 的 Text, TextAlign, BackColor, Font 等）。\n5. 【底部 - 輸出與診斷視窗】：檢視編譯 Output、錯誤清單 (Error List) 與 Copilot 終端機。",
        "image": "images_src/csharp_supplements/vs2026_ide_layout.png",
        "imageCaption": "圖 4：Visual Studio 工控人機 (Epson Robot RC+ 7.0) 標準五大版面配置"
      },
      {
        "step": "5. GitHub Copilot 深度配置與 Agent 模式實戰",
        "description": "點開右側或底部的「GitHub Copilot 聊天」視窗：\n• 【功能選單】：點擊右上角選單可確認「啟用 Copilot 自動補全」、「啟用下一個編輯建議」皆已打勾啟用。\n• 【模式與模型切換】：在輸入框左下角可選擇「Agent 模式」與「互動式」，並可彈性選用最新模型（如 Claude Haiku 4.5、GPT-4o）。\n• 【快速捷徑】：支援一鍵點擊「建立新專案」、「改善 #method 的實作」、「為 #file 中的所有方法撰寫單元測試」，實現人機協同 Vibe Coding。",
        "image": "images_src/csharp_supplements/vs2026_copilot_agent.png",
        "imageCaption": "圖 5：GitHub Copilot Agent 模式設定、自動補全與模型選擇視窗"
      }
    ],
    "applications": [
      {
        "scenario": "快速建立標準化工控軟體架構",
        "description": "藉由 Visual Studio 範本建立標準化目錄結構 (Models, Services, Controls, Forms)，便於產線軟體維護與版本控管。",
        "icon": "fa-solid fa-laptop-code"
      }
    ],
    "aiPrompt": "請以 Markdown 條列式說明：在 Windows 11 環境下配置 Visual Studio 2022/2026 進行工控 C# 開發，最推薦安裝的 5 個核心 NuGet 套件與理由（例如 System.IO.Ports, MQTTnet, NModbus4 等）。",
    "references": [
      {
        "title": "什麼是 Visual Studio 的 GitHub Copilot 對話功能？(官方文檔)",
        "url": "https://learn.microsoft.com/zh-tw/visualstudio/ide/visual-studio-github-copilot-chat?view=vs-2022#ask-questions-in-the-inline-chat-view"
      },
      {
        "title": "Visual Studio 2026 官方下載中心",
        "url": "https://visualstudio.microsoft.com/zh-hant/downloads/"
      },
      {
        "title": "Visual Studio 中的 GitHub Copilot 功能介紹",
        "url": "https://visualstudio.microsoft.com/zh-hant/github-copilot/"
      },
      {
        "title": "Microsoft Learn - .NET 桌面開發與 Windows Forms 建立導覽",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/desktop/winforms/get-started/create-app-visual-studio"
      }
    ],
    "imageTitle": "Visual Studio GitHub Copilot 對話功能指南",
    "imageLink": "https://learn.microsoft.com/zh-tw/visualstudio/ide/visual-studio-github-copilot-chat?view=vs-2022#ask-questions-in-the-inline-chat-view"
  },
  {
    "id": "cs-sup-02",
    "supNumber": "02",
    "title": "Google Antigravity 擴充功能 for Visual Studio 2026 安裝與環境配置",
    "date": "2026-10-29",
    "category": "環境建置",
    "summary": "為使用複雜企業解決方案與多專案 MSBuild 架構的 Windows 和 .NET 開發人員，導入 Google 官方代理程式工程平台 Google Antigravity。本篇詳解延伸模組安裝、VSIX 背景處理程序關閉與部署、安全性條款同意，以及 Gemini 3.8 Flash、Claude Sonnet/Opus 多模型切換與額度監控實務。",
    "image": "images_src/csharp_supplements/vs2026_antigravity_install_ext.png",
    "objective": "1. 掌握 Visual Studio 2026 安裝官方 Google Antigravity VSIX 擴充功能流程。\n2. 理解 VSIX 安裝期間需要關閉 Visual Studio 實例與 DevHub.exe 的安裝機制。\n3. 完成 Antigravity 首次啟用安全性條款同意 (Security Notice & Data Use) 與側邊欄整合。\n4. 學會配置 Antigravity 代理平台設定、多模型 (Gemini 3.8 Flash / Claude / GPT) 切換及用量額度 (Usage) 追蹤。",
    "tutorialSteps": [
      {
        "step": "1. 官方文件導讀與系統先決條件 (Prerequisites)",
        "description": "前往 Google Antigravity 官方文件 ([Google Antigravity - Visual Studio Extension 官方文件](https://antigravity.google/docs/ide/extensions/visual-studio/))。確認先決條件：Windows 10 或 11 上的 Visual Studio 2026（版本 17.8 或更高版本），以及具備 Antigravity 計劃（含免費套裝）或 Gemini Enterprise 權利的有效 Google 帳戶。",
        "image": "images_src/csharp_supplements/vs2026_antigravity_docs.png",
        "imageCaption": "圖 1：Google Antigravity 官方 Visual Studio 擴充功能文件與系統要求"
      },
      {
        "step": "2. 在 Visual Studio 管理延伸模組搜尋與排程安裝",
        "description": "開啟 Visual Studio 2026，點選上方功能表「延伸模組(X)」→「管理延伸模組(M)...」。在延伸模組管理員的「瀏覽」分頁搜尋「Google Antigravity」，找到由 Google 發行的官方擴充套件，點選「安裝」。此時系統會排程在 Visual Studio 關閉後進行安裝。",
        "image": "images_src/csharp_supplements/vs2026_antigravity_install_ext.png",
        "imageCaption": "圖 2：Visual Studio 延伸模組管理員搜尋並下載 Google Antigravity"
      },
      {
        "step": "3. 關閉 Visual Studio 進行 VSIX 程式安裝與生效",
        "description": "依畫面提示關閉所有開啟的 Visual Studio 視窗與相關背景處理序（如 DevHub.exe）。隨後 VSIX 安裝程式將自動啟動修改 Visual Studio Community 2026 組態。安裝完成後提示「已成功套用您的修改」，點選關閉並重新啟動 Visual Studio 即可。",
        "image": "images_src/csharp_supplements/vs2026_antigravity_vsix_install.png",
        "imageCaption": "圖 3：VSIX 安裝程式執行流程（提示關閉處理序、套用組態與安裝完成）"
      },
      {
        "step": "4. 接受安全性聲明與側邊欄工作區整合",
        "description": "重新開啟 Visual Studio 後，左側或右側將新增「Antigravity」工作視窗（與 GitHub Copilot 聊天、方案總管並列）。首次啟動時會跳出「Security Notice & Data Use」，勾選「Yes, I agree to help improve Antigravity...」並點擊「Accept and continue」完成帳號驗證與授權。",
        "image": "images_src/csharp_supplements/vs2026_antigravity_install_ext.png",
        "imageCaption": "圖 4：Antigravity 安全性條款確認與工作面板介面"
      },
      {
        "step": "5. 模型切換、Settings 設定與使用額度 (Usage) 監控",
        "description": "進入 Antigravity 介面後，可點擊右上角「Settings」齒輪進行偏好設定；在下方 Prompt 輸入框旁可依任務複雜度切換底層模型，支援 Gemini 3.8 Flash Medium、Claude Sonnet 4.6 (Thinking)、Claude Opus 4.6 (Thinking)、GPT-OSS 120B 等。點選「View Usage」可即時檢視每週額度（Weekly limit）與 5 小時速率限制（5h limit）剩餘百分比與重置時間。",
        "image": "images_src/csharp_supplements/vs2026_antigravity_settings_usage.png",
        "imageCaption": "圖 5：Antigravity Settings 偏好設定、多模型切換與 View Usage 配額監控"
      }
    ],
    "applications": [
      {
        "scenario": "企業級 .NET 多專案 MSBuild 與工控程式碼代理開發",
        "description": "結合 Google Antigravity 的自主 Agent 能力與多模型彈性，在 Visual Studio 內直接透過自然語言進行 C# WinForms / WPF 專案重構、通訊協定除錯與全自動單元測試生成。",
        "icon": "fa-solid fa-robot"
      }
    ],
    "aiPrompt": "請扮演 Visual Studio 擴充套件專家，詳細說明在 Visual Studio 2026 中使用 Google Antigravity 搭配 Gemini 3.8 Flash 進行 C# 工控專案開發的優勢，並列出常用的斜線指令與快速鍵配置。",
    "references": [
      {
        "title": "Google Antigravity - Visual Studio Extension 官方文件",
        "url": "https://antigravity.google/docs/ide/extensions/visual-studio/"
      },
      {
        "title": "Visual Studio 2026 官方下載",
        "url": "https://visualstudio.microsoft.com/zh-hant/downloads/"
      },
      {
        "title": "Google Antigravity 官方首頁",
        "url": "https://antigravity.google/"
      }
    ],
    "imageTitle": "Google Antigravity for Visual Studio",
    "imageLink": "https://antigravity.google/docs/ide/extensions/visual-studio/"
  },
  {
    "id": "cs-sup-03",
    "supNumber": "03",
    "title": "LocalPilot — AI Coding Assistant (Ollama) 本地端離線 AI 協同開發配置指南",
    "date": "2026-11-02",
    "category": "AI 輔助開發",
    "summary": "專為高度機密工控廠區與內網隔離環境打造的 100% 本地端 AI 協同開發助理。LocalPilot 透過 Visual Studio 深度串接本機 Ollama 運算引擎，不需聯網即可享有類 GitHub Copilot 的行內代碼幽靈補全 (Ghost-text)、LocalPilot Chat 對話視窗、斜線指令 (/explain, /fix, /review, /test) 以及 C# WinForms 視窗程式自動化生成，兼具極致隱私保護與強大生產力。",
    "image": "images_src/csharp_supplements/vs2026_localpilot_marketplace.png",
    "objective": "1. 理解 100% 本地端離線 AI 程式助理在工控廠區（機密配方防外流、無外網環境）的核心優勢。\n2. 掌握在 Visual Studio 延伸模組管理員中搜尋並安裝 LocalPilot (Ollama) 的完整步驟。\n3. 熟練使用 LocalPilot Chat 側邊欄面板與 4 大核心斜線指令 (/explain, /fix, /review, /test)。\n4. 實戰演練運用 LocalPilot 在本機一鍵提示生成 C# WinForms 跑馬燈 (Marquee) 視窗元件與 Timer 定時器程式碼。",
    "tutorialSteps": [
      {
        "step": "1. Marketplace 官方擴充套件介紹與 100% 離線隱私特性",
        "description": "前往 Visual Studio Marketplace 官方頁面 ([LocalPilot — AI Coding Assistant (Ollama)](https://marketplace.visualstudio.com/items?itemName=FutureStackSolution.LocalPilotFSS))。LocalPilot 是 FutureStack Solution 開發的隱私優先 (Privacy-First) 本地 AI 配對工程師，完全透過在地端的 Ollama 執行模型推論，代碼絕不外流至公有雲端，支援 inline ghost-text 幽靈補全、AI Chat 面板、代碼解釋、重構與單元測試生成。",
        "image": "images_src/csharp_supplements/vs2026_localpilot_marketplace.png",
        "imageCaption": "圖 1：Visual Studio Marketplace 官方 LocalPilot (Ollama) 套件詳細資訊"
      },
      {
        "step": "2. 在 Visual Studio 延伸模組管理員搜尋並一鍵安裝",
        "description": "開啟 Visual Studio 2026，點選上方功能表「延伸模組(X)」→「管理延伸模組(M)...」。在延伸模組管理員的「瀏覽」分頁搜尋框輸入 `Ollama`，找到「LocalPilot — AI Coding Assistant (Ollama)」（由 FutureStack Solution 發行），點選「安裝」按鈕進行下載與自動配置。",
        "image": "images_src/csharp_supplements/vs2026_localpilot_install_ext.png",
        "imageCaption": "圖 2：Visual Studio 延伸模組管理員搜尋「Ollama」並安裝 LocalPilot 套件"
      },
      {
        "step": "3. 呼叫 LocalPilot Chat 工作面板與 4 大核心斜線指令",
        "description": "安裝完成後，Visual Studio 側邊工作視窗將新增「LocalPilot Chat」標籤頁（與 Antigravity、GitHub Copilot、方案總管、Git 變更並列）。在對話框中可直接輸入問題，或搭配常用的 4 大斜線快捷指令：\n• `/explain`：深入解釋所選取的 C# 程式碼區塊邏輯\n• `/fix`：自動偵測並修正工控語法與執行階段錯誤\n• `/review`：審查程式碼品質與工業級例外防護\n• `/test`：自動為選取的方法撰寫單元測試 (Unit Test)",
        "image": "images_src/csharp_supplements/vs2026_localpilot_chat_panel.png",
        "imageCaption": "圖 3：LocalPilot Chat 側邊欄對話視窗與斜線快捷指令支援"
      },
      {
        "step": "4. 實戰演練：以 LocalPilot Chat 自動生成 C# WinForms 跑馬燈程式",
        "description": "在 LocalPilot Chat 提示框輸入：「寫一個winforms程式，使用C#。顯示跑馬燈。」。本機 Ollama 模型將即時思考並回傳結構化教學指南：\n1. 【設計介面 (Designer)】：在 Form 上放置 Label (marqueeLabel) 與 Timer (timer1) 元件。\n2. 【設定屬性】：設定 Timer interval 屬性為 30 毫秒、enabled 屬性為 True。\n3. 【C# Code-Behind (`Form1.cs`)】：產生建構子啟動 Timer，並在 Tick 事件中遞減 Label.Left 座標，當小於邊界時重設至右側重新滾動。點選右上角「COPY」即可一鍵貼入專案！",
        "image": "images_src/csharp_supplements/vs2026_localpilot_csharp_winforms_demo.png",
        "imageCaption": "圖 4：LocalPilot 實戰對話生成 C# WinForms 跑馬燈元件與定時器控制代碼"
      }
    ],
    "applications": [
      {
        "scenario": "封閉廠區與內網隔離環境的純離線 AI 協同開發",
        "description": "在完全拔除實體外網的半導體晶圓廠或機密機電產線工控機上，開發工程師依然能透過本機 Ollama 運算引擎享有即時代碼補全與錯誤排查，徹底消除機密外洩資安風險。",
        "icon": "fa-solid fa-shield-halved"
      },
      {
        "scenario": "C# WinForms 介面與工控狀態顯示快速生成",
        "description": "透過 LocalPilot 自然語言對話直接生成跑馬燈、警報指示燈閃爍與定時輪詢 (Timer.Tick) 邏輯，大幅加速工控人機介面開發原型。",
        "icon": "fa-solid fa-laptop-code"
      }
    ],
    "aiPrompt": "請扮演本機 Ollama C# 工控專家，寫一個 WinForms 產線警報跑馬燈控制類別：\n1. 使用 Label 元件橫向平滑滾動文字 \"產線機台狀態：正常運轉中 (Line 1 RUN)\"。\n2. 使用 Timer 控制滾動速度，當文字移出左側邊界時自動由右側重新進入。\n3. 當滑鼠懸停 (MouseEnter) 於 Label 上時暫停滾動，滑鼠移開 (MouseLeave) 時恢復滾動。\n4. 具備繁體中文註解與資源安全釋放邏輯。",
    "references": [
      {
        "title": "Visual Studio Marketplace - LocalPilot (Ollama) 官方頁面",
        "url": "https://marketplace.visualstudio.com/items?itemName=FutureStackSolution.LocalPilotFSS"
      },
      {
        "title": "Ollama 官方網站 (本地端大語言模型引擎)",
        "url": "https://ollama.com/"
      },
      {
        "title": "Microsoft Learn - Timer 類別 (System.Windows.Forms)",
        "url": "https://learn.microsoft.com/zh-tw/dotnet/api/system.windows.forms.timer"
      }
    ],
    "imageTitle": "LocalPilot — AI Coding Assistant (Ollama) 官方詳細資訊",
    "imageLink": "https://marketplace.visualstudio.com/items?itemName=FutureStackSolution.LocalPilotFSS"
  }
];
