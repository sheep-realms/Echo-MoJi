echoLiveSystem.registry.loadRegistry('message_out_effect', e => {
    e.name = e.value.replace(/\-/g, '_');
    return e.name;
}, [
    {
        value: 'none',
    }, {
        value: 'fade-out'
    }, {
        value: 'move-to-up'
    }, {
        value: 'move-to-down'
    }, {
        value: 'move-to-left'
    }, {
        value: 'move-to-right'
    }, {
        value: 'blur-out'
    }
]);