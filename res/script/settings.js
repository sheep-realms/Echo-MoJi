/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */

/* ============================================================
 * Echo-MoJi
 * Github: https://github.com/sheep-realms/Echo-MoJi
 * License: GNU General Public License 3.0
 * ============================================================
 */


"use strict";

// 兜底，双重保障
$('.settings-about-footer-var-1').text(navigator.userAgent);

let sysNotice = new SystemNotice();

window.addEventListener("error", (e) => {
    sysNotice.sendTHasTitle('notice.unknown_error', {}, 'fatal');
});

if (config.advanced.settings.display_config_key) $('html').addClass('display-config-key');

let configFileBuffer = '';
let configFileFiltered = '';
let configFileWritableFileHandle = undefined;
let configBuffer = {};

let lastColorScheme = config.global.color_scheme;

let bodyClassCache = '';

const settingsNav = echoLiveSystem.registry.getRegistryValue('settings_data', 'navigation');
const aboutLinks = echoLiveSystem.registry.getRegistryValue('settings_data', 'about_link');

let settingsManager = new SettingsManager(db_config_define);
settingsManager.importConfig(config);

let domContentLoadedTime = 0;

const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        domContentLoadedTime = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
        $('.settings-about-footer-var-5').text(domContentLoadedTime);
    });
});

observer.observe({ type: "navigation", buffered: true });

try {
    speechSynthesis.getVoices();
} catch (error) {}

let easterEggDrop = false;
let logoClick = 0;

let timerSaving = 0;

let uniWindow = new UniverseWindow();



let hasUnsavedConfig = false;
let hasUnsavedConfigToFile = false;
window.addEventListener('beforeunload', function (e) {
    if (hasUnsavedConfig || hasUnsavedConfigToFile) {
        e.preventDefault();
        e.returnValue = '';
    }
});


let configSearchDataFilter = new DataFilter(
    '', 
    [
        {
            name: 'in',
            type: 'string',
            map: {
                value: 'in',
                search: 'in'
            }
        }, {
            name: 'type',
            type: 'string',
            map: {
                value: 'type',
                search: 'type'
            }
        }, {
            name: 'created',
            type: 'number',
            map: {
                value: 'created',
                search: 'created'
            }
        }, {
            name: 'main',
            type: 'string',
            map: {
                value: [
                    'name',
                    'groupTitle',
                    'title',
                    'description'
                ]
            }
        }
    ],
    [],
    () => {
        let configDef = settingsManager.getConfigDefine();
        let data = [];
        let nameSplit;
        let groupTitle = '';
        configDef.forEach(e => {
            if (e.type !== 'object') {
                nameSplit = e.name.split('.');
                groupTitle = '';
                if (nameSplit.length > 2) {
                    groupTitle = $t(`config.${ nameSplit.slice(0, nameSplit.length - 1).join('.') }._title`);
                }
                data.push({
                    name: e.name,
                    title: $t(`config.${ e.name }._title`),
                    description: $t(`config.${ e.name }._description`).replace(/(<\w+\b[^>]*>)|(<\/\w+>)/g, ''),
                    type: e.type,
                    in: nameSplit[0],
                    created: e.created,
                    groupTitle: groupTitle
                });
            }
        });
        return data;
    }
);

const configDataList = [
    {
        data: arr => {
            echoLiveSystem.registry.forEach('language_index', e => {
                arr.push({
                    value: e.code,
                    title: `<span lang="${ e.code_ietf }">${ e.title }</sapn>`
                });
            });
        },
        key: 'global.language'
    }, {
        data: arr => {
            echoLiveSystem.registry.forEach('theme', e => {
                arr.push({
                    title: e.title,
                    value: e.name
                });
            });
        },
        key: 'echomoji.style.theme'
    }, {
        data: [
            { value: 'auto', title: $t('config.global.color_scheme._value.auto') },
            { value: 'light', title: $t('config.global.color_scheme._value.light') },
            { value: 'dark', title: $t('config.global.color_scheme._value.dark') }
        ],
        key: 'global.color_scheme'
    }, {
        data: arr => {
            echoLiveSystem.registry.forEach('message_in_effect', e => {
                if (!e?.hidden || config.advanced.settings.display_hidden_option) arr.push({
                    title: $t(`effect.message_in.${ e.name }`),
                    value: e.value
                });
            });
        },
        key: 'echomoji.message_in_effect.name'
    }, {
        data: arr => {
            echoLiveSystem.registry.forEach('message_out_effect', e => {
                if (!e?.hidden || config.advanced.settings.display_hidden_option) arr.push({
                    title: $t(`effect.message_out.${ e.name }`),
                    value: e.value
                });
            });
        },
        key: 'echomoji.message_out_effect.name'
    }, {
        data: arr => {
            echoLiveSystem.registry.forEach('timing_function', e => {
                arr.push({
                    title: $t(`timing_function.${ e.name }`),
                    value: e.value
                });
            });
        },
        key: [
            'echomoji.message_in_effect.timing_function',
            'echomoji.message_out_effect.timing_function'
        ]
    }, {
        data: arr => {
            echoLiveSystem.registry.forEach('border_style', e => {
                arr.push({
                    title: $t(`border_style.${ e.name }`, {}, ''),
                    value: e.value
                });
            });
        },
        key: 'accessibility.high_contrast_outline_style'
    }, {
        data: arr => {
            echoLiveSystem.registry.forEach('font_weight', e => {
                arr.push({
                    title: $t(`font_weight.${ e.name }`, {}, ''),
                    value: e.value
                });
            });
        },
        key: 'echomoji.style.font_weight'
    }, {
        data: arr => {
            echoLiveSystem.registry.forEach('random_method', e => {
                arr.push({
                    title: $t(`random_method.${ e.name }`, {}, ''),
                    value: e.value
                });
            });
        },
        key: 'echomoji.message.random_method'
    }
];



