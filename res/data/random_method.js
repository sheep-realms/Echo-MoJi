echoLiveSystem.registry.loadRegistry('random_method', e => {
    e.name = e.value.replace(/\-/g, '_');
    return e.name;
}, [
    {
        value: 'forward',
    }, {
        value: 'backward',
    }, {
        value: 'average',
    }, {
        value: 'weighted',
    }
]);
