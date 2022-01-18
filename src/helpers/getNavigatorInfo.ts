import { getDM, getHC, WN } from '../data/constants';
import { et, sd } from './getNetworkInformation';
import { getIsLowEndDevice, getIsLowEndExperience } from './isLowEnd';
import { INavigatorInfo } from '../typings/types';
/**
 * 如下信息来源于 window.navigator:
 * 1. Device Memory  只读属性返回千兆字节为单位的大概的机器内存
 * 2. Hardware Concurency  返回可在用户计算机上运行线程的逻辑处理器数
 * 
 * Service workers 本质上充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器。
 * 这个 API 旨在创建有效的离线体验，它会拦截网络请求并根据网络是否可用来采取适当的动作、更新来自服务器的的资源。
 * 它还提供入口以推送通知和访问后台同步 API。
 * 
 * 3. Status of the service worker:
 *     - controlled: a service worker is controlling the page     --service worker正在控制页面
 *     - supported: the browser supports service worker     浏览器支持service worker
 *     - unsupported: the user's browser does not support service worker   用户的浏览器不支持service worker
 */
export const getNavigatorInfo = function (): INavigatorInfo {
    if (WN) {
        return {
            deviceMemory: getDM() || 0,
            hardwareConcurrency: getHC() || 0,
            serviceWorkerStatus:
                'serviceWorker' in WN
                    ? WN.serviceWorker!.controller
                        ? 'controlled'
                        : 'supported'
                    : 'unsupported',
            isLowEndDevice:getIsLowEndDevice(),
            isLowEndExperience: getIsLowEndExperience(et, sd),
        }
    }
    return {}
}
