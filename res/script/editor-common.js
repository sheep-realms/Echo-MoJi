/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


"use strict";

if (APP_META.isBeta) {
    const iconPath = $('head link[rel="icon"]').attr('href');
    let iconPathSplit = iconPath.split('/');
    iconPathSplit[iconPathSplit.length - 1] = 'favicon-beta.ico';
    $('head link[rel="icon"]').attr('href', iconPathSplit.join('/'));
}

if (config.global.color_scheme != 'auto') $('html').addClass('prefers-color-scheme-' + config.global.color_scheme);
if (config.global.touchscreen_layout) $('html').addClass('touchscreen-layout');
if (config.global.controller_layout_reverse) $('html').addClass('controller-layout-reverse');
if (config.global.thin_scrollbar) $('html').addClass('thin-scrollbar');
if (config.accessibility.high_contrast || window.matchMedia('(forced-colors: active)').matches) {
    $('html').addClass('accessibility-high-contrast');
    $('html').css('--accessibility-outline-color', config.accessibility.high_contrast_outline_color);
    $('html').css('--accessibility-outline-size', config.accessibility.high_contrast_outline_size);
    $('html').css('--accessibility-outline-style', config.accessibility.high_contrast_outline_style);
}
if (config.accessibility.protanopia_and_deuteranopia) $('html').addClass('accessibility-protanopia-and-deuteranopia');
if (config.accessibility.link_underline) $('html').addClass('accessibility-link-underline');
if (config.accessibility.animation_disable) $('html').addClass('accessibility-animation-disable');
if (config.accessibility.power_saving_mode) $('html').addClass('power-saving-mode');
if (config.accessibility.unlock_page_width) $('html').addClass('unlock-page-width');
$('html').css('--font-size-base', `${ config.accessibility.font_size }px`);



let timer = {
    clickEffect: -1
}

let checkboxEvent = {};

/**
 * 设置表单元素默认值
 * @param {String} $sel 选择器
 * @param {String|Number} value 值
 */
function setDefaultValue($sel, value) {
    $($sel).data('default', value);
    $($sel).val(value);
}

/**
 * 设置复选框默认状态
 * @param {String} $sel 选择器
 * @param {0|1} value 值
 */
function setCheckboxDefaultValue($sel, value) {
    if (typeof value === 'boolean') value ? value = 1 : value = 0;

    $($sel).val(value);
    if (value == 1) {
        $($sel).parents('.checkbox').attr('aria-selected', 'true');
        $($sel).parents('.checkbox').addClass('selected');
    } else {
        $($sel).parents('.checkbox').attr('aria-selected', 'false');
        $($sel).parents('.checkbox').removeClass('selected');
    }
}


/**
 * 模拟点击
 * @param {String} $sel 选择器
 */
function effectClick($sel) {
    clearTimeout(timer.clickEffect);
    $('.fh-effect-click').removeClass('fh-effect-click');
    $($sel).addClass('fh-effect-click');
    timer.clickEffect = setTimeout(() => {
        $($sel).removeClass('fh-effect-click');
    }, 1000);
}

/**
 * 标签页短暂高亮
 * @param {String} $sel 选择器
 */
function effectFlicker($sel) {
    clearTimeout(timer.clickEffect);
    $('.fh-effect-flicker').removeClass('fh-effect-flicker');
    $($sel).addClass('fh-effect-flicker');
    timer.clickEffect = setTimeout(() => {
        $($sel).removeClass('fh-effect-flicker');
    }, 1000);
}

// 复选框
$(document).on('click', '.checkbox', function() {
    let v = $(this).children('input').val();
    let name = $(this).children('input').attr('name');
    if (v == 0) {
        $(this).children('input').val(1);
        $(this).addClass('selected');
        $(this).attr('aria-selected', 'true');
        if ($(this).hasClass('collapse-checkbox')) {
            $(this).parents('.collapse').children('.collapse-content').removeClass('hide');
        }
        if (typeof checkboxEvent[name] == 'function') checkboxEvent[name](1);
    } else {
        $(this).children('input').val(0);
        $(this).removeClass('selected');
        $(this).attr('aria-selected', 'false');
        if ($(this).hasClass('collapse-checkbox')) {
            $(this).parents('.collapse').children('.collapse-content').addClass('hide');
        }
        if (typeof checkboxEvent[name] == 'function') checkboxEvent[name](0);
    }
});

// 标签页切换
$(document).on('click', '.tabpage-nav .tabpage-nav-item:not(.disabled)', function() {
    $(this).parent().children().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    const navid = $(this).parent().data('navid');
    const pageid = $(this).data('pageid');
    // console.log($(`.tabpage-centent[data-navid="${navid}"] .tabpage-panel`));
    // document.startViewTransition(() => {});
    $(`.tabpage-centent[data-navid="${navid}"]>.tabpage-panel`).addClass('hide');
    $(`.tabpage-centent[data-navid="${navid}"]>.tabpage-panel[data-pageid="${pageid}"]`).removeClass('hide');
    popupsDisplay('#popups-palette', false);
});