$('#settings-search-btn').click(function() {
    searchSettings($('#settings-search').val());
});

$('#settings-search').keydown(function(e) {
    if (e.key === 'Enter') {
        searchSettings($('#settings-search').val());
    }
})

$(document).on('click', '.settings-search-result-item', function(e) {
    if (e.altKey) return;
    e.preventDefault();
    goToSettingsItem($(this).data('id'));
});

function searchSettings(text = '') {
    text = text.trim();
    if (text.length == 0) return;
    let r = configSearchDataFilter.filter(text);
    $('.settings-search-result').html(SettingsPanel.searchResultList(r));
}



/**
 * 设置配置项数据列表
 * @param {String} name 配置名
 * @param {Array} dataList 数据列表
 */
function setSettingsSelect(name, dataList) {
    const $sel = $(`.settings-item[data-id="${ name }"]`);
    if ($sel.length == 0) return;
    const $item = $sel.eq(0);
    const $select = $item.find('.fh-input-select-component').eq(0);
    const value = getSettingsItemValue(name);

    let selectMenuDOM = FHUIComponentInput.selectMenu(
        value,
        dataList,
        {
            id: name.replace(/\./g, '-'),
            class: 'settings-value code',
            option_description_fill_value: true
        }
    );

    $select.find('.fh-select-option-list').remove();
    $select.append(selectMenuDOM);
}



/**
 * 跳转至配置项
 * @param {String} name 配置名
 */
function goToSettingsItem(name) {
    const $sel = $(`.settings-item[data-id="${ name }"]`);
    if ($sel.length == 0) return;
    const $item = $sel.eq(0);
    const $page = $item.parents('.settings-page').eq(0);
    const pageId = $page.data('pageid');
    $('.settings-highlight').removeClass('settings-highlight');

    $('#tabpage-nav-edit').trigger('click');
    $(`.settings-nav-item[data-pageid="${ pageId }"]`).trigger('click');

    const offsetTop = $item.offset().top;
    setTimeout(() => {
        window.scrollTo({ top: offsetTop - ( window.innerHeight / 2 - $item.height() / 2 ) });
        $(`.settings-item[data-id="${ name }"] .settings-switch.state-on .btn-switch.btn-on, .settings-item[data-id="${ name }"] .settings-switch.state-off .btn-switch.btn-off, .settings-item[data-id="${ name }"] .settings-value`).eq(0).focus();
        $item.addClass('settings-highlight');
    }, 4);
}

$(document).on('animationend', '.settings-highlight', function() {
    $(this).removeClass('settings-highlight');
});

/**
 * 获取配置值
 * @param {String} name 配置名
 * @param {Boolean} isDefault 是否为默认值
 * @returns {*} 配置值
 */
function getSettingsItemValue(name, isDefault = false) {
    let $sel = $(`.settings-item[data-id="${ name }"]`),
        type = $sel.data('type'),
        types = type.split('.'),
        value;

    if (types[0] != 'special') {
        if (!isDefault) {
            value = $sel.find('.settings-value').eq(0).val();
        } else {
            if (type === 'string.multiline') {
                value = String(decodeURIComponent($sel.find('.settings-value').eq(0).data('default')));
            } else {
                value = String($sel.find('.settings-value').eq(0).data('default'));
            }
        }

        switch (types[0]) {
            case 'number':
                value = Number(value);
                break;

            case 'boolean':
                if (types[1] == 'bit') {
                    value = Number(value);
                    break;
                }
                value = value == 'true' ? true : false;
                break;
        
            default:
                break;
        }
    } else {
        switch (type.split('.')[1]) {
            case 'all_or_array_string':
                value = $sel.find('.settings-switch-value').eq(0).val();
                if (isDefault) value = String($sel.find('.settings-switch-value').eq(0).data('default'));
                if (value != 'true') {
                    if (isDefault) {
                        try {
                            value = decodeURIComponent($sel.find('.settings-value-list').eq(0).data('default')).split('\n');
                        } catch (error) {
                            console.log(value);
                            debugger
                        }
                        
                    } else {
                        value = $sel.find('.settings-value-list').eq(0).val().split('\n')
                                    .filter(str => str.trim() !== '')
                                    .map(str => str.trim());
                    }
                } else {
                    value = 'all';
                }
                break;

            case 'fontsize':
                value = Number($sel.find('.settings-value').eq(0).val());
                if (isDefault) value = Number($sel.find('.settings-value').eq(0).data('default'));
                break;
        
            default:
                break;
        }
    }

    return value;
}

/**
 * 设置配置值
 * @param {String} name 配置名
 * @param {*} value 配置值
 * @param {Boolean} isDefault 是否为默认值
 */
