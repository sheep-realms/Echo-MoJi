"use strict";

let echomoji = new EchoMoJi(config, db_message);

echomoji.on('send', function(message) {
    $('#messager').addClass('hide');
    setTimeout(function() {
        $('#messager').removeClass('hide');
        $('#messager').text(message);
    }, 151);
});