/* ============================================================
 * Echo-MoJi
 * Github: https://github.com/sheep-realms/Echo-MoJi
 * License: GNU General Public License 3.0
 * ============================================================
 */

"use strict";

if (config.echomoji?.style?.text_color) $('html').css('--moji-color', config.echomoji.style.text_color);
if (config.echomoji?.style?.background_color) $('html').css('--moji-background-color', config.echomoji.style.background_color);
if (config.echomoji?.style?.font_size) $('html').css('--moji-font-size', config.echomoji.style.font_size);
if (config.echomoji?.style?.font_weight) $('html').css('--moji-font-weight', config.echomoji.style.font_weight);
if (config.echomoji?.style?.font_family) $('html').css('--moji-font-family', config.echomoji.style.font_family);

// 设置动画样式
if (config.echomoji?.message_in_effect?.name) $('html').css('--message-in-effect-name', config.echomoji.message_in_effect.name);
if (config.echomoji?.message_in_effect?.duration) $('html').css('--message-in-effect-speed', config.echomoji.message_in_effect.duration + 'ms');
if (config.echomoji?.message_in_effect?.scale) $('html').css('--message-in-effect-scale', config.echomoji.message_in_effect.scale);
if (config.echomoji?.message_in_effect?.timing_function) $('html').css('--message-in-effect-timing-function', config.echomoji.message_in_effect.timing_function);
if (config.echomoji?.message_out_effect?.name) $('html').css('--message-out-effect-name', config.echomoji.message_out_effect.name);
if (config.echomoji?.message_out_effect?.duration) $('html').css('--message-out-effect-speed', config.echomoji.message_out_effect.duration + 'ms');
if (config.echomoji?.message_out_effect?.scale) $('html').css('--message-out-effect-scale', config.echomoji.message_out_effect.scale);
if (config.echomoji?.message_out_effect?.timing_function) $('html').css('--message-out-effect-timing-function', config.echomoji.message_out_effect.timing_function);


let echomoji = new EchoMoJi(config, db_message);
let urlTheme = EchoLiveTools.getUrlParam('theme');
echomoji.setTheme(urlTheme || config.echomoji.style.theme);

let messageCache = '';

echomoji.on('send', function(message) {
    messageCache = message;
    $('#messager').addClass('message-out-effect');
});


$(document).on('animationend', '#messager.message-out-effect', function() {
    $('#messager').removeClass('message-out-effect');
    $('#messager').html(messageCache);
    $('#messager').addClass('message-in-effect');
});

$(document).on('animationend', '#messager.message-in-effect', function() {
    $('#messager').removeClass('message-in-effect');
});
