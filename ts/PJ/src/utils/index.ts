export const nextTick = (callback: Function) => {
    setTimeout(callback, 16);
};
