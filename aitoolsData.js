window.INITIAL_AITOOLS_DATA = [
  {
    "id": "tool-suno",
    "toolNumber": "01",
    "title": "Suno - AI 音樂生成器",
    "date": "2026-08-25",
    "category": "生成式音樂 AI",
    "summary": "Suno 是一款突破性的生成式 AI 音樂創作工具，能讓任何人無需懂音樂理論，只需輸入文字提示詞，即可在數秒內生成包含高品質人聲與完整樂器編排的專屬音樂與歌曲。本課程引導您將 Suno 音樂融入智慧機電實務專題簡報及音效系統中。",
    "webUrl": "https://www.suno.com",
    "objective": "1. 掌握 Suno AI 生成歌曲的操作介面與生成參數設定。\n2. 學習如何透過「自訂模式 (Custom Mode)」分離音樂風格提示詞（Style of Music）與歌詞（Lyrics）以進行精細控制。\n3. 掌握生成音樂作品的音效下載、拼接（Extend）與人聲風格微調技巧。\n4. 結合智慧機電整合術科成果簡報，完成高品質專案配樂設計。",
    "tutorialSteps": [
      {
        "step": "1. 註冊並登入 Suno 帳戶",
        "description": "瀏覽 Suno 官方網站 (https://www.suno.com)，點擊「Create」並使用 Google、Discord 或 Microsoft 帳戶完成快速註冊與登入。每個免費帳戶每天會贈送 50 個 Credit（點數），可生成 10 首歌曲（每次創作消耗 10 點生成 2 首）。"
      },
      {
        "step": "2. 進入創作介面 (Create)",
        "description": "點擊左側選單的「Create」。預設為簡單模式（Song Description），您可以直接輸入您想生成的歌曲主題（例如：工廠機器轟鳴、Synthwave、歡快的晨間咖啡時光）。如果不希望有歌詞，可開啟「Instrumental」純音樂開關。"
      },
      {
        "step": "3. 啟用自訂模式 (Custom Mode) 進行精細控制",
        "description": "開啟「Custom」切換開關，這會解鎖獨立的輸入框：\n1. Lyrics (歌詞)：您可以自己撰寫繁體中文歌詞，或點擊「Generate Lyrics」讓 AI 自動生成。\n2. Style of Music (音樂風格)：填入歌曲的音樂類型、樂器、音色和氛圍。例如：80s Synthwave, Industrial beats, mechanical hum, driving rhythm, synthesizer, male vocal, energetic。\n3. Title：填入歌曲的名稱。"
      },
      {
        "step": "4. 點擊 Create 並下載/延伸歌曲",
        "description": "點擊下方的 Create 按鈕，Suno 會在數秒內生成兩首不同編排的歌曲。您可以點擊播放聆聽。如果不滿意，可以修改提示詞重新生成。點擊歌曲右側的「...」➔「Get Audio」或「Get Video」即可下載高品質的 MP3 或 MP4。若想加長歌曲，可點擊「Extend」在指定秒數後繼續生成下一段。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級實務專題簡報背景音樂",
        "icon": "fa-solid fa-gears",
        "description": "在進行機電整合丙級第二題「送料與顏色辨識裝配系統」專題成果簡報時，將 Suno 生成的「Industrial Synthwave (工業電子樂)」作為開場影片或簡報背景配樂，能極大增強專案的現代感與科技感，展現 Vibe Coding 與 AI 協作特色。"
      },
      {
        "scenario": "SCADA 警報與工廠環境音效生成",
        "icon": "fa-solid fa-industry",
        "description": "利用 Suno 的 Instrumental (純音樂無人聲) 模式，搭配特定的風格提示詞（如 High pitch warning tone, digital alarm beep, rapid synthesizer pulse），生成高辨識度的客製化工業警報音效，並透過 Node-RED 寫入音效播放節點，整合至中樞 HMI 壁掛觸控螢幕。"
      },
      {
        "scenario": "家庭智慧控制展示影片配樂",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "在智慧快遞箱或智慧防盜系統實物專題完成後，錄製 1 分鐘的展示短片。利用 Suno 生成一首輕快、溫馨的「Acoustic Pop (民謠流行樂)」並帶有智慧包裹送達歌詞的背景歌曲，能讓專題簡報更具吸引力與商業賣點。"
      }
    ],
    "aiPrompt": "音樂風格 Prompt 範例 (Style of Music)：\n80s cyber punk, synthwave, industrial automation beat, robotic clangs, electronic synthesizers, driving tempo, energetic, futuristic, male vocoder vocals\n\n歌詞 Prompt 範例 (Lyrics)：\n[Verse 1]\n綠色光電 照亮轉盤的軌跡\n氣缸推出 辨識良品的奇蹟\nModbus 傳遞著無聲的數據\nNode-RED 串起這智慧的旋律\n\n[Chorus]\n送料 裝配 轉盤在轉動\n機電整合 程式在跳動\nAI 的翅膀 讓工業發光\n智慧的工廠 我們在起航！",
    "references": [
      {
        "title": "Suno AI 官方網站",
        "url": "https://www.suno.com"
      },
      {
        "title": "Suno 提示詞攻略 - 官方 Wiki 與寫作指引",
        "url": "https://www.suno.wiki"
      },
      {
        "title": "如何在影片中合規使用 Suno 生成之音樂版權說明",
        "url": "https://suno-ai.notion.site/Frequently-Asked-Questions"
      }
    ]
  },
  {
    "id": "tool-chatgpt-gpts",
    "toolNumber": "02",
    "title": "ChatGPT 探索 GPTs - 專屬 Node-RED 助理",
    "date": "2026-08-25",
    "category": "生成式 AI 助手",
    "summary": "ChatGPT 的「探索 GPTs」功能允許學員搜尋並使用客製化的 Node-RED 專屬助手。這些助手針對節點配置與 JS 偵錯進行了微調，能提供更精準、即時的開發協作。",
    "webUrl": "https://chatgpt.com/gpts",
    "flowImage": "images_src/ok/20260825_chatgpt_explore_gpts.png",
    "objective": "1. 掌握如何在 ChatGPT 「探索 GPTs (Explore GPTs)」商店中搜尋 Node-RED 等客製化 AI 助手。\n2. 學習篩選對話量大、評價高且針對 Node-RED 專精的 Custom GPTs 助手。\n3. 掌握如何與專屬助理進行流程 JSON 生成、API 串接除錯與 Function 節點 JS 語意檢查。",
    "tutorialSteps": [
      {
        "step": "1. 登入 ChatGPT 並進入探索 GPTs 商店",
        "description": "登入您的 ChatGPT 帳戶。在左側側邊欄中點擊「探索 GPTs (Explore GPTs)」按鈕，即可進入全球開發者客製化 AI 應用的 GPT Store 商店。"
      },
      {
        "step": "2. 搜尋 Node-RED 專精助手",
        "description": "在商店頂部的搜尋欄中輸入「node-red」，系統會篩選出所有專職輔助 Node-RED 的客製化助理（例如熱門的「Node-RED GPT」，擁有 5K+ 次對話，或「Node-RED Assistant」）。"
      },
      {
        "step": "3. 點選專屬助手開始對話",
        "description": "點擊您篩選出的 Node-RED 助手。這會新開一個獨立對話視窗，此時該 GPT 的 System Prompt 與知識庫已預先設定妥當，能針對 Node-RED 給出極高精準度的專門解答。"
      },
      {
        "step": "4. 進行 Flow 生成與 Code 偵錯",
        "description": "您可以直接貼上您的錯誤日誌或描述您想實現的控制邏輯（例如：請幫我建立一個讀取 Modbus 數據後，轉為 JSON 物件的流程）。AI 會直接回傳可以直接複製並匯入 Node-RED 的 Flow JSON 程式碼，方便您一鍵匯入部署。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合術科 Modbus 流程快速生成",
        "icon": "fa-solid fa-gears",
        "description": "在進行丙級第二題裝配系統的 PLC 通訊整合時，若不知道如何使用 node-red-contrib-modbus 節點配置。向專屬 Node-RED Assistant 發問，它能立刻提供完整的 Modbus 讀寫 Flow JSON 程式碼，避免學員花費數小時手動拉線配置。"
      },
      {
        "scenario": "半導體廠務 API 串接與格式解碼",
        "icon": "fa-solid fa-microchip",
        "description": "當需要將廠務冷卻系統的數據傳送到 MES 的 RESTful API 時，若遇到 HTTP Request 節點格式錯誤。可將錯誤碼與 JSON 欄位拋給「Node-RED Helper」，它能精準解析 JSON 巢狀結構，並直接撰寫出 Function 節點所需的變數映射 JavaScript 程式碼。"
      },
      {
        "scenario": "家庭智慧控制語音警報邏輯除錯",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "在設計智慧物流快遞箱與 Line 語音通知時，常會因為 Function 節點內的 Javascript 語法錯誤（如補零或時戳計算錯誤）導致 Node-RED 的 debug 面板報錯。將代碼與錯誤拋給專屬 GPT，能在數秒內提供修正後的無 Bug 代碼與防呆機制說明。"
      }
    ],
    "aiPrompt": "探索 GPTs 發問 Prompt 範例：\n我正在開發 Node-RED 機電整合專案，目前從 Modbus 讀取到的 msg.payload 是一個 buffer 陣列 [0x00, 0x0A, 0x01, 0x02]。\n1. 請幫我寫一段 Function 節點的 JavaScript，將此 Buffer 轉換為一個 16 位元的十進位整數，並拼接上時間戳記與 Topic \" 良品計數\"。\n2. 請以可以直接匯入 Node-RED 的完整 Flow JSON 陣列格式輸出。",
    "references": [
      {
        "title": "ChatGPT GPTs 官方商店頁面",
        "url": "https://chatgpt.com/gpts"
      },
      {
        "title": "Node-RED 官方社群討論區 - GPT 協作串聯分享",
        "url": "https://discourse.nodered.org/"
      }
    ]
  }
];