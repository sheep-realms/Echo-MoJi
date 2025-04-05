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
        this.lastIndex = -1;
        this.hidden = true;
        this.timer = -1;
        this.event          = {
            send: function() {}
        };

        this.init();
    }

    init() {
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

        let r = Math.round(Math.random() * this.messages.length - 1);
        if (r == this.lastIndex) {
            if (r + 1 >= this.messages.length) {
                r--;
            } else {
                r++;
            }
        }

        if (r >= this.messages.length) r--;

        this.send(this.messages[r]);

        this.lastIndex = r;
    }

    send(message = '') {
        this.event.send(message);
    }
}