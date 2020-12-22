function createState(target) {
    this.modified = false; // 是否被修改
    this.target = target; // 目标对象
    this.copy = undefined; // 拷贝的对象
}

createState.prototype = {
    // 对于get操作,如果目标对象没有被修改直接返回原对象,否则返回拷贝对象
    get: function (key) {
        if (!this.modified) return this.target[key];
        return this.copy[key];
    },
    // 对于set操作,如果目标对象没被修改那么进行修改操作,否则修改拷贝对象
    set: function (key, value) {
        console.log(key)
        console.log(this.modified)
        if (!this.modified) this.markChanged();
        return (this.copy[key] = value);
    },
    // 标记状态为已修改,并拷贝
    markChanged: function () {
        if (!this.modified) {
            this.modified = true;
            this.copy = shallowCopy(this.target);
        }
    },
};
// 拷贝函数
function shallowCopy(value) {
    if (Array.isArray(value)) return value.slice();
    if (value.__proto__ === undefined)
        return Object.assign(Object.create(null), value);
    return Object.assign({}, value);
}


const PROXY_STATE = Symbol('proxy-state');
const handler = {
    get(target, key) {
        if (key === PROXY_STATE) return target;
        return target.get(key);
    },
    set(target, key, value) {
       
        return target.set(key, value);
    },
};
// 接受一个目标对象和一个操作目标对象的函数
function produce(state, producer) {
    const store = new createState(state);
    const proxy = new Proxy(store, handler);
    producer(proxy);
    console.log(proxy)
    const newState = proxy[PROXY_STATE];
    console.log(newState)
    if (newState.modified) return newState.copy;
    return newState.target;
}


const baseState = [
    {
        todo: 'Learn typescript',
        done: true,
    },
    {
        todo: 'Try immer',
        done: false,
    },
];
const nextState = produce(baseState, draftState => {
    draftState.push({ todo: 'Tweet about it', done: false });
    draftState.push({ todo: '222222222', done: false });
    draftState[1].done = true;
});
console.log(baseState, nextState);