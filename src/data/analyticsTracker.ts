//分析器
import { IAnalyticsTrackerOptions, AskPriority } from "../typings/types";
import { config } from "../config";
import dayjs from "dayjs";
const analyticsTracker = (options: IAnalyticsTrackerOptions): void => {
    const {
        metricName,
        eventProperties,
        data,
        navigatorInformation,
        vitalsScore
    } = options;
    options.module = config.module;
    options.time = dayjs().format('YYYY-MM-DD hh:mm:ss');
    config.reportData.sendToAnalytics(AskPriority.IDLE, options, config.permaceUrl);//上传性能指标
};
export default analyticsTracker;