function setSettingsItemValue(name, value, isDefault = false) {
    const bt = [
        'state-off',
        'state-on'
    ];

    let $sel = $(`.settings-item[data-id="${ name }"]`),
        type = $sel.data('type');
    
    if (type.split('.')[0] != 'special') {
        $sel.find('.settings-value').eq(0).val(value);
        $sel.find('.settings-value').eq(0).trigger('change');
        if (isDefault) {
            if (type === 'string.multiline') {
                $sel.find('.settings-value').eq(0).data('default', encodeURIComponent(value));
            } else {
                $sel.find('.settings-value').eq(0).data('default', value);
            }
        }

        switch (type.split('.')[0]) {
            case 'boolean':
                $sel.find('.settings-switch').removeClass('state-off state-on');
                $sel.find('.settings-switch').addClass(bt[Number(value)]);
                break;
        
            default:
                break;
        }
    } else {
        switch (type.split('.')[1]) {
            case 'all_or_array_string':
                if (value === 'all') {
                    $sel.find('.settings-switch-value').eq(0).val('true');
                    $sel.find('.settings-switch').removeClass('state-off state-on');
                    $sel.find('.settings-switch').addClass('state-on');
                    $sel.find('.settings-switch-value').eq(0).val('true');
                    if (isDefault) $sel.find('.settings-switch-value').eq(0).data('default', true);
                    $sel.find('.content').addClass('hide');
                } else if (Array.isArray(value)) {
                    $sel.find('.settings-switch').removeClass('state-off state-on');
                    $sel.find('.settings-switch').addClass('state-off');
                    $sel.find('.settings-switch-value').eq(0).val('false');
                    $sel.find('.settings-value-list').eq(0).val(
                        value.filter(str => str.trim() !== '').map(str => str.trim()).join('\n')
                    );
                    if (isDefault) {
                        $sel.find('.settings-switch-value').eq(0).data('default', false);
                        $sel.find('.settings-value-list').eq(0).data(
                            'default',
                            encodeURIComponent(value.filter(str => str.trim() !== '').map(str => str.trim()).join('\n'))
                        );
                    }
                    $sel.find('.content').removeClass('hide');
                }
                break;

            case 'fontsize':
                $sel.find('.settings-value').eq(0).val(value);
                if (isDefault) $sel.find('.settings-value').eq(0).data('default', value);
                $sel.find('.settings-value').eq(0).trigger('input');
                break;
        
            default:
                break;
        }
    }
}

function configConditionTest(name) {
    let cd = settingsManager.findConfigDefine(name);
    if (!Array.isArray(cd?.conditions)) return true;

    for (let i = 0; i < cd.conditions.length; i++) {
        const e = cd.conditions[i];
        const ev = getSettingsItemValue(e.name);
        if (ev == undefined) continue;
        if (ev !== e.value) {
            return false;
        }
    }
    return true;
}

function checkConfigCondition(name = '') {
    let ccd = settingsManager.filterConfigDefineByCondition(name);
    if (ccd.length <= 0) return;

    ccd.forEach(element => {
        if (configConditionTest(element.name)) {
            $(`.settings-item[data-id="${ element.name }"]`).removeClass('settings-item-condition-test-fail');
        } else {
            $(`.settings-item[data-id="${ element.name }"]`).addClass('settings-item-condition-test-fail');
        }
    });
}






function showFileCheckDialog(content) {
    $('#settings-file-check-dialog').html(content);
    $('.btn-default').focus();
    $('#settings-file-input-box').addClass('hide');
}

function showFileCheckDialogWarn(key) {
    showFileCheckDialog(SettingsFileChecker.dialogWarn(
        $t('settings.config_input.' + key + '.title'),
        $t('settings.config_input.' + key + '.description')
    ));
}

function showFileCheckDialogError(key) {
    showFileCheckDialog(SettingsFileChecker.dialogError(
        $t('settings.config_input.' + key + '.title'),
        $t('settings.config_input.' + key + '.description')
    ));
}

function closeFileCheckDialog(clearFill = false) {
    $('#settings-file-input-box').removeClass('hide');
    $('#settings-file-input-box').focus();
    $('#settings-file-check-dialog').text('');

    if (clearFill) {
        closeFileChecker();
        dropFile = dropFileReader = dropData = configFileBuffer = configFileFiltered = configBuffer = undefined;
    }
}

function showFileChecker(file, type) {
    const types = {
        error: 'error',
        exception: 'warn',
        future: 'warn',
        loaded: 'ok',
        update: 'warn'
    };
    $('#settings-file-check-box').html(SettingsFileChecker.fill(file, types[type], $t('file.checker.state.' + type)));
}

function closeFileChecker() {
    $('#settings-file-check-box').html(SettingsFileChecker.empty());
}

function configChangeShowController() {
    hasUnsavedConfig = true;
    $('.settings-controller-bottom').removeClass('disabled');
    $('.settings-controller-bottom button').removeAttr('disabled');
}

function configSaveCloseController() {
    hasUnsavedConfig = false;
    $('.settings-controller-bottom').addClass('disabled');
    $('.settings-controller-bottom button').attr('disabled', 'disabled');
}

function configChangeCheck() {
    let $sel = $('.settings-item.change');
    if ($sel.length > 0) {
        configChangeShowController();
    } else {
        configSaveCloseController();
    }
}

function dangerConfigCheck(effect = false, exportNow = false) {
    let value = Number(getSettingsItemValue('accessibility.font_size'));
    let value2 = Number(getSettingsItemValue('accessibility.font_size', true));
    if (value == value2) return true;
    if (value > 32 || value < 8) {
        uniWindow.messageWindow(
            `${ $t('window.config_font_size_overload.message') }<br><span style="color: var(--color-danger-dark);">${ $t('window.config_font_size_overload.font_size_review', { value: value }) }</span>`,
            $t('window.config_font_size_overload.title'),
            {
                controller: ['cancel', 'confirm'],
                autoFocusButton: 'cancel',
                icon: 'material:alert'
            },
            (v, unit) => {
                unit.close();
                if (v == 'confirm') configSaveAll(effect, true, exportNow);
            }
        );
        return false;
    }
    return true;
}

