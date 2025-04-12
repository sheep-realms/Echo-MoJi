/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class EchoLiveTools {
    constructor() {}

    /**
     * 解析段落格式样式
     * @param {Object} data 单一段落格式
     * @returns {Object} 类与样式
     */
    static messageStyleGenerator(data) {
        function __setClassAndStyle(styleData) {
            const value = data.style[styleData.name];
            if (
                typeof value === 'undefined' ||
                Array.isArray(value) ||
                typeof value === 'function' ||
                typeof value === 'symbol'
            ) return;

            if (styleData.is_style) {
                if (typeof data.style.style === 'undefined') return;
                style += data.style.style;
                return;
            }

            if (typeof value === 'boolean' && !value) return;

            if (typeof styleData.class !== 'undefined') {
                if (!Array.isArray(styleData.class)) styleData.class = [styleData.class];
                styleData.class.forEach(e => {
                    let v = value;
                    if (typeof value !== 'object') v = { value: v }

                    cls += EchoLiveTools.replacePlaceholders(e, v);
                    cls += ' ';
                });
            }

            if (typeof styleData.style !== 'undefined') {
                if (!Array.isArray(styleData.style)) styleData.style = [styleData.style];
                styleData.style.forEach(e => {
                    if (styleData.custom_style) {
                        let v = value;
                        if (typeof value !== 'object') v = { value: v }
                        
                        style += EchoLiveTools.replacePlaceholders(e, v);
                        style += ' ';
                    } else {
                        style += `${e}: ${value}; `;
                    }
                });
            }
        }

        let cls = '';
        if (data?.class) {
            cls = data.class + ' ';
        }
        let style = '';
        if (data?.typewrite) cls += 'echo-text-typewrite '
        if (data?.style) {
            if (!config.advanced.performance.foreach_text_style_by_message_data) {
                echoLiveSystem.registry.forEach('text_style', e => {
                    __setClassAndStyle(e);
                });
            } else {
                for (const key in data.style) {
                    if (Object.prototype.hasOwnProperty.call(data.style, key)) {
                        let r = echoLiveSystem.registry.getRegistryValue('text_style', key);
                        if (r === undefined) continue;
                        __setClassAndStyle(r);
                    }
                }
            }
        }

        return {
            class: cls,
            style: style
        }
    }

    /**
     * 获取 URL 地址参数
     * @param {String} name 参数名称
     * @returns {String|null} 参数值
     */
    static getUrlParam(name) {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    /**
     * 获取易读的文件大小信息
     * @param {Number} bytes Byte
     * @returns {String} 易读的文件大小信息
     */
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
    
        const k     = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i     = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * 格式化日期时间
     * @param {String|Number} value 日期时间值
     * @param {String} formatKey 格式化键名
     * @returns {String} 格式化后的日期时间
     */
    static formatDate(value = undefined, formatKey = 'date_time_common') {
        let data = EchoLiveTools.formatDateToObject(value);
        
        return $t('localization.' + formatKey, data);
    }

    /**
     * 格式化日期时间为 Object
     * @param {String|Number} value 日期时间值
     * @returns  {Object} 日期时间数据
     */
    static formatDateToObject(value = undefined) {
        let date = value !== undefined ? new Date(value) : new Date();
        const padZero = (num, pad = 2) => num.toString().padStart(pad, '0');
    
        const y = date.getFullYear();
        const M = date.getMonth() + 1;
        const d = date.getDate();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const ms = date.getMilliseconds();
        const utcz = date.getTimezoneOffset() / 60;
        const utc = utcz < 0 ? utcz * -1 : utcz;
        const h12 = (h % 12) || 12;
        let utcs = '';
        if (utc !== 0) {
            utcs = ( utc > 0 ? '+' : '-' ) + utc
        }
    
        return {
            y: y,
            M: M,
            d: d,
            h: h,
            h12: h12,
            m: m,
            s: s,
            ms: ms,
            MM: padZero(M),
            dd: padZero(d),
            hh: padZero(h),
            hh12: padZero(h12),
            mm: padZero(m),
            ss: padZero(s),
            mms: padZero(ms, 3),
            utc: utc,
            utcs: utcs,
            isAM: h < 12,
            isPM: h >= 12,
            AMorPM: h < 12 ? 'am' : 'pm'
        };
    }

    /**
     * 安全输出 HTML
     * @param {String} text 文本
     * @param {Boolean} inAttribute 在属性值中
     * @returns {String} 过滤后的文本
     */
    static safeHTML(text, inAttribute = false) {
        if (typeof text != 'string') return text;
        let txt = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        if (inAttribute) txt = text.replace(/"/g, '&quot;');
        return txt;
    }

    /**
     * 清理不必要的 HTML 标签
     * @param {String} text 文本
     * @returns {String} 过滤后的文本
     */
    static sanitizeHTML(text) {
        return text.replace(/<\/?[^>]*>/g, (tag) => {
            // 匹配合法的 HTML 标签
            const match = tag.match(/^<\/?(span|br|a)([^>]*)>/i);
            if (match) {
                const tagName = match[1].toLowerCase();
                const isClosingTag = tag.startsWith('</');
    
                // 处理 span 标签，仅保留 lang 属性
                if (tagName === 'span') {
                    if (isClosingTag) return `</${tagName}>`;
                    const langAttr = match[2]?.match(/lang\s*=\s*(['"])[a-z\-]+?\1/i);
                    return `<${tagName}${langAttr ? ' ' + langAttr[0] : ''}>`;
                }
    
                // 处理 a 标签，保留 href 属性并添加 target="_blank"
                if (tagName === 'a') {
                    if (isClosingTag) return `</${tagName}>`;
                    const hrefAttr = match[2]?.match(/href\s*=\s*(['"])[^'"]*?\1/i);
                    return `<${tagName}${hrefAttr ? ' ' + hrefAttr[0] : ''} target="_blank" referrerpolicy="no-referrer">`;
                }
    
                // br 标签直接返回（没有属性）
                return `<${tagName}>`;
            }
    
            // 其他非法标签转义尖括号
            return tag
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        });
    }

    /**
     * 使用 ViewTransition API 更新视图
     * @param {Function} action 过程
     */
    static updateView(action = function() {}) {
        if (!document.startViewTransition) {
            action();
            return;
        }
        document.startViewTransition(() => action());
    }

    /**
     * 定义对象只读属性
     * @param {Object} obj 目标对象
     * @param {Object} data 属性数据
     */
    static defineObjectPropertyReadOnly(obj, data = {}) {
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const e = data[key];
                Object.defineProperty(obj, key, {
                    value:      e,
                    writable:   false
                });
            }
        }
    }

    /**
     * 替换字符串占位符
     * @param {String} str 源字符串
     * @param {Object} data 变量集
     * @param {'single'|'double'|'triple'} type 替换类型
     * @returns {String} 替换后的字符串
     */
    static replacePlaceholders(str, data, type = 'single') {
        const regex = {
            single: /\{(.*?)\}/g,
            double: /\{\{(.*?)\}\}/g,
            triple: /\{\{\{(.*?)\}\}\}/g
        };
        if (regex[type] === undefined) return str;
        return str.replace(regex[type], (match, content) => {
            let [key, defaultValue] = content.split('|').map(part => part.trim());
            if (data.hasOwnProperty(key) && (typeof data[key] === 'string' || typeof data[key] === 'number')) return data[key];
            if (defaultValue) return defaultValue;
            return match;
        });
    }
}