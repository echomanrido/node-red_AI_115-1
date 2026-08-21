window.INITIAL_LABS_DATA = [
  {
    "id": "lab-01",
    "labNumber": "01",
    "title": "練習1 Inject、Debug實作",
    "date": "2026-07-14",
    "category": "基礎實作",
    "summary": "學習 Node-RED 的核心觸發點（Inject 節點）與除錯顯示（Debug 節點），認識 JavaScript 的各種基本資料型態（Timestamp、String、Number、Boolean、JSON 物件）。",
    "flowImage": "images_src/ok/20260714_01_練習1 Inject、Debug實作[flow].png",
    "resultImage": "images_src/ok/20260714_01_練習1 Inject、Debug實作[result].png",
    "objective": "1. 掌握 Node-RED 中 Inject 節點與 Debug 節點的連線與配置方式。\n2. 理解 JavaScript 的五大常見資料型態：時間戳 (Timestamp/Date)、字串 (String)、數字 (Number)、布林值 (Boolean)、物件 (JSON Object)。\n3. 學會透過右側 Debug 側邊欄觀察 msg.payload 輸出內容與資料型態型別。",
    "tutorialSteps": [
      {
        "step": "1. 新增 Flow 與註解",
        "description": "在工作區上方加入兩個 Comment 節點，分別命名為「練習1: Inject、Debug實作」與「[認識java script的型態]」，方便整理流程架構與程式說明。"
      },
      {
        "step": "2. 拉取 Debug 節點",
        "description": "從左側節點面板拖曳一個 Debug 節點至工作區，名稱設為「debug 343」，預設輸出 msg.payload。"
      },
      {
        "step": "3. 建立 5 個 Inject 節點並設定型態",
        "description": "分別拉取 5 個 Inject 節點，將右側連接點連至「debug 343」：\n- 時間戳 (Date)：名稱改為「時間戳」，msg.payload 設為 timestamp (Date)。\n- 字串 (String)：名稱改為「Hello World !」，msg.payload 型態選為 str，內容輸入 Hello World !。\n- 數字 (Number)：名稱改為「123456789」，msg.payload 型態選為 num，內容輸入 123456789。\n- 布林值 (Boolean)：名稱改為「true」，msg.payload 型態選為 bool，內容選 true。\n- JSON 物件 (JSON)：名稱改為「JSON」，msg.payload 型態選為 json，內容輸入 JSON 格式：{\"時間\": \"2026/07/14\", \"地點\": \"五股\", \"姓名\": \"張世學\"}。"
      },
      {
        "step": "4. 部署與測試",
        "description": "點擊右上角「Deploy」按鈕部署流程。依序手動點擊各 Inject 節點左側按鈕，並觀察右側 Debug 側邊欄輸出的型態 (number, string[13], boolean, Object) 與對應數值。"
      }
    ],
    "aiPrompt": "請幫我寫出一段 Node-RED 的流程 JSON 程式碼，需求如下：\n1. 包含一個名稱為「debug 343」的 Debug 節點。\n2. 包含 5 個 Inject (輸入) 節點，全部連接至該 Debug 節點：\n   - 節點 1：名稱「時間戳」，輸出 timestamp (Date)\n   - 節點 2：名稱「Hello World !」，輸出 string 內容 \"Hello World !\"\n   - 節點 3：名稱「123456789」，輸出 number 內容 123456789\n   - 節點 4：名稱「true」，輸出 boolean 內容 true\n   - 節點 5：名稱「JSON」，輸出 JSON 物件，包含 {\"時間\": \"2026/07/14\", \"地點\": \"五股\", \"姓名\": \"張世學\"}\n3. 包含兩個 Comment 註解節點，顯示標題「練習1: Inject、Debug實作」與「[認識java script的型態]」。\n請直接輸出可直接匯入 Node-RED 的完整 JSON Array 格式。",
    "nodeRedJson": [
      {
        "id": "comment_1",
        "type": "comment",
        "z": "tab_1",
        "name": "練習1: Inject、Debug實作",
        "info": "",
        "x": 170,
        "y": 80,
        "wires": []
      },
      {
        "id": "comment_2",
        "type": "comment",
        "z": "tab_1",
        "name": "[認識java script的型態]",
        "info": "",
        "x": 420,
        "y": 80,
        "wires": []
      },
      {
        "id": "inject_timestamp",
        "type": "inject",
        "z": "tab_1",
        "name": "時間戳",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 130,
        "y": 140,
        "wires": [
          [
            "debug_node"
          ]
        ]
      },
      {
        "id": "inject_string",
        "type": "inject",
        "z": "tab_1",
        "name": "Hello World !",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "Hello World !",
        "payloadType": "str",
        "x": 150,
        "y": 200,
        "wires": [
          [
            "debug_node"
          ]
        ]
      },
      {
        "id": "inject_number",
        "type": "inject",
        "z": "tab_1",
        "name": "123456789",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "123456789",
        "payloadType": "num",
        "x": 140,
        "y": 260,
        "wires": [
          [
            "debug_node"
          ]
        ]
      },
      {
        "id": "inject_boolean",
        "type": "inject",
        "z": "tab_1",
        "name": "true",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 120,
        "y": 320,
        "wires": [
          [
            "debug_node"
          ]
        ]
      },
      {
        "id": "inject_json",
        "type": "inject",
        "z": "tab_1",
        "name": "JSON",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "{\"時間\":\"2026/07/14\",\"地點\":\"五股\",\"姓名\":\"張世學\"}",
        "payloadType": "json",
        "x": 130,
        "y": 380,
        "wires": [
          [
            "debug_node"
          ]
        ]
      },
      {
        "id": "debug_node",
        "type": "debug",
        "z": "tab_1",
        "name": "debug 343",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 450,
        "y": 140,
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Node-RED 官方文檔 - Inject Node",
        "url": "https://nodered.org/docs/user-guide/nodes#inject"
      },
      {
        "title": "Node-RED 官方文檔 - Debug Node",
        "url": "https://nodered.org/docs/user-guide/nodes#debug"
      },
      {
        "title": "MDN JavaScript 資料型態與結構",
        "url": "https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Data_structures"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "在丙級術科考試的 SCADA 模擬中，我們使用 Inject 節點手動發送 PLC 暫存器的模擬數值（如狀態 flag 的 true/false 或計數器數值），並利用 Debug 監控端接收的數據型態，這能協助在實體配線前除錯 SCADA 系統與 PLC 的數據對應。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "在半導體廠務 SCADA（如超純水、電力監控系統）中，使用 Inject 節點定期（如每 5 秒）產生模擬感測器數據 JSON 封包，並透過 Debug 監看其結構，以確保數據在寫入歷史資料庫 (Historian) 前通訊協議與型別無誤。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "在智慧家庭 SCADA 監控主機中，使用 Inject 節點模擬快遞箱門禁與重量感測器狀態變化，並在 SCADA 的事件警報看板 (Alarm Logger) 中，利用 Debug 節點追蹤並驗證此觸發訊號是否已正確轉換為可供 HMI 呈現的布林數值。"
      }
    ]
  },
  {
    "id": "lab-02",
    "labNumber": "02",
    "title": "練習1-1 http request實作",
    "date": "2026-07-14",
    "category": "網路 API 實作",
    "summary": "學習使用 Node-RED 的 http request 節點發送 HTTP GET 請求，讀取網路開放資料 (JSON、XML、HTML、CSV) 並解析輸出 msg.payload 物件。",
    "flowImage": "images_src/ok/20260714_02_練習1-1 http request實作_[flow].png",
    "resultImage": "images_src/ok/20260714_02_練習1-1 http request實作_[result].png",
    "objective": "1. 掌握 Node-RED 中 http request 節點的 URL 配置與 HTTP GET 請求方式。\n2. 學習透過 Inject 節點觸發網路 API 存取。\n3. 理解網路開放資料格式 (JSON/XML/CSV) 於 Debug 視窗的結構解析與資料取出技巧。",
    "tutorialSteps": [
      {
        "step": "1. 新增 Flow 與註解說明",
        "description": "在工作區上方加入兩個 Comment 節點，分別標註「練習1-1: http request實作」與「[讀取網路jason格式]」。"
      },
      {
        "step": "2. 建立 Inject 觸發節點",
        "description": "拖曳 4 個 Inject 節點，分別命名為：「JSON」、「XML」、「YAHOO」、「CSV」，作為發送 API 請求的開關。"
      },
      {
        "step": "3. 建立並配置 http request 節點",
        "description": "拖曳 4 個 http request 節點，與左側 Inject 節點連接：\n- **JSON 請求**：URL 設定為開放資料 JSON API，Return 屬性選擇「a parsed JSON object」。\n- **XML 請求**：URL 設定為 XML 格式 API。\n- **YAHOO 請求**：URL 設定為 Yahoo 網址。\n- **CSV 請求**：URL 設定為 CSV 格式開放資料 API。"
      },
      {
        "step": "4. 連接 Debug 節點並測試",
        "description": "將 4 個 http request 節點的輸出端全部連接至「debug 344」節點。點擊 Deploy 部署後，按壓「JSON」Inject 按鈕，即可在右側 Debug 視窗觀察到解析後的 JSON Object (含 57 筆陣列資料)。"
      }
    ],
    "aiPrompt": "請幫我寫出一段 Node-RED 流程 JSON 程式碼，需求如下：\n1. 包含 4 個 Inject 節點，分別命名為「JSON」、「XML」、「YAHOO」、「CSV」。\n2. 包含 4 個 http request 節點 (HTTP GET 請求，自動解析 JSON)，分別連接在 4 個 Inject 節點之後。\n3. 4 個 http request 節點輸出均連接至名稱為「debug 344」的 Debug 節點。\n4. 包含兩個 Comment 註解節點，標題為「練習1-1: http request實作」與「[讀取網路jason格式]」。\n請輸出可直接匯入 Node-RED 的完整 JSON Array。",
    "nodeRedJson": [
      {
        "id": "comment_lab2_1",
        "type": "comment",
        "z": "tab_lab2",
        "name": "練習1-1: http request實作",
        "info": "",
        "x": 180,
        "y": 80,
        "wires": []
      },
      {
        "id": "comment_lab2_2",
        "type": "comment",
        "z": "tab_lab2",
        "name": "[讀取網路jason格式]",
        "info": "",
        "x": 450,
        "y": 80,
        "wires": []
      },
      {
        "id": "inject_json_api",
        "type": "inject",
        "z": "tab_lab2",
        "name": "JSON",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 130,
        "y": 140,
        "wires": [
          [
            "http_req_json"
          ]
        ]
      },
      {
        "id": "http_req_json",
        "type": "http request",
        "z": "tab_lab2",
        "name": "http 請求",
        "method": "GET",
        "ret": "obj",
        "paytoqs": "ignore",
        "url": "https://data.tainan.gov.tw/api/v1/rest/datastore/395000000A-000208-001",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 330,
        "y": 140,
        "wires": [
          [
            "debug_344"
          ]
        ]
      },
      {
        "id": "inject_xml_api",
        "type": "inject",
        "z": "tab_lab2",
        "name": "XML",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 130,
        "y": 200,
        "wires": [
          [
            "http_req_xml"
          ]
        ]
      },
      {
        "id": "http_req_xml",
        "type": "http request",
        "z": "tab_lab2",
        "name": "http 請求",
        "method": "GET",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 330,
        "y": 200,
        "wires": [
          [
            "debug_344"
          ]
        ]
      },
      {
        "id": "inject_yahoo_api",
        "type": "inject",
        "z": "tab_lab2",
        "name": "YAHOO",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 140,
        "y": 260,
        "wires": [
          [
            "http_req_yahoo"
          ]
        ]
      },
      {
        "id": "http_req_yahoo",
        "type": "http request",
        "z": "tab_lab2",
        "name": "http 請求",
        "method": "GET",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "https://tw.yahoo.com",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 330,
        "y": 260,
        "wires": [
          [
            "debug_344"
          ]
        ]
      },
      {
        "id": "inject_csv_api",
        "type": "inject",
        "z": "tab_lab2",
        "name": "CVS",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 130,
        "y": 320,
        "wires": [
          [
            "http_req_csv"
          ]
        ]
      },
      {
        "id": "http_req_csv",
        "type": "http request",
        "z": "tab_lab2",
        "name": "http 請求",
        "method": "GET",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 330,
        "y": 320,
        "wires": [
          [
            "debug_344"
          ]
        ]
      },
      {
        "id": "debug_344",
        "type": "debug",
        "z": "tab_lab2",
        "name": "debug 344",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 520,
        "y": 140,
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Node-RED Cookbook - HTTP Requests 官方教學目錄",
        "url": "https://cookbook.nodered.org/http/#http-requests"
      },
      {
        "title": "FlowFuse - Node-RED HTTP Request 節點詳細規格與教學",
        "url": "https://flowfuse.com/node-red/core-nodes/http-request/"
      },
      {
        "title": "Node-RED 官方 User Guide 使用手冊",
        "url": "https://nodered.org/docs/user-guide/"
      },
      {
        "title": "政府資料開放平臺 (Open Data 數據源)",
        "url": "https://data.gov.tw"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "SCADA 系統藉由 HTTP Request 節點，以 GET 方式向工廠的 MES 系統或生產管理伺服器拉取最新的術科派工指令與配方 JSON 資料，進而將派工參數派送至現場的 PLC 控制器，實作 SCADA 向上對接資訊層的配方管理與工單派送功能。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "廠區 SCADA 監控中心利用 HTTP Request 節點定期調用設備端閘道器的 Web API，以 GET 方式拉取機台當前的 SECS/GEM 通訊狀態與機台稼動率數據。取得的 JSON 封包經解析後，直接在 SCADA 中控大螢幕上動態更新該生產線的所有機台狀態。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "家庭物流監控 SCADA 系統透過 HTTP Request 節點，定時呼叫第三方快遞追蹤 API，擷取最新的包裹物流 JSON 狀態。當狀態顯示為「已配達」時，SCADA 系統便在監控畫面上點亮對應的指示燈，並將資料寫入家庭快遞事件歷史紀錄中。"
      }
    ]
  },
  {
    "id": "lab-03",
    "labNumber": "03",
    "title": "台北市公車 API 串接與資料讀取",
    "date": "2026-08-08",
    "category": "進階實作",
    "summary": "學習透過 Node-RED 串接政府 TDX (交通部通用電子地圖與運輸資訊) 平台 API，使用 OAuth 2.0 驗證機制取得 Access Token，並發送 HTTP GET 請求取得台北市公車的即時到站預估時間，最後透過 Function 節點對 JSON 陣列進行模糊篩選與欄位整理。",
    "flowImage": "images_src/ok/20260714_台北市公車_[flow].png",
    "resultImage": "images_src/ok/20260714_台北市公車_[result].png",
    "objective": "1. 掌握 TDX 平台的 OAuth 2.0 驗證機制與 Token 獲取流程。\n2. 學習利用 Node-RED 發送帶有 Authorization 標頭的 HTTP 請求。\n3. 熟練使用 Function 節點進行 JSON 陣列過濾、字串模糊搜尋（篩選特定站牌）與資料欄位重組。",
    "tutorialSteps": [
      {
        "step": "1. 填入金鑰與包裝 Token 請求",
        "description": "在 Change 節點（填入你的 TDX 金鑰）中，將 msg.clientId 與 msg.clientSecret 設定為您在 TDX 平台申請的 API 憑證。隨後在 Function 節點（包裝 Token 請求）中將這兩個欄位包裝成 grant_type=client_credentials 格式，並在 msg.headers 中設定 Content-Type 標頭為 application/x-www-form-urlencoded。"
      },
      {
        "step": "2. 呼叫 TDX 取得 Token",
        "description": "使用 HTTP Request 節點（呼叫 TDX 取得 Token）向 TDX 驗證伺服器發送 POST 請求。在屬性中將傳回值（Return）設定為 a parsed JSON object。請求成功後，Token 會被解析並存放在 msg.payload.access_token 中。"
      },
      {
        "step": "3. 檢查 Token 並準備公車 API URL",
        "description": "在 Function 節點（檢查 Token 並準備 URL）中檢查 Access Token 是否成功取得。接著將 token 提取出來，包裝到 OData GET 請求所需的 HTTP Authorization: Bearer 標頭中。最後，在 msg.url 設定目標台北市公車即時到站估算的 API 網址（例如：https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/Taipei/承德幹線?$format=JSON）。"
      },
      {
        "step": "4. 呼叫台北公車 API 與篩選",
        "description": "第二個 HTTP Request 節點向設定好的 API 發送 GET 請求。回傳的公車到站預估資料（JSON 格式陣列）會被傳入 Function 節點（如 6. 模糊篩選與整理資訊）。在裡面撰寫 JavaScript 的 filter 邏輯，藉由 indexOf 或是 regex 進行特定站牌名稱（如圓山皇宮大廈、工商展覽中心或頭前國小）的模糊篩選，並將公車方向與到站時間（含去回程）整理成精簡的 JSON 欄位輸出至 Debug 節點。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "在丙級術科 SCADA 整合中，可利用此處相同的 HTTP Request 與 OAuth 2.0 驗證通訊機制連接工廠中央的 MES 生產工單伺服器。藉由取得授權 Token 拉取最新派工指令 JSON 數據，並將加工參數（如生產配方）寫入三菱 PLC，實作現場端與資訊層的動態安全連線。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "半導體廠區的廠務環控 SCADA 系統（例如廢水或化學品監測），需透過 HTTP RESTful 安全協議定期輪詢台積電內部安全閘道器或外部環境數據 API。透過 Token 驗證定期擷取高頻率監測 JSON，並動態整合於 FMCS 戰情室螢幕，實作跨廠區安全數據連線。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧家庭 SCADA 監控主機（如 Home Assistant）透過此通訊協議定時輪詢大眾運輸 API，當家人通勤的公車即將抵達「頭前國小」站時（例如小於 5 分鐘），家庭 SCADA 會自動在液晶看板點亮提示燈並啟動玄關語音提醒，供家人安排取件、出發通勤或出門迎接。"
      }
    ],
    "aiPrompt": "請幫我寫出一段 Node-RED 流程 JSON，用於串接政府交通部 TDX 平台的台北市公車即時到站 API：\n1. 包含一個 Inject 節點（名稱「點我手動查詢」）觸發流程。\n2. 包含一個 Change 節點（名稱「1. 填入你的 TDX 金鑰」）設定 clientId 與 clientSecret，以及 Function 節點（名稱「2. 包裝 Token 請求」）將金鑰組裝成 urlencoded 格式。\n3. 使用 HTTP Request 節點（名稱「3. 呼叫 TDX 取得 Token」，Method 為 POST）向 TDX 驗證伺服器發送請求取得 Access Token。\n4. 使用 Function 節點（名稱「4. 檢查 Token 並準備 URL」）從 msg.payload 提取 Token，放入 Authorization Bearer 標頭，並設定 GET 台北市公車 EstimatedTimeOfArrival API 網址。\n5. 使用 HTTP Request 節點（名稱「5. 呼叫台北公車 API」，Method 為 GET）取得公車到站資訊。\n6. 使用 Function 節點（名稱「6. 模糊篩選與整理資訊」）對傳回的 JSON 陣列進行 filter 篩選，比對特定站牌名稱（如「圓山皇宮大廈」），並重組路線、站牌、去回程方向與估算到站時間（轉換為分鐘）輸出，最後接至 Debug 節點輸出。",
    "nodeRedJson": [
      {
        "id": "tab_bus",
        "type": "tab",
        "label": "台北市公車 API 實作",
        "disabled": false,
        "info": ""
      },
      {
        "id": "comment_bus_1",
        "type": "comment",
        "z": "tab_bus",
        "name": "練習3: 台北市公車 API 串接與資料讀取",
        "info": "",
        "x": 200,
        "y": 60,
        "wires": []
      },
      {
        "id": "inject_bus",
        "type": "inject",
        "z": "tab_bus",
        "name": "點我手動查詢",
        "props": [],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 120,
        "y": 140,
        "wires": [
          [
            "change_keys"
          ]
        ]
      },
      {
        "id": "change_keys",
        "type": "change",
        "z": "tab_bus",
        "name": "1. 填入你的 TDX 金鑰",
        "rules": [
          {
            "t": "set",
            "p": "clientId",
            "pt": "msg",
            "to": "YOUR_CLIENT_ID",
            "tot": "str"
          },
          {
            "t": "set",
            "p": "clientSecret",
            "pt": "msg",
            "to": "YOUR_CLIENT_SECRET",
            "tot": "str"
          }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 340,
        "y": 140,
        "wires": [
          [
            "func_pack_token"
          ]
        ]
      },
      {
        "id": "func_pack_token",
        "type": "function",
        "z": "tab_bus",
        "name": "2. 包裝 Token 請求",
        "func": "msg.headers = {\n    'Content-Type': 'application/x-www-form-urlencoded'\n};\nmsg.payload = `grant_type=client_credentials&client_id=${msg.clientId}&client_secret=${msg.clientSecret}`;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 140,
        "wires": [
          [
            "http_get_token"
          ]
        ]
      },
      {
        "id": "http_get_token",
        "type": "http request",
        "z": "tab_bus",
        "name": "3. 呼叫 TDX 取得 Token",
        "method": "POST",
        "ret": "obj",
        "paytoqs": "ignore",
        "url": "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token",
        "tls": "",
        "persist": false,
        "proxy": "",
        "insecureHTTPParser": false,
        "authType": "",
        "senderr": false,
        "headers": [],
        "x": 800,
        "y": 140,
        "wires": [
          [
            "func_prep_api"
          ]
        ]
      },
      {
        "id": "func_prep_api",
        "type": "function",
        "z": "tab_bus",
        "name": "4. 檢查 Token 並準備 URL",
        "func": "if (!msg.payload || !msg.payload.access_token) {\n    node.error(\"取得 Token 失敗！\");\n    return null;\n}\nvar token = msg.payload.access_token;\nmsg.headers = {\n    'Authorization': 'Bearer ' + token,\n    'Accept': 'application/json'\n};\nmsg.url = 'https://tdx.transportdata.tw/api/basic/v2/Bus/EstimatedTimeOfArrival/City/Taipei/承德幹線?$format=JSON';\nmsg.payload = null;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 200,
        "y": 240,
        "wires": [
          [
            "http_get_bus"
          ]
        ]
      },
      {
        "id": "http_get_bus",
        "type": "http request",
        "z": "tab_bus",
        "name": "5. 呼叫台北公車 API",
        "method": "GET",
        "ret": "obj",
        "paytoqs": "ignore",
        "url": "",
        "tls": "",
        "persist": false,
        "proxy": "",
        "insecureHTTPParser": false,
        "authType": "",
        "senderr": false,
        "headers": [],
        "x": 460,
        "y": 240,
        "wires": [
          [
            "func_filter_bus"
          ]
        ]
      },
      {
        "id": "func_filter_bus",
        "type": "function",
        "z": "tab_bus",
        "name": "6. 模糊篩選與整理資訊",
        "func": "var data = msg.payload;\nif (!Array.isArray(data)) {\n    return msg;\n}\nvar targetStopName = \"圓山皇宮大廈\";\nvar filtered = data.filter(function(item) {\n    return item.StopName && item.StopName.Zh_tw && item.StopName.Zh_tw.indexOf(targetStopName) !== -1;\n});\nvar result = filtered.map(function(item) {\n    var direction = item.Direction === 0 ? \"去程 (往新北投)\" : \"回程 (往捷運石牌)\";\n    var timeInMin = item.EstimateTime !== undefined ? Math.round(item.EstimateTime / 60) + \" 分鐘\" : \"未發車/末班已過\";\n    return {\n        路線: \"承德幹線\",\n        站牌: targetStopName,\n        方向: direction,\n        到站時間: timeInMin\n    };\n});\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 240,
        "wires": [
          [
            "debug_bus"
          ]
        ]
      },
      {
        "id": "debug_bus",
        "type": "debug",
        "z": "tab_bus",
        "name": "顯示公車動態",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 960,
        "y": 240,
        "wires": []
      }
    ],
    "references": [
      {
        "title": "交通部 TDX 運輸資料流通服務平台 官方網站",
        "url": "https://tdx.transportdata.tw"
      },
      {
        "title": "TDX API 呼叫說明與 OData 規格指引",
        "url": "https://tdx.transportdata.tw/api-service/swagger"
      },
      {
        "title": "Node-RED 官方文檔 - Function 節點使用說明與 JS 寫法",
        "url": "https://nodered.org/docs/user-guide/writing-functions"
      }
    ]
  },
  {
    "id": "lab-04",
    "labNumber": "04",
    "title": "練習 2-1: Function 節點字串處理實作",
    "date": "2026-08-14",
    "category": "基礎實作",
    "summary": "學習如何在 Node-RED 中使用 Function 節點撰寫 JavaScript 程式碼，以實現字串的讀取、動態拼接與連續處理，奠定後續在工業資料封裝中的自訂程式基礎。",
    "flowImage": "images_src/ok/20260814_function[flow].png",
    "resultImage": "images_src/ok/20260814_function[result].png",
    "objective": "1. 理解 Node-RED 中 Function 節點的基本結構，並掌握 msg.payload 變數的存取與回傳方式。\n2. 學習利用 JavaScript 進行字串拼接運算（使用 + 運算子）。\n3. 掌握多個 Function 節點串接時，資料流 (Dataflow) 的連續修改與傳遞機制。",
    "tutorialSteps": [
      {
        "step": "1. 建立 Inject 觸發源",
        "description": "在 Node-RED 編輯器中拖入一個 inject 節點，雙擊開啟屬性面板，將 Payload 型態設定為 string (字串)，並輸入內容 \"Hello\"，將節點命名為 Hello。"
      },
      {
        "step": "2. 撰寫第一個字串拼接 Function 節點",
        "description": "拖入一個 function 節點，命名為 \"加字串\"，將其輸入與 Hello 節點的輸出相連。雙擊開啟程式碼編輯區，輸入程式碼：msg.payload = msg.payload + \" 五股 20260814 !\"; return msg; 以在原字串後拼接地點與日期。"
      },
      {
        "step": "3. 串接第一階段偵錯輸出",
        "description": "拖入第一個 debug 節點 (自動命名為 debug 17)，將其輸入端連接至第一個 \"加字串\" 節點的輸出端，用於驗證第一階段的字串拼接結果 (\"Hello 五股 20260814 !\")。"
      },
      {
        "step": "4. 建置連續字串拼接流程並驗證",
        "description": "從第一個 \"加字串\" 節點的輸出端，額外拉出一條線連接至第二個 function 節點（命名為 \"加字串\"），代碼輸入：msg.payload = msg.payload + \" 張世學\";。接著在後方連接第三個 function 節點（命名為 \"加字串\"），代碼輸入：msg.payload = msg.payload + \" 機電整合班\";。最後串接 debug 16 節點。點擊 Deploy 部署後，點擊 Hello 節點，即可在右側偵錯欄分別查看 \"Hello 五股 20260814 !\" 與完整拼接的 \"Hello 五股 20260814 ! 張世學 機電整合班\"。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "在丙級術科 SCADA 整合中，可利用此字串拼接機制將 PLC 的暫存器數值（如 D100 良品產量）與文字組合。例如，在 Function 節點中將 msg.payload 數值包裝為 \"目前輸送帶累積良品產量為 \" + msg.payload + \" 個\"，動態呈現在 SCADA 歷史事件報表中，使監控人員一目了然。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "廠區環控 SCADA 系統（如廢水處理 pH 值監測）在發送高頻遙測資料至中央 MES 或資料庫前，常需利用 Function 進行字串處理。例如將測得的 pH 值拼接上感測器編號與時間戳：\"pH_Sensor_01: \" + msg.payload + \" at \" + Date.now()，以統一資料格式供後續 BigQuery 分析。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧家庭 SCADA 中控主機在偵測到快遞箱門禁事件時，利用 Function 節點將事件狀態與收件人姓名進行字串拼接，封裝成一封易讀的中文警報簡訊：\"警告：您的快遞箱於 \" + msg.payload + \" 被開啟！\"，再透過 Webhook API 拋送至使用者的 Line 或手機簡訊通知。"
      }
    ],
    "aiPrompt": "請幫我寫出一段 Node-RED 流程 JSON，其中包含：\n1. 一個 Inject 節點發送字串 \"Hello\"。\n2. 一個 Function 節點，將 payload 加上 \" 五股 20260814 !\"。\n3. 一個 Debug 節點輸出上述結果。\n4. 另外串接兩個 Function 節點，分別將 payload 加上 \" 張世學\" 與 \" 機電整合班\"，最後使用第二個 Debug 節點輸出完整拼接的字串。\n請以 JSON 陣列格式回傳，方便我直接複製匯入 Node-RED。",
    "nodeRedJson": [
      {
        "id": "n-inject-hello",
        "type": "inject",
        "z": "tab_func",
        "name": "Hello",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "Hello",
        "payloadType": "str",
        "x": 130,
        "y": 120,
        "wires": [
          [
            "n-func-add-1"
          ]
        ]
      },
      {
        "id": "n-func-add-1",
        "type": "function",
        "z": "tab_func",
        "name": "加字串",
        "func": "msg.payload = msg.payload + \" 五股 20260814 !\";\nreturn msg;",
        "x": 320,
        "y": 120,
        "wires": [
          [
            "n-debug-17",
            "n-func-add-2"
          ]
        ]
      },
      {
        "id": "n-debug-17",
        "type": "debug",
        "z": "tab_func",
        "name": "debug 17",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 530,
        "y": 120,
        "wires": []
      },
      {
        "id": "n-func-add-2",
        "type": "function",
        "z": "tab_func",
        "name": "加字串",
        "func": "msg.payload = msg.payload + \" 張世學\";\nreturn msg;",
        "x": 340,
        "y": 240,
        "wires": [
          [
            "n-func-add-3"
          ]
        ]
      },
      {
        "id": "n-func-add-3",
        "type": "function",
        "z": "tab_func",
        "name": "加字串",
        "func": "msg.payload = msg.payload + \" 機電整合班\";\nreturn msg;",
        "x": 510,
        "y": 240,
        "wires": [
          [
            "n-debug-16"
          ]
        ]
      },
      {
        "id": "n-debug-16",
        "type": "debug",
        "z": "tab_func",
        "name": "debug 16",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 710,
        "y": 240,
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Node-RED 官方 Docs - Function 節點使用說明與 JS 寫法",
        "url": "https://nodered.org/docs/user-guide/writing-functions"
      },
      {
        "title": "w3schools - JavaScript 字串拼接與運算子教學",
        "url": "https://www.w3schools.com/js/js_strings.asp"
      }
    ]
  },
  {
    "id": "lab-05",
    "labNumber": "05",
    "title": "練習 2-2: 門禁監控事件多來源字串處理",
    "date": "2026-08-14",
    "category": "基礎實作",
    "summary": "學習如何將多個不同輸入源（如前門與後門開關事件）彙整至同一個 Function 節點中，進行共用格式處理，並掌握如何在後續流程中進行責任人員的動態拼接與分發。",
    "flowImage": "images_src/ok/20260814_門禁系統應用[flow].png",
    "resultImage": "images_src/ok/20260814_門禁系統應用[result].png",
    "objective": "1. 掌握多個 Inject（輸入）節點彙整至單一 Function 節點的「多對一」多路複用流程設計。\n2. 熟練使用 JavaScript 進行變數動態拼接與格式統一化。\n3. 理解 Node-RED 中，單一節點的多條輸出連線 (Wires) 如何將相同的 msg 副本同時分發至不同分支。",
    "tutorialSteps": [
      {
        "step": "1. 建立前門與後門雙輸入源",
        "description": "在 Node-RED 編輯器中拖入兩個 inject 節點。雙擊第一個節點，將 Payload 型態設定為 string，輸入內容為 \"前門被開啟\"，將節點命名為「前門被開啟」；雙擊第二個節點，Payload 設為 string，輸入內容為 \"後門被開啟\"，將節點命名為「後門被開啟」。"
      },
      {
        "step": "2. 彙整至共用處理 Function 節點",
        "description": "拖入一個 function 節點，命名為 \"地點時間訊息\"，將其輸入端同時與「前門被開啟」及「後門被開啟」兩個節點的輸出端相連。雙擊開啟程式碼編輯區，輸入代碼：msg.payload = msg.payload + \" 五股機丙教室 20260418\"; return msg;，以將兩個來源事件加上統一的地點與日期後綴。"
      },
      {
        "step": "3. 分發一：第一階段偵錯輸出",
        "description": "將 \"地點時間訊息\" 節點的輸出端連線至一個 debug 節點 (命名為 debug 18)，用於驗證與記錄第一階段的地點時間事件資訊。"
      },
      {
        "step": "4. 分發二：第二階段責任人拼接與驗證",
        "description": "從 \"地點時間訊息\" 節點的輸出端，拉出另一條線連接至第二個 function 節點（命名為 \"負責人\"），代碼輸入：msg.payload = msg.payload + \" 張世學\";。接著在後方連接 debug 19 節點。點擊 Deploy 部署並觸發事件後，在右側偵錯欄中可同時查看到 debug 18 輸出的事件原始資訊以及 debug 19 輸出的加上負責人簽名後的完整訊息。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "在丙級術科 SCADA 整合中，可利用此機制將現場多個位置的感測器（如 X1 送料極限、X2 裝配極限）事件彙整至同一個 Function 進行格式處理，統一加上位置與時間，產生標準 SCADA 警報文字（如「送料極限異常 於 五股機丙教室」）推送到警報顯示窗。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "半導體廠區環控中，多個機台通訊事件的彙整。例如將多個機台（EQP01、EQP02）的離線事件，在共用 Function 中加上晶圓廠區代碼與系統時間，包裝成標準 MES 警報格式，並分發至資料庫儲存與廠務通訊群組。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧家庭安防中，多個門窗（前門、後門、窗戶）防盜監視器的事件彙整。當任一門窗被開啟時，將開啟事件在共用 Function 中拼接上家庭位置與時間，再分發至 Line Notify 通報，並加上警報負責人派發，實作自動化家庭防盜通報。"
      }
    ],
    "aiPrompt": "請幫我寫出一段 Node-RED 流程 JSON，用於模擬門禁監控：\n1. 包含兩個 Inject 節點，分別發送字串 \"前門被開啟\" 與 \"後門被開啟\"。\n2. 這兩個節點的輸出都連線到同一個 Function 節點（名稱「地點時間訊息」），將 msg.payload 加上 \" 五股機丙教室 20260418\"。\n3. 「地點時間訊息」的輸出連線到一個 Debug 節點（名稱「debug 18」）。\n4. 同時，「地點時間訊息」的輸出也連線到另一個 Function 節點（名稱「負責人」），將 msg.payload 加上 \" 張世學\"，最後接至 Debug 節點（名稱「debug 19」）輸出。\n請以標準 JSON 陣列回傳。",
    "nodeRedJson": [
      {
        "id": "n-inject-front",
        "type": "inject",
        "z": "tab_door",
        "name": "前門被開啟",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "前門被開啟",
        "payloadType": "str",
        "x": 130,
        "y": 100,
        "wires": [
          [
            "n-func-info"
          ]
        ]
      },
      {
        "id": "n-inject-back",
        "type": "inject",
        "z": "tab_door",
        "name": "後門被開啟",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "後門被開啟",
        "payloadType": "str",
        "x": 130,
        "y": 200,
        "wires": [
          [
            "n-func-info"
          ]
        ]
      },
      {
        "id": "n-func-info",
        "type": "function",
        "z": "tab_door",
        "name": "地點時間訊息",
        "func": "msg.payload = msg.payload + \" 五股機丙教室 20260418\";\nreturn msg;",
        "x": 380,
        "y": 140,
        "wires": [
          [
            "n-debug-18",
            "n-func-owner"
          ]
        ]
      },
      {
        "id": "n-debug-18",
        "type": "debug",
        "z": "tab_door",
        "name": "debug 18",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 580,
        "y": 100,
        "wires": []
      },
      {
        "id": "n-func-owner",
        "type": "function",
        "z": "tab_door",
        "name": "負責人",
        "func": "msg.payload = msg.payload + \" 張世學\";\nreturn msg;",
        "x": 380,
        "y": 240,
        "wires": [
          [
            "n-debug-19"
          ]
        ]
      },
      {
        "id": "n-debug-19",
        "type": "debug",
        "z": "tab_door",
        "name": "debug 19",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 580,
        "y": 240,
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Node-RED 官方 Docs - Function 節點使用說明與 JS 寫法",
        "url": "https://nodered.org/docs/user-guide/writing-functions"
      },
      {
        "title": "w3schools - JavaScript 陣列與字串連接教學",
        "url": "https://www.w3schools.com/js/js_strings.asp"
      }
    ]
  },
  {
    "id": "lab-06",
    "labNumber": "06",
    "title": "練習 2-3: 時間戳格式化與 UTC+8 本地時間轉換",
    "date": "2026-08-14",
    "category": "基礎實作",
    "summary": "學習如何將 Node-RED 內建的毫秒時間戳 (timestamp) 轉換為 ISO 8601 標準國際時間字串，並進階利用 JavaScript 將其格式化為台灣當地 (UTC+8) 的可讀時間格式，最後拼接事件主題輸出。",
    "flowImage": "images_src/ok/20260814_真實時間[flow].png",
    "resultImage": "images_src/ok/20260814_真實時間[result].png",
    "objective": "1. 理解 Node-RED 的 Timestamp 數據型態（毫秒）與 JavaScript Date 物件的建構。\n2. 掌握 toISOString() 函數的用途與 UTC 標準時間 of 意涵。\n3. 學習在沒有外部套件下，利用 JavaScript 原生方法手動提取年、月、日、時、分、秒並補零，轉換為台灣 (UTC+8) 可讀時間字串。",
    "tutorialSteps": [
      {
        "step": "1. 建立 UTC 格式時間流程",
        "description": "在 Node-RED 編輯器中拖入一個 inject 節點，雙擊將其命名為「後門打開:時間戳」，Payload 設為 timestamp (時間戳記)，Topic 設為 \" 後門打開\" (注意前面有一個半形空格)。後方連接一個 function 節點（命名為 msg.payload + msg.topic），代碼編輯區中輸入：msg.payload = new Date(msg.payload).toISOString() + msg.topic; return msg;。最後將輸出連接至 debug 20 節點。"
      },
      {
        "step": "2. 建立 UTC+8 本地格式時間流程",
        "description": "拖入第二個 inject 節點，命名為「觸發事件」，Payload 設為 timestamp，Topic 設為 \" 後門打開\"。後方連接第二個 function 節點（命名為 轉 UTC+8 並拼接 topic）。"
      },
      {
        "step": "3. 撰寫台灣當地時間格式化演算法",
        "description": "雙擊「轉 UTC+8 並拼接 topic」Function 節點，在編輯區中輸入手動提取年月日時分秒並補零之演算法：\nvar date = new Date(msg.payload);\nvar y = date.getFullYear();\nvar m = ('0' + (date.getMonth() + 1)).slice(-2);\nvar d = ('0' + date.getDate()).slice(-2);\nvar hh = ('0' + date.getHours()).slice(-2);\nvar mm = ('0' + date.getMinutes()).slice(-2);\nvar ss = ('0' + date.getSeconds()).slice(-2);\nmsg.payload = y + '/' + m + '/' + d + ' ' + hh + ':' + mm + ':' + ss + msg.topic;\nreturn msg;"
      },
      {
        "step": "4. 串接偵錯輸出與部署驗證",
        "description": "將「轉 UTC+8 並拼接 topic」節點的輸出端連接至 debug 節點 (命名為「輸出結果」)。點擊 Deploy 部署，依序點擊兩個 Inject 節點的觸發按鈕，在右側 Debug 偵錯欄中，debug 20 會輸出帶有 Z 後綴的 UTC 國際時間（如 2026-08-14T07:54:09.632Z 後門打開），而「輸出結果」則會輸出補零格式化後的台灣當地時間（如 2026/08/14 15:54:10 後門打開）。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "在丙級術科 SCADA 系統中，當現場裝配台氣缸或送料轉盤發生極限異常時，PLC 發送 M 點報警訊號，Node-RED 接收後調用此時間戳轉換演算法，將系統毫秒時間轉換為台灣本地格式（如 2026/08/14 15:54:10），並拼接上異常事件內容，寫入 SCADA 歷史報警清單中，方便稽查維修時間。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "半導體廠區高頻率環境監測（如電力能耗或純水 pH 值採集）時的時戳對齊（Timestamp Alignment）。感測器採集到的毫秒時戳，在 Function 節點中統一格式化為標準的本地時間格式（YYYY/MM/DD HH:mm:ss），確保資料庫 (MySQL/Historian) 在存儲跨區域設備時的時間序列完整性。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧家庭防盜與包裹配送事件記錄。當玄關門鎖被開啟或快遞箱被觸發時，系統擷取當前毫秒時間，轉換為台灣當地的可讀時間，拼接成「您的包裹於 2026/08/14 15:54:10 已送達快遞箱！」發送至使用者的 Line Bot 進行即時推播。"
      }
    ],
    "aiPrompt": "請幫我寫出一段 Node-RED 流程 JSON，用於時間戳格式轉換：\n1. 包含兩個 Inject 節點，Payload 皆發送當前時間戳 (timestamp)，Topic 設為 \" 後門打開\"。\n2. 第一個 Inject 節點接至 Function 節點，利用 JavaScript 的 toISOString() 轉換為 ISO 格式字串並拼接 Topic，接至 Debug 節點輸出。\n3. 第二個 Inject 節點接至另一個 Function 節點，利用 JavaScript 將毫秒時間轉換為台灣當地 UTC+8 的 \"YYYY/MM/DD HH:mm:ss\" 格式，並手動補零，最後拼接 Topic，接至第二個 Debug 節點 (輸出結果) 輸出。\n請以標準 JSON 陣列回傳。",
    "nodeRedJson": [
      {
        "id": "n-inject-ts-1",
        "type": "inject",
        "z": "tab_time",
        "name": "後門打開:時間戳",
        "props": [
          {
            "p": "payload"
          },
          {
            "p": "topic",
            "vt": "str"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": " 後門打開",
        "payload": "",
        "payloadType": "date",
        "x": 160,
        "y": 100,
        "wires": [
          [
            "n-func-iso"
          ]
        ]
      },
      {
        "id": "n-func-iso",
        "type": "function",
        "z": "tab_time",
        "name": "msg.payload + msg.topic",
        "func": "msg.payload = new Date(msg.payload).toISOString() + msg.topic;\nreturn msg;",
        "x": 420,
        "y": 100,
        "wires": [
          [
            "n-debug-20"
          ]
        ]
      },
      {
        "id": "n-debug-20",
        "type": "debug",
        "z": "tab_time",
        "name": "debug 20",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 650,
        "y": 100,
        "wires": []
      },
      {
        "id": "n-inject-ts-2",
        "type": "inject",
        "z": "tab_time",
        "name": "觸發事件",
        "props": [
          {
            "p": "payload"
          },
          {
            "p": "topic",
            "vt": "str"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": " 後門打開",
        "payload": "",
        "payloadType": "date",
        "x": 130,
        "y": 200,
        "wires": [
          [
            "n-func-tw"
          ]
        ]
      },
      {
        "id": "n-func-tw",
        "type": "function",
        "z": "tab_time",
        "name": "轉 UTC+8 並拼接 topic",
        "func": "var date = new Date(msg.payload);\nvar y = date.getFullYear();\nvar m = (\"0\" + (date.getMonth() + 1)).slice(-2);\nvar d = (\"0\" + date.getDate()).slice(-2);\nvar hh = (\"0\" + date.getHours()).slice(-2);\nvar mm = (\"0\" + date.getMinutes()).slice(-2);\nvar ss = (\"0\" + date.getSeconds()).slice(-2);\nmsg.payload = y + \"/\" + m + \"/\" + d + \" \" + hh + \":\" + mm + \":\" + ss + msg.topic;\nreturn msg;",
        "x": 380,
        "y": 200,
        "wires": [
          [
            "n-debug-tw"
          ]
        ]
      },
      {
        "id": "n-debug-tw",
        "type": "debug",
        "z": "tab_time",
        "name": "輸出結果",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 600,
        "y": 200,
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Node-RED 官方 Docs - Function 節點使用說明與 JS 寫法",
        "url": "https://nodered.org/docs/user-guide/writing-functions"
      },
      {
        "title": "w3schools - JavaScript Date 日期物件規格教學說明",
        "url": "https://www.w3schools.com/js/js_dates.asp"
      }
    ]
  },
  {
    "id": "lab-07",
    "labNumber": "07",
    "title": "練習 2-3: JavaScript 數字與字串型別運算對照實作",
    "date": "2026-08-21",
    "category": "基礎實作",
    "summary": "探討 JavaScript 弱型態特性中的隱式轉型行為。透過對照組實作，觀察數字 (Number) 與字串 (String) 在使用 + 運算子時的數學加法與字串拼接差異，掌握工業數據採集時的型別校正重要性。",
    "flowImage": "images_src/ok/20260821_01_數字與字串比較[flow].png",
    "resultImage": "images_src/ok/20260821_01_數字與字串比較[result].png",
    "objective": "1. 理解 JavaScript 隱式型別轉換 (Implicit Coercion) 的機制，掌握 + 運算子在不同型別下的行為。\n2. 觀察當資料來源型別為 String 時，如何因為運算優先級退化為字串拼接（如 \"11\" + 1 變成 \"111\"）。\n3. 體會工業物聯網（如 Modbus 數值解析）進行顯式轉型 (Explicit Conversion) 的必要性。",
    "tutorialSteps": [
      {
        "step": "1. 建立數字對照組 (對照組一)",
        "description": "拖入一個 inject 節點，命名為 \"11\"，將其 Payload 型態設定為 number (數字)，數值輸入 11。後方連接兩個 function 節點，分別命名為「數字+1」與「字串+1」；「數字+1」內輸入 msg.payload = msg.payload + 1; return msg;，「字串+1」內輸入 msg.payload = msg.payload + \"1\"; return msg;。最後將輸出連接至 debug 22 與 debug 23 偵錯節點。"
      },
      {
        "step": "2. 建立字串對照組 (對照組二)",
        "description": "拖入第二個 inject 節點，命名為 \"11\"，將其 Payload 型態設定為 string (字串)，內容輸入 \"11\"。同樣連線至另外兩個相同邏輯的 function 節點「數字+1」與「字串+1」，最後接至 debug 24 與 debug 25 偵錯節點。"
      },
      {
        "step": "3. 部署並驗證數字組運算結果",
        "description": "點擊 Deploy 部署，觸發數字組 Inject 節點。在右側 Debug 偵錯欄中，debug 22 輸出為數字 12 (執行數學加法)，而 debug 23 輸出為字串 \"111\" (執行隱式字串拼接，因為加數為字串 \"1\")。"
      },
      {
        "step": "4. 部署並驗證字串組運算結果與除錯",
        "description": "觸發字串組 Inject 節點。在 Debug 偵錯欄中，debug 24 與 debug 25 輸出的結果皆為字串 \"111\"。這是因為當被加數為字串 \"11\" 時，+ 運算子會強制將加數轉型為字串進行拼接。若要執行數學加法，必須在 Function 內使用 Number(msg.payload) 或 parseInt(msg.payload) 進行顯式轉型。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "在丙級術科 SCADA 整合中，從 Modbus 讀取三菱 PLC 暫存器（如 D100 良品計數）時，若通訊協定節點回傳的數據格式為字串，直接在 Node-RED 進行累加運算（如 msg.payload + 1）會導致產量數據拼接異常。必須在 Function 節點中先使用 parseInt(msg.payload) 進行數值強制轉型，才能確保警報判定與產量計數顯示正常。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "半導體廠區 FMCS 環控與能耗監控系統。從 SECS/GEM 設備通訊取得的溫度或電流值有時會以字串形式拋送。在發送至 MySQL 或寫入大數據平台 (BigQuery) 前，SCADA 中樞需利用 Function 進行顯式型別檢查與轉換，確保所有 OEE 稼動率計算與電力統計分析不會因隱式字串拼接時失真。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧家庭物流中控在讀取快遞箱稱重感測器的數據時，若 API 傳回的數值型態為字串，需利用 Function 執行 Number(msg.payload) 轉型。如此一來才能與開箱閾值（如大於 10 公克代表有快遞）進行正確的數學比較，防止防盜或收件警報器產生邏輯誤判。"
      }
    ],
    "aiPrompt": "請幫我寫出一段 Node-RED 流程 JSON，用於對照數字與字串型別運算行為：\n1. 包含一個 Inject 節點（輸出數字 11），連線到兩個 Function 節點（分別是「數字+1」執行 msg.payload+1，與「字串+1」執行 msg.payload+\"1\"），並各自接上 Debug 節點輸出。\n2. 包含第二個 Inject 節點（輸出字串 \"11\"），連線到兩個與上述相同邏輯的 Function 節點，並各自接上 Debug 節點輸出，以便我在 Debug 視窗觀察 JavaScript 隱式型別轉換行為。\n請以 JSON 陣列格式回傳。",
    "nodeRedJson": [
      {
        "id": "n-inject-num",
        "type": "inject",
        "z": "tab_coercion",
        "name": "11",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "11",
        "payloadType": "num",
        "x": 110,
        "y": 120,
        "wires": [
          [
            "n-func-num-add1",
            "n-func-num-addstr1"
          ]
        ]
      },
      {
        "id": "n-func-num-add1",
        "type": "function",
        "z": "tab_coercion",
        "name": "數字+1",
        "func": "msg.payload = msg.payload + 1;\nreturn msg;",
        "x": 360,
        "y": 100,
        "wires": [
          [
            "n-debug-22"
          ]
        ]
      },
      {
        "id": "n-debug-22",
        "type": "debug",
        "z": "tab_coercion",
        "name": "debug 22",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 710,
        "y": 100,
        "wires": []
      },
      {
        "id": "n-func-num-addstr1",
        "type": "function",
        "z": "tab_coercion",
        "name": "字串+1",
        "func": "msg.payload = msg.payload + \"1\";\nreturn msg;",
        "x": 360,
        "y": 140,
        "wires": [
          [
            "n-debug-23"
          ]
        ]
      },
      {
        "id": "n-debug-23",
        "type": "debug",
        "z": "tab_coercion",
        "name": "debug 23",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 710,
        "y": 140,
        "wires": []
      },
      {
        "id": "n-inject-str",
        "type": "inject",
        "z": "tab_coercion",
        "name": "11",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "11",
        "payloadType": "str",
        "x": 110,
        "y": 240,
        "wires": [
          [
            "n-func-str-add1",
            "n-func-str-addstr1"
          ]
        ]
      },
      {
        "id": "n-func-str-add1",
        "type": "function",
        "z": "tab_coercion",
        "name": "數字+1",
        "func": "msg.payload = msg.payload + 1;\nreturn msg;",
        "x": 360,
        "y": 220,
        "wires": [
          [
            "n-debug-24"
          ]
        ]
      },
      {
        "id": "n-debug-24",
        "type": "debug",
        "z": "tab_coercion",
        "name": "debug 24",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 710,
        "y": 220,
        "wires": []
      },
      {
        "id": "n-func-str-addstr1",
        "type": "function",
        "z": "tab_coercion",
        "name": "字串+1",
        "func": "msg.payload = msg.payload + \"1\";\nreturn msg;",
        "x": 360,
        "y": 260,
        "wires": [
          [
            "n-debug-25"
          ]
        ]
      },
      {
        "id": "n-debug-25",
        "type": "debug",
        "z": "tab_coercion",
        "name": "debug 25",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 710,
        "y": 260,
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Node-RED 官方 Docs - Function 節點使用說明與 JS 寫法",
        "url": "https://nodered.org/docs/user-guide/writing-functions"
      },
      {
        "title": "w3schools - JavaScript 數字與字串型別比較運算說明",
        "url": "https://www.w3schools.com/js/js_strings.asp"
      }
    ]
  },
  {
    "id": "lab-08",
    "labNumber": "08",
    "title": "練習 2-4: JavaScript 鏈式四則算術運算實作",
    "date": "2026-08-21",
    "category": "基礎實作",
    "summary": "學習在 Node-RED 中使用連續的 Function 節點對 msg.payload 執行鏈式 (Chain) 算術運算。透過加、減、乘、除的依序運算，掌握資料流的逐步加工與分流偵錯方法。",
    "flowImage": "images_src/ok/20260821_02_四則運算[flow].png",
    "resultImage": "images_src/ok/20260821_02_四則運算[result].png",
    "objective": "1. 理解 Node-RED 中 Function 節點對 msg.payload 的就地修改與向後傳遞機制。\n2. 學習在 JavaScript 中進行基本的 +、-、*、/ 四則運算。\n3. 掌握鏈式管線 (Pipeline) 結構中，如何在中間節點分流至 Debug 節點進行逐步調試。",
    "tutorialSteps": [
      {
        "step": "1. 建立輸入源與加法節點",
        "description": "拖入一個 inject 節點，命名為 \"11\"，Payload 設定為 number 數字 11。後方連接第一個 function 節點，命名為「加二」，程式碼輸入 msg.payload = msg.payload + 2; return msg;。將「加二」的輸出端分別連接至 debug 27 偵錯節點與下一個 Function 節點。"
      },
      {
        "step": "2. 建立減法與乘法節點",
        "description": "拖入第二個 function 節點，命名為「減一」，內容輸入 msg.payload = msg.payload - 1; return msg;，輸出接至 debug 28。拖入第三個 function 節點，命名為「乘四」，內容輸入 msg.payload = msg.payload * 4; return msg;，輸出接至 debug 29。"
      },
      {
        "step": "3. 建立除法與最終輸出節點",
        "description": "拖入第四個 function 節點，命名為「除三」，內容輸入 msg.payload = msg.payload / 3; return msg;。將「除三」的輸出端連接至 debug 26 偵錯節點。"
      },
      {
        "step": "4. 部署並驗證鏈式運算結果",
        "description": "點擊 Deploy 部署，點擊 Inject 觸發按鈕。在右側 Debug 偵錯欄中，將會依序看到中間運算的分流輸出：debug 27 輸出 13 (11+2)、debug 28 輸出 12 (13-1)、debug 29 輸出 48 (12*4) 以及最終 debug 26 輸出 16 (48/3)，驗證數據鏈式傳遞無誤。"
      }
    ],
    "applications": [
      {
        "scenario": "機電整合丙級",
        "icon": "fa-solid fa-gears",
        "description": "在丙級送料與裝配術科系統中，讀取旋轉工作盤或輸送帶感測器的脈衝數據後，需要將其轉換為實體工件移動角度或距離。可在 Function 中採用鏈式結構：先將脈衝數乘以齒比，減去歸零偏置值，最後除以單位係數。以最直覺的資料管道方式，輸出精準的角度數值至 SCADA 人機界面展示。"
      },
      {
        "scenario": "台積電工業務聯網",
        "icon": "fa-solid fa-microchip",
        "description": "半導體廠房環境監控系統 (FMCS) 中 Raw Data 數據校正。設備傳回的 4-20mA 電流原始訊號，在 Node-RED Function 鏈中先減去偏置 4mA，乘上轉換係數得到對應壓力，再除以大氣壓單位，最終傳送出標準物理量數值，寫入大數據庫進行 OEE 分析。"
      },
      {
        "scenario": "家庭物流網",
        "icon": "fa-solid fa-truck-ramp-box",
        "description": "智慧家庭能耗度數與階梯式電費累加計算。智慧電表讀取當前的瓦特數後，於鏈式 Function 中依序執行：除以 1000 換算為千瓦小時（度），乘以對應的時間與夏季電價費率，最後加上公攤基本電費。此管道式流程能以最清晰的方式計算出當日電費，傳入首頁訪客計數看板或 Dashboard 展示。"
      }
    ],
    "aiPrompt": "請幫我寫出一段 Node-RED 流程 JSON，用於進行鏈式四則運算：\n1. 包含一個 Inject 節點，Payload 發送數字 11。\n2. 依序接上四個 Function 節點，功能分別為「加二」(payload+2)、「減一」(payload-1)、「乘四」(payload*4) 和「除三」(payload/3)。\n3. 每個 Function 節點的輸出端，除了連到下一個運算節點外，也分別分流連接到一個 Debug 節點 (依序命名為 debug 27, debug 28, debug 29, debug 26)，以便我在 Debug 視窗觀看每一步的鏈式算術運算值。\n請以 JSON 陣列格式回傳。",
    "nodeRedJson": [
      {
        "id": "n-inject-arith-11",
        "type": "inject",
        "z": "tab_arithmetic",
        "name": "11",
        "props": [
          {
            "p": "payload"
          }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "11",
        "payloadType": "num",
        "x": 100,
        "y": 120,
        "wires": [
          [
            "n-func-add2"
          ]
        ]
      },
      {
        "id": "n-func-add2",
        "type": "function",
        "z": "tab_arithmetic",
        "name": "加二",
        "func": "msg.payload = msg.payload + 2;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 250,
        "y": 120,
        "wires": [
          [
            "n-debug-27",
            "n-func-sub1"
          ]
        ]
      },
      {
        "id": "n-debug-27",
        "type": "debug",
        "z": "tab_arithmetic",
        "name": "debug 27",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 270,
        "y": 200,
        "wires": []
      },
      {
        "id": "n-func-sub1",
        "type": "function",
        "z": "tab_arithmetic",
        "name": "減一",
        "func": "msg.payload = msg.payload - 1;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 410,
        "y": 120,
        "wires": [
          [
            "n-debug-28",
            "n-func-mul4"
          ]
        ]
      },
      {
        "id": "n-debug-28",
        "type": "debug",
        "z": "tab_arithmetic",
        "name": "debug 28",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 430,
        "y": 200,
        "wires": []
      },
      {
        "id": "n-func-mul4",
        "type": "function",
        "z": "tab_arithmetic",
        "name": "乘四",
        "func": "msg.payload = msg.payload * 4;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 120,
        "wires": [
          [
            "n-debug-29",
            "n-func-div3"
          ]
        ]
      },
      {
        "id": "n-debug-29",
        "type": "debug",
        "z": "tab_arithmetic",
        "name": "debug 29",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 590,
        "y": 200,
        "wires": []
      },
      {
        "id": "n-func-div3",
        "type": "function",
        "z": "tab_arithmetic",
        "name": "除三",
        "func": "msg.payload = msg.payload / 3;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 120,
        "wires": [
          [
            "n-debug-26"
          ]
        ]
      },
      {
        "id": "n-debug-26",
        "type": "debug",
        "z": "tab_arithmetic",
        "name": "debug 26",
        "active": true,
        "tosidebar": true,
        "console": false,
        "complete": "payload",
        "x": 890,
        "y": 120,
        "wires": []
      }
    ],
    "references": [
      {
        "title": "Node-RED 官方 Docs - Function 節點使用說明與 JS 寫法",
        "url": "https://nodered.org/docs/user-guide/writing-functions"
      },
      {
        "title": "w3schools - JavaScript 算術運算與變數計算規格說明",
        "url": "https://www.w3schools.com/js/js_arithmetic.asp"
      }
    ]
  }
];