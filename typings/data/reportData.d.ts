import { AskPriority, IReportData } from "../typings/types";
declare type TrackerOptions = {
    logUrl: string;
};
declare class ReportData implements IReportData {
    private logUrl;
    constructor(options: TrackerOptions);
    sendToAnalytics(level: AskPriority, body: string | object, url: string): void;
}
export default ReportData;
//# sourceMappingURL=reportData.d.ts.map