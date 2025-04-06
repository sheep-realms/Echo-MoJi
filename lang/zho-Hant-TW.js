const lang_zho_Hant_TW = {
    lang: {
        code_iso_639_3: "zho-Hant-TW",
        code_ietf: "zh-Hant-TW",
        title: "繁體中文（臺灣地區）"
    },
    localization: {
        bracket: "（{text}）",
        comma: "，",
        date_common: "{y}-{MM}-{dd}",
        date_time_common: "{y}-{MM}-{dd} {hh}:{mm}:{ss}",
        date: "{y} 年 {M} 月 {d} 日",
        date_pad_zero: "{y} 年 {MM} 月 {dd} 日",
        date_time: "{y} 年 {M} 月 {d} 日 {h}:{m}:{s}",
        date_time_pad_zero: "{y} 年 {MM} 月 {dd} 日 {hh}:{mm}:{ss}",
        time_common: "{hh}:{mm}:{ss}",
    },
    ui: {
        confirm: "確定",
        cancel: "取消",
        ok: "好",
        yes: "是",
        no: "否",
        save: "儲存",
        save_as: "另存為",
        staging: "暫存",
        close: "關閉",
        off: "關閉",
        on: "開啟",
        disable: "禁用",
        enable: "啟用",
        enable_all: "全部啟用",
        edit: "編輯",
        send: "傳送",
        reset: "重置",
        clear: "清空",
        delete: "刪除",
        undo: "撤銷",
        input: "輸入",
        output: "輸出",
        import: "匯入",
        export: "匯出",
        re_export: "重新匯出",
        more_info: "瞭解詳情",
        add: "新增",
        remove: "移除",
        move_up: "上移",
        move_down: "下移",
        move_left: "左移",
        move_right: "右移",
        audition: "試聽",
        download: "下載",
        search: "搜尋",
        empty: "（空）",
        missingno: {
            no_author: "未署名",
            no_name: "未命名"
        }
    },
    unit: {
        ms: "毫秒",
        sec: "秒"
    },
    border_style: {
        none: "無",
        solid: "實線",
        dashed: "虛線",
        dotted: "點線",
        double: "雙實線",
        groove: "凹槽",
        ridge: "凸脊",
        inset: "嵌入",
        outset: "突出"
    },
    config: {
        data_version: {
            _title: "資料版本",
            _description: "配置檔案的資料版本。"
        },
        search: {
            _title: "搜尋",
            _description: "搜尋所有配置項",
            label: {
                search: "搜尋配置項"
            },
            aria_label: {
                result: "搜尋結果{index}：{title}",
                result_has_group: "搜尋結果{index}：{group}，{title}"
            }
        },
        global: {
            _title: "全域性",
            _description: "一些影響全域性的設定",
            language: {
                _title: "介面語言",
                _description: "後臺頁面的介面語言。"
            },
            color_scheme: {
                _title: "後臺配色方案",
                _description: "控制後臺介面的配色。",
                _value: {
                    auto: "跟隨系統",
                    dark: "深色",
                    light: "淺色"
                }
            },
            touchscreen_layout: {
                _title: "啟用觸屏佈局",
                _description: "使用更大尺寸的佈局以方便觸屏操作。"
            },
            controller_layout_reverse: {
                _title: "反轉控制器按鈕佈局",
                _description: "根據閱讀方向將重要按鈕放置於最先被閱讀的位置。"
            },
            thin_scrollbar: {
                _title: "啟用細捲軸",
                _description: "使用較細的捲軸替換預設捲軸。"
            }
        },
        echomoji: {
            _title: "Echo-MoJi",
            _description: "Echo-MoJi 相關配置",
            style: {
                _title: "主題樣式",
                _description: "設定跑馬燈的樣式",
                theme: {
                    _title: "跑馬燈主題",
                    _description: "留空則使用全域性主題。為了主題樣式的表現正常，請在 OBS 選中跑馬燈，右鍵，在彈出選單中找到 “混合方式”，選擇 “關閉 sRGB”。"
                },
                theme_script_enable: {
                    _title: "啟用跑馬燈主題指令碼",
                    _description: "一些高階效果可能需要啟用主題指令碼才能正常使用。目前所有預製主題均不包含指令碼。<br>指令碼中可以執行任意程式碼，請謹慎安裝需要您啟用指令碼的第三方主題。"
                },
                font_weight: {
                    _title: "預設字重",
                    _description: "跑馬燈的預設字重，可被主題的樣式設定或訊息格式覆蓋。"
                }
            },
            message: {
                _title: "訊息",
                _description: "調整跑馬燈訊息的屬性",
                duration: {
                    _title: "訊息持續時間",
                    _description: "每一條訊息顯示的時間。"
                },
                random_method: {
                    _title: "訊息隨機方式",
                    _description: "控制隨機抽取訊息的細節。<br>- 平均隨機：每條訊息的出現機率相同。<br>- 加權隨機：每條訊息的出現機率與其權重成正比，每次抽取將為所有未抽中的訊息增加權重，抽中的訊息重置權重。"
                },
                random_weight_init: {
                    _title: "隨機權重初始值",
                    _description: "每條訊息的初始權重。"
                },
                random_weight_step: {
                    _title: "隨機權重步進值",
                    _description: "每次抽取時未抽中的訊息的權重增加值。"
                },
                random_weight_reset_negative_rate: {
                    _title: "隨機權重負向重置比率",
                    _description: "被抽中訊息的權重按訊息總數比率重置為負值。權重小於等於 0 的訊息無法被抽中。<br>注意：當此值大於 0.5 時，會出現訊息被抽完的情況。"
                }
            },
            next_effect: {
                _title: "訊息切換動效",
                _description: "切換訊息時所使用的動畫效果",
                name: {
                    _title: "動效名稱",
                    _description: "所使用的動效名稱。"
                },
                duration: {
                    _title: "動效用時",
                    _description: "播放動畫所需時間。"
                },
                scale: {
                    _title: "動效規模乘數",
                    _description: "動畫的運動幅度乘數。"
                },
                timing_function_in: {
                    _title: "動效時間曲線（進入）",
                    _description: "動畫在不同時間段的運動速度。"
                },
                timing_function_out: {
                    _title: "動效時間曲線（離去）",
                    _description: "動畫在不同時間段的運動速度。"
                }
            }
        },
        accessibility: {
            _title: "可訪問性",
            _description: "可訪問性相關配置",
            font_size: {
                _title: "字型大小",
                _description: "調整後臺頁面文字的字型大小。",
                small: "小",
                middle: "適中",
                large: "大",
                extra_large: "特大",
                example_1: "你的愛還不夠啊！",
                example_2: "我對普通的人類沒有興趣！",
            },
            unlock_page_width: {
                _title: "解鎖頁面寬度",
                _description: "不再限制頁面內容寬度，這可以最佳化在較大字型佈局下的顯示效果。"
            },
            high_contrast: {
                _title: "啟用高對比度",
                _description: "提高後臺頁面的對比度，並對焦點元素顯示高亮邊框。"
            },
            high_contrast_outline_color: {
                _title: "焦點高亮邊框顏色",
                _description: "焦點元素將會顯示一個醒目邊框。此配置可更改其顏色。"
            },
            high_contrast_outline_size: {
                _title: "焦點高亮邊框尺寸",
                _description: "焦點元素邊框的寬度。"
            },
            high_contrast_outline_style: {
                _title: "焦點高亮邊框樣式",
                _description: "焦點元素邊框的樣式。"
            },
            protanopia_and_deuteranopia: {
                _title: "紅綠色盲",
                _description: "綠色（安全）功能色會以藍色（通用）代替，以便和功能差異較大的黃色（警告）和紅色（危險）作出區分。"
            },
            link_underline: {
                _title: "總是顯示連結下劃線",
                _description: "為連結新增下劃線使其更醒目。"
            },
            animation_disable: {
                _title: "禁用動畫",
                _description: "禁用所有動畫和過渡效果。"
            },
            power_saving_mode: {
                _title: "禁用高開銷效果",
                _description: "禁用後臺頁面所有高效能消耗的畫面效果。"
            }
        },
        advanced: {
            _title: "高階設定",
            _description: "一些複雜的設定",
            _warn: "警告：除非您知道您在幹什麼，否則請不要動這裡的設定。",
            settings: {
                _title: "配置檔案編輯器",
                _description: "配置檔案編輯器的高階設定",
                display_config_key: {
                    _title: "顯示配置項鍵名",
                    _description: "在配置項描述下方顯示鍵名。"
                },
                display_hidden_option: {
                    _title: "顯示隱藏選項",
                    _description: "顯示一些因特定條件下不可用的或實驗性的選項。"
                }
            },
            performance: {
                _title: "效能",
                _description: "調整 Echo-MoJi 的效能最佳化細節",
                row_search_threshold: {
                    _title: "橫向搜尋觸發閾值",
                    _description: "預設情況下資料檢索演算法採用垂直搜尋，在條件較少時可以最佳化檢索效率。但如果條件數量遠高於資料量，檢索效率將會降低。<br>當資料量和條件量的比值低於此閾值時，將會觸發橫向搜尋，以降低大量條件帶來的效能影響。<br>不過，您真的有這麼做的需求嗎？"
                }
            }
        },
        extension: {
            _title: "擴充套件管理器",
            _description: "管理擴充套件包",
        },
        about: {
            _title: "關於",
            _description: "軟體資訊",
            about_echomoji: "關於 Echo-MoJi",
            accessibility: "無障礙使用指南",
            bug_tracker: "漏洞追蹤",
            community: "社羣服務",
            copyright: "授權協議與宣告",
            document: "幫助文件",
            feedback: "建議反饋",
            github: "GitHub 專案倉庫",
            license: "開源許可證",
            releases: "版本列表",
            security: "安全政策",
            security_advisory_new: "報告安全漏洞",
            social_media: "社交媒體",
            user_guide: "使用者指南",
            debug: {
                title: "除錯選項",
                console_local_storage: "輸出：Local Storage",
                console_registry: "輸出：登錄檔"
            }
        }
    },
    echomoji: {
        init: "跑馬燈已載入！"
    },
    effect: {
        next: {
            blur: "聚焦",
            fade: "淡出淡入",
            move_from_down: "從下方移入",
            move_from_up: "從上方移入",
            none: "無"
        }
    },
    file: {
        name: "檔名",
        last_modified_date: "最後修改時間",
        size: "檔案大小",
        checker: {
            default_file_loaded: "預設路徑中的配置檔案已載入",
            empry: "未載入檔案",
            state: {
                error: "錯誤",
                exception: "異常",
                future: "新版",
                loaded: "已載入",
                update: "舊版"
            }
        },
        dropper: {
            title: "檔案選擇器",
            drop_file_cancel: "不放算了，哼！",
            drop_file_cancel_many: "一位使用者反覆拖拽檔案，這是他的程式發生的變化",
            drop_file_long_time: "你怎麼還不放手？",
            drop_file_now: "鬆開滑鼠拖放檔案",
            please_click: "點選此處選擇檔案",
            please_drop_file: "在這裡拖放檔案或點選此處選擇檔案",
            please_drop_file_keyboard: "當焦點在此處時，您也可以按下 Enter 或空格鍵選擇檔案",
            dialog: {
                many_file: {
                    title: "太多了",
                    description: "處理不了那麼多檔案，請一個一個來。"
                },
                selected: {
                    title: "已選擇檔案",
                    description: "檔名：{name}",
                    import_image: "插入圖片"
                },
                type_error: {
                    title: "檔案型別錯誤",
                    description: "這似乎並不是我們想要的檔案。"
                },
                use_chrome: {
                    title: "建議您使用最新版 Chrome 瀏覽器",
                    description: "此頁面使用了一些最新技術，您的瀏覽器可能無法支援部分功能。<br>當然您也可以試試 Edge 瀏覽器。",
                    goto: "獲取 Chrome"
                }
            }
        },
        picker: {
            config: "配置檔案",
            image: "圖片"
        }
    },
    font_weight: {
        bold: "粗體",
        inherit: "繼承預設值",
        normal: "適中",
        "100": "淡體",
        "200": "特細",
        "300": "細體",
        "350": "次細",
        "400": "標準",
        "500": "適中",
        "600": "次粗",
        "700": "粗體",
        "800": "特粗",
        "900": "濃體",
        "950": "特濃"
    },
    notice: {
        config_re_output: "已重新匯出配置檔案內容！",
        config_saved: "配置檔案已儲存！請注意重新整理所有頁面使新配置生效。",
        config_saving: "儲存中...",
        config_saving_fail: "未授權寫入，配置檔案未儲存。",
        debug_mode: "已啟用除錯選項！",
        drop_file_cancel_many: "你倒是放啊！",
        open_file_picker_cancel: "已取消選擇檔案！",
        open_file_picker_fail: {
            title: "開啟檔案選擇器時發生錯誤",
            message: "這很有可能是因為您當前使用的瀏覽器不支援此功能。您還可以嘗試拖放檔案，但還是建議您更換瀏覽器。"
        },
        open_settings_in_obs: "請在瀏覽器中開啟 settings.html，而不是在 OBS 中！",
        unknown_error: {
            title: "發生了未捕獲的錯誤",
            message: "這應該不是什麼意料之中的戰術性報錯，您可以將此問題反饋給開發者，並提供復現方法。"
        }
    },
    page_title: {
        echomoji: "Echo MoJi",
        settings: "Echo MoJi 配置檔案編輯器"
    },
    random_method: {
        average: "平均隨機",
        weighted: "加權隨機"
    },
    settings: {
        unknown_config_type: "暫不支援修改此配置",
        config_input: {
            config_from_future: {
                title: "配置檔案來自未來版本",
                description: "此配置檔案來自於未來的 Echo-MoJi，您也許有哪裡搞錯了。<br>繼續載入可能會產生意料之外的問題。",
                load: "繼續載入"
            },
            json_parse_fail: {
                title: "無法安全讀取配置檔案",
                description: "這可能是因為配置檔案為早期版本，或是配置檔案內容損壞。<br>如果您確定配置檔案沒有問題，並且沒有被植入惡意程式碼的可能，可以嘗試 “不安全讀取”。",
                unsafe_load: "不安全讀取"
            },
            in_obs: {
                title: "不要在 OBS 中開啟此頁面",
                description: "這會產生一些意料之外的問題，並且您完全沒有必要將這個頁面放入 OBS 中。"
            },
            many_file: {
                title: "太多了",
                description: "處理不了那麼多檔案，請一個一個來。"
            },
            no_json: {
                title: "找不到配置資料",
                description: "無法在此檔案中找到配置資料。"
            },
            type_error: {
                title: "檔案型別錯誤",
                description: "這似乎並不是配置檔案。"
            },
            unsafe_load_fail: {
                title: "無法讀取配置檔案",
                description: "看來您的配置檔案確實有問題，請檢查您的配置檔案。"
            },
            update_config: {
                title: "配置檔案需要更新",
                description: "此配置檔案來自於舊版的 Echo-MoJi，需要更新才能使用。",
                update: "更新"
            },
            update_config_from_unknown_version: {
                title: "未知的配置檔案版本",
                description: "此配置檔案沒有版本號，這並不是一個正常現象。<br>您可以強制升級此配置檔案，但並不能保證其正常運作，不建議您繼續使用此配置檔案。",
                update: "強制更新"
            }
        },
        functional_color: {
            danger: "危險",
            general: "通用",
            safe: "安全",
            special: "特殊",
            warn: "警告"
        },
        label: {
            accessibility_color_card: "參考色卡",
            config_changed: "配置已更改",
            config_output: "匯出配置內容"
        },
        msgbox: {
            accessibility: "Echo-MoJi 所有後臺頁面均支援鍵盤訪問。",
            advanced_settings: "不要隨意更改這裡的配置，除非您知道您在做什麼。"
        },
        tabpage: {
            edit: {
                title: "編輯",
                description: "編輯配置檔案 [alt+2]"
            },
            export: {
                title: "匯出",
                description: "匯出配置檔案 [alt+3]"
            },
            import: {
                title: "匯入",
                description: "匯入配置檔案 [alt+1]"
            }
        }
    },
    timing_function: {
        ease: "平滑",
        linear: "線性",
        ease_in: "緩出",
        ease_out: "緩入",
        ease_in_out: "緩入緩出",
        ease_in_sine: "正弦緩出",
        ease_out_sine: "正弦緩入",
        ease_in_out_sine: "正弦緩入緩出",
        ease_in_cubic: "三次方緩出",
        ease_out_cubic: "三次方緩入",
        ease_in_out_cubic: "三次方緩入緩出",
        ease_in_circ: "圓形緩出",
        ease_out_circ: "圓形緩入",
        ease_in_out_circ: "圓形緩入緩出",
        ease_in_back: "回退緩出",
        ease_out_back: "回退緩入",
        ease_in_out_back: "回退緩入緩出"
    },
    window: {
        config_font_size_overload: {
            title: "您是認真的嗎？",
            message: "您確定要使用以下配置嗎？",
            font_size_review: "字型大小：{value}"
        }
    }
};

echoLiveSystem.registry.setLanguageRegistryValue(lang_zho_Hant_TW);