import { D } from '../data/constants';

export const visibility = {
    isHidden: false,
};
/**
 * 
 * 从visibilitychange listener，它仅在页面隐藏时保存，因为在发送计时或记录时，不要使用错误的“隐藏”值很重要。
 */
export const didVisibilityChange = function (cb: Function) {
    if (D.hidden) {
        cb();
        visibility.isHidden = D.hidden;
    }
};