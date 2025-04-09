const db_config_version = 1;

const db_config_define = [
    {
        name: 'global',
        type: 'object',
        created: 1
    }, {
        name: 'global.language',
        type: 'string',
        default: 'zho-Hans',
        created: 1,
        attribute: {
            datalist: []
        }
    }, {
        name: 'global.color_scheme',
        type: 'string',
        default: 'auto',
        created: 1,
        attribute: {
            datalist: []
        }
    }, {
        name: 'global.touchscreen_layout',
        type: 'boolean',
        default: false,
        created: 1
    }, {
        name: 'global.controller_layout_reverse',
        type: 'boolean',
        default: false,
        created: 1
    }, {
        name: 'global.thin_scrollbar',
        type: 'boolean',
        default: false,
        created: 1
    },



    {
        name: 'echomoji',
        type: 'object',
        created: 1
    }, {
        name: 'echomoji.style',
        type: 'object',
        created: 1
    }, {
        name: 'echomoji.style.theme',
        type: 'string',
        default: 'vanilla',
        created: 1,
        attribute: {
            datalist: []
        }
    }, {
        name: 'echomoji.style.theme_script_enable',
        type: 'boolean',
        default: false,
        created: 1
    }, {
        name: 'echomoji.style.text_color',
        type: 'string',
        default: '',
        created: 1
    }, {
        name: 'echomoji.style.background_color',
        type: 'string',
        default: '',
        created: 1
    }, {
        name: 'echomoji.style.font_size',
        type: 'string',
        default: '38px',
        created: 1
    }, {
        name: 'echomoji.style.font_weight',
        type: 'string',
        default: 'inherit',
        created: 1,
        attribute: {
            datalist: []
        }
    }, {
        name: 'echomoji.message',
        type: 'object',
        created: 1
    }, {
        name: 'echomoji.message.duration',
        type: 'number',
        default: 10000,
        created: 1,
        unit: 'ms',
        attribute: {
            min: 1000,
            step: 500
        }
    }, {
        name: 'echomoji.message.random_method',
        type: 'string',
        default: 'weighted',
        created: 1,
        attribute: {
            datalist: []
        }
    }, {
        name: 'echomoji.message.random_weight_init',
        type: 'number',
        default: 1,
        created: 1,
        attribute: {
            min: 1
        },
        conditions: [
            {
                name: 'echomoji.message.random_method',
                value: 'weighted'
            }
        ]
    }, {
        name: 'echomoji.message.random_weight_step',
        type: 'number',
        default: 1,
        created: 1,
        attribute: {
            min: 0
        },
        conditions: [
            {
                name: 'echomoji.message.random_method',
                value: 'weighted'
            }
        ]
    }, {
        name: 'echomoji.message.random_weight_reset_negative_rate',
        type: 'number',
        default: 0.35,
        created: 1,
        attribute: {
            min: 0,
            max: 1,
            step: 0.05
        },
        conditions: [
            {
                name: 'echomoji.message.random_method',
                value: 'weighted'
            }
        ]
    }, {
        name: 'echomoji.message_in_effect',
        type: 'object',
        created: 1
    }, {
        name: 'echomoji.message_in_effect.name',
        type: 'string',
        default: 'fade',
        created: 1,
        attribute: {
            datalist: []
        }
    }, {
        name: 'echomoji.message_in_effect.duration',
        type: 'number',
        default: 150,
        created: 1,
        unit: 'ms',
        attribute: {
            min: 0,
            step: 50
        }
    }, {
        name: 'echomoji.message_in_effect.scale',
        type: 'number',
        default: 1,
        created: 1,
        attribute: {
            min: 0,
            step: 0.25
        }
    }, {
        name: 'echomoji.message_in_effect.timing_function',
        type: 'string',
        default: 'ease-out',
        created: 1,
        attribute: {
            datalist: []
        }
    }, {
        name: 'echomoji.message_out_effect',
        type: 'object',
        created: 1
    }, {
        name: 'echomoji.message_out_effect.name',
        type: 'string',
        default: 'fade',
        created: 1,
        attribute: {
            datalist: []
        }
    }, {
        name: 'echomoji.message_out_effect.duration',
        type: 'number',
        default: 150,
        created: 1,
        unit: 'ms',
        attribute: {
            min: 0,
            step: 50
        }
    }, {
        name: 'echomoji.message_out_effect.scale',
        type: 'number',
        default: 1,
        created: 1,
        attribute: {
            min: 0,
            step: 0.25
        }
    }, {
        name: 'echomoji.message_out_effect.timing_function',
        type: 'string',
        default: 'ease-in',
        created: 1,
        attribute: {
            datalist: []
        }
    },



    {
        name: 'accessibility',
        type: 'object',
        created: 1
    }, {
        name: 'accessibility.font_size',
        type: 'special.fontsize',
        default: 16,
        from: 'accessible.font_size',
        created: 1
    }, {
        name: 'accessibility.unlock_page_width',
        type: 'boolean',
        default: false,
        from: 'accessible.unlock_page_width',
        created: 1
    }, {
        name: 'accessibility.high_contrast',
        type: 'boolean',
        default: false,
        from: 'accessible.high_contrast',
        created: 1
    }, {
        name: 'accessibility.high_contrast_outline_color',
        type: 'string',
        default: '#00E9FF',
        from: 'accessible.high_contrast_outline_color',
        created: 1,
        conditions: [
            {
                name: 'accessibility.high_contrast',
                value: true
            }
        ]
    }, {
        name: 'accessibility.high_contrast_outline_size',
        type: 'string',
        default: '2px',
        from: 'accessible.high_contrast_outline_size',
        created: 1,
        conditions: [
            {
                name: 'accessibility.high_contrast',
                value: true
            }
        ]
    }, {
        name: 'accessibility.high_contrast_outline_style',
        type: 'string',
        default: 'solid',
        from: 'accessible.high_contrast_outline_style',
        created: 1,
        attribute: {
            datalist: [
                {
                    value: 'solid'
                }, {
                    value: 'dotted'
                }, {
                    value: 'dashed'
                }, {
                    value: 'double'
                }
            ]
        },
        conditions: [
            {
                name: 'accessibility.high_contrast',
                value: true
            }
        ]
    }, {
        name: 'accessibility.protanopia_and_deuteranopia',
        type: 'boolean',
        default: false,
        from: 'accessible.drotanopia_and_deuteranopia',
        created: 1
    }, {
        name: 'accessibility.link_underline',
        type: 'boolean',
        default: false,
        from: 'accessible.link_underline',
        created: 1
    }, {
        name: 'accessibility.animation_disable',
        type: 'boolean',
        default: false,
        from: 'accessible.animation_disable',
        created: 1
    }, {
        name: 'accessibility.power_saving_mode',
        type: 'boolean',
        default: false,
        from: 'accessible.power_saving_mode',
        created: 1
    },



    {
        name: 'advanced',
        type: 'object',
        created: 1
    }, {
        name: 'advanced.settings',
        type: 'object',
        created: 1
    }, {
        name: 'advanced.settings.display_config_key',
        type: 'boolean',
        default: false,
        created: 1
    }, {
        name: 'advanced.settings.display_hidden_option',
        type: 'boolean',
        default: false,
        created: 1
    }, {
        name: 'advanced.performance',
        type: 'object',
        created: 1
    }, {
        name: 'advanced.performance.row_search_threshold',
        type: 'number',
        default: 1,
        created: 1,
        attribute: {
            min: 0
        }
    }
];