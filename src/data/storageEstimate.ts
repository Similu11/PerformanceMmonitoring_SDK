import { logData } from './log';
import { convertToKB } from '../helpers/utils';
/**
 * StorageManager接口的estimate（）方法询问Storage Manager应用程序占用的存储空间（使用量）和可用空间（配额）。
 */

export const reportStorageEstimate = (storageInfo: StorageEstimate) => {
    const estimateUsageDetails =
        'usageDetails' in storageInfo ? (storageInfo as any).usageDetails : {};
    logData('storageEstimate', {
        quota: convertToKB((storageInfo as any).quota),
        usage: convertToKB((storageInfo as any).usage),
        caches: convertToKB(estimateUsageDetails.caches),
        indexedDB: convertToKB(estimateUsageDetails.indexedDB),
        serviceWorker: convertToKB(estimateUsageDetails.serviceWorkerRegistrations),
    });
};