import { cls } from '../data/metrics';
import { IPerformanceEntry } from '../typings/types';
/**
 * 检测新的布局移位事件并更新 `cumulativeLayoutShiftScore`变量。
 */

export const initLayoutShift = (performanceEntries: IPerformanceEntry[]) => {
    const lastEntry = performanceEntries.pop();
    // 仅统计没有最近用户输入的布局移位
    if (lastEntry && !lastEntry.hadRecentInput && lastEntry.value) {
        cls.value += lastEntry.value;
    }
};