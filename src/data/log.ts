import { config } from "../config";
import { reportPerf } from '../data/reportPerf';
import { roundByTwo } from '../helpers/utils';

export const logData = (
    measureName: string,
    metric: any,
    customProperties?: object
): void => {
    Object.keys(metric).forEach((key) => {
        if (typeof metric[key] === 'number') {
            metric[key] = roundByTwo(metric[key]);
        }
    });
    //将度量发送到外部跟踪服务
    reportPerf(measureName, metric, customProperties);
}

/**
 * 
 * 将度量持续时间分派到内部日志和外部时间跟踪服务中
 */

export const logMetric = (
    duration: number, //持续时间
    measureName: string, //测试名称
    customProperties?: object //定制属性
): void => {
    const duration2Decimal = roundByTwo(duration); //持续2分钟
    if (duration2Decimal <= config.maxTime && duration2Decimal >= 0) {
        // 从内部或者外部的报告工具报告指标数据
        reportPerf(measureName, duration2Decimal, customProperties);
    }
}
