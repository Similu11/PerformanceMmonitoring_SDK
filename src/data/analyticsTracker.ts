//分析器
import { IAnalyticsTrackerOptions, AskPriority } from "../typings/types";
import { config } from "../config";
const analyticsTracker = (options: IAnalyticsTrackerOptions): void => {
    const {
        metricName,
        eventProperties,
        data,
        navigatorInformation,
        vitalsScore
    } = options;
    options.module = config.module;
    config.reportData.sendToAnalytics(AskPriority.IDLE, options, config.permaceUrl);//上传性能指标
};
export default analyticsTracker;