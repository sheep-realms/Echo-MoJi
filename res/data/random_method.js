echoLiveSystem.registry.loadRegistry('random_method', e => {
    e.name = e.value.replace(/\-/g, '_');
    return e.name;
}, [
    {
        value: 'average',
    }, {
        value: 'weighted',
    }
]);