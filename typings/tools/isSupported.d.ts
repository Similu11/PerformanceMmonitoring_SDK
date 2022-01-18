/**
 * 如果浏览器支持Navigation Timing API，则为True
 * 用户计时API和PerformanceObserver接口
 * 在Safari中，用户计时API（performance.mark（））不可用
 * 因此，DevTools时间线不会用标记进行注释。
 * 开发者：developer.mozilla.org/en-US/docs/Web/API/Performance/mark
 *         developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
 *         developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType
 */
export declare const isPerformanceSupported: () => boolean;
//# sourceMappingURL=isSupported.d.ts.map