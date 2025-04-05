/* ============================================================
 * Echo-Live
 * Github: https://github.com/sheep-realms/Echo-Live
 * License: GNU General Public License 3.0
 * ============================================================
 */


class DOMConstructor {
    constructor() {}

    static join(domlist = []) {
        return domlist.join('');
    }
}

// 字段列表构造器
class EditorTextList {
    constructor() {}

    /**
     * 项目
     * @param {Number} index 索引编号
     * @param {String} value 值
     * @returns {String} DOM
     */
    static getItem(index, value) {
        return `
        <div class="editor-text-list-item" data-index="${index}">
            <span class="index">${index + 1}.</span>
            <span class="text">${value.text}</span>
            <span class="btn">
                <button class="fh-button fh-small" data-index="${index}">编辑</button>
                <button class="fh-button fh-small fh-danger" data-index="${index}">删除</button>
            </span>
        </div>`;
    }

    /**
     * 列表
     * @param {String} value 值
     * @returns {String} DOM
     */
    static getList(value) {
        let dom = '';
        for (let i = 0; i < value.length; i++) {
            dom += this.getItem(i, value[i]);
        }
        return dom;
    }
}

// 表单构造器
class EditorForm {
    constructor() {}

    /**
     * 提示
     * @param {String} label 标签名称
     * @returns {String} DOM
     */
    static tip(label) {
        return `<div class="echo-editor-form-checkbox-list"><span class="echo-editor-form-input-tip">${label}</span></div>`
    }

    /**
     * 表单项目
     * @param {String} id ID
     * @param {String} label 标签名称
     * @param {String} content 内容
     * @param {String} tip 提示
     * @returns {String} DOM
     */
    static item(id, label, content, tip = '') {
        return `<div class="echo-editor-form-row"><label for="${id}">${label}</label>${content}</div>${tip != '' ? EditorForm.tip(tip) : ''}`;
    }

    /**
     * 复选框
     * @param {String} id ID
     * @param {String} label 标签名称
     * @param {String} def 默认值
     * @param {String} tip 提示
     * @returns {String} DOM
     */
    static checkbox(id, label, def, tip = '') {
        return EditorForm.item(
            id,
            '',
            `<button role="checkbox" aria-selected="${def}" class="checkbox ${def == 1 ? 'selected' : ''}">
                <span class="icon"></span>
                <span class="text">${label}</span>
                <input type="hidden" name="${id}" id="${id}" value="${def}" data-default="${def}">
            </button>`,
            tip
        );
    }

    /**
     * 按钮
     * @param {String} content 内容
     * @param {Object} data 属性值
     * @param {String} data.id ID
     * @param {String} data.class 类
     * @param {String} data.attr 额外的 HTML 属性
     * @param {String} data.title Title 属性
     * @param {String} data.icon 图标元素
     * @param {Boolean} data.disabled 禁用按钮
     * @param {undefined|'ghost'|'dashed'|'air'} data.type 按钮类型
     * @param {undefined|'big'|'small'} data.size 按钮尺寸
     * @param {undefined|'safe'|'warn'|'danger'|'special'} data.color 按钮功能色
     * @returns {String} DOM
     */
    static button(content, data) {
        return `<button
            ${data?.id ? `id="${data.id}"` : ''}
            class="
                fh-button
                ${data?.type ? 'fh-' + data?.type : ''}
                ${data?.size ? 'fh-' + data?.size : ''}
                ${data?.color ? 'fh-' + data?.color : ''}
                ${data?.icon ? 'fh-icon-button' : ''}
                ${data?.class ? data.class : ''}
            "
            ${data?.disabled ? 'disabled' : ''}
            ${data?.title ? `title="${data.title}"` : ''}
            ${data?.attr ? data.attr : ''}
        >
            ${data?.icon ? data?.icon : ''}${content}
        </button>`
    }

