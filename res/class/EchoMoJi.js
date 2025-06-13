/* ============================================================
 * Echo-MoJi
 * Github: https://github.com/sheep-realms/Echo-MoJi
 * License: GNU General Public License 3.0
 * ============================================================
 */

class EchoMoJi {
    constructor(config, messages = []) {
        this.config = config;
        this.messages = messages;
        this.messagesWeight = [];
        this.messageWeightResetValue = -1;
        this.lastIndex = -1;
        this.inQueue = false;
        this.messageQueue = [];
        this.hidden = true;
        this.timer = -1;
        this.variablesCache = {};
        this.event          = {
            send: function() {},
            themeScriptLoad: function() {},
            themeScriptUnload: function() {},
            updateVariables: function() {}
        };

        this.init();
    }

    /**
     * 初始化
     */
    init() {
        this.theme = echoLiveSystem.registry.getRegistryArray('theme');

        for (let i = 0; i < this.messages.length; i++) {
            this.messagesWeight.push({
                index: i,
                weight: this.config.echomoji.message.random_weight_init || 1
            });
        }

        this.messageWeightResetValue = Math.max(
            Math.floor(
                this.messages.length * (
                    Math.min(
                        Math.max(
                            this.config.echomoji.message.random_weight_reset_negative_rate,
                            0
                        ),
                        1
                    ) || 0.35
                )
            ),
            1
        ) * -1;

        document.addEventListener("visibilitychange", () => {
            this.checkVisibility();
        });

        this.checkVisibility();
    }

    /**
     * 绑定事件
     * @param {String} eventName 事件名称
     * @param {Function} action 函数
     * @returns {Function} 函数
     */
    on(eventName, action = function() {}) {
        if (typeof action !== 'function') return;
        return this.event[eventName] = action;
    }

    /**
     * 检查页面可见性
     * @returns {Boolean} 是否可见
     */
    checkVisibility() {
        if (document.visibilityState === "visible") {
            this.hidden = false;
            this.start();
        } else {
            this.hidden = true;
            this.stop();
        }

        return !this.hidden;
    }

    /**
     * 随机索引
     * @returns {Number} 随机索引
     */
    randomIndex() {
        if (this.messages.length < 2) return undefined;

        let r = Math.round(Math.random() * this.messages.length - 1);
        if (r == this.lastIndex) {
            if (r + 1 >= this.messages.length) {
                r--;
            } else {
                r++;
            }
        }

        if (r >= this.messages.length) r--;

        return r;
    }

    /**
     * 带权重随机索引
     * @returns {Number} 随机索引
     */
    weightedRandomIndex() {
        let total = 0;
        const validItem = this.messagesWeight.filter(e => e.weight > 0 && e.index !== this.lastIndex);
        if (validItem.length === 0) return undefined;
        if (validItem.length === 1) return validItem[0].value;

        validItem.forEach(e => {
            total += e.weight;
        });

        let r = Math.round(Math.random() * total - 1);
        let sum = 0;
        for (let i = 0; i < validItem.length; i++) {
            sum += validItem[i].weight;
            if (r < sum) {
                this.addAllMessageWeight();
                this.setMessageWeight(validItem[i].index, this.messageWeightResetValue);
                return validItem[i].index;
            }
        }
    }

    /**
     * 设置消息权重
     * @param {Number} index 索引
     * @param {Number} weight 权重
     */
    setMessageWeight(index, weight) {
        if (index < 0 || index >= this.messagesWeight.length) return;
        this.messagesWeight[index].weight = weight;
    }

    /**
     * 为所有消息增加权重
     * @param {Number} weight 增加的权重
     */
    addAllMessageWeight(weight = this.config.echomoji.message.random_weight_step || 1) {
        if (weight <= 0) return;
        this.messagesWeight.forEach(e => {
            e.weight += weight;
        });
    }

    /**
     * 设置消息队列
     * @param {Array<String|Object|Array<Object>>} queue 消息队列
     */
    setMessageQueue(queue = []) {
        queue = JSON.parse(JSON.stringify(queue));
        if (!Array.isArray(queue)) queue = [queue];
        this.inQueue = true;
        this.messageQueue = queue;
    }

    /**
     * 抽取消息队列第一个元素
     * @returns {String|Object|Array<Object>} 消息队列第一个元素
     */
    getMessageQueueFirst() {
        if (this.messageQueue.length === 0) return undefined;
        const r = this.messageQueue.shift();
        if (this.messageQueue.length === 0) this.inQueue = false;
        return r;
    }

