import { IYidengData, IVitalsScore } from '../typings/types';
/**https://web.dev/vitals/
 * Web 指标是 Google 开创的一项新计划
 * TTFB 是衡量资源请求与响应的第一个字节开始到达之间的时间的度量
 * FP 首次绘制
 * FMP 首次有效绘制
 * TTI 交互时间 (性能分析点)
 * FCP(首次内容绘制) 指标测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间。
 * LCP(最大内容绘制) 指标会根据页面首次开始加载的时间点来报告可视区域内可见的最大图像或文本块完成渲染的相对时间
 * FID 测量从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间
 * TTI 指标测量页面从开始加载到主要子资源完成渲染，并能够快速、可靠地响应用户输入所需的时间
 * TBT (总阻塞时间) 指标测量First Contentful Paint 首次内容绘制 (FCP)与Time to Interactive 可交互时间 (TTI)之间的总时间，这期间，主线程被阻塞的时间过长，无法作出输入响应
 * CLS (累积布局偏移)测量视觉稳定性的一个以用户为中心的重要指标，因为该项指标有助于量化用户经历意外布局偏移的频率，较低的 CLS 有助于确保一个页面是令人愉悦的
 * 
 */
const fcpScore = [1000, 2500];
const lcpScore = [2500, 4000];
const fidcore = [100, 300];
const clsScore = [0.1, 0.25];
const tbtScore = [300, 600];

export const webVitalsScore: Record<string, number[]> = {
    fp: fcpScore,
    fcp: fcpScore,
    lcp: lcpScore,
    lcpFinal: lcpScore,
    fid: fidcore,
    fidVitals: fidcore,
    cls: clsScore,
    clsFinal: clsScore,
    tbt: tbtScore,
    tbt5S: tbtScore,
    tbt10S: tbtScore,
    tbtFinal: tbtScore,
};

export const getVitalsScore = (
    measureName: string,
    value: IYidengData
  ): IVitalsScore => {
    if (!webVitalsScore[measureName]) {
      return null;
    }
    if (value <= webVitalsScore[measureName][0]) {
      return 'good';
    }
    return value <= webVitalsScore[measureName][1] ? 'needsImprovement' : 'poor';  // needsImprovement 需要改进   poor 贫穷的
  };