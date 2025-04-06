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
        this.event          = {
            send: function() {}
        };

        this.init();
    }

    init() {
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

    setMessageWeight(index, weight) {
        if (index < 0 || index >= this.messagesWeight.length) return;
        this.messagesWeight[index].weight = weight;
    }

    addAllMessageWeight(weight = this.config.echomoji.message.random_weight_step || 1) {
        if (weight <= 0) return;
        this.messagesWeight.forEach(e => {
            e.weight += weight;
        });
    }

    setMessageQueue(queue = []) {
        queue = JSON.parse(JSON.stringify(queue));
        if (!Array.isArray(queue)) queue = [queue];
        this.inQueue = true;
        this.messageQueue = queue;
    }

    getMessageQueueFirst() {
        if (this.messageQueue.length === 0) return undefined;
        const r = this.messageQueue.shift();
        if (this.messageQueue.length === 0) this.inQueue = false;
        return r;
    }

    start() {
        if (this.timer !== -1) return;
        this.timer = setInterval(() => {
            this.next();
        }, this.config.echomoji.message.duration || 10000);
    }

    stop() {
        if (this.timer === -1) return;
        clearInterval(this.timer);
        this.timer = -1;
    }

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
            this.setMessageQueue(message.queue);
            this.send(this.getMessageQueueFirst());
        } else {
            this.send(message);
        }

        this.lastIndex = r;
    }

    send(message = '') {
        if (typeof message === 'string') return this.event.send(EchoLiveTools.safeHTML(message));
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
                EchoLiveTools.safeHTML(e.text)
            );
        });

        this.event.send(dom);
    }
}