    /**
     * 按钮
     * @param {String} content 内容
     * @param {Object} data 属性值
     * @param {String} data.id ID
     * @param {String} data.class 类
     * @param {String} data.attr 额外的 HTML 属性
     * @param {String} data.title Title 属性
     * @param {String} data.icon 图标元素
     * @param {Boolean} data.disabled 禁用按钮
     * @param {undefined|'big'|'small'} data.size 按钮尺寸
     * @param {undefined|'safe'|'warn'|'danger'|'special'} data.color 按钮功能色
     * @returns {String} DOM
     */
    static buttonGhost(content, data) {
        data = {
            ...data,
            ...{
                type: 'ghost'
            }
        }
        return EditorForm.button(content, data);
    }

    /**
     * 按钮
     * @param {String} content 内容
     * @param {Object} data 属性值
     * @param {String} data.id ID
     * @param {String} data.class 类
     * @param {String} data.attr 额外的 HTML 属性
     * @param {String} data.title Title 属性
     * @param {String} data.icon 图标元素
     * @param {Boolean} data.disabled 禁用按钮
     * @param {undefined|'big'|'small'} data.size 按钮尺寸
     * @param {undefined|'safe'|'warn'|'danger'|'special'} data.color 按钮功能色
     * @returns {String} DOM
     */
    static buttonAir(content, data) {
        data = {
            ...data,
            ...{
                type: 'air'
            }
        }
        return EditorForm.button(content, data);
    }
}

class SettingsPanel {
    constructor() {}

    static navItem(item) {
        return `<button
            class="settings-nav-item"
            data-pageid="${ item.id }"
            role="tab"
            aria-selected="false"
            title="${ $t( 'config.' + item.id + '._description' ) }"
        >
            <span class="icon left" aria-hidden="true">${ item.icon !== undefined ? Icon.getIcon(item.icon) : ''}</span>
            <span class="title">${ $t( 'config.' + item.id + '._title' ) }</span>
            <span class="icon right" aria-hidden="true"></span>
        </button>`;
    }

    static nav(items) {
        let dom = '';
        items.forEach(e => {
            dom += SettingsPanel.navItem(e);
        });

        return dom;
    }

    static page(id, content = '') {
        return `<div class="settings-page hide" data-pageid="${ id }">${ content }</div>`;
    }

    static setGroupTitle(title = '', description = '', depth) {
        if (depth === 1) {
            return `<button class="settings-group-collapse-title">
                <div class="title">${ title }</div>
                <div class="icon">
                    <span class="open">${ Icon.getIcon('material:chevron-down') }</span>
                    <span class="close">${ Icon.getIcon('material:chevron-up') }</span>
                </div>
            </button>`;
        } else if (depth > 1) {
            return `<div class="settings-group-collapse-subtitle">
                <div class="title">${ title }</div>
            </div>`;
        }
        return `<hgroup class="settings-group-title">
            <h3 class="title">${ title }</h3>
            <div class="description">${ description }</div>
        </hgroup>`;
    }

    static setItem(type = 'string', id = '', title = '', description = '', content = '', moreContent = '') {
        return `<div class="settings-item settings-type-${ type.split('.')[0] }" data-id="${ id }" data-type="${ type }">
            <div class="meta">
                <div class="title">${ title }</div>
                <div class="description">${ description }</div>
                <div class="key"><code>${ id }</code></div>
            </div>
            <div class="value">
                ${ content }
            </div>
            ${ moreContent !== '' ? moreContent : '' }
        </div>`;
    }

    static setItemAuto(item) {
        const fun = {
            string: 'setItemString',
            number: 'setItemNumber',
            boolean: 'setItemBoolean',
        }

        const funSpecial = {
            all_or_array_string: 'setItemAllOrArrayString',
            fontsize: 'setItemFontSize'
        };

        let types = item.type.split('.');

        let run = fun[types[0]];

        if (types[0] === 'special') {
            run = funSpecial[types[1]];
        }

        if (run === undefined) run = 'setItemUnknown';

        const title = $t( 'config.' + item.name + '._title' );
        const description = $t( 'config.' + item.name + '._description' );

        if (item.type === 'object') return SettingsPanel.setGroupTitle(title, description, item?.depth);
        if (item.type === 'boolean.bit') return SettingsPanel.setItemBoolean(item.type, item.name, title, description, item.default, item?.attribute, true);

        return SettingsPanel[run](item.type, item.name, title, description, item.default, item?.attribute, item?.unit);
    }

