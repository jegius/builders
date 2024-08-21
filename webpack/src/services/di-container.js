const container = new Map();

export function registerService(name, instance) {
    container.set(name, instance);
    console.log(instance)
}

export function getService(name) {
    return container.get(name);
}