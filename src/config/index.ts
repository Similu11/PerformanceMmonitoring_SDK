import ReportData from "../data/reportData";
import { IYidengConfig, IReportData } from "../typings/types";

export const config: IYidengConfig = {
    logUrl:"",
    reportData: new ReportData({ logUrl: 'hole' }),
    isResourceTiming: false,
    isElementTiming: false,
    maxTime: 15000,
    isRrweb:false,
    rrwebUrl:"",
    permaceUrl:"",
    module:''
}