    static setItems(items) {
        let dom = '';
        let inGroup = false;
        let inCollapse = false;
        items.forEach(e => {
            if (e.type === 'object' && (e?.depth === undefined || e?.depth <= 1)) {
                if (inCollapse) {
                    dom += '</div></div>';
                    inCollapse = false;
                }
                if (inGroup && (e?.depth === undefined || e?.depth <= 0)) {
                    dom += '</div></div>';
                    inGroup = false;
                }
                
                if (e?.depth > 0) {
                    dom += `<div class="settings-group-collapse state-close" data-id="${ e.name }">`;
                } else {
                    dom += `<div class="settings-group" data-id="${ e.name }">`;
                }
            }
            dom += SettingsPanel.setItemAuto(e);
            if (e.type === 'object' && (e?.depth === undefined || e?.depth <= 1)) {
                if (e?.depth > 0) {
                    dom += (inCollapse ? '</div>' : '') + `<div class="settings-group-collapse-content">`;
                    inCollapse = true;
                } else {
                    dom += (inGroup ? '</div>' : '') + `<div class="settings-group-content">`;
                    inGroup = true;
                }
            }
        });
        if (inGroup) dom += '</div></div>';
        return dom;
    }

    static setItemUnknown(type = '', id = '', title = '', description = '', value = '') {
        return SettingsPanel.setItem(
            type, id, title, description,
            `<span class="settings-unknown-config-type">${ $t('settings.unknown_config_type') }</span>`
        );
    }

    static setItemString(type = '', id = '', title = '', description = '', value = '', attribute = undefined) {
        if (type === 'string.multiline') return SettingsPanel.setItemStringMultiLine(type, id, title, description, value);

        let inputDOM = '';
        if (attribute?.datalist === undefined || attribute.datalist.length === 0) {
            inputDOM = FHUIComponentInput.input(
                value,
                'text',
                {
                    id: id.replace(/\./g, '-'),
                    class: 'settings-value code'
                }
            );
        } else {
            inputDOM = FHUIComponentInput.inputSelect(
                value,
                attribute.datalist,
                {
                    id: id.replace(/\./g, '-'),
                    class: 'settings-value code',
                    option_description_fill_value: true,
                    option_width: attribute?.option_width
                }
            );
        }

        return SettingsPanel.setItem(
            type, id, title, description,
            FHUI.element(
                'label',
                {
                    class: 'settings-item-label',
                    for: id.replace(/\./g, '-')
                },
                title
            ) +
            inputDOM,
            `<div class="content hide"></div>`
        );
    }

    static setItemStringMultiLine(type = '', id = '', title = '', description = '', value = '') {
        // value = String(value).replace(/"/g, '&quot;');
        return SettingsPanel.setItem(
            type, id, title, description,
            `<label class="settings-item-label" for="${ id.replace(/\./g, '-') }">${ title }</label>`,
            `<div class="content">
                <textarea id="${ id.replace(/\./g, '-') }" class="settings-value code" aria-label="${ title }" data-default="${ encodeURIComponent(value) }">${ value }</textarea>
            </div>`
        );
    }

    static setItemNumber(type = '', id = '', title = '', description = '', value = '', attribute = undefined, unit = undefined) {
        return SettingsPanel.setItem(
            type, id, title, description,
            FHUI.element(
                'label',
                {
                    class: 'settings-item-label',
                    for: id.replace(/\./g, '-')
                },
                title
            ) +
            FHUIComponentInput.input(
                value,
                'number',
                {
                    id: id.replace(/\./g, '-'),
                    class: 'settings-value code',
                    after: {
                        label: unit ? $t('unit.' + unit) : undefined
                    },
                    attribute: {
                        max: attribute?.max !== undefined ? attribute.max : undefined,
                        min: attribute?.min !== undefined ? attribute.min : undefined,
                        step: attribute?.step !== undefined ? attribute.step : undefined
                    }
                }
            )
        );
    }

