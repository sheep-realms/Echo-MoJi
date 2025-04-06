/* ============================================================
 * Echo-MoJi
 * Github: https://github.com/sheep-realms/Echo-MoJi
 * License: GNU General Public License 3.0
 * ============================================================
 */

"use strict";

let echomoji = new EchoMoJi(config, db_message);

echomoji.on('send', function(message) {
    $('#messager').addClass('hide');
    setTimeout(function() {
        $('#messager').removeClass('hide');
        $('#messager').html(message);
    }, 151);
});