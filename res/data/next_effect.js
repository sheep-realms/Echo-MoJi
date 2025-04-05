echoLiveSystem.registry.loadRegistry('next_effect', e => {
    e.name = e.value.replace(/\-/g, '_');
    return e.name;
}, [
    {
        value: 'none',
    }, {
        value: 'fade'
    }, {
        value: 'move-from-up'
    }, {
        value: 'move-from-down'
    }, {
        value: 'blur'
    }
]);