    static setItemBoolean(type = '', id = '', title = '', description = '', value = '', attribute = undefined, isBit = false) {
        value = String(value).replace(/"/g, '&quot;');
        return SettingsPanel.setItem(
            type, id, title, description,
            `<div class="settings-switch state-${ value ? 'on' : 'off' }" data-is-bit="${ isBit ? '1' : '0' }">
                ${
                    FHUIComponentButton.buttonGhost(
                        $t('ui.off'),
                        {
                            icon: 'material:toggle-switch-off-outline',
                            class: 'btn-switch btn-off'
                        }
                    )
                }
                ${
                    FHUIComponentButton.button(
                        $t('ui.on'),
                        {
                            icon: 'material:toggle-switch',
                            class: 'btn-switch btn-on'
                        }
                    )
                }
                <input type="hidden" id="${ id.replace(/\./g, '-') }" class="settings-value settings-switch-value" data-default="${ value }" value="${ value }">
            </div>`
        );
    }

    static setItemAllOrArrayString(type = '', id = '', title = '', description = '', value = '') {
        let list = [];
        let isAll = false;
        let listStr = '';
        if (value === 'all') {
            list = [];
            isAll = true;
        } else if (!Array.isArray(value)) {
            list = [];
        } else {
            list = value;
            listStr = list.filter(str => str.trim() !== '').map(str => str.trim()).join('\n');
        }

        return SettingsPanel.setItem(
            type, id, title, description,
            `<div class="settings-switch settings-switch-all-or-array-string state-${ isAll ? 'on' : 'off' }">
                ${
                    FHUIComponentButton.buttonGhost(
                        $t('ui.enable_all'),
                        {
                            icon: 'material:toggle-switch-off-outline',
                            class: 'btn-switch btn-off'
                        }
                    )
                }
                ${
                    FHUIComponentButton.button(
                        $t('ui.enable_all'),
                        {
                            icon: 'material:toggle-switch',
                            class: 'btn-switch btn-on'
                        }
                    )
                }
                <input type="hidden" id="${ id.replace(/\./g, '-') }-is-all" class="settings-value-enable-all settings-switch-value" data-default="${ isAll }" value="${ isAll }">
            </div>`,
            `<div class="content ${ isAll ? 'hide' : '' }">
                <div class="settings-value-list-box">
                    <textarea id="${ id.replace(/\./g, '-') }-list" class="settings-value-list code" data-default="${ isAll ? '' : encodeURIComponent(listStr) }">${ listStr }</textarea>
                </div>
            </div>`
        );
    }

    static setItemFontSize(type = '', id = '', title = '', description = '', value = '') {
        return SettingsPanel.setItem(
            type, id, title, description,
            FHUI.element(
                'label',
                {
                    class: 'settings-item-label',
                    for: id.replace(/\./g, '-')
                }
            ) +
            FHUIComponentInput.range(
                value,
                {
                    id: id.replace(/\./g, '-'),
                    name: id.replace(/\./g, '-'),
                    hasInput: true,
                    inputClass: 'settings-value code',
                    label: [
                        { value: 8, label: $t('config.accessibility.font_size.small') },
                        { value: 16, label: $t('config.accessibility.font_size.middle') },
                        { value: 24, label: $t('config.accessibility.font_size.large') },
                        { value: 32, label: $t('config.accessibility.font_size.extra_large') }
                    ],
                    attribute: {
                        min:8,
                        max: 32,
                        step: 2
                    }
                }
            )
        );
    }

    static linkBar(title = '', href = '', icon = undefined, data = {}) {
        data = {
            isDebug: false,
            debug: '',
            ...data
        };
        return `<a
            class="settings-link-bar ${ data.isDebug ? 'settings-link-debug' : ''}"
            href="${ href }"
            ${ !data.isDebug ? 'target="_blank"' : '' }
            ${ data.isDebug ? `data-debug="${ data.debug }"` : '' }
        >
            <div class="icon left">${ icon != undefined ? Icon.getIcon(icon) : '' }</div>
            <div class="title">${ title }</div>
            <div class="icon right">${ !data?.isDebug ? Icon.getIcon('material:open-in-new') : '' }</div>
        </a>`;
    }

    static linkBarGroupTitle(title = '', data = {}) {
        data = {
            isDebug: false,
            ...data
        };
        return `<div class="settings-link-bar-group-title ${ data.isDebug ? 'settings-link-debug' : ''}">${ title }</div>`;
    }

    /**
     * 消息框
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {String} icon 图标名称
     * @param {'info'|'warn'|'error'|'black'} type 类型
     * @returns {String} DOM
     */
    static msgBox(title = '', content = '', icon = 'material:information', type = 'info') {
        return `<div class="msgbox state-${ type }">
            <div class="icon" aria-hidden="true">${ Icon.getIcon(icon) }</div>
            <div class="text">
                <div class="title">${ title }</div>
                <div class="content">${ content }</div>
            </div>
        </div>`;
    }

    /**
     * 警告消息框
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {String} icon 图标名称
     * @returns {String} DOM
     */
    static msgBoxWarn(title = '', content = '', icon = 'material:alert') {
        return SettingsPanel.msgBox(title, content, icon, 'warn');
    }

    /**
     * 高对比度消息框
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {String} icon 图标名称
     * @returns {String} DOM
     */
    static msgBoxBlack(title = '', content = '', icon = 'information') {
        return SettingsPanel.msgBox(title, content, icon, 'black');
    }

    static searchResultList(data = []) {
        let dom = '';
        data.forEach((e, i) => {
            dom += SettingsPanel.searchResultItem(e, i);
        });
        return dom;
    }

    static searchResultItem(data = {}, index) {
        let ariaLabel = '';
        if (data.groupTitle.length === 0 || data.groupTitle === undefined) {
            ariaLabel = $t('config.search.aria_label.result', { index: index + 1, title: data.title });
        } else {
            ariaLabel = $t('config.search.aria_label.result_has_group', { index: index + 1, group: data.groupTitle, title: data.title });
        }
        return `<div class="settings-search-result-item" data-id="${ data.name }" role="link" aria-label="${ ariaLabel }" tabindex="0">
            <div class="group-title">${ data.groupTitle }</div>
            <div class="title">${ data.title }</div>
            <div class="description">${ data.description }</div>
        </div>`;
    }
}

class SettingsFileChecker {
    constructor() {}