function configUndoAll() {
    let $sel = $('.settings-item.change');
    for (let i = 0; i < $sel.length; i++) {
        let id = $sel.eq(i).data('id');
        let dv = getSettingsItemValue(id, true);
        setSettingsItemValue(id, dv);
    }
    $sel.removeClass('change');
    $('html').attr('class', bodyClassCache);
    configSaveCloseController();
    checkConfigCondition();
}

function configSaveAll(effect = false, skipCheck = false, exportNow = false) {
    if (!skipCheck) {
        if (!dangerConfigCheck(effect, exportNow)) return;
    }
    let $sel = $('.settings-item.change');
    for (let i = 0; i < $sel.length; i++) {
        let id = $sel.eq(i).data('id');
        let value = getSettingsItemValue(id);
        settingsManager.setConfig(id, value);
        setSettingsItemValue(id, value, true);
    }
    $sel.removeClass('change');
    configSaveCloseController();
    configOutput(true);
    if (effect) effectFlicker('#tabpage-nav-export');

    $('html').css('--font-size-base', `${ Number(getSettingsItemValue('accessibility.font_size')) }px`);
    $(window).resize();
    setTimeout(function() {
        let colorScheme = settingsManager.getConfig('global.color_scheme');
        if (colorScheme != lastColorScheme) {
            lastColorScheme = colorScheme;
            EchoLiveTools.updateView(function() {
                $('html').removeClass('prefers-color-scheme-auto prefers-color-scheme-light prefers-color-scheme-dark');
                $('html').addClass('prefers-color-scheme-' + colorScheme);
            });
        }
        bodyClassCache = $('html').attr('class') ?? '';
    }, 800)

    if (exportNow) configExport('config.js');
}

function configOutput(setUnsave = false) {
    $('#edit-config-output').val('const config = ' + JSON.stringify(settingsManager.config, null, 4));
    outputTabUnsavePoint(setUnsave);
}

async function saveConfigFile(content, fileName = 'config.js', saveAs = false) {
    const opts = {
        suggestedName: fileName,
        types: [
            {
                description: $t('file.picker.config'),
                accept: {
                    'text/javascript': ['.js', '.mjs']
                }
            }
        ],
        excludeAcceptAllOption: true,
    };

    timerSaving = setTimeout(function() {
        sysNotice.sendT('notice.config_saving', {}, 'info', {
            icon: 'material:timer-sand'
        });
    }, 1000);

    try {
        if (saveAs || configFileWritableFileHandle == undefined) configFileWritableFileHandle = await window.showSaveFilePicker(opts);
        const writable = await configFileWritableFileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        outputTabUnsavePoint(false);
        clearTimeout(timerSaving);
        sysNotice.sendT('notice.config_saved', {}, 'success', {
            icon: 'material:content-save'
        });
    } catch (error) {
        clearTimeout(timerSaving);
        sysNotice.sendT('notice.config_saving_fail', {}, 'error', {
            icon: 'material:content-save-alert'
        });
    }
}

function configExport(fileName = 'config.js', saveAs = false) {
    let content = $('#edit-config-output').val();

    // 如果支持 showSaveFilePicker 则使用，否则使用传统下载方式
    if (window.showSaveFilePicker != undefined) return saveConfigFile(content, fileName, saveAs);

    let blob = new Blob([content], { type: 'text/javascript;charset=utf-8' });

    let downloadLink = document.createElement('a');
    downloadLink.download = fileName;
    downloadLink.innerHTML = '';

    if ('download' in downloadLink) {
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } else {
        window.open('data:text/javascript;charset=utf-8,' + encodeURIComponent(content));
    }

    outputTabUnsavePoint(false);
}

function outputTabUnsavePoint(state = true) {
    hasUnsavedConfigToFile = state;
    if (state) return $('#export-unsave').removeClass('hide');
    $('#export-unsave').addClass('hide');
}





