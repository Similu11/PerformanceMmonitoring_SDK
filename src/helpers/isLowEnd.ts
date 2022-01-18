import { getDM, getHC } from '../data/constants';
import { EffectiveConnectionType } from '../typings/types';

export const getIsLowEndDevice = (): boolean => {
    //如果可运行线程的逻辑处理器数<=4
    if (getHC() && getHC() <= 4) {
        return true;
    }

    //如果RAM客户端设备的近似数量小于等于4
    if (getDM() && getDM() <= 4) {
        return true;
    }
    return false;
}

export const getIsLowEndExperience = (
    et: EffectiveConnectionType,
    sd: boolean,
): boolean => {
    //如果连接的有效类型为 'slow-2g', '2g', '3g', or '4g' is !== 4g
    switch (et) {
        case 'slow-2g':
            return true;
            break;
        case '2g':
            return true;
            break;
        case '3g':
            return true;
            break;
        default:
            // 数据保存程序首选项
            return getIsLowEndDevice() || sd;
    }
}