    static default() {
        return `<div class="file-check-box">
            <span class="empty-message">${ $t('file.checker.default_file_loaded') }</span>
        </div>`;
    }

    static empty() {
        return `<div class="file-check-box">
            <span class="empty-message">${ $t('file.checker.empry') }</span>
        </div>`;
    }

    /**
     * 文件信息和状态
     * @param {File} file 文件
     * @param {'ok'|'warn'|'error'|'unknown'} state 状态
     * @param {String} stateMessage 状态消息
     * @returns {String} DOM
     */
    static fill(file, state = 'unknown', stateMessage = '') {
        const icons = {
            ok: 'material:check',
            warn: 'material:alert',
            error: 'material:close',
            unknown: 'material:help',
        };
        return `<div class="file-check-box">
            <div class="info">
                <div class="icon">${ Icon.getIcon('material:file-code-outline') }</div>
                <div class="meta">
                    <div class="name" title="${ $t('file.name') }">${ file.name }</div>
                    <div class="size" title="${ $t('file.size') }">${ EchoLiveTools.formatFileSize(file.size) }</div>
                    <div class="last-modified-date" title="${ $t('file.last_modified_date') }">${ EchoLiveTools.formatDate(file.lastModifiedDate || file.lastModified, 'date_time') }</div>
                </div>
            </div>
            <div class="state state-${ state }">
                <div class="icon">${ Icon.getIcon(icons[state]) }</div>
                <div class="message">${ stateMessage }</div>
            </div>
        </div>`;
    }

    static dialog(title = '', description = '', controller = '', icon = undefined, domClass = '') {
        return `<div class="file-check-dialog ${ domClass }">
            <div class="icon">${ icon != undefined ? Icon.getIcon(icon) : ''}</div>
            <div class="title">${ title }</div>
            <div class="description">${ description }</div>
            <div class="controller">${ controller }</div>
        </div>`;
    }

    static dialogSuccess(title = '', description = '', controller = '') {
        if (controller === '') {
            controller = EditorForm.button(
                $t('ui.ok'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:check')
                }
            );
        }
        return SettingsFileChecker.dialog(title, description, controller, 'material:check', 'state-success');
    }

