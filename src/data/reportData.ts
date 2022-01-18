import { AskPriority, IReportData } from "../typings/types";
import { W, WN } from './constants';
import { config } from '../config';
//上报工具
type TrackerOptions = {
    logUrl: string;
}

class ReportData implements IReportData {
    private logUrl: string;
    constructor(options: TrackerOptions) {
        const { logUrl } = options;
        if (logUrl) {
            this.logUrl = logUrl;
        } else {
            throw new Error('请传递要记录数据的路由接口');
        }
    }

    public sendToAnalytics(level: AskPriority, body: string | object, url: string) {
        if (url) {
            this.logUrl = url; //临时更换其他URL
        }
        let logurl = this.logUrl;
        if (level == AskPriority.URGENT) {
            //紧急日志
            if (!!W.fetch) {
                fetch(logurl, {
                    headers: {
                        'module': config.module.toString()
                    }, body: body.toString(), method: 'POST', keepalive: true
                }); // fetch方法优先级最高
            } else {
                let xhr: XMLHttpRequest | null = new XMLHttpRequest();
                // 设置请求头
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('module', config.module.toString());
                xhr.send(body.toString()); // 发送参数
                xhr.onload = function (e) {
                    //及时清理以防多次创建
                    xhr = null;
                }
            }
        } else if (level == AskPriority.IDLE) {
            if (!!WN.sendBeacon) {
                navigator.sendBeacon(logurl, body.toString()); //sendBeacon()方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能
            } else {
                let img: HTMLImageElement | null = new Image();
                img.src = `${logurl}?body=${body}`;
                img.onload = function () {
                    img = null; //统计完成收回创建的元素防止内存泄露
                };
            }
        }
    }
}
export default ReportData;