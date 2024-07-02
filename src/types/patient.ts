export interface NewPatient {
    /**
     * 病人id
     */
    id: string;
    /**
     * 药房 1 北关门诊药房（药剂科） 2 北关草药房（药剂科） 6 雅居门诊药房（药剂科） 7 雅居草药房（药剂科）
     */
    pharmacy: "1" | "2" | "6" | "7";
    /**
     * 叫号 1代表叫号，0代表未叫号，2代表已叫号
     */
    callSign: "0" | "1" | "2";
    /**
     * 发票号
     */
    invoice: string;
    /**
     * 病人姓名
     */
    name: string;
    /**
     * 签到时间
     */
    signInTime: string;
    /**
     * 签到类型 0代表未签到，1代表已签到
     */
    signInType: "0" | "1";
    /**
     * 签到序号
     */
    signInNumber: number;
    /**
     * 处方类型 1 西药 2 中成药 3 中草药
     */
    prescriptionType: "1" | "2" | "3";
    /**
     * 叫号时间
     */
    callTime?: string;
    /**
     * 是否优勉
     */
    benefited: boolean;
}

export interface OldPatient {
    /**
     * 药房类型 1 北关门诊药房（药剂科） 2 北关草药房（药剂科） 6 雅居门诊药房（药剂科） 7 雅居草药房（药剂科）
     */
    pharmacy: "1" | "2" | "6" | "7";
    /**
     * 签到序号
     */
    signInNumber: number;
    /**
     * 窗口
     */
    window: "1" | "2" | "3";
    /**
     * 叫号标志
     */
    callSign: "0" | "1";
    /**
     * 病人姓名
     */
    name: string;
    /**
     * 发票号
     */
    invoice: string;
    /**
     * 签到时间
     */
    signInTime: string;
    /**
     * 是否优勉
     */
    benefited: boolean;
}

export interface OldFakePatient {
    /**
     * 药房类型 1 北关门诊药房（药剂科） 2 北关草药房（药剂科） 6 雅居门诊药房（药剂科） 7 雅居草药房（药剂科）
     */
    YFSB: "1" | "2" | "6" | "7";
    XH: string;
    CKH: "1" | "2" | "3";
    JHBZ: "0" | "1";
    BRXM: string;
    FPHM: string;
    QDSJ: string;
    SFYM: "0" | "1";
}

export interface NewFakePatient {
    /**
     * 药房类型 1 北关门诊药房（药剂科） 2 北关草药房（药剂科） 6 雅居门诊药房（药剂科） 7 雅居草药房（药剂科）
     */
    YFSB: "1" | "2" | "6" | "7";
    /**
     * 叫号标志 0代表未叫号，1代表已叫号，2代表叫号
     */
    JHBZ: "0" | "1" | "2";
    FPHM: string;
    BRXM: string;
    QDRQ: string;
    /**
     * 签到类型 0代表未签到，1代表已签到
     */
    QDLX: "0" | "1";
    QDXH: string;
    /**
     * 处方类型 1 西药 2 中成药 3 中草药
     */
    CFLX: "1" | "2" | "3";
    HJRQ?: string;
    ID: string;
    /**
     * 是否优勉
     */
    SFYM: "0" | "1";
}
