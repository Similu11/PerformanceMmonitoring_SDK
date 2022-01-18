/**
 * True if the browser supports the Navigation Timing API,
 * User Timing API and the PerformanceObserver Interface.
 * In Safari, the User Timing API (performance.mark()) is not available,
 * so the DevTools timeline will not be annotated with marks.
 * Support: developer.mozilla.org/en-US/docs/Web/API/Performance/mark
 * Support: developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
 * Support: developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType
 *
 * getEntriesByType  可以通过在显式时间点进行性能标记或度量（例如，通过调用mark（）方法）来创建列表的成员（条目）。
 * PerformanceObserver() 构造函数使用给定的观察者 callback 生成一个新的 PerformanceObserver 对象.当通过 observe() 方法注册的 条目类型 的 性能条目事件 被记录下来时,调用该观察者回调
 */
export declare const isPerformanceSupported: () => boolean;
//# sourceMappingURL=isSupported.d.ts.map