    static dialogWarn(title = '', description = '', controller = '') {
        if (controller === '') {
            controller = EditorForm.button(
                $t('ui.close'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            );
        }
        return SettingsFileChecker.dialog(title, description, controller, 'material:alert', 'state-warn');
    }

    static dialogError(title = '', description = '', controller = '') {
        if (controller === '') {
            controller = EditorForm.button(
                $t('ui.close'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            );
        }
        return SettingsFileChecker.dialog(title, description, controller, 'material:close', 'state-error');
    }

    static dialogJSONParseFail() {
        return SettingsFileChecker.dialogWarn(
            $t('settings.config_input.json_parse_fail.title'),
            $t('settings.config_input.json_parse_fail.description'),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.json_parse_fail.unsafe_load'),
                {
                    id: 'btn-file-check-dialog-unsafe-load',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:shield-off'),
                    color: 'warn'
                }
            )
        );
    }

    static dialogUseChrome() {
        return SettingsFileChecker.dialogWarn(
            $t('file.dropper.dialog.use_chrome.title'),
            $t('file.dropper.dialog.use_chrome.description'),
            EditorForm.buttonGhost(
                $t('ui.close'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('file.dropper.dialog.use_chrome.goto'),
                {
                    id: 'btn-file-check-dialog-goto-chrome',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:open-in-new')
                }
            )
        );
    }

    static dialogUpdateConfig() {
        return SettingsFileChecker.dialogWarn(
            $t('settings.config_input.update_config.title'),
            $t('settings.config_input.update_config.description'),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-file-check-dialog-cancel-rollback',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.update_config.update'),
                {
                    id: 'btn-file-check-dialog-update-config',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:update')
                }
            )
        );
    }

    static dialogUpdateConfigFromUnknownVersion() {
        return SettingsFileChecker.dialogWarn(
            $t('settings.config_input.update_config_from_unknown_version.title'),
            $t('settings.config_input.update_config_from_unknown_version.description'),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-file-check-dialog-cancel-rollback',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.update_config_from_unknown_version.update'),
                {
                    id: 'btn-file-check-dialog-update-config-from-unknown-version',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:update'),
                    color: 'warn'
                }
            )
        );
    }

    static dialogConfigFromFuture() {
        return SettingsFileChecker.dialogWarn(
            $t('settings.config_input.config_from_future.title'),
            $t('settings.config_input.config_from_future.description'),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-file-check-dialog-cancel-rollback',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('settings.config_input.config_from_future.load'),
                {
                    id: 'btn-file-check-dialog-config-from-future',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:arrow-right'),
                    color: 'warn'
                }
            )
        );
    }

    static dialogImageFileSelected(filename = '') {
        return SettingsFileChecker.dialogSuccess(
            $t('file.dropper.dialog.selected.title'),
            $t('file.dropper.dialog.selected.description', { name: filename }),
            EditorForm.buttonGhost(
                $t('ui.cancel'),
                {
                    id: 'btn-file-check-dialog-cancel',
                    icon: Icon.getIcon('material:close'),
                    color: 'danger'
                }
            ) +
            EditorForm.button(
                $t('file.dropper.dialog.selected.import_image'),
                {
                    id: 'btn-file-check-dialog-import-image',
                    class: 'btn-default',
                    icon: Icon.getIcon('material:check')
                }
            )
        );
    }
}




class FHUINotice {
    constructor() {}

