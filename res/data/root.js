echoLiveSystem.registry.init([
    {
        name: 'border_style',
        unique_key: 'name',
        default_data: {
            name: undefined,
            value: undefined
        }
    }, {
        name: 'font_weight',
        unique_key: 'name',
        default_data: {
            name: undefined,
            value: undefined
        }
    }, {
        name: 'icon',
        unique_key: 'name',
        default_data: {
            name: 'missingno',
            content: ''
        }
    }, {
        name: 'language',
        unique_key: 'lang.code_iso_639_3',
        default_data: {
            lang: {
                code_iso_639_3: 'zho-Hans',
                code_ietf: 'zh-Hans',
                title: 'missingno'
            }
        }
    }, {
        name: 'language_index',
        unique_key: 'code',
        default_data: {
            code: 'zho-Hans',
            code_ietf: 'zh-Hans',
            title: 'missingno',
            url: 'missingno.js'
        }
    }, {
        name: 'moji_theme',
        unique_key: 'name',
        default_data: {
            name: undefined,
            title: 'missingno',
            description: '',
            style: undefined,
            script: undefined
        }
    }, {
        name: 'message_in_effect',
        unique_key: 'name',
        default_data: {
            name: undefined,
            value: undefined,
            hidden: false
        }
    }, {
        name: 'message_out_effect',
        unique_key: 'name',
        default_data: {
            name: undefined,
            value: undefined,
            hidden: false
        }
    }, {
        name: 'random_method',
        unique_key: 'name',
        default_data: {
            name: undefined,
            value: undefined
        }
    }, {
        name: 'script',
        unique_key: 'name',
        default_data: {
            name: undefined,
            path: undefined,
            page: 'all'
        }
    }, {
        name: 'settings_data'
    }, {
        name: 'stylesheet',
        unique_key: 'name',
        default_data: {
            name: undefined,
            path: undefined,
            page: 'all'
        }
    }, {
        name: 'system'
    }, {
        name: 'text_style',
        unique_key: 'name',
        default_data: {
            name: undefined,
            is_style: false,
            custom_style: false,
            class: undefined,
            style: undefined
        }
    }, {
        name: 'timing_function',
        unique_key: 'name',
        default_data: {
            name: undefined,
            value: undefined
        }
    }
]);