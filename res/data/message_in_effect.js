echoLiveSystem.registry.loadRegistry('message_in_effect', e => {
    e.name = e.value.replace(/\-/g, '_');
    return e.name;
}, [
    {
        value: 'none',
    }, {
        value: 'fade-in'
    }, {
        value: 'move-from-up'
    }, {
        value: 'move-from-down'
    }, {
        value: 'move-from-left'
    }, {
        value: 'move-from-right'
    }, {
        value: 'blur-in'
    }
]);