    static notice(message = '', title = '', type = 'info', data = {}) {
        const themes = {
            info: {
                icon: 'material:information',
                color: 'general'
            },
            success: {
                icon: 'material:check',
                color: 'safe'
            },
            alert: {
                icon: 'material:alert',
                color: 'warn'
            },
            warn: {
                icon: 'material:alert',
                color: 'warn'
            },
            error: {
                icon: 'material:close',
                color: 'danger'
            },
            fatal: {
                icon: 'material:alert-octagon',
                color: 'danger'
            },
            experimental: {
                icon: 'material:test-tube',
                color: 'special'
            },
            trophy: {
                icon: 'material:trophy',
                color: 'general'
            },
            tips: {
                icon: 'material:lightbulb-on',
                color: 'general'
            }
        };
        let theme = themes[type];
        if (theme === undefined) {
            theme = {
                icon: 'material:information',
                color: 'general'
            };
        }

        data = {
            animation: true,
            hasClick: false,
            icon: theme.icon,
            id: undefined,
            index: -1,
            waitTime: undefined,
            width: undefined,
            ...data
        };
        let iconDOM = Icon.getIcon(data.icon) !== undefined ? Icon.getIcon(data.icon) : Icon.getIcon('material:information');

        return `<div
                class="
                    fh-notice-item
                    fh-${ theme.color }
                    ${ data.animation ? 'fh-notice-ani-in' : '' }
                    ${ data.waitTime < 0 ? 'is-permanently' : '' }
                    ${ data.hasClick ? 'has-click' : '' }
                "
                data-index="${ data.index }"
                ${ data.id ? `data-id="${ data.id }"` : '' }
                style="${ data?.width !== undefined ? `--fh-notice-width-custom: ${ data.width };` : '' }"
            >
            <div class="fh-notice-item-container">
                <div class="fh-notice-item-content">
                    <div class="fh-notice-item-content-icon">
                        ${ iconDOM }
                    </div>
                    <div class="fh-notice-item-content-message">
                        ${ title !== '' ? `<div class="title">${ title }</div>` : '' }
                        <div class="message">${ message }</div>
                    </div>
                    <div class="fh-notice-item-content-action">
                        ${ EditorForm.buttonAir('', {
                            class: 'fh-notice-item-btn-close',
                            icon: Icon.getIcon('material:close'),
                            color: 'danger'
                        }) }
                    </div>
                </div>
                <div class="fh-notice-item-bg"></div>
            </div>
        </div>`;
    }
}

class FHUIWindow {
    constructor() {}

    /**
     * 对话窗口
     * @param {String} content 内容
     * @param {String} title 标题
     * @param {Object} data 数据
     * @param {String} data.attr 自定义属性
     * @param {String} data.autoFocusButton 自动获得焦点的按钮
     * @param {String} data.autoFocusFormItem 自动获得焦点的表单项
     * @param {Boolean} data.autoIconButton 自动设置按钮图标
     * @param {Boolean} data.closable 可关闭
     * @param {Boolean} data.hasInput 是否有输入框
     * @param {String} data.icon 标题栏图标
     * @param {String} data.id ID
     * @param {Number} data.index 索引编号
     * @param {Array<String|Object>} data.controller 控制器按钮
     * @param {Boolean} data.maskClosable 点击蒙层可关闭
     * @param {Boolean} data.modal 模态
     * @param {String} data.style 样式
     * @returns {String} DOM
     */
    static window(content = '', title = '', data = {}) {
        data = {
            attr: undefined,
            autoFocusButton: undefined,
            autoFocusFormItem: undefined,
            closable: true,
            icon: undefined,
            id: undefined,
            index: -1,
            controller: ['confirm'],
            maskClosable: false,
            modal: true,
            style: undefined,
            size: {
                width: '500px',
                height: '300px'
            },
            ...data
        }

        let iconDom = '';
        if (data.icon !== undefined && Icon.getIcon(data.icon) !== undefined) {
            iconDom = Icon.getIcon(data.icon);
        } else {
            iconDom = Icon.getIcon('material:information');
        }

        let dom = `<div
            role="dialog"
            ${ data.id !== undefined ? `id="${ data.id }"` : '' }
            class="fh-window window-show ${ data.hasInput ? 'fh-window-has-input' : '' }"
            style="
                --width: min(${ data.size.width }, calc(100vw - 32px));
                --height: min(${ data.size.height }, calc(100vh - 32px));
                ${ data.style ?? '' }
            "
            data-index="${ data.index }"
            ${ data.autoFocusButton !== undefined ? `data-auto-focus-button="${ data.autoFocusButton }"` : '' }
            ${ data.autoFocusFormItem !== undefined ? `data-auto-focus-form-item="${ data.autoFocusFormItem }"` : '' }
            ${ data.attr ?? '' }
        >
            <div class="fh-window-title">
                <span class="icon">
                    ${ iconDom }
                </span>
                <span class="title">
                    ${ title }
                </span>
                <button class="close" ${ !data.closable ? 'disabled' : '' }>
                    ${ Icon.getIcon('material:close') }
                </button>
            </div>
            <div class="fh-window-content">
                <div class="fh-msgbox-content">${ content }</div>
                <div class="fh-msgbox-controller fh-controller ${ data.controller.length > 3 ? 'controller-overload' : '' }">
                    ${ FHUIWindow.controller(data.controller, data.autoIconButton) }
                </div>
            </div>
        </div>`;

        if (data.modal) {
            dom = `<div
                class="
                    fh-window-modal-bg
                    window-show
                    ${ data.maskClosable ? 'fh-window-modal-bg-closable' : '' }
                "
                data-index="${ data.index }"
            >
                ${ dom }
            </div>`;
        }

        return dom;
    }

