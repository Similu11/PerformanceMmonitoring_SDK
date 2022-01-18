import { config } from '../config';
import { getNavigatorInfo } from '../helpers/getNavigatorInfo';
import { visibility } from '../helpers/onVisibilityChange';
import { pushTask } from '../helpers/utils';
import { getVitalsScore } from '../helpers/vitalsScore';

/**
 * Sends the User timing measure to analyticsTracker
 * 将用户定时测量发送到
 */

export const reportPerf = function (
    measureName: string,//被测量的名称
    data: any,
    customProperties?: object //定制属性
): void {
    pushTask(() => {
        // 当页面被隐藏的时候不报告具体数据，这里是为了处理用户切走界面时的问题
        if ((visibility.isHidden && measureName.indexOf('Final') < 0) || !config.analyticsTracker) {
            return;
        }
        //将度量发送到自定义分析服务
        config.analyticsTracker({
            metricName: measureName, //指标名称
            data,
            eventProperties: customProperties || {}, //事件属性
            navigatorInformation: getNavigatorInfo(), //导航信息
            vitalsScore: getVitalsScore(measureName, data), //指标分数
        });
    })
}