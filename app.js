const APP_META = {
    name: 'Echo-MoJi',
    version: '1.0.0',
    isBeta: true
};

if (typeof window !== 'undefined') {
    window.APP_META = APP_META;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APP_META };
}