interface Navigator{
    estimated:any;
    storage: any;
    deviceMemory?: number;
    hardwareConcurrency?: number;
    connection?: string;
    effectiveType?: string;
    serviceWorker?: {
        controller?: string;
    };
    sendBeacon?: any;
}
export const W = window;
export const C = W.console;
export const D = document;
export const WN = (W.navigator as unknown) as Navigator; //获取用户浏览器信息
export const WP = W.performance; //Performance API允许网页访问某些函数来测量网页和Web应用程序的性能
//内存
export const getDM = () => WN.deviceMemory ?? 0;
//cpu核数
export const getHC = () => WN.hardwareConcurrency ?? 0;
