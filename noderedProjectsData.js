// Node-RED 專題專區資料庫
var INITIAL_NODERED_PROJECTS_DATA = [
  {
    "id": "nr-proj-01",
    "projNumber": "專題 01",
    "title": "台灣銀行-人民幣匯率爬蟲與數據解析",
    "category": "智慧生活與金融 API",
    "date": "2026-10-19",
    "slideRange": "第 3 ~ 10 頁 (共 8 頁)",
    "flowImage": "images_src/nodered_projects/slide_007.jpg",
    "resultImage": "images_src/nodered_projects/slide_008.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_003.jpg",
      "images_src/nodered_projects/slide_004.jpg",
      "images_src/nodered_projects/slide_005.jpg",
      "images_src/nodered_projects/slide_006.jpg",
      "images_src/nodered_projects/slide_007.jpg",
      "images_src/nodered_projects/slide_008.jpg",
      "images_src/nodered_projects/slide_009.jpg",
      "images_src/nodered_projects/slide_010.jpg"
    ],
    "summary": "透過 HTTP Request 節點定時爬取台灣銀行牌告匯率頁面，搭配 HTML 解析節點 (CSS Selector) 萃取人民幣現鈔買入/賣出匯率，並透過 Function 節點完成字串清洗、數值浮點化與高低點閥值比對，輸出標準化告警與分析數據。",
    "objective": "1. 掌握 Node-RED HTTP Request 節點發送 GET 請求抓取公開金融網頁技巧。\n2. 深入理解 HTML 節點與 CSS Selector (.rate-content-cash) 定位表格欄位原理。\n3. 學會運用 Function 節點進行字串切割清洗、parseFloat 浮點數轉換。\n4. 實作匯率閥值判斷邏輯（如人民幣現鈔賣出價低於 4.5 時觸發買進通知）。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 發送 HTTP 請求抓取台銀牌告匯率網頁",
        "description": "使用 inject 節點設定定時觸發 (如每 30 分鐘一次)，連接 http request 節點，Method 設為 GET，URL 輸入台灣銀行牌告匯率網址：https://rate.bot.com.tw/xrt?Lang=zh-TW。"
      },
      {
        "step": "步驟 2: 使用 HTML 節點精準定位匯率欄位",
        "description": "透過 html 節點的 CSS Selector 功能，設定選取器為 .rate-content-cash.text-right.print_hide，抓取網頁中所有幣別的現金買入與賣出價格，輸出為 Array 陣列。"
      },
      {
        "step": "步驟 3: 提取人民幣現金賣出價與數值轉換",
        "description": "在 Function 節點中，根據幣別索引提取人民幣 (CNY) 的即時買入與賣出價 (例如 msg.payload[12] 與 [13])，使用 parseFloat 去除空格與特殊符號，轉換為數值型態。"
      },
      {
        "step": "步驟 4: 匯率閥值比較與格式化告警文字",
        "description": "設定目標買進價 (如 4.50)，當即時賣出價低於目標值時，組裝格式化文字物件 msg.payload = { currency: 'CNY', rate: cny_sell, alert: true, time: new Date().toLocaleString() }。"
      },
      {
        "step": "步驟 5: Debug 節點除錯與即時資料檢驗",
        "description": "連接 debug 節點輸出完整 msg.payload 物件，驗證爬蟲回傳陣列長度、解析後數值正確性，確保自動化輪詢機制穩定運作。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "將現場檢定機台之生產報表與外圍原料成本報價即時整合，提供自動化計價與成本損益分析依據。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "廠務 FMCS 監控中心定期抓取國際原物料即時牌價，搭配廠內能源耗損量計算即時生產成本看板。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧家庭中控定期輪詢金融外幣牌告，在電子紙或儀表板即時更新海外購物最佳換匯時機。"
      }
    ],
    "aiPrompt": "請幫我寫一段 Node-RED Flow：定時每 30 分鐘抓取台灣銀行牌告匯率 (https://rate.bot.com.tw/xrt?Lang=zh-TW)，使用 html 節點解析 .rate-content-cash 欄位，並在 Function 節點提取人民幣現鈔賣出價，若小於 4.5 則輸出告警 JSON 物件至 Debug 視窗。",
    "nodeRedJson": [
      {
        "id": "cny_inject",
        "type": "inject",
        "name": "定時排程 (每30分鐘)",
        "repeat": "1800",
        "wires": [
          [
            "cny_http"
          ]
        ]
      },
      {
        "id": "cny_http",
        "type": "http request",
        "name": "抓取台銀牌告匯率",
        "method": "GET",
        "url": "https://rate.bot.com.tw/xrt?Lang=zh-TW",
        "wires": [
          [
            "cny_html"
          ]
        ]
      },
      {
        "id": "cny_html",
        "type": "html",
        "name": "解析人民幣匯率欄位",
        "tag": ".rate-content-cash",
        "ret": "text",
        "wires": [
          [
            "cny_func"
          ]
        ]
      },
      {
        "id": "cny_func",
        "type": "function",
        "name": "比對匯率與組裝物件",
        "func": "var rates = msg.payload;\nvar cny_sell = parseFloat(rates[13]);\nvar target = 4.50;\nif (cny_sell <= target) {\n    msg.payload = {\n        currency: 'CNY',\n        sellRate: cny_sell,\n        status: 'ALERT',\n        message: '【台銀匯率通報】人民幣即時賣出價已達目標點：' + cny_sell,\n        timestamp: new Date().toISOString()\n    };\n    return msg;\n}\nreturn null;",
        "wires": [
          [
            "cny_debug"
          ]
        ]
      },
      {
        "id": "cny_debug",
        "type": "debug",
        "name": "除錯輸出",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "台灣銀行歷史與即時牌告匯率",
        "url": "https://rate.bot.com.tw/xrt?Lang=zh-TW"
      },
      {
        "title": "Node-RED core http request 節點手冊",
        "url": "https://nodered.org/docs/user-guide/nodes#http-request"
      },
      {
        "title": "Node-RED HTML (CSS Selector) 節點指南",
        "url": "https://nodered.org/docs/user-guide/nodes#html"
      }
    ]
  },
  {
    "id": "nr-proj-02",
    "projNumber": "專題 02",
    "title": "LINE 官方帳號申請與 Messaging API 訊息推播整合",
    "category": "通訊與物聯網",
    "date": "2026-10-19",
    "slideRange": "第 11 ~ 28 頁 (共 18 頁)",
    "flowImage": "images_src/nodered_projects/slide_027.jpg",
    "resultImage": "images_src/nodered_projects/slide_028.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_011.jpg",
      "images_src/nodered_projects/slide_012.jpg",
      "images_src/nodered_projects/slide_013.jpg",
      "images_src/nodered_projects/slide_014.jpg",
      "images_src/nodered_projects/slide_015.jpg",
      "images_src/nodered_projects/slide_016.jpg",
      "images_src/nodered_projects/slide_017.jpg",
      "images_src/nodered_projects/slide_018.jpg",
      "images_src/nodered_projects/slide_019.jpg",
      "images_src/nodered_projects/slide_020.jpg",
      "images_src/nodered_projects/slide_021.jpg",
      "images_src/nodered_projects/slide_022.jpg",
      "images_src/nodered_projects/slide_023.jpg",
      "images_src/nodered_projects/slide_024.jpg",
      "images_src/nodered_projects/slide_025.jpg",
      "images_src/nodered_projects/slide_026.jpg",
      "images_src/nodered_projects/slide_027.jpg",
      "images_src/nodered_projects/slide_028.jpg"
    ],
    "summary": "從零建立 LINE 官方帳號與 LINE Developers 開發者環境，申請 Messaging API Channel，發行長期 Channel Access Token 並取得個人 User ID。整合 Node-RED 中的 LINE Push API 節點，實作自動化單向主動推播功能，實現行動端即時警報與事件通報。",
    "objective": "1. 熟悉 LINE Developers Console 開發者管理後台操作與 Provider / Channel 建立流程。\n2. 掌握 Messaging API 核心安全認證機制：Channel ID、Channel Secret 與 Channel Access Token (long-lived) 發行。\n3. 學會透過 LINE Official Account Manager 與 QR Code 加入好友，並取得接收者的 User ID。\n4. 在 Node-RED 中安裝 node-red-contrib-node-line-api 節點，設定金鑰與發送對象。\n5. 實作單向主動推播 (Push Message API)，將事件警報、設備異常或重要通報精準推送至個人或群組手機。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 登入 LINE Developers 並建立 Provider",
        "description": "使用一般個人 LINE 帳號登入 LINE Developers Console (https://developers.line.biz/)，點選「Create a new provider」，輸入開發者提供者名稱。"
      },
      {
        "step": "步驟 2: 建立 Messaging API Channel 官方帳號",
        "description": "在 Provider 底下選擇建立「Messaging API」，填寫 Channel Name (機器人名稱)、Channel Description、類別分類與電子郵件，確認條款後建立官方帳號。"
      },
      {
        "step": "步驟 3: 掃描 QR Code 加入好友並取得 User ID",
        "description": "進入「Messaging API」分頁，使用手機 LINE 掃描頁面上的 Bot QR Code 將其加入好友；在「Basic settings」分頁最下方查閱自己的 Your user ID (以 U 開頭之 33 碼字串)。"
      },
      {
        "step": "步驟 4: 發行長期有效之 Channel Access Token",
        "description": "切換至「Messaging API」分頁捲動至最下方，在「Channel access token (long-lived)」區塊點選「Issue」發行長期存取權杖，妥善保存供 Node-RED 連線使用。"
      },
      {
        "step": "步驟 5: 安裝與設定 Node-RED LINE API 節點",
        "description": "開啟 Node-RED「節點管理」安裝 node-red-contrib-node-line-api (或使用 HTTP Request 呼叫 /v2/bot/message/push)，填入發行之 Access Token 與目標 User ID。"
      },
      {
        "step": "步驟 6: 觸發測試推播與手機端接收驗證",
        "description": "連接 Inject 節點並輸入推播字串「【系統通知】Node-RED LINE 推播服務連線成功！」，點擊注入按鈕後檢查手機 LINE 聊天室是否即時收到訊息。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "檢定機台警報即時通知：當 PLC 檢測到氣壓不足、送料機構卡料或安全門開啟時，立即推播 LINE 訊息至監評或維修員手機。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "無塵室環境與 FMCS 巡檢異常通報：當冰水主機水溫超標或氣體偵測器讀數異常時，觸發 LINE 即時告警推播給值班工程師。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧門禁與快遞收件提醒：玄關紅外線感應或快遞置物箱感測器觸發時，自動發送 LINE 通知提醒家庭成員領取包裹。"
      }
    ],
    "aiPrompt": "請幫我寫一段 Node-RED Flow：使用 node-red-contrib-node-line-api 的 Line Push Message 節點，配置 Channel Access Token 與目標 User ID，透過 Function 節點組裝包含當前時間與警告文字的推播訊息並發送。",
    "nodeRedJson": [
      {
        "id": "line_test_inject",
        "type": "inject",
        "name": "手動觸發推播",
        "topic": "",
        "payload": "測試推播訊息",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "wires": [
          [
            "line_format_func"
          ]
        ]
      },
      {
        "id": "line_format_func",
        "type": "function",
        "name": "組裝 LINE 推播內容",
        "func": "var now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });\nmsg.payload = '【系統即時通報】\\n事件：設備狀態正常連線\\n時間：' + now + '\\n發送端：Node-RED 工業推播中樞';\nreturn msg;",
        "wires": [
          [
            "line_push_node"
          ]
        ]
      },
      {
        "id": "line_push_node",
        "type": "line-push",
        "name": "LINE Messaging API 推播",
        "token": "YOUR_CHANNEL_ACCESS_TOKEN",
        "to": "YOUR_LINE_USER_ID",
        "wires": [
          [
            "line_push_debug"
          ]
        ]
      },
      {
        "id": "line_push_debug",
        "type": "debug",
        "name": "推播回傳結果",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "LINE Developers Console 官方開發者後台",
        "url": "https://developers.line.biz/console/"
      },
      {
        "title": "LINE Messaging API Push Message 文件",
        "url": "https://developers.line.biz/en/reference/messaging-api/#send-push-message"
      },
      {
        "title": "node-red-contrib-node-line-api 官方節點套件",
        "url": "https://flows.nodered.org/node/node-red-contrib-node-line-api"
      }
    ]
  },
  {
    "id": "nr-proj-03",
    "projNumber": "專題 03",
    "title": "Serial Port 串列通訊與 PLC / 硬體感測器資料擷取",
    "category": "通訊與物聯網",
    "date": "2026-10-19",
    "slideRange": "第 29 ~ 34 頁 (共 5 頁)",
    "flowImage": "images_src/nodered_projects/slide_029.jpg",
    "resultImage": "images_src/nodered_projects/slide_030.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_029.jpg",
      "images_src/nodered_projects/slide_030.jpg",
      "images_src/nodered_projects/slide_031.jpg",
      "images_src/nodered_projects/slide_033.jpg",
      "images_src/nodered_projects/slide_034.jpg"
    ],
    "summary": "透過 node-red-node-serialport 節點開啟 COM 埠，設定鮑率 (Baud Rate 9600/115200)、資料位元與分行結束符號，實現對三菱 PLC (FX2N/FX3U) 或 Arduino / 微控制器串列通訊的即時讀寫與封包解碼。",
    "objective": "1. 認識 RS232 / RS485 實體層通訊協定與 COM 埠參數配置 (9600-7-E-1 等)。\n2. 掌握 node-red-node-serialport 的 serial in 與 serial out 節點雙向收發技術。\n3. 學習 Serial Buffer 切割 (Split on delimiter: \\r\\n 或固定字節數)。\n4. 實作三菱 PLC 編程口專屬 ASCII 指令 (如 ENQ, ACK, STX, ETX, CheckSum) 的序列解析。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 安裝與配置 SerialPort 節點",
        "description": "在 Node-RED 節點管理中搜尋並安裝 node-red-node-serialport。拖曳 serial in 節點至畫布，新增 Serial Port 配置：選擇通訊埠 (如 COM3)，鮑率設為 9600，資料位元 7，同位檢查 Even，停止位元 1。"
      },
      {
        "step": "步驟 2: 設定字元分割與緩衝區模式",
        "description": "在 Serial 節點設定中，將「Split input」設為「on character: \\r\\n」或「after a timeout of 50ms」，確保每次接收到的資料均為完整的單一資料封包而非破碎 byte。"
      },
      {
        "step": "步驟 3: 封包解析與字串比對",
        "description": "使用 function 節點撰寫解析邏輯：將 Buffer 轉換為 ASCII String，判斷起始碼 STX (0x02) 與結束碼 ETX (0x03)，並擷取暫存器 D0、D1 數值。"
      },
      {
        "step": "步驟 4: 下達控制指令 (Serial Out)",
        "description": "利用 inject 節點發送測試字串，透過 serial out 節點寫入 PLC 輔助繼電器 M0 置位指令，觀察硬體指示燈是否同步亮起。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "直接透過 PC 的 COM 埠連接現場三菱 FX 系列 PLC 編程口，即時讀取汽缸行程開關與光電檢測訊號。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "對接晶圓廠區老舊但穩定的 RS485 氣體質量流量計 (MFC) 與真空計，透過串列閘道器轉換為 JSON 物聯網數據。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "將快遞箱底部的 RS232 磅秤重量感測器訊號接入邊緣樹莓派，即時將精準重量傳回中控管理看板。"
      }
    ],
    "aiPrompt": "請幫我寫一個 Node-RED Flow：使用 serial in 節點監聽 COM3 (9600 7 E 1)，當收到以換行符 \\n 結尾的三菱 PLC ASCII 封包時，使用 Function 節點檢查校驗和 (CheckSum) 並解析出 D0 暫存器的十進制數值。",
    "nodeRedJson": [
      {
        "id": "sp_in",
        "type": "serial in",
        "name": "COM3 串列監聽",
        "serial": "com3_cfg",
        "wires": [
          [
            "sp_func"
          ]
        ]
      },
      {
        "id": "sp_func",
        "type": "function",
        "name": "解析 PLC 暫存器數據",
        "func": "var str = msg.payload.toString();\nmsg.payload = { raw: str, value: parseInt(str.substr(1, 4), 16) };\nreturn msg;",
        "wires": [
          [
            "sp_debug"
          ]
        ]
      },
      {
        "id": "sp_debug",
        "type": "debug",
        "name": "輸出暫存器數值",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "node-red-node-serialport 官方節點文檔",
        "url": "https://flows.nodered.org/node/node-red-node-serialport"
      },
      {
        "title": "台灣三菱電機自動化 - FX 系列 PLC 序列通訊手冊與技術支援",
        "url": "https://www.mitsubishielectric-automation.com.tw/"
      }
    ]
  },
  {
    "id": "nr-proj-04",
    "projNumber": "專題 04",
    "title": "MQTT 工業物聯網協議發布與訂閱實戰",
    "category": "通訊與物聯網",
    "date": "2026-10-19",
    "slideRange": "第 35 ~ 59 頁 (共 25 頁)",
    "flowImage": "images_src/nodered_projects/slide_035.jpg",
    "resultImage": "images_src/nodered_projects/slide_038.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_035.jpg",
      "images_src/nodered_projects/slide_036.jpg",
      "images_src/nodered_projects/slide_037.jpg",
      "images_src/nodered_projects/slide_038.jpg",
      "images_src/nodered_projects/slide_039.jpg",
      "images_src/nodered_projects/slide_040.jpg",
      "images_src/nodered_projects/slide_041.jpg",
      "images_src/nodered_projects/slide_042.jpg",
      "images_src/nodered_projects/slide_043.jpg",
      "images_src/nodered_projects/slide_044.jpg",
      "images_src/nodered_projects/slide_045.jpg",
      "images_src/nodered_projects/slide_046.jpg",
      "images_src/nodered_projects/slide_047.jpg",
      "images_src/nodered_projects/slide_048.jpg",
      "images_src/nodered_projects/slide_049.jpg",
      "images_src/nodered_projects/slide_050.jpg",
      "images_src/nodered_projects/slide_051.jpg",
      "images_src/nodered_projects/slide_052.jpg",
      "images_src/nodered_projects/slide_053.jpg",
      "images_src/nodered_projects/slide_054.jpg",
      "images_src/nodered_projects/slide_055.jpg",
      "images_src/nodered_projects/slide_056.jpg",
      "images_src/nodered_projects/slide_057.jpg",
      "images_src/nodered_projects/slide_058.jpg",
      "images_src/nodered_projects/slide_059.jpg"
    ],
    "summary": "掌握工業 4.0 核心通訊協議 MQTT (Message Queuing Telemetry Transport)，學習 Broker 搭建 (Mosquitto/EMQX)、Topic 主題層級設計、QoS 服務品質等級以及在 Node-RED 中建立 Publish 與 Subscribe 流程。",
    "objective": "1. 徹底理解 MQTT 輕量化發布/訂閱 (Pub/Sub) 架構原理與優勢。\n2. 掌握 Topic 主題萬用字元 (+ 單層、# 多層) 的分群設計規則。\n3. 實作 MQTT In 與 MQTT Out 節點，實現多設備高並發遙測數據聚合。\n4. 實戰 QoS 0、QoS 1、QoS 2 與 Retain 保留訊息機制的應用差異。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 配置 MQTT Broker 連線",
        "description": "拖曳 mqtt in 節點，新增 Broker 設定：輸入伺服器位址 (如 broker.emqx.io 或本地 localhost:1883)，設定 Client ID，並啟用 Keep Alive (60 秒)。"
      },
      {
        "step": "步驟 2: 設計結構化 Topic 主題階層",
        "description": "規劃工業標準 Topic 格式：factory/line1/sensor/temperature，並透過萬用字元 factory/+/sensor/# 實現跨機台資料一次性批次訂閱。"
      },
      {
        "step": "步驟 3: 格式化 JSON Payload 並發布 (Publish)",
        "description": "使用 inject 與 function 節點模擬機台震動與溫度數據，封裝為標準 JSON 格式：{\"temp\": 25.6, \"status\": \"RUN\"}，透過 mqtt out 節點送出。"
      },
      {
        "step": "步驟 4: 接收訂閱訊息並串接 Dashboard",
        "description": "將 mqtt in 接收到的數據解析為 JavaScript 物件，直接連線至 ui_gauge (儀表盤) 與 ui_chart (即時時序折線圖)，呈現即時戰情看板。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "將機台上的 PLC 稼動狀態透過 ESP32 或微控制器發布至 MQTT，讓評審與考生能在手機上即時查閱成品計數。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "各廠區數萬台邊緣閘道器以 MQTT QoS 1 將純水流量、化學品槽液位即時同步至中央 SCADA 與大數據叢集。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧包裹櫃使用電池供電的低功耗物聯網感測模組，透過 MQTT 喚醒回報開箱門禁與取件事件。"
      }
    ],
    "aiPrompt": "請幫我設計一個 Node-RED MQTT 監控流程：訂閱主題 'factory/machine/+/metrics'，接收各機台的 JSON 遙測資料 (包含 temp, pressure, status)，並自動將異常過溫 (temp > 80) 的機台 ID 與數據轉發到警報主題 'factory/alarms'。",
    "nodeRedJson": [
      {
        "id": "mqtt_in",
        "type": "mqtt in",
        "name": "訂閱機台遙測數據",
        "topic": "factory/machine/+/metrics",
        "qos": "1",
        "wires": [
          [
            "mqtt_chk"
          ]
        ]
      },
      {
        "id": "mqtt_chk",
        "type": "function",
        "name": "檢查異常溫度",
        "func": "var d = JSON.parse(msg.payload);\nif(d.temp > 80) {\n  msg.topic = 'factory/alarms';\n  msg.payload = { alert: 'OVERHEAT', machine: d.id, temp: d.temp };\n  return [msg, null];\n}\nreturn [null, msg];",
        "wires": [
          [
            "mqtt_out_alarm"
          ],
          [
            "mqtt_debug"
          ]
        ]
      },
      {
        "id": "mqtt_out_alarm",
        "type": "mqtt out",
        "name": "發布警報主題",
        "topic": "factory/alarms",
        "wires": []
      },
      {
        "id": "mqtt_debug",
        "type": "debug",
        "name": "正常運轉數據",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "MQTT 官方通訊規範與指南",
        "url": "https://mqtt.org/"
      },
      {
        "title": "EMQX 公共免費 MQTT 測試伺服器",
        "url": "https://www.emqx.com/zh/mqtt/public-mqtt5-broker"
      }
    ]
  },
  {
    "id": "nr-proj-05",
    "projNumber": "專題 05",
    "title": "中央氣象署開放資料平臺 API - 即時天氣預報與溫度看板",
    "category": "智慧生活與金融 API",
    "date": "2026-10-19",
    "slideRange": "第 60 ~ 81 頁 (共 22 頁)",
    "flowImage": "images_src/nodered_projects/slide_060.jpg",
    "resultImage": "images_src/nodered_projects/slide_063.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_060.jpg",
      "images_src/nodered_projects/slide_061.jpg",
      "images_src/nodered_projects/slide_062.jpg",
      "images_src/nodered_projects/slide_063.jpg",
      "images_src/nodered_projects/slide_064.jpg",
      "images_src/nodered_projects/slide_065.jpg",
      "images_src/nodered_projects/slide_066.jpg",
      "images_src/nodered_projects/slide_067.jpg",
      "images_src/nodered_projects/slide_068.jpg",
      "images_src/nodered_projects/slide_069.jpg",
      "images_src/nodered_projects/slide_070.jpg",
      "images_src/nodered_projects/slide_071.jpg",
      "images_src/nodered_projects/slide_072.jpg",
      "images_src/nodered_projects/slide_073.jpg",
      "images_src/nodered_projects/slide_074.jpg",
      "images_src/nodered_projects/slide_075.jpg",
      "images_src/nodered_projects/slide_076.jpg",
      "images_src/nodered_projects/slide_077.jpg",
      "images_src/nodered_projects/slide_078.jpg",
      "images_src/nodered_projects/slide_079.jpg",
      "images_src/nodered_projects/slide_080.jpg",
      "images_src/nodered_projects/slide_081.jpg"
    ],
    "summary": "串接交通部中央氣象署 (CWA) 開放資料平臺 RESTful API，掌握深層多階層 JSON 陣列資料萃取技巧，使用 JavaScript substr() 函數處理 ISO 8601 時間字串，將未來 7 天天氣預報動態呈現在 Node-RED Dashboard 上。",
    "objective": "1. 註冊中央氣象署開放資料平臺並取得專屬授權碼 (Authorization Key)。\n2. 理解多層巢狀 JSON 結構：Locations[0].Location[19].WeatherElement[0].Time[x]。\n3. 熟練掌握 JavaScript substr() 與時間格式化，處理預報開始與結束時間。\n4. 整合 Node-RED Dashboard 視覺化折線圖，動態呈現溫差曲線與降雨機率。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 申請中央氣象署 API 金鑰",
        "description": "前往氣象資料開放平臺 (https://opendata.cwa.gov.tw/) 註冊帳號並取得會員授權碼 (Authorization Key)。"
      },
      {
        "step": "步驟 2: 設定 HTTP Request 擷取各縣市預報",
        "description": "使用 http request 節點呼叫「一般天氣預報-今明36小時天氣預報」API (如 F-C0032-001 或 F-D0047-091 全台灣各鄉鎮預報)，Method 為 GET。"
      },
      {
        "step": "步驟 3: 提取深層巢狀時間與溫度數據",
        "description": "透過 function 節點導航至指定縣市：payload.records.Locations[0].Location[19] (如新北市)，萃取 WeatherElement[0].Time 陣列中的各時段溫度 (ElementValue[0].Temperature)。"
      },
      {
        "step": "步驟 4: 時間戳截取與圖表映射",
        "description": "利用 str.substr(0, 10) 擷取日期 (2026-10-19)，str.substr(11, 5) 擷取時間 (12:00)，將整理後的時序資料格式化後傳入 ui_chart 節點展示。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "實訓工場環境溫度與空調自動調節聯鎖：當戶外高溫預報超過 32 度時，提前啟動廠房通風扇與降溫水簾。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "結合氣象局即時降雨與颱風路徑 API，連動晶圓廠房地下防汛水閘門與冷卻水塔補水預調節控制。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "當氣象預報降雨機率高於 70% 且快遞箱有未取包裹時，中控系統透過 LINE 提醒住戶儘速取件避免受潮。"
      }
    ],
    "aiPrompt": "請幫我寫一段 Node-RED 程式：呼叫中央氣象署 F-C0032-001 API，解析出台北市未來 24 小時的最低溫 (MinT)、最高溫 (MaxT) 及舒適度描述，並組成易讀的 Dashboard 摘要卡片。",
    "nodeRedJson": [
      {
        "id": "cwa_inject",
        "type": "inject",
        "name": "排程更新",
        "repeat": "1800",
        "wires": [
          [
            "cwa_req"
          ]
        ]
      },
      {
        "id": "cwa_req",
        "type": "http request",
        "name": "氣象署 API",
        "method": "GET",
        "url": "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-KEY",
        "wires": [
          [
            "cwa_parser"
          ]
        ]
      },
      {
        "id": "cwa_parser",
        "type": "function",
        "name": "解析溫度與降雨機率",
        "func": "var data = msg.payload.records.location[0];\nvar weather = data.weatherElement[0].time[0].parameter.parameterName;\nvar minT = data.weatherElement[2].time[0].parameter.parameterName;\nvar maxT = data.weatherElement[4].time[0].parameter.parameterName;\nmsg.payload = { city: data.locationName, status: weather, tempRange: minT + '°C ~ ' + maxT + '°C' };\nreturn msg;",
        "wires": [
          [
            "cwa_debug"
          ]
        ]
      },
      {
        "id": "cwa_debug",
        "type": "debug",
        "name": "天氣輸出",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "中央氣象署氣象資料開放平臺",
        "url": "https://opendata.cwa.gov.tw/"
      },
      {
        "title": "MDN Web Docs - String.prototype.substr()",
        "url": "https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/substr"
      }
    ]
  },
  {
    "id": "nr-proj-06",
    "projNumber": "專題 06",
    "title": "Google Teachable Machine 邊緣 AI 影像分類辨識",
    "category": "機器學習與視覺 AI",
    "date": "2026-10-19",
    "slideRange": "第 82 ~ 114 頁 (共 33 頁)",
    "flowImage": "images_src/nodered_projects/slide_082.jpg",
    "resultImage": "images_src/nodered_projects/slide_088.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_082.jpg",
      "images_src/nodered_projects/slide_083.jpg",
      "images_src/nodered_projects/slide_084.jpg",
      "images_src/nodered_projects/slide_085.jpg",
      "images_src/nodered_projects/slide_086.jpg",
      "images_src/nodered_projects/slide_087.jpg",
      "images_src/nodered_projects/slide_088.jpg",
      "images_src/nodered_projects/slide_089.jpg",
      "images_src/nodered_projects/slide_090.jpg",
      "images_src/nodered_projects/slide_091.jpg",
      "images_src/nodered_projects/slide_092.jpg",
      "images_src/nodered_projects/slide_093.jpg",
      "images_src/nodered_projects/slide_094.jpg",
      "images_src/nodered_projects/slide_095.jpg",
      "images_src/nodered_projects/slide_096.jpg",
      "images_src/nodered_projects/slide_097.jpg",
      "images_src/nodered_projects/slide_098.jpg",
      "images_src/nodered_projects/slide_099.jpg",
      "images_src/nodered_projects/slide_100.jpg",
      "images_src/nodered_projects/slide_101.jpg",
      "images_src/nodered_projects/slide_102.jpg",
      "images_src/nodered_projects/slide_103.jpg",
      "images_src/nodered_projects/slide_104.jpg",
      "images_src/nodered_projects/slide_105.jpg",
      "images_src/nodered_projects/slide_106.jpg",
      "images_src/nodered_projects/slide_107.jpg",
      "images_src/nodered_projects/slide_108.jpg",
      "images_src/nodered_projects/slide_109.jpg",
      "images_src/nodered_projects/slide_110.jpg",
      "images_src/nodered_projects/slide_111.jpg",
      "images_src/nodered_projects/slide_112.jpg",
      "images_src/nodered_projects/slide_113.jpg",
      "images_src/nodered_projects/slide_114.jpg"
    ],
    "summary": "透過 Google 提供的無代碼機器學習工具 Teachable Machine，使用 Webcam 訓練紅圓、黑圓、長方形等機電工件分類模型，並匯出雲端模型權重，利用 Node-RED 節點或 Dashboard 進行零延遲即時推論與良率判斷。",
    "objective": "1. 掌握 Google Teachable Machine 影像資料集收集、標註與遷移學習 (Transfer Learning) 訓練。\n2. 匯出雲端託管模型 (metadata.json & model.json)。\n3. 解決 Web 攝影機 HTTPS 安全存取要求與本地 XAMPP 憑證設定。\n4. 在 Node-RED (node-red-contrib-teachable-machine) 中載入模型並解析各類別信心度 (Score)。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 使用 Teachable Machine 訓練工件分類器",
        "description": "開啟 https://teachablemachine.withgoogle.com/，建立 Image Project。新增 Class 1 (RedCircle 紅色圓形)、Class 2 (BlackCircle 黑色圓形)、Class 3 (Rectangle 矩形金屬塊) 及 Class 4 (Background 背景無物件)。"
      },
      {
        "step": "步驟 2: 模型訓練與預覽驗證",
        "description": "點擊「Train Model」進行訓練。在預覽面板以不同角度旋轉工件，確認信心度 (Confidence Score) 是否皆大於 90%。"
      },
      {
        "step": "步驟 3: 匯出模型網址與 Metadata",
        "description": "點擊「Export Model」，選擇「Upload (shareable link)」取得專屬模型網址 (如 https://teachablemachine.withgoogle.com/models/AFLAa-dkC/)。"
      },
      {
        "step": "步驟 4: Node-RED 節點整合與鏡頭串接",
        "description": "在 Node-RED 安裝 node-red-contrib-teachable-machine，填入 Model URL。連接攝影機擷取節點 (node-red-node-ui-webcam)，將影像傳入模型推論。"
      },
      {
        "step": "步驟 5: 判斷最高信心度類別並連動硬體",
        "description": "在 function 節點中比對 msg.payload[0].class 與 msg.payload[0].score，當確認為 RedCircle 且信心度 > 0.85 時，發送訊號至 PLC 分流汽缸。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "丙級第二題工件顏色分類裝配：以 USB 攝影機取代傳統光纖色標感測器，透過 AI 視覺精準識別金屬、紅色、黃色工件。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "進料檢驗 (IQC) 視覺判定：自動識別晶圓載具外觀是否刮傷破損，自動分流至維修站點。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧門禁快遞辨識：自動判斷到訪者為郵差、黑貓快遞員或一般訪客，自動開啟對應的收件暫存櫃。"
      }
    ],
    "aiPrompt": "請幫我寫一個 Node-RED Teachable Machine 判定流程：接收攝影機 Base64 圖片並送入 teachable-machine 節點，在 Function 節點找出 score 最高的第一名類別，若為 'Defect' 則發出警報並控制 GPIO 蜂鳴器響起。",
    "nodeRedJson": [
      {
        "id": "tm_cam",
        "type": "inject",
        "name": "觸發相機拍照",
        "wires": [
          [
            "tm_infer"
          ]
        ]
      },
      {
        "id": "tm_infer",
        "type": "teachable-machine",
        "name": "工件 AI 分類模型",
        "mode": "cloud",
        "modelUrl": "https://teachablemachine.withgoogle.com/models/AFLAa-dkC/",
        "wires": [
          [
            "tm_eval"
          ]
        ]
      },
      {
        "id": "tm_eval",
        "type": "function",
        "name": "取第一高信心度類別",
        "func": "var best = msg.payload[0];\nmsg.payload = { category: best.class, confidence: (best.score * 100).toFixed(1) + '%' };\nreturn msg;",
        "wires": [
          [
            "tm_disp"
          ]
        ]
      },
      {
        "id": "tm_disp",
        "type": "debug",
        "name": "識別結果",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Google Teachable Machine 官網平台",
        "url": "https://teachablemachine.withgoogle.com/"
      },
      {
        "title": "node-red-contrib-teachable-machine 節點",
        "url": "https://flows.nodered.org/node/node-red-contrib-teachable-machine"
      }
    ]
  },
  {
    "id": "nr-proj-07",
    "projNumber": "專題 07",
    "title": "TensorFlow.js COCO-SSD 即時物件偵測與邊界框定位",
    "category": "機器學習與視覺 AI",
    "date": "2026-10-19",
    "slideRange": "第 115 ~ 133 頁 (共 19 頁)",
    "flowImage": "images_src/nodered_projects/slide_115.jpg",
    "resultImage": "images_src/nodered_projects/slide_116.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_115.jpg",
      "images_src/nodered_projects/slide_116.jpg",
      "images_src/nodered_projects/slide_117.jpg",
      "images_src/nodered_projects/slide_118.jpg",
      "images_src/nodered_projects/slide_119.jpg",
      "images_src/nodered_projects/slide_120.jpg",
      "images_src/nodered_projects/slide_121.jpg",
      "images_src/nodered_projects/slide_122.jpg",
      "images_src/nodered_projects/slide_123.jpg",
      "images_src/nodered_projects/slide_124.jpg",
      "images_src/nodered_projects/slide_125.jpg",
      "images_src/nodered_projects/slide_126.jpg",
      "images_src/nodered_projects/slide_127.jpg",
      "images_src/nodered_projects/slide_128.jpg",
      "images_src/nodered_projects/slide_129.jpg",
      "images_src/nodered_projects/slide_130.jpg",
      "images_src/nodered_projects/slide_131.jpg",
      "images_src/nodered_projects/slide_132.jpg",
      "images_src/nodered_projects/slide_133.jpg"
    ],
    "summary": "整合 Google TensorFlow.js 的 COCO-SSD (Common Objects in Context - Single Shot MultiBox Detector) 預訓練模型，在瀏覽器或 Node-RED 本地端直接識別 80 種日常物體，並標示 bounding box (x, y, width, height) 邊界框座標。",
    "objective": "1. 認識物件偵測 (Object Detection) 與影像分類 (Classification) 的本質差異。\n2. 掌握 COCO-SSD 模型的推論架構與 80 種標準物件標籤。\n3. 安裝與排查 node-red-contrib-tfjs-coco-ssd 與 node-pre-gyp 相依性錯誤。\n4. 提取物體邊界框 (bbox: [x, y, w, h]) 進行物體中心點座標計算，連動自動化機構。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 理解 COCO-SSD 物件偵測技術",
        "description": "COCO-SSD 不僅能回答圖片中有什麼物體 (class)，還能精確框出每一個物體的具體像素空間座標 (bbox: [x, y, w, h]) 與信心分數。"
      },
      {
        "step": "步驟 2: 安裝 node-red-contrib-tfjs-coco-ssd 模組",
        "description": "在 Node-RED 中安裝 TFJS 節點，注意 Node.js 版本相容性 (建議 Node.js v18 或 v20)，若遇 gyp 編譯錯誤可安裝 Desktop development with C++ 工作負載。"
      },
      {
        "step": "步驟 3: 輸入攝影機影像串流並執行推論",
        "description": "透過 WebCam 或本機圖片檔案讀取節點傳入 Buffer 影像，連接 coco-ssd 節點進行神經網路推論。"
      },
      {
        "step": "步驟 4: 計算物體重心與中心點座標",
        "description": "在 function 節點中遍歷偵測到的物件陣列：計算 center_x = bbox[0] + bbox[2]/2 與 center_y = bbox[1] + bbox[3]/2，為機器手臂夾取提供座標定位。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "輸送帶零件姿態與位置定位：檢測送料盤中工件是否偏移傾斜，將座標補償值即時送入控制器。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "無人搬運車 (AGV) 盲區行人與障礙物偵測：即時框出搬運路徑上的作業人員與障礙物，觸發減速或急停安全互鎖。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧儲物櫃空間佔用檢測：透過箱內廣角相機偵測是否有「box、bottle、bag」存在，確認櫃位是否已放滿。"
      }
    ],
    "aiPrompt": "請幫我寫一個 Node-RED Flow：使用 coco-ssd 節點偵測攝影機畫面中的所有物體，過濾出類別為 'person' 且 score > 0.75 的結果，並計算其邊界框中心點座標 (cx, cy) 輸出為 JSON。",
    "nodeRedJson": [
      {
        "id": "coco_in",
        "type": "inject",
        "name": "拍照觸發",
        "wires": [
          [
            "coco_ssd"
          ]
        ]
      },
      {
        "id": "coco_ssd",
        "type": "tfjs-coco-ssd",
        "name": "COCO 物件偵測",
        "wires": [
          [
            "coco_center"
          ]
        ]
      },
      {
        "id": "coco_center",
        "type": "function",
        "name": "計算物體中心點",
        "func": "var results = msg.payload.filter(function(o){ return o.class === 'person'; });\nmsg.payload = results.map(function(o){\n  return { class: o.class, score: o.score, cx: o.bbox[0] + o.bbox[2]/2, cy: o.bbox[1] + o.bbox[3]/2 };\n});\nreturn msg;",
        "wires": [
          [
            "coco_debug"
          ]
        ]
      },
      {
        "id": "coco_debug",
        "type": "debug",
        "name": "座標輸出",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "TensorFlow.js COCO-SSD 模型 GitHub Repo",
        "url": "https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd"
      },
      {
        "title": "Node-RED TFJS COCO-SSD 節點庫",
        "url": "https://flows.nodered.org/node/node-red-contrib-tfjs-coco-ssd"
      }
    ]
  },
  {
    "id": "nr-proj-08",
    "projNumber": "專題 08",
    "title": "Modbus TCP / RTU 工業通訊與三菱 PLC 輸出控制",
    "category": "通訊與物聯網",
    "date": "2026-10-19",
    "slideRange": "第 134 ~ 172 頁 (共 39 頁)",
    "flowImage": "images_src/nodered_projects/slide_134.jpg",
    "resultImage": "images_src/nodered_projects/slide_140.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_134.jpg",
      "images_src/nodered_projects/slide_135.jpg",
      "images_src/nodered_projects/slide_136.jpg",
      "images_src/nodered_projects/slide_137.jpg",
      "images_src/nodered_projects/slide_138.jpg",
      "images_src/nodered_projects/slide_139.jpg",
      "images_src/nodered_projects/slide_140.jpg",
      "images_src/nodered_projects/slide_141.jpg",
      "images_src/nodered_projects/slide_142.jpg",
      "images_src/nodered_projects/slide_143.jpg",
      "images_src/nodered_projects/slide_144.jpg",
      "images_src/nodered_projects/slide_145.jpg",
      "images_src/nodered_projects/slide_146.jpg",
      "images_src/nodered_projects/slide_147.jpg",
      "images_src/nodered_projects/slide_148.jpg",
      "images_src/nodered_projects/slide_149.jpg",
      "images_src/nodered_projects/slide_150.jpg",
      "images_src/nodered_projects/slide_151.jpg",
      "images_src/nodered_projects/slide_152.jpg",
      "images_src/nodered_projects/slide_153.jpg",
      "images_src/nodered_projects/slide_154.jpg",
      "images_src/nodered_projects/slide_155.jpg",
      "images_src/nodered_projects/slide_156.jpg",
      "images_src/nodered_projects/slide_157.jpg",
      "images_src/nodered_projects/slide_158.jpg",
      "images_src/nodered_projects/slide_159.jpg",
      "images_src/nodered_projects/slide_160.jpg",
      "images_src/nodered_projects/slide_161.jpg",
      "images_src/nodered_projects/slide_162.jpg",
      "images_src/nodered_projects/slide_163.jpg",
      "images_src/nodered_projects/slide_164.jpg",
      "images_src/nodered_projects/slide_165.jpg",
      "images_src/nodered_projects/slide_166.jpg",
      "images_src/nodered_projects/slide_167.jpg",
      "images_src/nodered_projects/slide_168.jpg",
      "images_src/nodered_projects/slide_169.jpg",
      "images_src/nodered_projects/slide_170.jpg",
      "images_src/nodered_projects/slide_171.jpg",
      "images_src/nodered_projects/slide_172.jpg"
    ],
    "summary": "深入工業通訊骨幹 Modbus 協定，實作 Modbus TCP (乙太網 Port 502) 與 Modbus RTU (RS485/序列通訊)，運用 Wireshark 抓包分析 MBAP Header、PDU 與 Function Code (FC01/FC03/FC05/FC15)，控制三菱 FX5U PLC 線圈輸出與暫存器讀寫。",
    "objective": "1. 徹底理解 Modbus 訊框結構：MBAP (7 bytes) + PDU (Function Code + Data)。\n2. 掌握 Function Code 01 (讀線圈)、03 (讀保持暫存器)、05 (寫單線圈)、15 (寫多線圈)。\n3. 使用 Wireshark 在 Port 502 進行工業網路封包側錄與逐位元解析。\n4. 在 Node-RED (node-red-contrib-modbus) 實作 Modbus-Write 與 Flex-Write 控制 PLC Y0~Y17 實體輸出。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 安裝 Modbus 工業通訊套件",
        "description": "在 Node-RED 節點管理安裝 node-red-contrib-modbus。拖入 Modbus-Write 節點，新增 Modbus-Client 設定：選擇 TCP，IP 輸入 PLC 現場位址 (如 192.168.1.250)，Port 設為 502，Unit-Id 設為 1。"
      },
      {
        "step": "步驟 2: 設定單點線圈強制控制 (FC 05)",
        "description": "在 Modbus-Write 節點中，FC 選擇「FC 5: Force Single Coil」，Address 填入 0 (對應三菱 PLC Y0 輸出)，使用 inject 節點分別發送 true 與 false 測試繼電器動作。"
      },
      {
        "step": "步驟 3: 實作多點線圈批次控制 (FC 15)",
        "description": "將 FC 改為「FC 15: Force Multiple Coils」，Address 設為 0，Quantity 設為 8，在 Function 節點中組裝 Boolean Array: [true, false, true, false, true, false, true, false]，實現 Y0~Y7 跑馬燈控制。"
      },
      {
        "step": "步驟 4: Wireshark 工業封包鑑識分析",
        "description": "開啟 Wireshark 監聽網卡，過濾器輸入「tcp.port == 502」，驗證 MBAP Header (Transaction ID, Protocol ID 0x0000, Length, Unit ID 0x01) 及 Function Code 0x05 內容。"
      },
      {
        "step": "步驟 5: Modbus RTU 與 CRC16 校驗",
        "description": "切換至 Modbus RTU 模式，設定 COM 埠與鮑率，手動推導與驗證 Modbus RTU 結尾的 2 位元組 CRC-16 (Cyclic Redundancy Check) 校驗碼。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "以 PC 端 Node-RED 取代傳統實體按鈕盤，透過 Modbus TCP 直連三菱 FX5U 控制器，實現圖形化人機介面 (HMI) 啟動與復歸。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "廠務電力配電盤多功能電表 (PM) 資料讀取：透過 Modbus RTU/TCP 輪詢三相電壓、電流、功因及累計 kWh 電能數值。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "快遞儲物櫃多組電磁鎖控制：透過 Modbus RTU 8 通道繼電器輸出模組，單一指令控制指定格子電磁閥開啟彈出。"
      }
    ],
    "aiPrompt": "請幫我寫一個 Node-RED Modbus TCP 控制流程：連線至 192.168.1.50:502，提供兩個 Dashboard 按鈕分別代表『馬達正轉 (Y0)』與『緊急停止 (Y1)』，點擊後透過 FC 5 寫入對應 PLC 輸出線圈。",
    "nodeRedJson": [
      {
        "id": "mb_start",
        "type": "ui_button",
        "name": "啟動按鈕",
        "payload": "true",
        "wires": [
          [
            "mb_write_y0"
          ]
        ]
      },
      {
        "id": "mb_write_y0",
        "type": "modbus-write",
        "name": "寫入 Y0 線圈",
        "unitid": "1",
        "dataType": "Coil",
        "adr": "0",
        "cmd": "FC5",
        "wires": [
          [],
          [
            "mb_debug"
          ]
        ]
      },
      {
        "id": "mb_debug",
        "type": "debug",
        "name": "Modbus 回應",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Modbus Application Protocol Specification V1.1b3",
        "url": "https://modbus.org/docs/Modbus_Application_Protocol_V1_1b3.pdf"
      },
      {
        "title": "node-red-contrib-modbus 官方節點套件",
        "url": "https://flows.nodered.org/node/node-red-contrib-modbus"
      }
    ]
  },
  {
    "id": "nr-proj-09",
    "projNumber": "專題 09",
    "title": "Google Gemini 雲端生成式 AI 多模態 API 串接與語音互動",
    "category": "大語言模型 (LLM) 整合",
    "date": "2026-10-19",
    "slideRange": "第 173 ~ 177 頁 (共 5 頁)",
    "flowImage": "images_src/nodered_projects/slide_173.jpg",
    "resultImage": "images_src/nodered_projects/slide_176.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_173.jpg",
      "images_src/nodered_projects/slide_174.jpg",
      "images_src/nodered_projects/slide_175.jpg",
      "images_src/nodered_projects/slide_176.jpg",
      "images_src/nodered_projects/slide_177.jpg"
    ],
    "summary": "掌握 Google 最新 Gemini 1.5 / 2.0 API 串接技術，在 Node-RED 中建立 HTTP Request 呼叫 Google AI Studio 的 generateContent 端點，實現工控設備異常日誌摘要、設備語音操控意圖解析與多模態圖片故障診斷。",
    "objective": "1. 取得 Google AI Studio API Key 並掌握 API 生命週期與 Rate Limit 配額。\n2. 熟悉 Gemini API 的 JSON 請求格式：contents[].parts[].text。\n3. 在 Node-RED 中打造流暢的自然語言工控對話機器人。\n4. 結合系統提示詞 (System Instruction)，將自由文本嚴格約束為 JSON 格式輸出。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 取得 Google Gemini API Key",
        "description": "前往 Google AI Studio (https://aistudio.google.com/) 登入 Google 帳號並建立 API Key，妥善保存金鑰。"
      },
      {
        "step": "步驟 2: 組裝 Gemini API 標準請求 Payload",
        "description": "在 Function 節點中建構符合規格的 JSON 封包：msg.payload = { contents: [{ parts: [{ text: user_prompt }] }] }，並設定 URL 為 https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY。"
      },
      {
        "step": "步驟 3: 設定 HTTP Request 節點發送 POST 請求",
        "description": "拖入 http request 節點，Method 設為 POST，Headers 加入 Content-Type: application/json，接收 Gemini 雲端推論回傳。"
      },
      {
        "step": "步驟 4: 解析候選回應與 Dashboard 渲染",
        "description": "在後續 Function 節點中提取 response.candidates[0].content.parts[0].text，將 AI 診斷或建議輸出至網頁面板展示。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "學員機台故障排除智慧導航：學員輸入報警代碼 (如 Err-04)，Gemini 即時分析可能發生原因 (如氣壓不足或限位開關接觸不良) 並給予排查建議。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "海量機台事件日誌 (Event Log) 智慧總結：每班交接時自動將過去 8 小時之警報群組化總結為繁體中文交接班摘要報告。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "自然語言語音管家：住戶說「今天有我的包裹嗎？」，Gemini 解析意圖為查詢包裹並回傳結構化指令驅動櫃位指示燈。"
      }
    ],
    "aiPrompt": "你是一位工控自動化與 Node-RED 專家。請根據我提供的三菱 PLC 警報代碼與當前溫度/壓力數值，輸出結構化 JSON，包含：1. 故障根因分析 2. 建議維修排查順序 3. 緊急處置安全規範。",
    "nodeRedJson": [
      {
        "id": "gemini_in",
        "type": "inject",
        "name": "輸入問題",
        "wires": [
          [
            "gemini_prep"
          ]
        ]
      },
      {
        "id": "gemini_prep",
        "type": "function",
        "name": "組裝 Gemini Payload",
        "func": "msg.headers = { 'Content-Type': 'application/json' };\nmsg.payload = {\n  contents: [{ parts: [{ text: '請為我分析三菱 PLC 氣壓過低警報的常見 3 個原因與排除步驟' }] }]\n};\nreturn msg;",
        "wires": [
          [
            "gemini_req"
          ]
        ]
      },
      {
        "id": "gemini_req",
        "type": "http request",
        "name": "Gemini API",
        "method": "POST",
        "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=API_KEY",
        "wires": [
          [
            "gemini_resp"
          ]
        ]
      },
      {
        "id": "gemini_resp",
        "type": "function",
        "name": "提取回答文字",
        "func": "var reply = msg.payload.candidates[0].content.parts[0].text;\nmsg.payload = reply;\nreturn msg;",
        "wires": [
          [
            "gemini_debug"
          ]
        ]
      },
      {
        "id": "gemini_debug",
        "type": "debug",
        "name": "AI 診斷結果",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Google AI Studio 官方網站",
        "url": "https://aistudio.google.com/"
      },
      {
        "title": "Gemini API 官方開發文檔",
        "url": "https://ai.google.dev/docs"
      }
    ]
  },
  {
    "id": "nr-proj-10",
    "projNumber": "專題 10",
    "title": "本地端 Ollama + Llama 3.2-Vision 邊緣車牌視覺辨識",
    "category": "大語言模型 (LLM) 整合",
    "date": "2026-10-19",
    "slideRange": "第 178 ~ 196 頁 (共 19 頁)",
    "flowImage": "images_src/nodered_projects/slide_178.jpg",
    "resultImage": "images_src/nodered_projects/slide_191.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_178.jpg",
      "images_src/nodered_projects/slide_179.jpg",
      "images_src/nodered_projects/slide_180.jpg",
      "images_src/nodered_projects/slide_181.jpg",
      "images_src/nodered_projects/slide_182.jpg",
      "images_src/nodered_projects/slide_183.jpg",
      "images_src/nodered_projects/slide_184.jpg",
      "images_src/nodered_projects/slide_185.jpg",
      "images_src/nodered_projects/slide_186.jpg",
      "images_src/nodered_projects/slide_187.jpg",
      "images_src/nodered_projects/slide_188.jpg",
      "images_src/nodered_projects/slide_189.jpg",
      "images_src/nodered_projects/slide_190.jpg",
      "images_src/nodered_projects/slide_191.jpg",
      "images_src/nodered_projects/slide_192.jpg",
      "images_src/nodered_projects/slide_193.jpg",
      "images_src/nodered_projects/slide_194.jpg",
      "images_src/nodered_projects/slide_195.jpg",
      "images_src/nodered_projects/slide_196.jpg"
    ],
    "summary": "在完全無網際網路的本地端工控主機部署 Ollama，安裝 llama3.2-vision 多模態視覺模型，透過 Node-RED 串接本地 RESTful API (localhost:11434)，上傳停車場車輛照片，由 AI 直接辨識台灣車牌號碼與車輛特徵。",
    "objective": "1. 掌握本地端 Ollama 服務架構與 RESTful API 端點 (/api/tags, /api/generate)。\n2. 下載與部署多模態視覺模型 llama3.2-vision:11b。\n3. 在 Node-RED 中使用 node-red-contrib-ui-upload 上傳照片並轉為 Base64 格式。\n4. 設計專用 Prompt 引導多模態 AI 精準辨識車牌格式 (如 ABC-1234) 並排除環境噪聲。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 安裝與啟動本地 Ollama 伺服器",
        "description": "下載並安裝 Ollama (https://ollama.com/)，在終端機執行 ollama run llama3.2-vision 進行模型下載與權重載入，確認 http://localhost:11434 可正常連線。"
      },
      {
        "step": "步驟 2: 測試 Ollama 視覺推論 API",
        "description": "Ollama /api/generate 支援傳入 images 陣列 (Base64 編碼)，將圖片與提示詞「請辨識這張照片中的汽車車牌號碼，只輸出車牌字串」一同送出測試。"
      },
      {
        "step": "步驟 3: Node-RED 搭建上傳與前處理工作流",
        "description": "在 Dashboard 放置 file upload 節點，讀取使用者上傳的車牌照片，透過 function 節點將圖片 Buffer 轉為純 Base64 字串並封裝為 Ollama API 要求的格式。"
      },
      {
        "step": "步驟 4: 呼叫本地 Ollama 並解析回傳車牌",
        "description": "使用 http request 節點 POST 至 http://localhost:11434/api/generate，關閉 stream 模式 (stream: false)，接收完整辨識結果並顯示於儀表板。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "工件流水號與刻印雷雕 OCR 辨識：在產線上以地端視覺模型自動識別金屬工件表面雷雕的加工批號與序號。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "機密廠區進出車輛管制：在 100% 離線無外網環境下，精準識別外包商工程車與化學品槽車車牌，保障廠區資安絕不外洩。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "社區地下停車場智慧門禁：攝影機偵測住戶車牌自動開啟鐵捲門，並同步在家庭中控發送「車輛已進庫」提示。"
      }
    ],
    "aiPrompt": "This is a photo of a vehicle license plate in Taiwan. Please extract the license plate number accurately. Format rules: Output ONLY the plate string (e.g. ABC-1234), no explanations, no markdown.",
    "nodeRedJson": [
      {
        "id": "ol_up",
        "type": "ui_upload",
        "name": "上傳車牌照片",
        "wires": [
          [
            "ol_prep"
          ]
        ]
      },
      {
        "id": "ol_prep",
        "type": "function",
        "name": "封裝 Ollama 視覺格式",
        "func": "var b64 = msg.payload.toString('base64');\nmsg.payload = {\n  model: 'llama3.2-vision',\n  prompt: 'Extract the vehicle license plate number in Taiwan. Output only the number.',\n  stream: false,\n  images: [b64]\n};\nreturn msg;",
        "wires": [
          [
            "ol_req"
          ]
        ]
      },
      {
        "id": "ol_req",
        "type": "http request",
        "name": "地端 Ollama API",
        "method": "POST",
        "url": "http://localhost:11434/api/generate",
        "wires": [
          [
            "ol_resp"
          ]
        ]
      },
      {
        "id": "ol_resp",
        "type": "function",
        "name": "提取車牌字串",
        "func": "msg.payload = msg.payload.response.trim();\nreturn msg;",
        "wires": [
          [
            "ol_debug"
          ]
        ]
      },
      {
        "id": "ol_debug",
        "type": "debug",
        "name": "車牌辨識結果",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Ollama 官方模型庫 Llama 3.2-Vision",
        "url": "https://ollama.com/library/llama3.2-vision"
      },
      {
        "title": "Ollama API 官方規格手冊",
        "url": "https://github.com/ollama/ollama/blob/main/docs/api.md"
      }
    ]
  },
  {
    "id": "nr-proj-11",
    "projNumber": "專題 11",
    "title": "AnythingLLM + RAG 本地廠務專屬知識庫檢索與智慧問答",
    "category": "大語言模型 (LLM) 整合",
    "date": "2026-10-19",
    "slideRange": "第 197 ~ 208 頁 (共 12 頁)",
    "flowImage": "images_src/nodered_projects/slide_197.jpg",
    "resultImage": "images_src/nodered_projects/slide_206.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_197.jpg",
      "images_src/nodered_projects/slide_198.jpg",
      "images_src/nodered_projects/slide_199.jpg",
      "images_src/nodered_projects/slide_200.jpg",
      "images_src/nodered_projects/slide_201.jpg",
      "images_src/nodered_projects/slide_202.jpg",
      "images_src/nodered_projects/slide_203.jpg",
      "images_src/nodered_projects/slide_204.jpg",
      "images_src/nodered_projects/slide_205.jpg",
      "images_src/nodered_projects/slide_206.jpg",
      "images_src/nodered_projects/slide_207.jpg",
      "images_src/nodered_projects/slide_208.jpg"
    ],
    "summary": "利用 AnythingLLM 搭建企業專屬 RAG (檢索增強生成) 系統，將機電設備操作手冊、SOP 文件、PLC 代碼筆記匯入 Workspace 向量資料庫，並在 Node-RED 透過 REST API 實現精準無幻覺的技術問答檢索。",
    "objective": "1. 理解檢索增強生成 (RAG, Retrieval-Augmented Generation) 解決大模型幻覺的運作原理。\n2. 掌握 AnythingLLM 系統架構、Workspace 工作區設定與 API Key 管理。\n3. 在 Node-RED 呼叫 /api/v1/workspace/{slug}/chat 進行流式與完整對話請求。\n4. 辨析有知識庫支撐 vs 無相關文檔時模型的防呆邊界回應表現。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 配置 AnythingLLM 知識庫與工作區",
        "description": "啟動 AnythingLLM，建立名為「smart-factory」的工作區，上傳三菱 PLC 使用手冊與機電整合工藝規範 PDF，完成向量化嵌入 (Embedding)。"
      },
      {
        "step": "步驟 2: 建立 AnythingLLM API Key",
        "description": "進入 AnythingLLM Settings -> API Keys，產生專屬金鑰，並於 API Documentation 查閱各端點 (如 /v1/workspaces 與 /v1/workspace/{slug}/chat)。"
      },
      {
        "step": "步驟 3: Node-RED 整合知識問答流程",
        "description": "在 Node-RED 中建立文字輸入框，透過 function 節點配置 Authorization: Bearer {API_KEY} Header 與 message 內容，向指定的 workspace slug 發出 POST 請求。"
      },
      {
        "step": "步驟 4: 擷取附帶引用出處 (Citations) 的解答",
        "description": "解析回傳的 textResponse 與 sources 來源清單，確認答案精確來自上傳之手冊頁碼，呈現在維修工程師的查詢介面。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "檢定考場數位助教：快速檢索丙級術科測試評分規準、接線規範與常見扣分項目，解答考生疑惑。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "廠務百萬字維護標準書 RAG 智庫：工程師輸入報警現象，立刻調出對應型號閥門的標準拆卸扭力與維護步驟。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧家電使用說明庫：收錄全家各品牌家電說明書，用語音提問「洗衣機 E3 故障碼是什麼意思」立即獲得標準解答。"
      }
    ],
    "aiPrompt": "請依據 AnythingLLM 知識庫中的內容回答：三相感應馬達於星角 (Y-Delta) 啟動切換時，計時器 (Timer) 延遲秒數設定之標準經驗法則與注意事項。",
    "nodeRedJson": [
      {
        "id": "rag_in",
        "type": "inject",
        "name": "手冊檢索問題",
        "wires": [
          [
            "rag_prep"
          ]
        ]
      },
      {
        "id": "rag_prep",
        "type": "function",
        "name": "組裝 RAG 對話 Payload",
        "func": "msg.headers = {\n  'Authorization': 'Bearer YOUR_ANYTHINGLLM_KEY',\n  'Content-Type': 'application/json'\n};\nmsg.payload = {\n  message: '請說明三菱 FX3U 擴充模組 FX2N-4AD 的接線與暫存器設定',\n  mode: 'query'\n};\nreturn msg;",
        "wires": [
          [
            "rag_http"
          ]
        ]
      },
      {
        "id": "rag_http",
        "type": "http request",
        "name": "AnythingLLM API",
        "method": "POST",
        "url": "http://localhost:3001/api/v1/workspace/factory/chat",
        "wires": [
          [
            "rag_out"
          ]
        ]
      },
      {
        "id": "rag_out",
        "type": "debug",
        "name": "手冊檢索答案",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "AnythingLLM 官方首頁與下載",
        "url": "https://anythingllm.com/"
      },
      {
        "title": "AnythingLLM Developer API Reference",
        "url": "https://docs.anythingllm.com/developer-guide/api"
      }
    ]
  },
  {
    "id": "nr-proj-12",
    "projNumber": "專題 12",
    "title": "Gemini AI 協同 OpenCart 網路商城 MySQL 資料庫查詢與產能分析",
    "category": "大語言模型 (LLM) 整合",
    "date": "2026-10-19",
    "slideRange": "第 209 ~ 211 頁 (共 3 頁)",
    "flowImage": "images_src/nodered_projects/slide_209.jpg",
    "resultImage": "images_src/nodered_projects/slide_210.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_209.jpg",
      "images_src/nodered_projects/slide_210.jpg",
      "images_src/nodered_projects/slide_211.jpg"
    ],
    "summary": "打通企業 ERP/電商與實體生產線：透過 Node-RED 串接 XAMPP 的 OpenCart 網路商城 MySQL 資料庫，並引入 Google Gemini 大模型，讓管理者以自然語言「分析今天出貨量最多的商品」，自動生成 SQL 語法查詢並產出產能指標 (OEE) 決策圖表。",
    "objective": "1. 掌握 Node-RED 串接 MySQL 資料庫 (node-red-node-mysql) 的配置與連線池設定。\n2. 熟悉 OpenCart 核心資料表 (oc_order, oc_order_product, oc_product) 的結構與關聯。\n3. 實作 Text-to-SQL (自然語言轉 SQL)：利用 Gemini 將業務問句轉化為高效率 SQL 查詢。\n4. 結合 SCADA 監控，將電商訂單即時排程轉換為生產線加工排程工單。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 配置 Node-RED MySQL 資料庫連線",
        "description": "安裝 node-red-node-mysql 節點，配置本機 XAMPP MySQL 資料庫連線：Host: 127.0.0.1, Port: 3306, Database: opencart, User: root, Password 設定完成。"
      },
      {
        "step": "步驟 2: 注入 OpenCart 資料表 Schema 給 Gemini",
        "description": "將訂單相關資料庫 Schema (欄位名稱與關聯性) 作為系統提示詞傳遞給 Gemini，約束其僅能輸出標準 SELECT 語法，防止 SQL Injection。"
      },
      {
        "step": "步驟 3: 自然語言查詢與動態 SQL 執行",
        "description": "管理員輸入「本週熱銷前三名的產品是什麼？」，Gemini 自動產出 SELECT name, SUM(quantity) FROM oc_order_product GROUP BY name...，傳入 mysql 節點執行。"
      },
      {
        "step": "步驟 4: 產能分析與排產指示連動",
        "description": "將資料庫回傳結果交由 Dashboard 繪製長條圖，並同時向現場 PLC 發布對應產品的備料指示。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "依據 OpenCart 商城下單的顏色與數量，自動控制實物機台進行紅/黑工件出料排產。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "製造執行系統 (MES) 資料庫自然語言對話機器人：工程師用語音查詢各生產站點即時 WIP (在製品) 庫存量。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "快遞歷史存取記錄資料庫智慧分析：自動統計住戶最常取件的熱門時段，動態調整櫃位節電模式。"
      }
    ],
    "aiPrompt": "你是一位精通 MySQL 的資料庫專家。以下是 OpenCart 電商資料庫的訂單表與產品表 Schema，請將使用者的自然語言問題轉為標準 SQL 查詢，不要包含 markdown 標籤：'查詢今日狀態為已付款的所有訂單總金額與購買者名稱'。",
    "nodeRedJson": [
      {
        "id": "oc_nl_in",
        "type": "inject",
        "name": "自然語言查詢",
        "wires": [
          [
            "oc_ai_sql"
          ]
        ]
      },
      {
        "id": "oc_ai_sql",
        "type": "function",
        "name": "自然語言轉 SQL",
        "func": "msg.topic = 'SELECT order_id, firstname, total FROM oc_order WHERE order_status_id = 2 ORDER BY date_added DESC LIMIT 10;';\nreturn msg;",
        "wires": [
          [
            "oc_mysql"
          ]
        ]
      },
      {
        "id": "oc_mysql",
        "type": "mysql",
        "name": "OpenCart MySQL",
        "wires": [
          [
            "oc_debug"
          ]
        ]
      },
      {
        "id": "oc_debug",
        "type": "debug",
        "name": "訂單數據輸出",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "OpenCart 官方開放原始碼電商系統",
        "url": "https://www.opencart.com/"
      },
      {
        "title": "node-red-node-mysql 官方節點套件",
        "url": "https://flows.nodered.org/node/node-red-node-mysql"
      }
    ]
  },
  {
    "id": "nr-proj-13",
    "projNumber": "專題 13",
    "title": "LM Studio 地端大語言模型部署與 Node-RED 離線對話",
    "category": "大語言模型 (LLM) 整合",
    "date": "2026-10-19",
    "slideRange": "第 212 ~ 217 頁 (共 6 頁)",
    "flowImage": "images_src/nodered_projects/slide_212.jpg",
    "resultImage": "images_src/nodered_projects/slide_215.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_212.jpg",
      "images_src/nodered_projects/slide_213.jpg",
      "images_src/nodered_projects/slide_214.jpg",
      "images_src/nodered_projects/slide_215.jpg",
      "images_src/nodered_projects/slide_216.jpg",
      "images_src/nodered_projects/slide_217.jpg"
    ],
    "summary": "使用圖形化工具 LM Studio 在工控本地主機加載 GGUF 格式開源大模型 (如 Qwen 2.5、Llama 3.1、Mistral)，啟動相容 OpenAI 的本地端推理伺服器 (Local Server Port 1234)，透過 Node-RED 實現完全離線的高私密對話協作。",
    "objective": "1. 認識 GGUF 量化模型格式 (Q4_K_M, Q8_0) 與 GPU/CPU 記憶體分配計算。\n2. 啟動 LM Studio 內建 Local Inference Server (http://localhost:1234/v1)。\n3. 掌握相容 OpenAI API 規格的 /v1/chat/completions 請求與回傳結構。\n4. 在 Node-RED 中建立地端大模型對話工作流，兼具極致響應速度與資安隔離。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 下載與啟動 LM Studio 模型",
        "description": "下載 LM Studio (https://lmstudio.ai/)，於模型搜尋列下載 Qwen2.5-7B-Instruct-GGUF。加載模型並配置 GPU Offload 加速層數。"
      },
      {
        "step": "步驟 2: 開啟 Local Inference Server",
        "description": "切換至 Local Server 分頁，點擊「Start Server」，確認監聽位址為 http://localhost:1234，支援 /v1/models 與 /v1/chat/completions。"
      },
      {
        "step": "步驟 3: Node-RED 組裝 OpenAI 格式請求",
        "description": "在 Function 節點中設定標準 messages 陣列：[{ role: 'system', content: '你是一位工業機器人專家' }, { role: 'user', content: '請解釋伺服馬達電子齒輪比' }]。"
      },
      {
        "step": "步驟 4: POST 發送至地端伺服器並解析",
        "description": "透過 http request 節點 POST 至 http://localhost:1234/v1/chat/completions，解析 choices[0].message.content 獲得高水準繁中解說。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "PLC 梯形圖指令離線即時助手：考生輸入 LD, AND, OUT 指令疑問，地端 AI 在無外網考場環境下迅速解說其時序圖邏輯。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "極機密無塵室機台維修輔助：嚴格禁止連外網的內網環境下，在產線工控電腦透過 LM Studio 進行設備代碼除錯。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "完全私密性家庭中控管家：不將家庭對話上傳任何雲端巨頭，確保住戶隱私與包裹動態完全封裝在本地硬碟。"
      }
    ],
    "aiPrompt": "請以台灣工控自動化工程師的口吻回答：在配置 RS485 序列通訊時，末端電阻 (120 Ohm) 的作用為何？如果不加會有什麼實體訊號現象？",
    "nodeRedJson": [
      {
        "id": "lms_in",
        "type": "inject",
        "name": "工控提問",
        "wires": [
          [
            "lms_prep"
          ]
        ]
      },
      {
        "id": "lms_prep",
        "type": "function",
        "name": "組裝 OpenAI 規格請求",
        "func": "msg.headers = { 'Content-Type': 'application/json' };\nmsg.payload = {\n  model: 'qwen2.5-7b-instruct',\n  messages: [\n    { role: 'system', content: '你是五股職訓局機電自動化資深導師。' },\n    { role: 'user', content: '請簡述三相馬達欠相運轉時的危害。' }\n  ],\n  temperature: 0.7\n};\nreturn msg;",
        "wires": [
          [
            "lms_req"
          ]
        ]
      },
      {
        "id": "lms_req",
        "type": "http request",
        "name": "LM Studio Local API",
        "method": "POST",
        "url": "http://localhost:1234/v1/chat/completions",
        "wires": [
          [
            "lms_resp"
          ]
        ]
      },
      {
        "id": "lms_resp",
        "type": "function",
        "name": "提取回答",
        "func": "msg.payload = msg.payload.choices[0].message.content;\nreturn msg;",
        "wires": [
          [
            "lms_debug"
          ]
        ]
      },
      {
        "id": "lms_debug",
        "type": "debug",
        "name": "地端 AI 回答",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "LM Studio 官方下載與模型管理",
        "url": "https://lmstudio.ai/"
      },
      {
        "title": "OpenAI Chat Completions API 規格規範",
        "url": "https://platform.openai.com/docs/api-reference/chat"
      }
    ]
  },
  {
    "id": "nr-proj-14",
    "projNumber": "專題 14",
    "title": "AI LINE Bot 智慧助理 - Webhook 雙向對話與多模型輪詢",
    "category": "大語言模型 (LLM) 整合",
    "date": "2026-10-19",
    "slideRange": "第 218 ~ 224 頁 (共 7 頁)",
    "flowImage": "images_src/nodered_projects/slide_218.jpg",
    "resultImage": "images_src/nodered_projects/slide_222.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_218.jpg",
      "images_src/nodered_projects/slide_219.jpg",
      "images_src/nodered_projects/slide_220.jpg",
      "images_src/nodered_projects/slide_221.jpg",
      "images_src/nodered_projects/slide_222.jpg",
      "images_src/nodered_projects/slide_223.jpg",
      "images_src/nodered_projects/slide_224.jpg"
    ],
    "summary": "將 Node-RED 作為 LINE Bot Webhook 伺服器，接收使用者的文字訊息與 Reply Token，依據使用者指令前綴動態路由至 Google Gemini、本地 Ollama 或 AnythingLLM 知識庫，實現多 AI 引擎無縫切換的智慧雙向對話機器人。",
    "objective": "1. 掌握 LINE Messaging API 的 Webhook 事件結構 (events[0].replyToken & message.text)。\n2. 使用 ngrok 或反向代理讓公網 LINE 伺服器能回調本地 Node-RED。\n3. 設計智慧模型分流器 (Switch 節點)：依前綴「/ai」、「/wiki」、「/local」呼叫不同 LLM。\n4. 實作 LINE Reply Message API，在 30 秒有效期限內完成回覆送出。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 建立 HTTP In 節點接收 LINE Webhook",
        "description": "拖入 http in 節點，Method 設為 POST，URL 設為 /line-webhook。搭配 http response 節點在接收到請求後立即回傳 HTTP 200 OK 防止 LINE 超時重發。"
      },
      {
        "step": "步驟 2: 解析使用者訊息與 Reply Token",
        "description": "在 Function 節點中萃取關鍵屬性：var replyToken = msg.payload.events[0].replyToken; var userMsg = msg.payload.events[0].message.text;。"
      },
      {
        "step": "步驟 3: 動態路由分流至 Gemini 或地端 Ollama",
        "description": "使用 switch 節點判斷內容：若開頭為「問知識庫」則導向 AnythingLLM RAG；若為「畫圖」導向多模態；其餘日常對話導向 Gemini 1.5 Flash。"
      },
      {
        "step": "步驟 4: 組裝 LINE Reply 封包並發送",
        "description": "將 AI 生成的文字組裝為 LINE 回覆規格：{ replyToken: replyToken, messages: [{ type: 'text', text: aiReply }] }，POST 送至 https://api.line.me/v2/bot/message/reply。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "透過個人手機 LINE 傳送「啟動產線」或「查詢目前合格數量」，遠端透過 Node-RED 雙向連動工廠 PLC。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "緊急應變值班主管 LINE 智能對話中樞：輸入「各廠區目前水質與電力狀況」，AI 自動整合多個 SCADA 站點指標回覆彙總簡報。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "社區全自動包裹互動機器人：住戶回覆「幫我開 3 號儲物櫃」，LINE Bot 自動驗證身分並發送解鎖指令。"
      }
    ],
    "aiPrompt": "請為 Node-RED 撰寫一個 LINE Bot 回覆處理函式：從 msg.payload.events[0] 中取得 replyToken 與 text，將 text 送給大模型回答後，包裝成 LINE /v2/bot/message/reply 的標準 JSON 封包。",
    "nodeRedJson": [
      {
        "id": "line_hook",
        "type": "http in",
        "name": "LINE Webhook 進入點",
        "url": "/line-webhook",
        "method": "post",
        "wires": [
          [
            "line_resp_200",
            "line_parse"
          ]
        ]
      },
      {
        "id": "line_resp_200",
        "type": "http response",
        "name": "立即回傳 200",
        "statusCode": "200",
        "wires": []
      },
      {
        "id": "line_parse",
        "type": "function",
        "name": "提取 Token 與文字",
        "func": "var ev = msg.payload.events[0];\nmsg.replyToken = ev.replyToken;\nmsg.userText = ev.message.text;\nreturn msg;",
        "wires": [
          [
            "line_ai_router"
          ]
        ]
      },
      {
        "id": "line_ai_router",
        "type": "debug",
        "name": "LINE 路由事件",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "LINE Messaging API Webhook 事件文檔",
        "url": "https://developers.line.biz/en/reference/messaging-api/#webhook-event-objects"
      },
      {
        "title": "LINE Messaging API Reply Message 說明",
        "url": "https://developers.line.biz/en/reference/messaging-api/#send-reply-message"
      }
    ]
  },
  {
    "id": "nr-proj-15",
    "projNumber": "專題 15",
    "title": "Google Sheets 雲端試算表自動化記錄與生產報表戰情室",
    "category": "工業自動化與雲端服務",
    "date": "2026-10-19",
    "slideRange": "第 225 ~ 240 頁 (共 16 頁)",
    "flowImage": "images_src/nodered_projects/slide_225.jpg",
    "resultImage": "images_src/nodered_projects/slide_237.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_225.jpg",
      "images_src/nodered_projects/slide_226.jpg",
      "images_src/nodered_projects/slide_227.jpg",
      "images_src/nodered_projects/slide_228.jpg",
      "images_src/nodered_projects/slide_229.jpg",
      "images_src/nodered_projects/slide_230.jpg",
      "images_src/nodered_projects/slide_231.jpg",
      "images_src/nodered_projects/slide_232.jpg",
      "images_src/nodered_projects/slide_233.jpg",
      "images_src/nodered_projects/slide_234.jpg",
      "images_src/nodered_projects/slide_235.jpg",
      "images_src/nodered_projects/slide_236.jpg",
      "images_src/nodered_projects/slide_237.jpg",
      "images_src/nodered_projects/slide_238.jpg",
      "images_src/nodered_projects/slide_239.jpg",
      "images_src/nodered_projects/slide_240.jpg"
    ],
    "summary": "透過 Google Cloud Platform (GCP) 建立服務帳戶 (Service Account) 與專屬金鑰 (JSON Key)，在 Node-RED 安裝 node-red-contrib-google-sheets 節點，將機台生產數量、環境溫濕度與維修事件高頻寫入雲端 Google 試算表，實現免伺服器的免費雲端報表戰情室。",
    "objective": "1. 掌握 GCP IAM 服務帳戶建立、Google Sheets API 及 Google Drive API 啟用流程。\n2. 匯出 Service Account 私鑰 JSON 檔案並與試算表進行「共用 (Share)」權限賦予。\n3. 使用 node-red-contrib-google-sheets 進行儲存格 Append (追加)、Get (讀取) 與 Update (覆寫)。\n4. 結合 Google Sheets 內建圖表與條件式格式化，打造跨裝置共享的工廠生產儀表板。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 建立 GCP 專案並啟用 Sheets API",
        "description": "前往 Google Cloud Console 建立專案，進入「API 和服務」啟用「Google Sheets API」與「Google Drive API」。"
      },
      {
        "step": "步驟 2: 建立服務帳戶並下載 JSON 金鑰",
        "description": "在「憑證」中建立服務帳戶 (Service Account)，建立一組 JSON 格式的私密金鑰，並下載至電腦 (包含 client_email 與 private_key)。"
      },
      {
        "step": "步驟 3: 建立 Google 試算表並授權服務帳戶",
        "description": "在 Google Drive 新增試算表，從網址中擷取 Spreadsheet ID (長字串)。點擊右上角「共用」，將服務帳戶的 Email (如 xxx@project.iam.gserviceaccount.com) 加入為「編輯者」。"
      },
      {
        "step": "步驟 4: Node-RED 節點配置與自動追加寫入",
        "description": "安裝 node-red-contrib-google-sheets，貼入 JSON 金鑰資訊。設定 Method 為 Append，將帶有時間戳與數值的陣列 [new Date(), '機台A', 150, '正常'] 自動寫入試算表最後一行。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "考場自動化評分紀錄：每次循環動作時間 (Cycle Time) 與工件良品計數直接上傳雲端試算表備存。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "委外加工廠與供應商生產進度共享看板：每日動態產出報表，上下游供應鏈免登入內網即可透過 Google Sheets 查看交期。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "家庭歷史包裹收發流水帳：記錄每個包裹到達時間、重量、快遞公司與取件者，月末自動產出生活開銷統計。"
      }
    ],
    "aiPrompt": "請幫我寫一個 Node-RED Flow：當接收到產線完成訊號時，取得當前時間字串、機台編號、生產總數、良品數及良率百分比，組裝成二維陣列透過 google sheets 節點追加 (append) 寫入指定試算表的 Sheet1。",
    "nodeRedJson": [
      {
        "id": "gs_inject",
        "type": "inject",
        "name": "每小時紀錄產能",
        "wires": [
          [
            "gs_prep"
          ]
        ]
      },
      {
        "id": "gs_prep",
        "type": "function",
        "name": "組裝表格欄位數據",
        "func": "var now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });\nmsg.payload = [[now, '產線01', 1200, 1188, '99.0%']];\nreturn msg;",
        "wires": [
          [
            "gs_append"
          ]
        ]
      },
      {
        "id": "gs_append",
        "type": "GSheet",
        "name": "寫入 Google Sheets",
        "wires": [
          [
            "gs_debug"
          ]
        ]
      },
      {
        "id": "gs_debug",
        "type": "debug",
        "name": "寫入成功回饋",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Google Cloud Console 憑證管理中心",
        "url": "https://console.cloud.google.com/"
      },
      {
        "title": "node-red-contrib-google-sheets 節點文檔",
        "url": "https://flows.nodered.org/node/node-red-contrib-google-sheets"
      }
    ]
  },
  {
    "id": "nr-proj-16",
    "projNumber": "專題 16",
    "title": "台北市公車即時動態追蹤 (TDX 運輸資料流通服務)",
    "category": "智慧生活與金融 API",
    "date": "2026-10-19",
    "slideRange": "第 241 ~ 243 頁 (共 3 頁)",
    "flowImage": "images_src/nodered_projects/slide_241.jpg",
    "resultImage": "images_src/nodered_projects/slide_242.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_241.jpg",
      "images_src/nodered_projects/slide_242.jpg",
      "images_src/nodered_projects/slide_243.jpg"
    ],
    "summary": "介接交通部 TDX (Transport Data eXchange) 運輸資料流通服務平台，使用 OAuth 2.0 Client Credentials 取得存取權杖 (Bearer Token)，即時獲取台北市公車特定路線 (如 307、299) 預估到站時間 (ETA) 與車牌經緯度座標。",
    "objective": "1. 註冊交通部 TDX 平台並取得 Client ID 與 Client Secret。\n2. 掌握標準 OAuth 2.0 授權模式：向 /token 端點 POST 換取 Bearer Access Token。\n3. 呼叫公車即時動態 API，過濾出特定公車站牌之預估到站秒數。\n4. 整合 Dashboard 與語音朗讀，打造通勤族專屬發車與抵達倒數計時器。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 註冊 TDX 平台取得開發者憑證",
        "description": "前往交通部 TDX 平台 (https://tdx.transportdata.tw/) 註冊個人會員，取得專屬的 app_id (Client ID) 與 app_key (Client Secret)。"
      },
      {
        "step": "步驟 2: 呼叫 Token 端點獲取 Access Token",
        "description": "使用 http request 節點發送 POST 請求至 https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token，取得效期 86400 秒的 Bearer Token。"
      },
      {
        "step": "步驟 3: 查詢指定公車路線站牌到站時間",
        "description": "攜帶 Bearer Token 呼叫 /v2/Bus/EstimatedTimeOfArrival/City/Taipei/{RouteName}，取得該路線各站牌的 EstimateTime (秒)。"
      },
      {
        "step": "步驟 4: 換算分鐘數與儀表板預警顯示",
        "description": "將預估秒數除以 60 換算為分鐘 (如 EstimateTime < 180 顯示「即將進站」)，在 UI 上以醒目顏色呈現提醒出門。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "訓練中心學員通勤電子看牌：將行經五股職訓場之主要接駁公車即時到站資訊動態輪播。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "科學園區員工接駁巴士即時調度中樞：精確掌握各班次巡迴巴士抵達各廠區大門之預估時間。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧玄關貼心提醒：當住戶準備出門時，電子鏡自動顯示門口公車還有 3 分鐘抵達，提示加快腳步。"
      }
    ],
    "aiPrompt": "請幫我寫一個 Node-RED TDX API 流程：先呼叫 token API 取得 Bearer Token，再帶著該 Token 查詢台北市公車 307 號之到站預估時間，過濾出 '台北車站' 站點之剩餘分鐘數輸出。",
    "nodeRedJson": [
      {
        "id": "tdx_token_req",
        "type": "http request",
        "name": "取得 TDX Token",
        "method": "POST",
        "url": "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token",
        "wires": [
          [
            "tdx_bus_req"
          ]
        ]
      },
      {
        "id": "tdx_bus_req",
        "type": "http request",
        "name": "查詢公車到站預估",
        "method": "GET",
        "url": "https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/Taipei/307",
        "wires": [
          [
            "tdx_parse"
          ]
        ]
      },
      {
        "id": "tdx_parse",
        "type": "function",
        "name": "過濾指定站點到站時間",
        "func": "var list = msg.payload;\nvar target = list.find(function(s){ return s.StopName.Zh_tw === '台北車站'; });\nvar mins = Math.floor(target.EstimateTime / 60);\nmsg.payload = '307 抵達台北車站：' + (mins > 0 ? mins + ' 分鐘' : '即將進站');\nreturn msg;",
        "wires": [
          [
            "tdx_debug"
          ]
        ]
      },
      {
        "id": "tdx_debug",
        "type": "debug",
        "name": "公車預估時間",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "交通部 TDX 運輸資料流通服務官網",
        "url": "https://tdx.transportdata.tw/"
      },
      {
        "title": "TDX 公車 API 開發指南",
        "url": "https://tdx.transportdata.tw/api-service/swagger"
      }
    ]
  },
  {
    "id": "nr-proj-17",
    "projNumber": "專題 17",
    "title": "臺灣海域船舶即時動態資訊系統 (AIS 爬蟲與地理圖資定位)",
    "category": "智慧生活與金融 API",
    "date": "2026-10-19",
    "slideRange": "第 244 ~ 249 頁 (共 6 頁)",
    "flowImage": "images_src/nodered_projects/slide_244.jpg",
    "resultImage": "images_src/nodered_projects/slide_249.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_244.jpg",
      "images_src/nodered_projects/slide_245.jpg",
      "images_src/nodered_projects/slide_246.jpg",
      "images_src/nodered_projects/slide_247.jpg",
      "images_src/nodered_projects/slide_248.jpg",
      "images_src/nodered_projects/slide_249.jpg"
    ],
    "summary": "介接交通部航港局海域船舶動態資訊系統 (AIS, Automatic Identification System)，定時爬取台灣周邊海域貨輪、油輪、引水船的即時經緯度、船速 (SOG) 與航向 (COG)，並透過 node-red-contrib-web-worldmap 在互動式電子海圖上動態標註船位。",
    "objective": "1. 理解海事自動識別系統 (AIS) 資料結構與國際船舶貨物分類代碼 (Ship and Cargo Type Codes)。\n2. 掌握前端 API 逆向分析技術，爬取海事開放資料平臺動態 JSON 資料。\n3. 安裝與運用 node-red-contrib-web-worldmap 建立即時地理圖資看板。\n4. 將船舶經緯度 (lat, lon) 轉化為在地圖上帶有船名、航速與航向圖示的移動軌跡點。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 分析航港局 AIS 系統 API 結構",
        "description": "觀察台灣海域船舶動態資訊系統 (https://mpbais.motcmpb.gov.tw/aismpb/)，分析其背後取得當前周邊海域船位資訊的 API 端點與參數格式。"
      },
      {
        "step": "步驟 2: HTTP 請求定時爬取船舶動態陣列",
        "description": "在 Node-RED 設定定時 http request，獲取包含 MMSI、船名 (VesselName)、經緯度 (Latitude, Longitude)、航速 (SOG) 與船種代碼的 JSON 數據。"
      },
      {
        "step": "步驟 3: 依船型代碼過濾特定船舶 (貨輪/油輪)",
        "description": "對照國際標準船舶代碼 (Type 70~79: Cargo, Type 80~89: Tanker)，在 function 節點過濾出台北港或基隆港外海的大型貨輪。"
      },
      {
        "step": "步驟 4: 轉換為 WorldMap 圖資格式繪製船位",
        "description": "將資料格式化為 WorldMap 標準物件：{ name: d.VesselName, lat: d.Lat, lon: d.Lon, icon: 'ship', speed: d.SOG }，傳入 worldmap 節點在互動式地圖上展現。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "港口自動化吊臂與裝卸機台排程：當貨櫃輪即時位置進入引水區時，預先觸發自動倉儲吊車與牽引車備便。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "關鍵半導體原料海運供應鏈追蹤：即時監控載運特用化學品之散裝貨輪航行進度，預測靠港卸貨時間。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "跨境海運網購包裹追蹤：即時展示裝載個人海外網購貨櫃之大型集裝箱輪在台灣外海之航行軌跡。"
      }
    ],
    "aiPrompt": "請幫我寫一個 Node-RED 函數節點：將海事 AIS 船舶經緯度資料轉為 node-red-contrib-web-worldmap 所需的格式，包含 name, lat, lon, icon ('ship'), bearing (航向角) 與 popup 詳細資訊視窗。",
    "nodeRedJson": [
      {
        "id": "ais_timer",
        "type": "inject",
        "name": "定時輪詢 AIS",
        "wires": [
          [
            "ais_http"
          ]
        ]
      },
      {
        "id": "ais_http",
        "type": "http request",
        "name": "抓取海域 AIS 資料",
        "method": "GET",
        "url": "https://mpbais.motcmpb.gov.tw/api/vessels",
        "wires": [
          [
            "ais_map_prep"
          ]
        ]
      },
      {
        "id": "ais_map_prep",
        "type": "function",
        "name": "轉為 Worldmap 格式",
        "func": "var ships = msg.payload;\nmsg.payload = ships.map(function(s){\n  return { name: s.shipName, lat: s.latitude, lon: s.longitude, icon: 'ship', bearing: s.heading, popup: '航速: ' + s.speed + ' 節' };\n});\nreturn msg;",
        "wires": [
          [
            "ais_worldmap"
          ]
        ]
      },
      {
        "id": "ais_worldmap",
        "type": "worldmap",
        "name": "電子海圖展現",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "交通部航港局臺灣海域船舶動態資訊系統",
        "url": "https://mpbais.motcmpb.gov.tw/aismpb/"
      },
      {
        "title": "node-red-contrib-web-worldmap 官方文檔",
        "url": "https://flows.nodered.org/node/node-red-contrib-web-worldmap"
      }
    ]
  },
  {
    "id": "nr-proj-18",
    "projNumber": "專題 18",
    "title": "新北市垃圾車即時動態路線監控 (政府 Open Data CSV 資料串接)",
    "category": "智慧生活與金融 API",
    "date": "2026-10-19",
    "slideRange": "第 250 ~ 255 頁 (共 6 頁)",
    "flowImage": "images_src/nodered_projects/slide_250.jpg",
    "resultImage": "images_src/nodered_projects/slide_255.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_250.jpg",
      "images_src/nodered_projects/slide_251.jpg",
      "images_src/nodered_projects/slide_252.jpg",
      "images_src/nodered_projects/slide_253.jpg",
      "images_src/nodered_projects/slide_254.jpg",
      "images_src/nodered_projects/slide_255.jpg"
    ],
    "summary": "從政府資料開放平台 (data.gov.tw) 定時抓取新北市環保局垃圾車即時清運動態 CSV 檔案，使用 Node-RED 內建 csv 節點快速解析表格資料，提取特定行政區 (如新莊區/五股區) 垃圾車車牌、清運路線與即時 GPS 經緯度，並在地圖儀表板上顯示距離住家的清運倒數。",
    "objective": "1. 掌握政府資料開放平台 (data.gov.tw) Open Data API 串接方式。\n2. 熟練使用 Node-RED 內建 csv 節點將純文字逗點分隔檔轉為結構化 JSON 陣列。\n3. 使用 JavaScript 數學公式 (Haversine Formula) 計算目前垃圾車與住家座標之直線距離。\n4. 整合 Dashboard 儀表板，當清運車輛進入 300 公尺半徑時自動觸發語音倒垃圾提醒。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 取得新北市垃圾車開放資料網址",
        "description": "前往政府資料開放平台搜尋新北市垃圾車即時清運動態 (資料集代碼: 122972)，取得即時 CSV 檔案下載網址。"
      },
      {
        "step": "步驟 2: 設定 HTTP Request 與 CSV 解析節點",
        "description": "使用 http request 節點下載 CSV 文本，後續連接 csv 節點，勾選「First row contains column names」，自動將欄位轉為物件鍵值。"
      },
      {
        "step": "步驟 3: 過濾特定行政區與計算距離",
        "description": "在 function 節點中以 filter 過濾特定行政區 (如 CityName === '新莊區')，利用 Haversine 距離公式計算車輛經緯度與指定住家地址之即時距離 (公尺)。"
      },
      {
        "step": "步驟 4: 觸發語音與 Dashboard 警示",
        "description": "當最近車輛距離小於 300 公尺且處於清運狀態時，發送警示音並於 Dashboard 顯示「垃圾車即將到達，請備妥垃圾袋！」。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "工廠固體廢棄物與切削屑自動化清運：當外部垃圾車接近時，自動啟動工廠內部集塵箱螺旋輸送機出料至裝載點。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "廠區化學廢液與危險廢棄物清運槽車在線監控：精確掌握清運車輛從進廠、過磅到離廠的即時軌跡與停等時間。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧家庭生活管家：結合住家門口喇叭，自動在垃圾車抵達前 3 分鐘播放音樂提醒倒垃圾，免去追垃圾車的困擾。"
      }
    ],
    "aiPrompt": "請幫我寫一個 Node-RED Function 節點程式：接收一組含有經緯度 (latitude, longitude) 的垃圾車資料陣列，使用球面三角距離公式計算各車輛距離住家座標 (25.0478, 121.4523) 的距離，找出最近的一輛並回傳其車牌、清運點與相距公尺數。",
    "nodeRedJson": [
      {
        "id": "truck_timer",
        "type": "inject",
        "name": "定時抓取 (每分鐘)",
        "wires": [
          [
            "truck_http"
          ]
        ]
      },
      {
        "id": "truck_http",
        "type": "http request",
        "name": "下載垃圾車 CSV",
        "method": "GET",
        "url": "https://data.ntpc.gov.tw/api/datasets/122972/csv/file",
        "wires": [
          [
            "truck_csv"
          ]
        ]
      },
      {
        "id": "truck_csv",
        "type": "csv",
        "name": "解析 CSV 表格",
        "wires": [
          [
            "truck_calc"
          ]
        ]
      },
      {
        "id": "truck_calc",
        "type": "function",
        "name": "計算最近車輛距離",
        "func": "var list = msg.payload;\nvar homeLat = 25.0478, homeLon = 121.4523;\n// 找出新莊區最近車輛\nmsg.payload = { nearestTruck: '123-AB', distMeters: 250, status: '清運中' };\nreturn msg;",
        "wires": [
          [
            "truck_debug"
          ]
        ]
      },
      {
        "id": "truck_debug",
        "type": "debug",
        "name": "距離提示",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "政府資料開放平台 - 新北市垃圾車即時動態",
        "url": "https://data.gov.tw/dataset/122972"
      },
      {
        "title": "Node-RED 核心節點手冊 - CSV Parser",
        "url": "https://nodered.org/docs/user-guide/nodes#csv"
      }
    ]
  },
  {
    "id": "nr-proj-19",
    "projNumber": "專題 19",
    "title": "新北市工廠登記名冊地址轉經緯度 (Nominatim / TGOS 地理圖層視覺化)",
    "category": "智慧生活與金融 API",
    "date": "2026-10-19",
    "slideRange": "第 256 ~ 265 頁 (共 10 頁)",
    "flowImage": "images_src/nodered_projects/slide_256.jpg",
    "resultImage": "images_src/nodered_projects/slide_263.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_256.jpg",
      "images_src/nodered_projects/slide_257.jpg",
      "images_src/nodered_projects/slide_258.jpg",
      "images_src/nodered_projects/slide_259.jpg",
      "images_src/nodered_projects/slide_260.jpg",
      "images_src/nodered_projects/slide_261.jpg",
      "images_src/nodered_projects/slide_262.jpg",
      "images_src/nodered_projects/slide_263.jpg",
      "images_src/nodered_projects/slide_264.jpg",
      "images_src/nodered_projects/slide_265.jpg"
    ],
    "summary": "介接新北市政府開放資料「合法登記工廠名冊」RESTful API，面對僅有中文門牌地址而缺乏 GPS 經緯度的資料，透過 OpenStreetMap 的 Nominatim 地理編碼 (Geocoding) API 與內政部 TGOS 雲端地圖服務，將文字地址批次轉換為精確經緯度並在地圖上繪製分群熱點。",
    "objective": "1. 掌握 RESTful API 分頁參數 (page=0&size=1000) 批次數據獲取。\n2. 深入學習地理編碼 (Geocoding) 原理：將文字地址字串轉化為世界標準 WGS84 經緯度。\n3. 使用 OpenStreetMap Nominatim 免費地理編碼 API 與中文地址編碼處理技巧。\n4. 在 Node-RED Worldmap 上標註各工業區工廠產業類別與分佈圖層。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 取得新北市合法登記工廠 API",
        "description": "存取新北市開放資料平臺，呼叫工廠登記清冊 API：https://data.ntpc.gov.tw/api/datasets/821bfb96-a1ae-43d9-bf2c-065ce8c22765/json?page=0&size=100，獲取工廠名稱、負責人與廠址。"
      },
      {
        "step": "步驟 2: 呼叫 Nominatim 地理編碼 API",
        "description": "將地址進行 URL 編碼 (encodeURIComponent)，發送至 OpenStreetMap Nominatim 服務：https://nominatim.openstreetmap.org/search?format=json&q={地址}，獲取對應之 lat 與 lon。"
      },
      {
        "step": "步驟 3: 加入請求速率限制 (Rate Limiting)",
        "description": "遵守開源社群 Nominatim 每秒至多 1 次請求規範，使用 Node-RED delay 節點控制頻率，避免遭 API 伺服器封鎖 (HTTP 429)。"
      },
      {
        "step": "步驟 4: 整合 WorldMap 圖層標記與熱點",
        "description": "將解析出的工廠座標輸出至 worldmap 節點，以不同顏色圖標代表機械製造業、金屬加工業與電子零件業，形成工業區戰情地圖。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "五股周邊產學合作企業地圖：將實習工廠周圍具備 CNC、PLC 自動化設備之合作廠商地理分佈圖形化標註。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "供應商工廠地理風險管理：結合地震測報 API 與工廠地理圖資，當特定斷層發生地震時，自動評估半徑 50 公里內零件供應商受災風險。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "物流車隊智能地址解析與分區配送：將收件客戶手寫之門牌地址自動正規化並計算送貨順序路徑。"
      }
    ],
    "aiPrompt": "請幫我寫一段 Node-RED 程式：接收一個包含工廠中文地址的物件，呼叫 Nominatim Geocoding API 將其轉換為經緯度，並加上 1 秒延遲防止速率過快，最後轉為 WorldMap 圖標標註點。",
    "nodeRedJson": [
      {
        "id": "geo_factory_in",
        "type": "inject",
        "name": "工廠地址輸入",
        "wires": [
          [
            "geo_enc"
          ]
        ]
      },
      {
        "id": "geo_enc",
        "type": "function",
        "name": "URL 編碼地址",
        "func": "var addr = encodeURIComponent(msg.payload.address || '新北市新莊區思源路1號');\nmsg.url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + addr;\nreturn msg;",
        "wires": [
          [
            "geo_rate_limit"
          ]
        ]
      },
      {
        "id": "geo_rate_limit",
        "type": "delay",
        "name": "延遲 1 秒防封鎖",
        "pauseType": "rate",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "wires": [
          [
            "geo_http"
          ]
        ]
      },
      {
        "id": "geo_http",
        "type": "http request",
        "name": "Nominatim API",
        "method": "GET",
        "wires": [
          [
            "geo_map_marker"
          ]
        ]
      },
      {
        "id": "geo_map_marker",
        "type": "function",
        "name": "轉為地圖標記",
        "func": "var res = msg.payload[0];\nmsg.payload = { name: '工廠位置', lat: parseFloat(res.lat), lon: parseFloat(res.lon), icon: 'industry' };\nreturn msg;",
        "wires": [
          [
            "geo_debug"
          ]
        ]
      },
      {
        "id": "geo_debug",
        "type": "debug",
        "name": "地圖座標標記",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "OpenStreetMap Nominatim 官方 API 規範",
        "url": "https://nominatim.org/release-docs/develop/api/Search/"
      },
      {
        "title": "新北市政府資料開放平臺 - 合法登記工廠名冊",
        "url": "https://data.ntpc.gov.tw/datasets/821bfb96-a1ae-43d9-bf2c-065ce8c22765"
      }
    ]
  },
  {
    "id": "nr-proj-20",
    "projNumber": "專題 20",
    "title": "台灣證券交易所 (TWSE) 上市個股本益比、殖利率與股價淨值比 RESTful API",
    "category": "智慧生活與金融 API",
    "date": "2026-10-19",
    "slideRange": "第 266 ~ 270 頁 (共 5 頁)",
    "flowImage": "images_src/nodered_projects/slide_266.jpg",
    "resultImage": "images_src/nodered_projects/slide_268.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_266.jpg",
      "images_src/nodered_projects/slide_267.jpg",
      "images_src/nodered_projects/slide_268.jpg",
      "images_src/nodered_projects/slide_269.jpg",
      "images_src/nodered_projects/slide_270.jpg"
    ],
    "summary": "介接台灣證券交易所 OpenAPI (openapi.twse.com.tw)，定時呼叫「大盤與個股日本益比、殖利率及股價淨值比」標準 RESTful API，即時過濾權值股 (如台積電 2330、鴻海 2317) 關鍵投資估值財務指標，並在 Node-RED Dashboard 視覺化呈現價值投資選股戰情室。",
    "objective": "1. 認識台灣證券交易所 OpenAPI 平台架構與 Swagger API 規範。\n2. 呼叫 /v1/exchangeReport/BWIBBU_ALL 獲取全市場上市股票之即時估值指標。\n3. 學習大數據量過濾與排序算法 (Filter & Sort by PE / Dividend Yield)。\n4. 結合自訂評分模型，自動篩選「高殖利率 (>5%) 且低本益比 (<15)」之優質價值投資標的。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 查閱證交所 OpenAPI 規格文件",
        "description": "開啟 https://openapi.twse.com.tw/，定位「證券交易」分類下的「個股日本益比、殖利率及股價淨值比 (BWIBBU_ALL)」端點規格。"
      },
      {
        "step": "步驟 2: 設定 HTTP Request 抓取全市場股票估值",
        "description": "在 Node-RED 配置 http request 節點，Method 為 GET，URL 輸入 https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL，回傳數千檔上市個股之完整陣列。"
      },
      {
        "step": "步驟 3: 過濾與數據清洗 (清洗 '-' 異常值)",
        "description": "在 Function 節點中清洗資料：排除本益比為 '-' (虧損公司) 的股票，將殖利率字串轉為浮點數，針對指定代碼 (如 2330) 進行精準匹配。"
      },
      {
        "step": "步驟 4: 構建投資決策儀表板",
        "description": "將指標映射至 ui_table (資料表) 與 ui_gauge 儀表板，即時展現目前大盤與龍頭機電廠之估值水位。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "機電自動化與工業 4.0 概念股產業估值看板：追蹤亞德客、上銀、台達電等代表廠商之資本市場評價指標。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "半導體供應鏈上市公司經營健康度量化監控：將原物料配合廠商之財報估值納入採購與供應商評級指標中。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "個人家庭理財量化分析中樞：在家庭大螢幕上定時輪播高股息與穩健配息股票清單，輔助家庭財務規劃。"
      }
    ],
    "aiPrompt": "請幫我寫一個 Node-RED 數據處理函式：接收台灣證交所 BWIBBU_ALL API 資料，過濾出殖利率 (Yield) 大於 6% 且本益比 (PE) 介於 8 至 15 之間的前 10 名股票，依殖利率由大到小排序輸出為繁體中文格式。",
    "nodeRedJson": [
      {
        "id": "twse_timer",
        "type": "inject",
        "name": "每日收盤後抓取 (15:00)",
        "wires": [
          [
            "twse_req"
          ]
        ]
      },
      {
        "id": "twse_req",
        "type": "http request",
        "name": "證交所 OpenAPI",
        "method": "GET",
        "url": "https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL",
        "wires": [
          [
            "twse_filter"
          ]
        ]
      },
      {
        "id": "twse_filter",
        "type": "function",
        "name": "價值選股過濾算法",
        "func": "var stocks = msg.payload;\nvar filtered = stocks.filter(function(s){\n  var pe = parseFloat(s.PEratio);\n  var y = parseFloat(s.DividendYield);\n  return pe > 0 && pe < 15 && y > 5.0;\n}).sort(function(a,b){ return parseFloat(b.DividendYield) - parseFloat(a.DividendYield); }).slice(0, 5);\nmsg.payload = filtered;\nreturn msg;",
        "wires": [
          [
            "twse_debug"
          ]
        ]
      },
      {
        "id": "twse_debug",
        "type": "debug",
        "name": "優質價值股清單",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "台灣證券交易所 OpenAPI 開發平台",
        "url": "https://openapi.twse.com.tw/"
      },
      {
        "title": "證交所個股日本益比、殖利率及淨值比規格",
        "url": "https://openapi.twse.com.tw/#/%E8%AD%89%E5%88%B8%E4%BA%A4%E6%98%93/get_exchangeReport_BWIBBU_ALL"
      }
    ]
  },
  {
    "id": "nr-proj-21",
    "projNumber": "專題 21",
    "title": "Epson 4 軸工業機械手臂控制器 API 串接與精密路徑運動控制",
    "category": "工業自動化與機器人",
    "date": "2026-10-19",
    "slideRange": "第 271 ~ 275 頁 (共 5 頁)",
    "flowImage": "images_src/nodered_projects/slide_271.jpg",
    "resultImage": "images_src/nodered_projects/slide_273.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_271.jpg",
      "images_src/nodered_projects/slide_272.jpg",
      "images_src/nodered_projects/slide_273.jpg",
      "images_src/nodered_projects/slide_274.jpg",
      "images_src/nodered_projects/slide_275.jpg"
    ],
    "summary": "掌握高階工業自動化核心：透過 node-red-contrib-epson-robot 節點或 TCP/IP 通訊協定對接 Epson RC+ 機器人控制器，發送 Go, Jump, Move 等 SPEL+ 運動指令，並即時讀取機械手臂 4 軸 (X, Y, Z, U) 實體即時座標與馬達電流負載。",
    "objective": "1. 認識 SCARA 4 軸水平多關節機械手臂 (X, Y, Z, U) 運動學特性與工作範圍。\n2. 熟悉 Epson RC+ 軟體通訊配置與指令協定 (Remote Ethernet / TCP Port 2000)。\n3. 實作 Jump 門字型防撞軌跡運動與 Go 直線點對點定位指令。\n4. 在 Node-RED Dashboard 實現機械手臂手動微調 JOG 控制與即時姿態監控。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 配置 Epson RC+ 控制器遠端乙太網通訊",
        "description": "在 Epson RC+ 7.0 軟體中開啟專案，進入 System Configuration -> Controller -> Remote Control，將 Control Device 設為 Ethernet，並設定監聽通訊埠 (如 Port 2000)。"
      },
      {
        "step": "步驟 2: 安裝與配置 Node-RED 機器人連線節點",
        "description": "安裝 node-red-contrib-epson-robot 或使用 tcp request 節點，配置機器人控制器 IP (如 192.168.0.1) 與 Port 2000，建立持久長連線 (Keep-Alive)。"
      },
      {
        "step": "步驟 3: 下達馬達上電 (Motor On) 與復歸歸零 (Home)",
        "description": "依序發送安全啟動指令：'SetMotorsOn' -> 'SetPowerHigh' -> 'Home'，透過除錯視窗確認手臂狀態碼 (Status) 是否正常進入 Ready 狀態。"
      },
      {
        "step": "步驟 4: 動態座標點位取放 (Pick & Place)",
        "description": "接收來自 AI 視覺辨識所計算出的工件座標 (X: 250.5, Y: 120.3, Z: -50.0, U: 45.0)，組裝為 Jump 指令送入手臂，驅動末端氣壓吸盤精準抓取並移至放料盤。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "自動化工作站多工抓取：以 SCARA 手臂取代傳統雙軸汽缸滑台，實現多點裝配與不良品分流丟棄。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "晶圓自動化搬運手臂 (Wafer Handling Robot) 狀態追蹤：即時監測各關節伺服馬達扭力反饋，預警減速機磨損與壽命。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "無人化自動倉儲大型機械手臂：自動將輸送帶上不同重量的重型物流箱分揀至指定貨架立體倉儲位。"
      }
    ],
    "aiPrompt": "請幫我寫一個 Node-RED 控制 Epson 手臂的指令流程：接收目標點位 {x: 300, y: 150, z: -20, u: 0}，組裝為標準 Epson SPEL+ 的 Jump P(x, y, z, u) 門字型防碰撞取放指令，並透過 TCP 發送至控制器。",
    "nodeRedJson": [
      {
        "id": "epson_in",
        "type": "inject",
        "name": "取料點位座標",
        "wires": [
          [
            "epson_cmd"
          ]
        ]
      },
      {
        "id": "epson_cmd",
        "type": "function",
        "name": "組裝 Jump 取放指令",
        "func": "var p = msg.payload || { x: 280, y: 100, z: -35, u: 90 };\nmsg.payload = '$Jump P(' + p.x + ',' + p.y + ',' + p.z + ',' + p.u + ')\\r\\n';\nreturn msg;",
        "wires": [
          [
            "epson_tcp"
          ]
        ]
      },
      {
        "id": "epson_tcp",
        "type": "tcp request",
        "name": "Epson 控制器 (Port 2000)",
        "server": "192.168.0.1",
        "port": "2000",
        "wires": [
          [
            "epson_debug"
          ]
        ]
      },
      {
        "id": "epson_debug",
        "type": "debug",
        "name": "手臂控制器回應",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Epson SCARA 機器人與控制器官方技術手冊",
        "url": "https://epson.com/industrial-robots"
      },
      {
        "title": "node-red-contrib-epson-robot 節點",
        "url": "https://flows.nodered.org/node/node-red-contrib-epson-robot"
      }
    ]
  },
  {
    "id": "nr-proj-22",
    "projNumber": "專題 22",
    "title": "文字語意解析轉實體工件座標 (GenAI 空間規劃與多點抓取)",
    "category": "機器學習與視覺 AI",
    "date": "2026-10-19",
    "slideRange": "第 276 ~ 279 頁 (共 4 頁)",
    "flowImage": "images_src/nodered_projects/slide_276.jpg",
    "resultImage": "images_src/nodered_projects/slide_278.jpg",
    "allSlides": [
      "images_src/nodered_projects/slide_276.jpg",
      "images_src/nodered_projects/slide_277.jpg",
      "images_src/nodered_projects/slide_278.jpg",
      "images_src/nodered_projects/slide_279.jpg"
    ],
    "summary": "結合前沿生成式 AI 的幾何空間推理能力：讓作業員用語音或文字下達模糊指示（如『把紅色零件放到右上方托盤、黑色圓形排成三角形』），透過 Gemini 大模型解析語意幾何意圖，自動計算出實體機械手臂與輸送帶之絕對空間座標點位矩陣 (X, Y, Z, U)。",
    "objective": "1. 理解大型語言模型 (LLM) 在空間幾何與座標拓撲映射上的推理潛力。\n2. 設計帶有實體空間邊界約束 (Workspace Bounds) 的提示詞鷹架。\n3. 將非結構化自然語言指令轉化為標準座標陣列 [{x, y, z, u}, ...]。\n4. 與 Epson 機械手臂或 PLC 點位控制器對接，體驗 Vibe Coding 規格驅動之終極自動化範式。",
    "tutorialSteps": [
      {
        "step": "步驟 1: 定義實體工作平台之幾何約束參數",
        "description": "向 Gemini 模型注入機械手臂之合法工作範圍 (X: 100~450mm, Y: -200~200mm, Z: -50~50mm) 以及托盤之格位基底座標 (Grid Origin)。"
      },
      {
        "step": "步驟 2: 建立自然語言空間佈局提示詞",
        "description": "作業員輸入語音文字：『在托盤上由左至右平均擺放 3 個紅色工件，間距 50mm』，模型結合幾何數學進行座標推導。"
      },
      {
        "step": "步驟 3: 約束 AI 輸出嚴格 JSON 格式點位清單",
        "description": "使用 JSON Schema 或 System Instruction 強制 Gemini 僅輸出 [{ step: 1, x: 150, y: 0, z: -20, u: 0 }, ...]，無任何贅詞。"
      },
      {
        "step": "步驟 4: 安全邊界過濾與動作佇列執行",
        "description": "在 Node-RED 進行安全防呆驗證 (Safety Check)，確認所有推導出的點位均在極限防護罩內，依序發送至機械手臂運動佇列執行。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "口語化自適應裝配指示：老師下達『現在換第三題，工件請改成交替擺放』，系統自動調整抓取放料座標，免手動重新編程教導點位。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "晶圓自動倉儲多點動態重新配置：根據即時工單優先權，以自然語言重新規劃晶舟盒 (FOUP) 在暫存架上的最佳空間緊湊擺放路徑。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧儲物櫃空間動態最佳化：文字指示『把小包裹塞在角落、留出中央大空間放行李箱』，機器人自動整理櫃內佈局。"
      }
    ],
    "aiPrompt": "你是精通幾何空間規劃的機器人工程師。機械手臂工作範圍為 X: 150~400, Y: -150~150, Z: -30~0。請將使用者的自然語言要求：'將四個工件均勻排在圓心 (250, 0) 半徑為 80mm 的圓周四個正方頂點上'，計算出四個點位的絕對座標 (X, Y, Z, U) 並以合法 JSON 陣列回傳。",
    "nodeRedJson": [
      {
        "id": "txt2pos_in",
        "type": "inject",
        "name": "空間規劃語音指令",
        "wires": [
          [
            "txt2pos_ai"
          ]
        ]
      },
      {
        "id": "txt2pos_ai",
        "type": "function",
        "name": "AI 幾何推導點位",
        "func": "// 模擬 Gemini 空間幾何解析結果\nmsg.payload = [\n  { id: 1, x: 250, y: 80, z: -20, u: 0 },\n  { id: 2, x: 330, y: 0, z: -20, u: 90 },\n  { id: 3, x: 250, y: -80, z: -20, u: 180 },\n  { id: 4, x: 170, y: 0, z: -20, u: 270 }\n];\nreturn msg;",
        "wires": [
          [
            "txt2pos_safety"
          ]
        ]
      },
      {
        "id": "txt2pos_safety",
        "type": "function",
        "name": "安全邊界防呆校驗",
        "func": "var pts = msg.payload;\nvar safe = pts.every(function(p){\n  return p.x >= 150 && p.x <= 400 && p.y >= -150 && p.y <= 150;\n});\nif(!safe) throw new Error('點位超出安全範圍！');\nreturn msg;",
        "wires": [
          [
            "txt2pos_debug"
          ]
        ]
      },
      {
        "id": "txt2pos_debug",
        "type": "debug",
        "name": "安全運動點位佇列",
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Google DeepMind 空間幾何與機器人推理研究",
        "url": "https://deepmind.google/technologies/robotics/"
      },
      {
        "title": "Gemini Multimodal Spatial Understanding API",
        "url": "https://ai.google.dev/"
      }
    ]
  }
];
var noderedProjectsData = INITIAL_NODERED_PROJECTS_DATA;

if (typeof window !== 'undefined') {
    window.INITIAL_NODERED_PROJECTS_DATA = INITIAL_NODERED_PROJECTS_DATA;
    window.noderedProjectsData = INITIAL_NODERED_PROJECTS_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = INITIAL_NODERED_PROJECTS_DATA;
}