    /**
     * 启动主循环
     */
    start() {
        if (this.timer !== -1) return;
        this.timer = setInterval(() => {
            this.next();
        }, this.config.echomoji.message.duration || 10000);
    }

    /**
     * 终止主循环
     */
    stop() {
        if (this.timer === -1) return;
        clearInterval(this.timer);
        this.timer = -1;
    }

    /**
     * 进入下一个画面
     */
    next() {
        // 在队列中
        if (this.inQueue) {
            return this.send(this.getMessageQueueFirst());
        }

        // 处理极少数据
        if (this.messages.length === 0) return;
        if (this.messages.length === 1) {
            if (this.lastIndex !== 1) this.send(this.messages[0]);
            return;
        }

        // 选择随机方法
        let randomMethod = this.config.echomoji.message.random_method;
        const randomMethodMap = {
            average: 'randomIndex',
            weighted: 'weightedRandomIndex'
        };
        if (randomMethodMap[this.config.echomoji.message.random_method] === undefined) randomMethod = 'randomIndex';

        // 尝试抽取
        let r;
        let rc = 0;
        do {
            r = this[randomMethodMap[randomMethod]].call(this);
            rc++;
        } while (r === undefined && rc < 16);

        // 抽取失败
        if (r === undefined) return;

        // 发送消息
        const message = this.messages[r];

        if (typeof message === 'object' && message.type === 'queue') {
            this.setMessageQueue(message.content);
            this.send(this.getMessageQueueFirst());
        } else {
            this.send(message);
        }

        this.lastIndex = r;
    }

    /**
     * 发送消息
     * @param {String|Object|Array<Object>} message 消息
     */
    send(message = '') {
        if (typeof message === 'string') {
            return this.event.send(
                EchoLiveTools.safeHTML(
                    this.fillTextVariables(message)
                )
            );
        }
        if (typeof message !== 'object') return;
        if (!Array.isArray(message)) message = [message];

        let dom = '';
        let r;
        message.forEach(e => {
            r = EchoLiveTools.messageStyleGenerator(e);
            dom += FHUI.element(
                'span',
                {
                    class: r.class,
                    style: r.style
                },
                EchoLiveTools.safeHTML(this.fillTextVariables(e.text))
            );
        });

        this.event.send(dom);
    }

    updateVariables() {
        const dateObject = EchoLiveTools.formatDateToObject();

        for (const key in dateObject) {
            if (Object.prototype.hasOwnProperty.call(dateObject, key)) {
                const e = dateObject[key];
                this.variablesCache['time:' + key] = e;
            }
        }

        this.event.updateVariables();
        echoLiveSystem.hook.trigger('echomoji_update_variables', {
            unit: this,
            variables: this.variablesCache,
        });

        return this.variablesCache;
    }

    fillTextVariables(text) {
        if (!this.config.echomoji.message.allow_variable) return text;
        if (text.search(/\{\{\{(.*?)\}\}\}/) !== -1) {
            this.updateVariables();
            return EchoLiveTools.replacePlaceholders(text, this.variablesCache, 'triple');
        } else {
            return text;
        }
    }

    /**
     * 修改主题样式地址
     * @param {String} url 样式文件地址
     */
    setThemeStyleUrl(url) {
        if ($('#echo-moji-theme').attr('href') === url) return url;
        $('#echo-moji-theme').attr('href', url);
        return url;
    }

    /**
     * 查找主题
     * @param {String} name 主题ID
     * @returns {Object} 主题数据
     */
    findTheme(name) {
        return this.theme.find((e) => e.name === name);
    }

    /**
     * 设置主题
     * @param {String} name 主题ID
     * @returns {String} 主题入口样式文件URL
     */
    setTheme(name) {
        const theme = this.findTheme(name);
        if (theme === undefined) return;

        this.event.themeScriptUnload();
        this.event.themeScriptLoad      = function() {};
        this.event.themeScriptUnload    = function() {};
        $('script.echo-moji-theme-script').remove();

        this.setThemeStyleUrl(theme.style);

        if (this.themeScriptEnable && typeof theme.script == 'object') {
            theme.script.forEach(e => {
                let s   = document.createElement("script");
                s.src   = e;
                s.class = 'echo-moji-theme-script';
                document.head.appendChild(s);
            });
        }

        this.event.themeScriptLoad();

        return theme.style;
    }
}