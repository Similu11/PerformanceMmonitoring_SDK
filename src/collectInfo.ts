/**
 * 一款免费的开源性能监控SDK
 * 目前能够完成监控的指标包含FCP等
 * 
 */
import { config } from './config';
import { IReportData, IYidengOptions } from './typings/types';
import ReportData from './data/reportData';
import analyticsTracker from './data/analyticsTracker';
import ErrorTrace from './error';
import { isPerformanceSupported } from './tools/isSupported';
import { getNavigationTiming } from './performance/getNavigationTiming';
import { D, W, WN, WP } from './data/constants';
import {
    disconnectPerfObserversHidden,
    initPerformanceObserver,
} from './performance/observe';
import { didVisibilityChange } from './helpers/onVisibilityChange';
import { logData } from './data/log';
import { getNetworkInformation } from './helpers/getNetworkInformation';
import { reportStorageEstimate } from './data/storageEstimate';
export default class collectInfo {
    private v = '1.0.0';
    private reportData: IReportData;
    constructor(options: IYidengOptions = { permaceUrl: '', rrwebUrl: '', module: "" }) {
        // 扩展基础配置
        const logUrl = options.logUrl; //数据上报服务地址
        if (!logUrl) {
            throw new Error(`小石头系统监控平台${this.v}提示未传递上报服务地址`);
        }
        //向后台输送数据
        const insReportData = new ReportData({
            logUrl,
        });
        config.reportData = insReportData;
        //对外暴露上传接口
        this.reportData = insReportData;
        //集合数据汇总
        const _analyticsTracker = options.analyticsTracker;
        if (_analyticsTracker) {
            config.analyticsTracker = _analyticsTracker; //若用户传入分析器，则使用用户的分析器
        } else {
            config.analyticsTracker = analyticsTracker;
        }
        config.isResourceTiming = !!options.resourceTiming;
        config.isElementTiming = !!options.elementTiming;
        config.maxTime = options.maxMeasureTime || config.maxTime;
        config.isRrweb = options.isRrweb || config.isRrweb;
        config.rrwebUrl = options.rrwebUrl || config.rrwebUrl;
        config.permaceUrl = options.permaceUrl || config.permaceUrl;
        config.logUrl = options.logUrl || config.logUrl;
        config.module = options.module || config.module;
        if (options.captureError) {
            //开启错误跟踪
            const errorTrace = new ErrorTrace();
            errorTrace.run();
        }

        //如果浏览器不支持性能指标只能放弃
        if (!isPerformanceSupported()) {
            return;
        }

        //浏览器支持的起FRP这样的Observer统计性能
        if ('PerformanceObserver' in W) {
            initPerformanceObserver();
        }
        //初始化
        if (typeof D.hidden !== 'undefined') {
            //Opera 12.10和Firefox 18及更高版本支持
            D.addEventListener(
                'visibilitychange',
                didVisibilityChange.bind(this, disconnectPerfObserversHidden)
            );
        }
        //记录系统DNS请求+白屏时间等
        logData('navigationTiming', getNavigationTiming());
        //记录用户的网速 H5+多普勒测速
        logData('networkInformation', getNetworkInformation());
        //管理离线缓存数据
        if (WN && WN.storage && typeof WN.storage.estimate === 'function') {
            WN.storage.estimate().then(reportStorageEstimate);
        }
    }
}