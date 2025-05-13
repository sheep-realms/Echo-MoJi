const lang_zho_Hans = {
    lang: {
        code_iso_639_3: "zho-Hans",
        code_ietf: "zh-Hans",
        title: "简体中文"
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
        confirm: "确定",
        cancel: "取消",
        ok: "好",
        yes: "是",
        no: "否",
        save: "保存",
        save_as: "另存为",
        staging: "暂存",
        close: "关闭",
        off: "关闭",
        on: "开启",
        disable: "禁用",
        enable: "启用",
        enable_all: "全部启用",
        edit: "编辑",
        send: "发送",
        reset: "重置",
        clear: "清空",
        delete: "删除",
        undo: "撤销",
        input: "输入",
        output: "输出",
        import: "导入",
        export: "导出",
        re_export: "重新导出",
        more_info: "了解详情",
        add: "添加",
        remove: "移除",
        move_up: "上移",
        move_down: "下移",
        move_left: "左移",
        move_right: "右移",
        audition: "试听",
        download: "下载",
        search: "搜索",
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
        none: "无",
        solid: "实线",
        dashed: "虚线",
        dotted: "点线",
        double: "双实线",
        groove: "凹槽",
        ridge: "凸脊",
        inset: "嵌入",
        outset: "突出"
    },
    config: {
        data_version: {
            _title: "数据版本",
            _description: "配置文件的数据版本。"
        },
        search: {
            _title: "搜索",
            _description: "搜索所有配置项",
            label: {
                search: "搜索配置项"
            },
            aria_label: {
                result: "搜索结果{index}：{title}",
                result_has_group: "搜索结果{index}：{group}，{title}"
            }
        },
        global: {
            _title: "全局",
            _description: "一些影响全局的设置",
            language: {
                _title: "界面语言",
                _description: "后台页面的界面语言。"
            },
            color_scheme: {
                _title: "后台配色方案",
                _description: "控制后台界面的配色。",
                _value: {
                    auto: "跟随系统",
                    dark: "深色",
                    light: "浅色"
                }
            },
            touchscreen_layout: {
                _title: "启用触屏布局",
                _description: "使用更大尺寸的布局以方便触屏操作。"
            },
            controller_layout_reverse: {
                _title: "反转控制器按钮布局",
                _description: "根据阅读方向将重要按钮放置于最先被阅读的位置。"
            },
            thin_scrollbar: {
                _title: "启用细滚动条",
                _description: "使用较细的滚动条替换默认滚动条。"
            }
        },
        echomoji: {
            _title: "Echo-MoJi",
            _description: "Echo-MoJi 相关配置",
            style: {
                _title: "主题样式",
                _description: "设置跑马灯的样式",
                theme: {
                    _title: "跑马灯主题",
                    _description: "留空则使用全局主题。为了主题样式的表现正常，请在 OBS 选中跑马灯，右键，在弹出菜单中找到 “混合方式”，选择 “关闭 sRGB”。"
                },
                theme_script_enable: {
                    _title: "启用跑马灯主题脚本",
                    _description: "一些高级效果可能需要启用主题脚本才能正常使用。目前所有预制主题均不包含脚本。<br>脚本中可以执行任意代码，请谨慎安装需要您启用脚本的第三方主题。"
                },
                text_color: {
                    _title: "文本颜色",
                    _description: "跑马灯的文本颜色，留空则使用主题设定。<br>支持 HEX、RGB、HSL 等颜色格式，例如 #66CCFF、rgb(102, 204, 255)。"
                },
                background_color: {
                    _title: "背景颜色",
                    _description: "跑马灯的背景颜色，留空则使用主题设定。<br>支持格式同上。"
                },
                font_size: {
                    _title: "字号",
                    _description: "跑马灯的字号，留空则使用主题设定。<br>支持 px、em、rem 等单位，例如 16px、1.5em。",
                },
                font_weight: {
                    _title: "字重",
                    _description: "跑马灯的字重，留空则使用主题设定。"
                },
                font_family: {
                    _title: "字体",
                    _description: "跑马灯的字体。<br>多个字体用空格分隔，包含空格的字体名称请用引号<code>'</code>包裹。"
                }
            },
            message: {
                _title: "消息",
                _description: "调整跑马灯消息的属性",
                duration: {
                    _title: "消息持续时间",
                    _description: "每一条消息显示的时间。"
                },
                random_method: {
                    _title: "消息随机方式",
                    _description: "控制随机抽取消息的细节。<br>- 平均随机：每条消息的出现概率相同。<br>- 加权随机：每条消息的出现概率与其权重成正比，每次抽取将为所有未抽中的消息增加权重，抽中的消息重置权重。"
                },
                random_weight_init: {
                    _title: "随机权重初始值",
                    _description: "每条消息的初始权重。"
                },
                random_weight_step: {
                    _title: "随机权重步进值",
                    _description: "每次抽取时未抽中的消息的权重增加值。"
                },
                random_weight_reset_negative_rate: {
                    _title: "随机权重负向重置比率",
                    _description: "被抽中消息的权重按消息总数比率重置为负值。权重小于等于 0 的消息无法被抽中。<br>注意：当此值大于 0.5 时，可能会出现消息被抽完的情况。"
                },
                allow_variable: {
                    _title: "允许使用变量",
                    _description: "启用后，可以在消息文本中通过变量占位符来使用变量。<br>变量占位符的格式为 <code>{{{变量名}}}</code>、<code>{{{变量名\\|默认值}}}</code>。当变量不存在时将使用默认值，如未指定默认值则保留占位符原文。"
                }
            },
            message_in_effect: {
                _title: "消息入场动效",
                _description: "消息进入时所使用的动画效果",
                name: {
                    _title: "动效名称",
                    _description: "所使用的动效名称。"
                },
                duration: {
                    _title: "动效用时",
                    _description: "播放动画所需时间。"
                },
                scale: {
                    _title: "动效规模乘数",
                    _description: "动画的运动幅度乘数。"
                },
                timing_function: {
                    _title: "动效时间曲线",
                    _description: "动画在不同时间段的运动速度。"
                }
            },
            message_out_effect: {
                _title: "消息离去动效",
                _description: "消息离去时所使用的动画效果",
                name: {
                    _title: "动效名称",
                    _description: "所使用的动效名称。"
                },
                duration: {
                    _title: "动效用时",
                    _description: "播放动画所需时间。"
                },
                scale: {
                    _title: "动效规模乘数",
                    _description: "动画的运动幅度乘数。"
                },
                timing_function: {
                    _title: "动效时间曲线",
                    _description: "动画在不同时间段的运动速度。"
                }
            }
        },
        accessibility: {
            _title: "可访问性",
            _description: "可访问性相关配置",
            font_size: {
                _title: "字体大小",
                _description: "调整后台页面文本的字体大小。",
                small: "小",
                middle: "适中",
                large: "大",
                extra_large: "特大",
                example_1: "你的爱还不够啊！",
                example_2: "我对普通的人类没有兴趣！",
            },
            unlock_page_width: {
                _title: "解锁页面宽度",
                _description: "不再限制页面内容宽度，这可以优化在较大字体布局下的显示效果。"
            },
            high_contrast: {
                _title: "启用高对比度",
                _description: "提高后台页面的对比度，并对焦点元素显示高亮边框。"
            },
            high_contrast_outline_color: {
                _title: "焦点高亮边框颜色",
                _description: "焦点元素将会显示一个醒目边框。此配置可更改其颜色。"
            },
            high_contrast_outline_size: {
                _title: "焦点高亮边框尺寸",
                _description: "焦点元素边框的宽度。"
            },
            high_contrast_outline_style: {
                _title: "焦点高亮边框样式",
                _description: "焦点元素边框的样式。"
            },
            protanopia_and_deuteranopia: {
                _title: "红绿色盲",
                _description: "绿色（安全）功能色会以蓝色（通用）代替，以便和功能差异较大的黄色（警告）和红色（危险）作出区分。"
            },
            link_underline: {
                _title: "总是显示链接下划线",
                _description: "为链接添加下划线使其更醒目。"
            },
            animation_disable: {
                _title: "禁用动画",
                _description: "禁用所有动画和过渡效果。"
            },
            power_saving_mode: {
                _title: "禁用高开销效果",
                _description: "禁用后台页面所有高性能消耗的画面效果。"
            }
        },
        advanced: {
            _title: "高级设置",
            _description: "一些复杂的设置",
            _warn: "警告：除非您知道您在干什么，否则请不要动这里的设置。",
            settings: {
                _title: "配置文件编辑器",
                _description: "配置文件编辑器的高级设置",
                display_config_key: {
                    _title: "显示配置项键名",
                    _description: "在配置项描述下方显示键名。"
                },
                display_hidden_option: {
                    _title: "显示隐藏选项",
                    _description: "显示一些因特定条件下不可用的或实验性的选项。"
                }
            },
            performance: {
                _title: "性能",
                _description: "调整 Echo-MoJi 的性能优化细节",
                row_search_threshold: {
                    _title: "横向搜索触发阈值",
                    _description: "默认情况下数据检索算法采用垂直搜索，在条件较少时可以优化检索效率。但如果条件数量远高于数据量，检索效率将会降低。<br>当数据量和条件量的比值低于此阈值时，将会触发横向搜索，以降低大量条件带来的性能影响。<br>不过，您真的有这么做的需求吗？"
                }
            }
        },
        extension: {
            _title: "扩展管理器",
            _description: "管理扩展包",
        },
        about: {
            _title: "关于",
            _description: "软件信息",
            about_echomoji: "关于 Echo-MoJi",
            accessibility: "无障碍使用指南",
            bug_tracker: "漏洞追踪",
            community: "社区服务",
            copyright: "授权协议与声明",
            document: "帮助文档",
            feedback: "建议反馈",
            github: "GitHub 项目仓库",
            license: "开源许可证",
            releases: "版本列表",
            security: "安全政策",
            security_advisory_new: "报告安全漏洞",
            social_media: "社交媒体",
            user_guide: "用户指南",
            debug: {
                title: "调试选项",
                console_local_storage: "输出：Local Storage",
                console_registry: "输出：注册表"
            }
        }
    },
    echomoji: {
        init: "跑马灯已载入！"
    },
    effect: {
        message_in: {
            blur_in: "聚焦",
            fade_in: "淡入",
            move_from_down: "从下方移入",
            move_from_up: "从上方移入",
            move_from_left: "从左侧移入",
            move_from_right: "从右侧移入",
            none: "无"
        },
        message_out: {
            blur_out: "失焦",
            fade_out: "淡出",
            move_to_down: "从下方移出",
            move_to_up: "从上方移出",
            move_to_left: "从左侧移出",
            move_to_right: "从右侧移出",
            none: "无"
        }
    },
    file: {
        name: "文件名",
        last_modified_date: "最后修改时间",
        size: "文件大小",
        checker: {
            default_file_loaded: "默认路径中的配置文件已载入",
            empry: "未载入文件",
            state: {
                error: "错误",
                exception: "异常",
                future: "新版",
                loaded: "已载入",
                update: "旧版"
            }
        },
        dropper: {
            title: "文件选择器",
            drop_file_cancel: "不放算了，哼！",
            drop_file_cancel_many: "一位用户反复拖拽文件，这是他的程序发生的变化",
            drop_file_long_time: "你怎么还不放手？",
            drop_file_now: "松开鼠标拖放文件",
            please_click: "点击此处选择文件",
            please_drop_file: "在这里拖放文件或点击此处选择文件",
            please_drop_file_keyboard: "当焦点在此处时，您也可以按下 Enter 或空格键选择文件",
            dialog: {
                many_file: {
                    title: "太多了",
                    description: "处理不了那么多文件，请一个一个来。"
                },
                selected: {
                    title: "已选择文件",
                    description: "文件名：{name}",
                    import_image: "插入图片"
                },
                type_error: {
                    title: "文件类型错误",
                    description: "这似乎并不是我们想要的文件。"
                },
                use_chrome: {
                    title: "建议您使用最新版 Chrome 浏览器",
                    description: "此页面使用了一些最新技术，您的浏览器可能无法支持部分功能。<br>当然您也可以试试 Edge 浏览器。",
                    goto: "获取 Chrome"
                }
            }
        },
        picker: {
            config: "配置文件",
            image: "图片"
        }
    },
    font_weight: {
        bold: "粗体",
        inherit: "继承默认值",
        normal: "适中",
        "100": "淡体",
        "200": "特细",
        "300": "细体",
        "350": "次细",
        "400": "标准",
        "500": "适中",
        "600": "次粗",
        "700": "粗体",
        "800": "特粗",
        "900": "浓体",
        "950": "特浓"
    },
    notice: {
        config_re_output: "已重新导出配置文件内容！",
        config_saved: "配置文件已保存！请注意刷新所有页面使新配置生效。",
        config_saving: "保存中...",
        config_saving_fail: "未授权写入，配置文件未保存。",
        debug_mode: "已启用调试选项！",
        drop_file_cancel_many: "你倒是放啊！",
        open_file_picker_cancel: "已取消选择文件！",
        open_file_picker_fail: {
            title: "打开文件选择器时发生错误",
            message: "这很有可能是因为您当前使用的浏览器不支持此功能。您还可以尝试拖放文件，但还是建议您更换浏览器。"
        },
        open_settings_in_obs: "请在浏览器中打开 settings.html，而不是在 OBS 中！",
        unknown_error: {
            title: "发生了未捕获的错误",
            message: "这应该不是什么意料之中的战术性报错，您可以将此问题反馈给开发者，并提供复现方法。"
        }
    },
    page_title: {
        echomoji: "Echo MoJi",
        settings: "Echo MoJi 配置文件编辑器"
    },
    random_method: {
        average: "平均随机",
        weighted: "加权随机"
    },
    settings: {
        unknown_config_type: "暂不支持修改此配置",
        config_input: {
            config_from_future: {
                title: "配置文件来自未来版本",
                description: "此配置文件来自于未来的 Echo-MoJi，您也许有哪里搞错了。<br>继续加载可能会产生意料之外的问题。",
                load: "继续加载"
            },
            json_parse_fail: {
                title: "无法安全读取配置文件",
                description: "这可能是因为配置文件为早期版本，或是配置文件内容损坏。<br>如果您确定配置文件没有问题，并且没有被植入恶意代码的可能，可以尝试 “不安全读取”。",
                unsafe_load: "不安全读取"
            },
            in_obs: {
                title: "不要在 OBS 中打开此页面",
                description: "这会产生一些意料之外的问题，并且您完全没有必要将这个页面放入 OBS 中。"
            },
            many_file: {
                title: "太多了",
                description: "处理不了那么多文件，请一个一个来。"
            },
            no_json: {
                title: "找不到配置数据",
                description: "无法在此文件中找到配置数据。"
            },
            type_error: {
                title: "文件类型错误",
                description: "这似乎并不是配置文件。"
            },
            unsafe_load_fail: {
                title: "无法读取配置文件",
                description: "看来您的配置文件确实有问题，请检查您的配置文件。"
            },
            update_config: {
                title: "配置文件需要更新",
                description: "此配置文件来自于旧版的 Echo-MoJi，需要更新才能使用。",
                update: "更新"
            },
            update_config_from_unknown_version: {
                title: "未知的配置文件版本",
                description: "此配置文件没有版本号，这并不是一个正常现象。<br>您可以强制升级此配置文件，但并不能保证其正常运作，不建议您继续使用此配置文件。",
                update: "强制更新"
            }
        },
        functional_color: {
            danger: "危险",
            general: "通用",
            safe: "安全",
            special: "特殊",
            warn: "警告"
        },
        label: {
            accessibility_color_card: "参考色卡",
            config_changed: "配置已更改",
            config_output: "导出配置内容"
        },
        msgbox: {
            accessibility: "Echo-MoJi 所有后台页面均支持键盘访问。",
            advanced_settings: "不要随意更改这里的配置，除非您知道您在做什么。"
        },
        tabpage: {
            edit: {
                title: "编辑",
                description: "编辑配置文件 [alt+2]"
            },
            export: {
                title: "导出",
                description: "导出配置文件 [alt+3]"
            },
            import: {
                title: "导入",
                description: "导入配置文件 [alt+1]"
            }
        }
    },
    timing_function: {
        ease: "平滑",
        linear: "线性",
        ease_in: "缓出",
        ease_out: "缓入",
        ease_in_out: "缓入缓出",
        ease_in_sine: "正弦缓出",
        ease_out_sine: "正弦缓入",
        ease_in_out_sine: "正弦缓入缓出",
        ease_in_cubic: "三次方缓出",
        ease_out_cubic: "三次方缓入",
        ease_in_out_cubic: "三次方缓入缓出",
        ease_in_circ: "圆形缓出",
        ease_out_circ: "圆形缓入",
        ease_in_out_circ: "圆形缓入缓出",
        ease_in_back: "回退缓出",
        ease_out_back: "回退缓入",
        ease_in_out_back: "回退缓入缓出"
    },
    window: {
        config_font_size_overload: {
            title: "您是认真的吗？",
            message: "您确定要使用以下配置吗？",
            font_size_review: "字体大小：{value}"
        }
    }
};

echoLiveSystem.registry.setLanguageRegistryValue(lang_zho_Hans);