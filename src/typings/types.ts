/**
 * @param isResourceTiming  - 是否开启资源数据
 * @param isElementTiming - 是否开启性能数据
 * @param analyticsTracker - 自定义分析工具
 * @param analyticsTracker - void方法参数IAnalyticsTrackerOptions
 * @param maxTime  - 最大请求时间
 * @interface 系统配置接口
 */

export type IYidengData = | number | IYidengNavigationTiming | IYidengNetworkInformation;

export type IVitalsScore = 'good' | 'needsImprovement' | 'poor' | null;

export type EffectiveConnectionType = | '2g' | '3g' | '4g' | '5g' | 'slow-2g' | 'lte';

//性能指标具体请求类型
export type IPerformanceEntryInitiatorType =
    | 'beacon'
    | 'css'
    | 'fetch'
    | 'img'
    | 'other'
    | 'script'
    | 'xmlhttprequest';

//性能指标参数
export type IPerformanceObserverType =
    | 'first-input'
    | 'largest-contentful-paint'
    | 'layout-shift'
    | 'longtask'
    | 'measure'
    | 'navigation'
    | 'paint'
    | 'element'
    | 'resource';

export interface IReportData {
    sendToAnalytics(level: AskPriority, body: string | object, url: string): void;
}

export interface IYidengOptions {
    captureError?: boolean; //捕获错误
    resourceTiming?: boolean; //资源定时
    elementTiming?: boolean; //元素
    //分析器
    analyticsTracker?: (options: IAnalyticsTrackerOptions) => void;
    //日志
    maxMeasureTime?: number; //最大测量时间
    logUrl?: string;
    rrwebUrl?: string;
    permaceUrl: string;
    isRrweb?:boolean; //是否开启录制
    module?:string;
}

export interface IAnalyticsTrackerOptions {
    time?:string;
    module?:string;
    metricName: string;  //指标名称
    data: IYidengData;
    eventProperties: object;
    navigatorInformation: INavigatorInfo;
    vitalsScore: IVitalsScore;
}


export interface INavigatorInfo {
    deviceMemory?: number;
    hardwareConcurrency?: number;
    isLowEndDevice?: boolean;
    isLowEndExperience?: boolean;
    serviceWorkerStatus?: 'controlled' | 'supported' | 'unsupported';
}

export interface IYidengNetworkInformation {
    downlink?: number;
    effectiveType?: EffectiveConnectionType;
    onchange?: () => void;
    rtt?: number;
    saveData?: boolean;
}

export interface IYidengNavigationTiming {
    fetchTime?: number;
    workerTime?: number;
    totalTime?: number;
    downloadTime?: number;
    timeToFirstByte?: number;
    headerSize?: number;
    dnsLookupTime?: number;
    tcpTime?: number;
    whiteTime?: number;
    domTime?: number;
    loadTime?: number;
    parseDomTime?: number;
}

export interface IYidengConfig {
    reportData: IReportData;
    isResourceTiming: boolean;
    isElementTiming: boolean;
    analyticsTracker?: (options: IAnalyticsTrackerOptions) => void;
    logUrl: string;
    maxTime: number;
    isRrweb:boolean;
    rrwebUrl:string;
    permaceUrl:string;
    module:string;
}

//消耗时间类型
export interface IYidengDataConsumption {
    beacon: number;
    css: number;
    fetch: number;
    img: number;
    other: number;
    script: number;
    total: number;
    xmlhttprequest: number;
}

//度量指标数据
export interface IMetricMap {
    [measureName: string]: boolean;
}

export declare interface IPerformanceEntry {
    decodedBodySize?: number;
    duration: number;
    entryType: IPerformanceObserverType;
    initiatorType?: IPerformanceEntryInitiatorType;
    loadTime: number;
    name: string;
    renderTime: number;
    startTime: number;
    hadRecentInput?: boolean;
    value?: number;
    identifier?: string;
}

export interface IPerfObservers {
    [measureName: string]: any;
}

// https://wicg.github.io/event-timing/#sec-performance-event-timing
export interface PerformanceEventTiming extends PerformanceEntry {
    processingStart: DOMHighResTimeStamp;
    target?: Node;
}
//请求响应优先级
export enum AskPriority {
    URGENT = 1, //紧急的
    IDLE = 2,  //闲置的
}