// READY ////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    translator.ready(() => {
        $('#echo-settings-nav').html(SettingsPanel.nav(settingsNav));

        // 载入数据

        function __setConfigDefineDatalist(key, data) {
            let i = settingsManager.findIndexConfigDefine(key);
            if (i === -1) return;
            if (!Array.isArray(data) || data.length === 0) return;
            settingsManager.configDefine[i].attribute.datalist = data;
        }

        function __setConfigDataList() {
            configDataList.forEach(e => {
                let valueList = [];
                if (typeof e.data === 'function') {
                    e.data(valueList);
                } else {
                    valueList = e.data;
                }
                
                let keyList = e.key;
                if (!Array.isArray(keyList)) keyList = [keyList];
                keyList.forEach(e2 => {
                    __setConfigDefineDatalist(e2, valueList);
                });
            });
        }

        __setConfigDataList();

        // 生成页面

        settingsNav.forEach((e) => {
            if (!e?.isCustom) {
                let def = settingsManager.getConfigDefine(e.id);
                let dom = '';
                dom = SettingsPanel.setItems(def);
                $('.settings-pages').append(SettingsPanel.page(e.id, dom));
            }
        });

        if (config.data_version < db_config_version) {
            settingsManager.updateConfig(db_config_version);
        }

        configLoad();

        // 关于页面链接
        aboutLinks.forEach(e => {
            if (e?.isGroupTitle) {
                $('.settings-about-content').append(SettingsPanel.linkBarGroupTitle($t('config.about.' + e.name), e));
            } else {
                $('.settings-about-content').append(SettingsPanel.linkBar(
                    $t('config.about.' + e.name),
                    e.href,
                    e?.icon,
                    e
                ));
            }
        });

        // 最后的页面构建
        $('.settings-nav-item').eq(1).click();

        $('#settings-file-check-box').html(SettingsFileChecker.default());

        
        $('.settings-page[data-pageid="accessibility"]').prepend(
            SettingsPanel.msgBoxBlack(
                $t('config.about.accessibility'),
                $t('settings.msgbox.accessibility'),
                'material:wheelchair-accessibility'
            ) +
            `<div class="review-color-card" aria-label="${ $t('settings.label.accessibility_color_card') }">
                <div class="general"><div class="fg">${ $t('settings.functional_color.general') }</div><div class="bg"></div></div>
                <div class="safe"><div class="fg">${ $t('settings.functional_color.safe') }</div><div class="bg"></div></div>
                <div class="warn"><div class="fg">${ $t('settings.functional_color.warn') }</div><div class="bg"></div></div>
                <div class="danger"><div class="fg">${ $t('settings.functional_color.danger') }</div><div class="bg"></div></div>
            </div>
            <div class="review-font-size-card" aria-hidden="true" style="--font-size-base-review: ${config.accessibility.font_size}px; font-size: var(--font-size-base);">
                <div class="example-1">${ $t('config.accessibility.font_size.example_1') }</div>
                <div class="example-2">${ $t('config.accessibility.font_size.example_2') }</div>
            </div>`
        );
        $('.settings-page[data-pageid="advanced"]').prepend(SettingsPanel.msgBoxWarn(
            '',
            $t('settings.msgbox.advanced_settings')
        ));

        let ua = navigator.userAgent.toLowerCase();
        if (ua.search(/ chrome\//) == -1) {
            showFileCheckDialog(SettingsFileChecker.dialogUseChrome());
        } else if (ua.search(/ obs\//) != -1) {
            showFileCheckDialogWarn('in_obs');
        }

        bodyClassCache = $('html').attr('class') ?? '';

        $(window).resize();
    });

    // 调试信息

    let nowTime = new Date();

    $('.settings-about-footer-var-1').text(navigator.userAgent);
    $('.settings-about-footer-var-2').text(navigator.language);
    $('.settings-about-footer-var-3').text(config.global.language);
    $('.settings-about-footer-var-4').text(nowTime.getTime());
    $('.settings-about-footer-var-6').text(config.data_version);
    $('.settings-about-footer-var-7').text(`${ echoLiveSystem.registry.registryCount }, ${ echoLiveSystem.registry.itemCount }`);

    // 获取 URL 参数中的跳转指令

    let gotoName = EchoLiveTools.getUrlParam('goto');
    if (gotoName !== null) {
        goToSettingsItem(gotoName);
    }
});





let inFileDorp = false;
let inFileDorpTimer = 0;
let inFileDorpLongTime = false;
let dragleaveCount = 0;

let dropFile, dropFileReader, dropData;

