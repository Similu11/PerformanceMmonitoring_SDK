import { WP } from '../data/constants';
import { isPerformanceSupported } from '../helpers/isSupported';
import { IYidengNavigationTiming } from '../typings/types';
/**
 * Navigation Timing API provides performance metrics for HTML documents.
 * Navigation Timing API为HTML文档提供了性能指标。
 * w3c.github.io/navigation-timing/
 * developers.google.com/web/fundamentals/performance/navigation-and-resource-timing
 */

export const getNavigationTiming = (): IYidengNavigationTiming => {
    if (!isPerformanceSupported()) {
        return {};
    }
    // There is an open issue to type correctly getEntriesByType
    // github.com/microsoft/TypeScript/issues/33866
    // 这里直接的物理赋值performance.timing 已被弃用
    const n = WP.getEntriesByType('navigation')[0] as any;
    // In Safari version 11.2 Navigation Timing isn't supported yet
    if (!n) {
        return {};
    }
    const responseStart = n.responseStart;
    const responseEnd = n.responseEnd;
    //我们缓存navigation time以备将来使用
    return {
        // fetchStart marks when the browser starts to fetch a resource
        // 浏览器开始获取资源时的fetchStart标记
        // responseEnd is when the last byte of the response arrives
        // responseEnd是响应的最后一个字节到达的时间
        fetchTime: responseEnd - n.fetchStart,
        // Service worker time plus response time
        // Service worker时间加上响应时间
        workerTime: n.workerStart > 0 ? responseEnd - n.workerStart : 0,
        // Request plus response time (network only)
        // 请求加上响应时间（仅限网络）
        totalTime: responseEnd - n.requestStart,
        // Response time only (download)
        // 仅响应时间（下载）
        downloadTime: responseEnd - responseStart,
        // Time to First Byte (TTFB)
        // 到第一个字节的时间（TTFB）
        timeToFirstByte: responseStart - n.requestStart,
        // HTTP header size
        // HTTP头大小
        headerSize: n.transferSize - n.encodedBodySize || 0,
        //DNS解析时间
        dnsLookupTime: n.domainLookupEnd - n.domainLookupStart,
        //TCP建立时间
        tcpTime: n.connectEnd - n.connectStart || 0,
        // 白屏时间
        whiteTime: n.responseStart - n.navigationStart || 0,
        //dom渲染完成时间
        domTime: n.domContentLoadedEventEnd - n.navigationStart || 0,
        //页面onload时间
        loadTime: n.loadEventEnd - n.navigationStart || 0,
        //页面解析dom耗时
        parseDomTime: n.domComplete - n.domInteractive || 0,
    };
};