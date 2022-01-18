declare class collectInfo {
    private v;
    private reportData;
    constructor(options?: IYidengOptions);
}
export default collectInfo;

declare type EffectiveConnectionType = '2g' | '3g' | '4g' | '5g' | 'slow-2g' | 'lte';

declare interface IAnalyticsTrackerOptions {
    module?: string;
    metricName: string;
    data: IYidengData;
    eventProperties: object;
    navigatorInformation: INavigatorInfo;
    vitalsScore: IVitalsScore;
}

declare interface INavigatorInfo {
    deviceMemory?: number;
    hardwareConcurrency?: number;
    isLowEndDevice?: boolean;
    isLowEndExperience?: boolean;
    serviceWorkerStatus?: 'controlled' | 'supported' | 'unsupported';
}

declare type IVitalsScore = 'good' | 'needsImprovement' | 'poor' | null;

/**
 * @param isResourceTiming  - 是否开启资源数据
 * @param isElementTiming - 是否开启性能数据
 * @param analyticsTracker - 自定义分析工具
 * @param analyticsTracker - void方法参数IAnalyticsTrackerOptions
 * @param maxTime  - 最大请求时间
 * @interface 系统配置接口
 */
declare type IYidengData = number | IYidengNavigationTiming | IYidengNetworkInformation;

declare interface IYidengNavigationTiming {
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

declare interface IYidengNetworkInformation {
    downlink?: number;
    effectiveType?: EffectiveConnectionType;
    onchange?: () => void;
    rtt?: number;
    saveData?: boolean;
}

declare interface IYidengOptions {
    captureError?: boolean;
    resourceTiming?: boolean;
    elementTiming?: boolean;
    analyticsTracker?: (options: IAnalyticsTrackerOptions) => void;
    maxMeasureTime?: number;
    logUrl?: string;
    rrwebUrl?: string;
    permaceUrl: string;
    isRrweb?: boolean;
    module?: string;
}

export { }