    static controller(data = [], autoIconButton = false) {
        let dom = '';
        data.forEach(e => {
            if (typeof e === 'object' && !Array.isArray(e)) {
                dom += FHUIWindow.controllerButton(e?.id, e?.content, e?.data, autoIconButton);
            } else if (typeof e === 'string') {
                if (e === 'no' && data.indexOf('cancel') !== -1) {
                    dom += FHUIWindow.controllerButton(e, undefined, {
                        color: 'warn'
                    }, autoIconButton);
                } else {
                    dom += FHUIWindow.controllerButton(e, undefined, {}, autoIconButton);
                }
            }
        });
        return dom;
    }

    static controllerButton(id, content = undefined, data = {}, autoIconButton = false) {
        const btnColorType = {
            cancel: 'danger',
            clear: 'danger',
            close: 'danger',
            delete: 'danger',
            no: 'danger',
            reset: 'danger'
        };
        const btnIcon = {
            cancel: 'material:close',
            close: 'material:close',
            confirm: 'material:check',
            download: 'material:download',
            no: 'material:close',
            yes: 'material:check',
        }

        let colorType = btnColorType[id];
        let icon = autoIconButton ? btnIcon[id] : undefined;
        if (content === undefined) content = $t('ui.' + id);
        data = {
            class: 'fh-window-controller-button fh-window-controller-button-' + id,
            color: colorType,
            attribute: {
                data: {
                    'controller-id': id
                }
            },
            icon: icon,
            ...data
        }

        return FHUIComponentButton.button(content, data);
    }

    static releasesView(releasesData) {
        return `<div class="releases-view">
            <div class="releases-view-meta">
                <div class="title">${ releasesData?.tag_name ?? '?' }</div>
                <div class="meta">
                    <div class="created-at">发布时间：${ EchoLiveTools.formatDate(releasesData?.created_at) }</div>
                    <div class="author">作者：${ releasesData?.author?.login }</div>
                </div>
            </div>
            <div class="releases-view-body markdown-body">${ marked.parse(releasesData?.body) }</div>
        </div>`;
    }

    static assetsSelectorsView(assets) {
        let dom = '';
        assets.forEach(e => {
            dom += `<div class="assets-item"><a class="fh-link" href="${ e?.browser_download_url }" target="_blank">${ EchoLiveTools.safeHTML(e?.name) }</a></div>`;
        });
        return `<div class="assets-list">${ dom }</div>`;
    }
}


class MetaInfo {
    constructor() {}

    static linkList(data, translateFallback, translateData = {}) {
        if (data === undefined) return $t('ui.empty');
        if (!Array.isArray(data)) data = [data];
        let isFirst = true;
        let dom = '';
        const comma = $t('localization.comma');

        data.forEach(e => {
            if (typeof e === 'string') e = { name: e };
            
            e = {
                name: undefined,
                url: undefined,
                ...e
            };
            if (e.name === undefined) e.name = $t(translateFallback);
            if (isFirst) {
                isFirst = false;
            } else {
                dom += comma;
            }
            if (e.url !== undefined) {
                dom += FHUI.element(
                    'a',
                    {
                        target: '_blank',
                        href: e.url,
                        referrerpolicy: 'no-referrer'
                    },
                    EchoLiveTools.safeHTML($tc(e.name, translateData))
                );
            } else {
                dom += FHUI.element(
                    'span',
                    {},
                    EchoLiveTools.safeHTML($tc(e.name, translateData))
                );
            }
            
        });

        return dom;
    }
}