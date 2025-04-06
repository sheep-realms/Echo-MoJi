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
        if (this.messages.length === 0) return;
        if (this.messages.length === 1) {
            if (this.lastIndex !== 1) this.send(this.messages[0]);
            return;
        }

        let r;

        switch (this.config.echomoji.message.random_method) {
            case 'weighted':
                r = this.weightedRandomIndex();
                break;
            case 'average':
            default:
                r = this.randomIndex();
        }

        this.send(this.messages[r]);

        this.lastIndex = r;
    }

    send(message = '') {
        this.event.send(message);
    }
}