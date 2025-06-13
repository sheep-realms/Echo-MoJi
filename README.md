# Echo-MoJi

![Banner](https://sheep-realms.github.io/images/project/echo-moji/banner.png)

一款在直播间中显示随机跑马灯消息的 OBS 插件。


## 使用方法

将 `echomoji.html` 作为浏览器源导入 OBS 场景中。

您可以在浏览器中打开 `settings.html` 来调整配置，将导出的配置文件保存在 Echo-MoJi 根目录中，如果操作正确，会有覆盖提示。

在 `message.js` 中修改跑马灯内容。


## 消息格式

`message.js` 中存储了消息列表，有以下几种格式：

- **纯文本** —— 没有任何特殊格式。
- **富文本** —— 数据格式为 Array 或 Object，定义了文本样式。
- **消息队列** —— 队列中的消息会被依次展示，队列中的消息包含以上格式。


### 富文本格式

富文本格式消息看起来长这样：

``` json
{
    "text": "我们所经历的每个平凡的日常，也许就是连续发生的奇迹。",
    "style": {
        "bold": true,
        "italic": true,
        "underline": true,
        "strikethrough": true
    }
}
```

支持拆分段落，赋予不同的样式：

``` json
[
    {
        "text": "我们所经历的每个平凡的日常，"
    }, {
        "text": "也许就是连续发生的奇迹。"
    }
]
```

Echo-MoJi 的富文本格式组件复用了 [Echo-Live](https://github.com/sheep-realms/Echo-Live) 的组件，样式是通用的，您可以阅读 [Echo-Live 文档中的消息格式文本样式](https://sheep-realms.github.io/Echo-Live-Doc/message/style/)了解具体用法，文中的 `message` 字段内的部分为通用部分。


### 消息队列

队列中的消息会被依次展示，直到展示到最后一条消息。

``` json
{
    "type": "queue",
    "content": [
        "这是一段连续的消息队列",
        "抽取到此消息队列时",
        "会依次展示队列中的消息",
        "直到队列结束",
    ]
}
```

### 变量

消息支持插入占位符以调用变量，纯文本和富文本格式中的 `text` 字段都可以使用。

变量的用法为：

```
{{{变量名}}}
{{{变量名|默认值}}}
```

当变量不存在时将使用默认值，如未指定默认值则保留占位符原文。

有以下变量可以使用：

| 变量名 | 描述 |
| - | - |
| `time:y` | 年。 |
| `time:M` | 月。 |
| `time:d` | 日。 |
| `time:h` | 小时，二十四小时制。 |
| `time:h12` | 小时，十二小时制。 |
| `time:m` | 分钟。 |
| `time:s` | 秒。 |
| `time:ms` | 毫秒。 |
| `time:MM` | 月，前补零。 |
| `time:dd` | 日，前补零。 |
| `time:hh` | 小时，二十四小时制，前补零。 |
| `time:hh12` | 小时，十二小时制，前补零。 |
| `time:mm` | 分钟，前补零。 |
| `time:ss` | 秒，前补零。 |
| `time:mms` | 毫秒，前补零。 |
| `time:utc` | UTC 时区。 |
| `time:utcs` | UTC 时区，带符号。 |
| `time:isAM` | 是上午，布尔值。 |
| `time:isPM` | 是下午，布尔值。 |
| `time:AMorPM` | 上午或下午，`am` 或 `pm`。 |


## 另见

- [如何为 Echo-MoJi 项目作出贡献？](CONTRIBUTING.md)
- [授权协议与声明](copyright.md)
- [GPL（GNU General Public License，GNU通用公共许可协议）第3版](LICENSE)


### 姊妹项目

- [Echo-Live](https://github.com/sheep-realms/Echo-Live)


## 相关资源

建议您安装可免费商用字体以规避版权纠纷，Echo-MoJi 默认使用思源黑体。

- [思源黑体](https://github.com/adobe-fonts/source-han-sans)

您还可以在这里搜寻可免费商用的字体：

- [100font.com](https://www.100font.com/)


## 赞助此项目

您可以通过[爱发电](https://afdian.com/a/sheep_realms)赞助此项目。

请注意：您的赞助应当是无偿且自愿的，此项目的开发者 Sheep-realms 不会通过任何方式向您索要报酬。您的赞助也许能促进某个功能或整个项目的开发，但我们对此不作任何形式的承诺与保证。