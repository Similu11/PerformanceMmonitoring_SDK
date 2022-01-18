import { W } from '../data/constants';

export const roundByTwo = (num: number) => {
    return parseFloat(num.toFixed(2));
};

export const convertToKB = (bytes: number): number | null => {
    if (typeof bytes !== 'number') {
        return null;
    }
    return roundByTwo(bytes / Math.pow(1024, 2));
};

/**
 * 推送任务至 requestIdleCallback
 * window.requestIdleCallback()方法插入一个函数，这个函数将在浏览器空闲时期被调用。
 * 这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。
 * 函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。
 * 强烈建议使用timeout选项进行必要的工作，否则可能会在触发回调之前经过几秒钟 
*/

export const pushTask = (cb: any): void => {
    if ('requestIdleCallback' in W) {
        (W as any).requestIdleCallback(cb, { timeout: 3000 });
    } else {
        cb();
    }
};