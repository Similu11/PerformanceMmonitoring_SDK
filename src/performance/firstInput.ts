import { logData, logMetric } from '../data/log';
import { cls, lcp, rt, tbt } from '../data/metrics';
import { perfObservers } from './observeInstances';
import { poDisconnect } from './performanceObserver';
import { PerformanceEventTiming } from '../typings/types';
export const initFirstInputDelay = (
    performanceEntries: PerformanceEventTiming[]
) => {
    //取最后的一位即为我们希望所获取的时间点
    const lastEntry = performanceEntries.pop();
    if (lastEntry) {
        //核心Web Vitals FID逻辑
        // 测量输入事件的延迟操作
        logMetric(lastEntry.processingStart - lastEntry.startTime, 'fidVitals', {
            performanceEntry: lastEntry,
        });
        // 传统的FID逻辑
        // 测量处理第一个输入事件的持续时间
        logMetric(lastEntry.duration, 'fid', {
            performanceEntry: lastEntry,
        });
    }

    // 销毁对FID的注册回调 避免过多的观察者造成内存泄露
    poDisconnect(1);
    //初始化lcp
    logMetric(lcp.value, 'lcp');

    if (perfObservers[3] && typeof perfObservers[3].takeRecords === 'function') {
        perfObservers[3].takeRecords();
    }
    logMetric(cls.value, 'cls');
    logMetric(tbt.value, 'tbt');

    //FID后有5秒延迟的TBT
    setTimeout(() => {
        logMetric(tbt.value, `tbt5S`);
    }, 5000);

    //FID后10秒延迟的TBT
    setTimeout(() => {
        logMetric(tbt.value, `tbt10S`);
        //FID被激活以后10S的整体数据消耗
        logData('dataConsumption', rt.value);
    }, 10000);
}