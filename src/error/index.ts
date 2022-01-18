import { config } from '../config';
import { W } from '../data/constants';
//rrweb在这里引入
import { record, pack } from 'rrweb';
import { AskPriority } from '../typings/types';
type ErrorInfo = {};

class ErrorTrace {
    private errordefo: ErrorInfo;
    private eventsMatrix: Array<[]>;
    constructor() {
        this.errordefo = {};
        this.eventsMatrix = [[]];
    }
    //全局捕获同步+异步错误
    private globalError() {
        W.onerror = (
            eventOrMessage: Event | string,
            scriptURL?: string,
            lineno?: number,
            colno?: number,
            error?: Error
        ): boolean => {
            const errorInfo = JSON.stringify({
                scriptURL,
                lineno,
                colno,
                error,
                module: config.module
            });
            //通过错误信息还原sourcemap源文件地址
            config.reportData.sendToAnalytics(AskPriority.URGENT, errorInfo, config.logUrl);
            const len = this.eventsMatrix.length;
            let events = [];
            if (len > 1) {
                events = this.eventsMatrix[len - 2].concat(this.eventsMatrix[len - 1]);
            } else {
                events = this.eventsMatrix[0];
            }
            const body = JSON.stringify({ events, module: config.module });
            config.reportData.sendToAnalytics(AskPriority.IDLE, body, config.rrwebUrl);
            this.eventsMatrix = [[]];
            this.recordPage();
            return true;
        }
    }

    //资源挂载失败 如404png
    private networkError() {
        W.addEventListener('error', function (e: ErrorEvent) {
            if (e.target !== W) {
                console.log('网络错误', e.target);
                //这里看是否需要上报，资源404是否需要上报
            }
        }, true);
    }

    //异步Promise错误
    private promiseError() {
        W.addEventListener('unhandledrejection', function (e) {
            e.preventDefault();
            console.log('promiseError', e.reason);
            return true;
        })
    }

    //iframe加载错误
    private iframeError() {
        const frames = W.frames;
        for (let i = 0; i < frames.length; i++) {
            frames[i].addEventListener('error', (e) => {
                console.log('iframe加载错误', e);
            }, true);
            frames[i].addEventListener('unhandledrejection', function (e) {
                console.log('iframe错误_unhandledrejection', e);
            }, true)
        }
    }

    private consoleReflect() {
        const console_error = W.console.error;
        W.console.error = function () {
            // config.reportData.sendToAnalytics(AskPriority.IDLE, 'console_error','');
            // console_error.apply(window, arguments);
        };
    }

    private recordPage() {
        if (config.isRrweb) {
            let eventsMatrix = this.eventsMatrix;
            record({
                emit(event: never, isCheckout) {
                    // isCheckout 是一个标识，告诉你重新制作了快照
                    if (isCheckout) {
                        eventsMatrix.push([]);
                    }
                    const lastEvents = eventsMatrix[eventsMatrix.length - 1];
                    lastEvents.push(event);
                },
                checkoutEveryNth: 10, // 每 10 个 event 重新制作快照
                packFn: pack,
            });
        }
    }
    public run() {
        this.networkError();
        //触发全体数据监听错误
        this.globalError();
        //触发promise的错误
        this.promiseError();
        this.recordPage();
    }
}

export default ErrorTrace;