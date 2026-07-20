const db_message = [
    '我对普通的人类没有兴趣！',
    '在虚构的故事当中寻求真实感的人脑袋一定有问题！',
    '保存用、鉴赏用、传教用。',
    '我们所经历的每个平凡的日常，也许就是连续发生的奇迹。',
    '可怜即可爱！',
    '现在是 {{{time:y}}} 年 {{{time:M}}} 月 {{{time:d}}} 日 {{{time:hh}}}:{{{time:mm}}}:{{{time:ss}}} UTC{{{time:utcs}}}',
    {
        type: 'queue',
        content: [
            '这是一段连续的消息队列',
            '抽取到此消息队列时',
            '会依次展示队列中的消息',
            '直到队列结束',
        ]
    },
    {
        type: 'pack',
        conditions: [
            {
                condition: 'date_check',
                date: '6/1'
            }
        ],
        content: [
            '这是一条只会在儿童节出现的消息'
        ]
    },
];