const configFilePickerOpts = {
    types: [
        {
            description: $t('file.picker.config'),
            accept: {
                'text/javascript': ['.js', '.mjs'],
                'application/json': ['.json']
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};

$(document).on('click', '#settings-file-input-box', function(e) {
    filePicker();
});

function configLoad() {
    if ($('.settings-item.change').length > 0) configUndoAll();
    $(`.settings-item`).removeClass('settings-item-update');

    settingsManager.getConfigDefine().forEach((e) => {
        let value = settingsManager.getConfig(e.name);
        if (value != undefined && (typeof value != 'object' || Array.isArray(value))) {
            setSettingsItemValue(e.name, settingsManager.getConfig(e.name), true);
        }
    });

    if (settingsManager.getConfig('editor.color_picker.palette') === 'all') {
        $('#editor-color_picker-palette-list').val(echoLiveSystem.registry.forEachGetArray('palette', e => e.meta.name).join('\n'));
    }

    if (settingsManager.getConfig('editor.emoji_picker.emoji') === 'all') {
        $('#editor-emoji_picker-emoji-list').val(echoLiveSystem.registry.forEachGetArray('emoji', e => e.meta.name).join('\n'));
    }

    configOutput();
    checkConfigCondition();
}

async function filePicker() {
    try {
        let [handle] = await window.showOpenFilePicker(configFilePickerOpts);
        let fileData = await handle.getFile();
        checkConfigFile([fileData]);
    } catch (error) {
        if (error.name == 'AbortError') {
            sysNotice.sendT('notice.open_file_picker_cancel', {}, 'warn');
        } else {
            sysNotice.sendTHasTitle('notice.open_file_picker_fail', {}, 'error');
        }
    }
}

function checkConfigFile(fileList) {
    if (fileList.length !== 1) {
        showFileCheckDialogError('many_file');
        return;
    }

    if (fileList[0].type === '') {
        showFileCheckDialogError('type_error');
        return;
    }

    dropFile = fileList[0];
    dropFileReader = new FileReader();

    dropFileReader.onload = function(e2) {
        const content = e2.target.result;

        // Firefox 认为 JS 是应用程序而不是文本
        if (
            dropFile.type != 'text/javascript' &&
            dropFile.type != 'application/x-javascript' &&
            dropFile.type != 'application/json'
        ) {
            showFileCheckDialogError('type_error');
            return;
        }

        configFileBuffer = content;
        try {
            configFileFiltered = /\{.*\}/gms.exec(configFileBuffer)[0];
        } catch (error) {
            showFileChecker(dropFile, 'error');
            showFileCheckDialogError('no_json');
            return;
        }

        try {
            dropData = JSON.parse(configFileFiltered);
            importConfigCheck();
        } catch (error) {
            showFileChecker(dropFile, 'exception');
            showFileCheckDialog(SettingsFileChecker.dialogJSONParseFail());
            return;
        }
    };

    dropFileReader.readAsText(dropFile);
}

function importConfigCheck() {
    closeFileCheckDialog();
    showFileChecker(dropFile, 'loaded');
    settingsManager.importConfig(dropData);
    $('#tabpage-nav-edit, #tabpage-nav-export').addClass('disabled');
    $('#tabpage-nav-import').click();

    let dataVer = settingsManager.getConfig('data_version');
    if (dataVer == undefined) {
        showFileChecker(dropFile, 'update');
        showFileCheckDialog(SettingsFileChecker.dialogUpdateConfigFromUnknownVersion());
    } else if (dataVer < db_config_version) {
        showFileChecker(dropFile, 'update');
        showFileCheckDialog(SettingsFileChecker.dialogUpdateConfig());
    } else if (dataVer > db_config_version) {
        showFileChecker(dropFile, 'future');
        showFileCheckDialog(SettingsFileChecker.dialogConfigFromFuture());
    } else {
        configLoad();
        $('#tabpage-nav-edit, #tabpage-nav-export').removeClass('disabled');
        effectFlicker('#tabpage-nav-edit');
    }
}

$(document).on('dragover', '#settings-file-input-box', function(e) {
    e.preventDefault();
    if (!inFileDorp) {
        inFileDorp = true;
        $('#settings-file-input-box .file-drop-box-message').text($t('file.dropper.drop_file_now'));
        $('#settings-file-input-box').addClass('dragover');
        inFileDorpTimer = setTimeout(function() {
            inFileDorpLongTime = true;
            $('#settings-file-input-box .file-drop-box-message').text($t('file.dropper.drop_file_long_time'));
        }, 3000);
    }
});

$(document).on('dragleave', '#settings-file-input-box', function(e) {
    e.preventDefault();
    inFileDorp = false;
    clearTimeout(inFileDorpTimer);
    inFileDorpTimer = 0;
    $('#settings-file-input-box').removeClass('dragover');
    if (inFileDorpLongTime) {
        dragleaveCount++;
        if (dragleaveCount >= 5) {
            $('#settings-file-input-box .file-drop-box-message').text($t('file.dropper.drop_file_cancel_many'));
            if (!easterEggDrop) {
                easterEggDrop = true;
                sysNotice.sendT('notice.drop_file_cancel_many', {}, 'trophy');
            }
        } else {
            $('#settings-file-input-box .file-drop-box-message').text($t('file.dropper.drop_file_cancel'));
        }
    } else {
        $('#settings-file-input-box .file-drop-box-message').text($t('file.dropper.please_drop_file'));
    }
    inFileDorpLongTime = false;
});

$(document).on('drop', '#settings-file-input-box', function(e) {
    e.preventDefault()
    inFileDorp = false;
    inFileDorpLongTime = false;
    clearTimeout(inFileDorpTimer);
    $('#settings-file-input-box .file-drop-box-message').text($t('file.dropper.please_drop_file'));
    $('#settings-file-input-box').removeClass('dragover');

    const fileList = e.originalEvent.dataTransfer.files;

    checkConfigFile(fileList);
});

$(document).on('click', '#btn-file-check-dialog-unsafe-load', function() {
    try {
        eval('dropData = ' + configFileFiltered);
        importConfigCheck();
    } catch (error) {
        showFileChecker(dropFile, 'error');
        showFileCheckDialogError('unsafe_load_fail');
    }
});

$(document).on('click', '#btn-file-check-dialog-cancel', function() {
    closeFileCheckDialog(true);
});

$(document).on('click', '#btn-file-check-dialog-cancel-rollback', function() {
    settingsManager.rollbackConfig();
    closeFileCheckDialog(true);
    $('#tabpage-nav-edit, #tabpage-nav-export').removeClass('disabled');
});

$(document).on('click', '#btn-file-check-dialog-goto-chrome', function() {
    window.open('https://www.google.cn/chrome/index.html', '_blank');
});

$(document).on('click', '#btn-file-check-dialog-update-config', function() {
    const oldConfigVersion = settingsManager.getConfig('data_version');
    settingsManager.updateConfig(db_config_version);
    configLoad();
    showFileChecker(dropFile, 'loaded');
    closeFileCheckDialog();
    $('#tabpage-nav-edit, #tabpage-nav-export').removeClass('disabled');

    $(`.settings-item`).removeClass('settings-item-update');
    const cd = settingsManager.getConfigDefine('', oldConfigVersion + 1, db_config_version);
    cd.forEach(e => {
        if (e.type != 'object') {
            $(`.settings-item[data-id="${ e.name }"]`).addClass('settings-item-update');
        }
    });

    effectFlicker('#tabpage-nav-edit');
});

$(document).on('click', '#btn-file-check-dialog-update-config-from-unknown-version', function() {
    settingsManager.updateConfigFromUnknownVersion(db_config_version);
    configLoad();
    showFileChecker(dropFile, 'loaded');
    closeFileCheckDialog();
    $('#tabpage-nav-edit, #tabpage-nav-export').removeClass('disabled');
    effectFlicker('#tabpage-nav-edit');
});

$(document).on('click', '#btn-file-check-dialog-config-from-future', function() {
    configLoad();
    showFileChecker(dropFile, 'loaded');
    closeFileCheckDialog();
    $('#tabpage-nav-edit, #tabpage-nav-export').removeClass('disabled');
    effectFlicker('#tabpage-nav-edit');
});






$(document).on('click', '.settings-nav-item', function() {
    $(this).parent().children().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    const pageid = $(this).data('pageid');
    $(`.settings-page`).addClass('hide');
    $(`.settings-page[data-pageid="${pageid}"]`).removeClass('hide');
    $(window).scrollTop(0);
    $('.settings-highlight').removeClass('settings-highlight');
});

$(document).on('click', '.settings-switch', function() {
    const $parent = $(this).parents('.settings-item').eq(0);
    const name = $parent.data('id');
    const defaultValue = $(this).children('.settings-switch-value').data('default');
    const defaultValueTrue = getSettingsItemValue(name, true);
    const t = [
        ['off', false, 0],
        ['on',  true,  1]
    ];
    let next = 0;
    let isBit = $(this).data('is-bit');
    if (isBit == undefined) isBit = 0;
    if ($(this).hasClass('state-off')) next = 1;
    let value = t[next][1 + isBit];

    $(this).children('.settings-switch-value').val(value);
    $(this).removeClass('state-off state-on');
    $(this).addClass('state-' + t[next][0]);
    $(this).children('.btn-' + t[next][0]).focus();

    if ($parent.data('type') == 'special.all_or_array_string') {
        // debugger
        if (next == 1) {
            $parent.find('.content').addClass('hide');
        } else {
            $parent.find('.content').removeClass('hide');
        }
    }

    if (Array.isArray(defaultValueTrue)) {
        let v1 = getSettingsItemValue(name);
        let v2 = defaultValueTrue;
        if (Array.isArray(v1)) v1 = v1.join('\n');
        if (Array.isArray(v2)) v2 = v2.join('\n');
        if (v1 != v2) {
            $parent.addClass('change');
        } else {
            $parent.removeClass('change');
        }
    } else if (value != defaultValue) {
        $parent.addClass('change');
    } else {
        $parent.removeClass('change');
    }

    configChangeCheck();

    setTimeout(function() {
        checkConfigCondition(name);
    }, 10);
});

$(document).on('change', '.settings-item .fh-input-select-component', function() {
    const $parent = $(this).parents('.settings-item').eq(0);
    const name = $parent.data('id');
    setTimeout(function() {
        checkConfigCondition(name);
    }, 10);
});




$(document).on('change', '.settings-item.settings-type-number .settings-value', function() {
    let value = Number($(this).val()),
        max = Number($(this).attr('max')),
        min = Number($(this).attr('min'));

    if ($(this).val() === '') {
        if (min != undefined) {
            $(this).val(min);
        } else {
            $(this).val(0);
        }
    }
    if (max != undefined && value > max) $(this).val(max);
    if (min != undefined && value < min) $(this).val(min);
});

$(document).on('input', '.settings-item .settings-value', function() {
    const $parent = $(this).parents('.settings-item').eq(0);
    const name = $parent.data('id');
    const value = getSettingsItemValue(name);
    const defaultValue = getSettingsItemValue(name, true);
    if (value != defaultValue) {
        $parent.addClass('change');
    } else {
        $parent.removeClass('change');
    }
    configChangeCheck();
});

$(document).on('input', '.settings-item[data-type="special.all_or_array_string"] textarea', function() {
    const $parent = $(this).parents('.settings-item').eq(0);
    const name = $parent.data('id');
    const value = $(this).val();
    const defaultValue = decodeURIComponent($(this).data('default'));
    const defaultValueTrue = getSettingsItemValue(name, true);
    if (value != defaultValue || !Array.isArray(defaultValueTrue)) {
        $parent.addClass('change');
    } else {
        $parent.removeClass('change');
    }
    configChangeCheck();
});




$(document).on('click', '#edit-btn-undo', configUndoAll);

$(document).on('click', '#edit-btn-save', function() {
    configSaveAll(true);
});

$(document).on('click', '#edit-btn-save-output', function() {
    configSaveAll(false, false, true)
});

$(document).on('click', '#edit-btn-output', function() {
    configOutput();
    sysNotice.sendT('notice.config_re_output', {}, 'success');
});

$(document).on('click', '#edit-btn-file-save-as', function() {
    configExport('config.js', true);
});

$(document).on('click', '#edit-btn-file-save', function() {
    configExport('config.js');
});




$(document).on('click', '.settings-group-collapse-title', function() {
    const parent = $(this).parent();
    if (parent.hasClass('state-close')) {
        parent.removeClass('state-close');
        parent.addClass('state-open');
    } else {
        parent.removeClass('state-open');
        parent.addClass('state-close');
    }
});



$(document).keydown(function(e) {
    if (e.code === 'KeyS' && e.ctrlKey) {
        e.preventDefault();
    }

    if (
        $('#tabpage-nav-edit[aria-selected="true"]').length > 0 &&
        $('.settings-controller-bottom:not(.disabled)').length > 0 &&
        e.code === 'KeyS' && e.ctrlKey
    ) {
        configSaveAll(true);
        configExport('config.js');
    }
});




$(window).resize(function() {
    const tabHeight = $('#echo-editor-nav').height();
    $('.settings-nav').css('top', `calc(var(--font-size-middle) + ${tabHeight + 1}px)`);
    $('html').css('--settings-group-title-stickt-top', `${tabHeight + 1}px`);

    // $('.settings-group-collapse').each(function() {
    //     const e = $(this).parents('.settings-group').eq(0).find('.settings-group-title').eq(0);
    // });
});

function setSwitchButtonOnClickToChangeClass(key = '', className = '') {
    $(document).on('click', `.settings-item[data-id="${ key }"] .settings-switch button`, function() {
        setTimeout(function() {
            let value = getSettingsItemValue(key);
            if (value) {
                $('html').addClass(className);
            } else {
                $('html').removeClass(className);
            }
        }, 12);
    });
}

function setSwitchButtonOnClickToChangeClassForArray(data = []) {
    data.forEach(e => {
        setSwitchButtonOnClickToChangeClass(e[0], e[1]);
    });
}

setSwitchButtonOnClickToChangeClassForArray([
    ['accessibility.unlock_page_width',            'unlock-page-width'],
    ['accessibility.high_contrast',                'accessibility-high-contrast'],
    ['accessibility.protanopia_and_deuteranopia',  'accessibility-protanopia-and-deuteranopia'],
    ['accessibility.link_underline',               'accessibility-link-underline'],
    ['accessibility.animation_disable',            'accessibility-animation-disable'],
    ['global.controller_layout_reverse',        'controller-layout-reverse'],
    ['global.thin_scrollbar',                   'thin-scrollbar']
]);

$(document).on('click', '.settings-item[data-id="advanced.settings.display_config_key"] .settings-switch button', function() {
    const scrollY = window.scrollY;
    const offsetTop = $('.settings-item[data-id="advanced.settings.display_config_key"] .settings-switch').offset().top;
    setTimeout(function() {
        let value = getSettingsItemValue('advanced.settings.display_config_key');
        if (value) {
            $('html').addClass('display-config-key');
        } else {
            $('html').removeClass('display-config-key');
        }
        const offsetTopNew = $('.settings-item[data-id="advanced.settings.display_config_key"] .settings-switch').offset().top;
        window.scrollTo({ top: scrollY + (offsetTopNew - offsetTop) });
    }, 12);
});

$(document).on('click', '.settings-item[data-id="global.touchscreen_layout"] .settings-switch button', function() {
    const scrollY = window.scrollY;
    const offsetTop = $('.settings-item[data-id="global.touchscreen_layout"] .settings-switch').offset().top;
    setTimeout(function() {
        let value = getSettingsItemValue('global.touchscreen_layout');
        if (value) {
            $('html').addClass('touchscreen-layout');
        } else {
            $('html').removeClass('touchscreen-layout');
        }
        $(window).resize();
        const offsetTopNew = $('.settings-item[data-id="global.touchscreen_layout"] .settings-switch').offset().top;
        window.scrollTo({ top: scrollY + (offsetTopNew - offsetTop) });
    }, 12);
});

$(document).on('input', '.settings-item[data-id="accessibility.font_size"] .settings-value', function() {
    $('.review-font-size-card').css('--font-size-base-review', `${ $(this).val() }px`);
});

$(document).on('change', '.settings-item[data-id="character.avatar.name"] .settings-value', function() {
    const avatarName = getSettingsItemValue('character.avatar.name');
    const avatarData = echoLiveSystem.registry.getRegistryValue('avatar', avatarName);
    const empty = [
        {
            value: '',
            title: $t('ui.empty')
        }
    ];

    if (avatarData === undefined) {
        setSettingsSelect('character.avatar.action', empty);
        setSettingsSelect('character.avatar.scene', empty);
        return;
    }

    

    function __loadDataList(type) {
        let datalist = [];
        avatarData[type].forEach(e => {
            let before = 'avatar.';
            if (!e.custom_translate) before += avatarData.path[type + '_translate'];
            datalist.push({
                value: e.name,
                title: $tc(e.title, { before: before }),
            });
        });
        setSettingsSelect('character.avatar.' + type, datalist);
    }
    
    if (!Array.isArray(avatarData.action) || avatarData.action.length === 0) {
        setSettingsSelect('character.avatar.action', empty);
    } else {
        __loadDataList('action');
    }

    if (!Array.isArray(avatarData.scene) || avatarData.scene.length === 0) {
        setSettingsSelect('character.avatar.scene', empty);
    } else {
        __loadDataList('scene');
    }
});



$(document).on('click', '#tabpage-nav-edit:not(:disabled)', function() {
    window.scrollTo({ top: 0 });
});




$(document).on('click', '.settings-about-banner img', function() {
    if (logoClick >= 0 && logoClick < 4) {
        logoClick++
    } else if (logoClick >= 4) {
        logoClick = -1;
        $('.settings-about-content').addClass('settings-link-debug-show');
        sysNotice.sendT('notice.debug_mode', {}, 'tips');
    }
});

$(document).on('click', '.settings-link-bar.settings-link-debug', function(e) {
    e.preventDefault();
    const debugValue = $(this).data('debug');
    switch (debugValue) {
        case 'registry':
            console.log(echoLiveSystem.registry.registry);
            break;
    
        default:
            break;
    }
    sysNotice.send('Done!', '', 'success', {
        id: 'debug_output'
    });
});