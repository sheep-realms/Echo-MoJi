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

let echomoji = new EchoMoJi(config, db_message);

echomoji.on('send', function(message) {
    $('#messager').addClass('hide');
    setTimeout(function() {
        $('#messager').removeClass('hide');
        $('#messager').html(message);
    }, 151);
});