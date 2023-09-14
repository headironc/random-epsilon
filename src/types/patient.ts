export interface NewPatient {
    id: number;
    // 药房
    // 2代表草药房(药剂科)，7代表东院草药房(药剂科)
    pharmacy: 2 | 7;
    // 1代表已叫号，0代表未叫号
    callSign: 0 | 1;
    // 发票号
    invoice: string;
    // 病人姓名
    name: string;
    // 签到时间
    signInTime: string;
    // 签到类型, 0代表未喊号，1代表已喊号
    signInType: 0 | 1;
    // 签到序号
    signInNumber: number;
    // 处方类型，1代表西药，2代表中成药，3代表中草药
    prescriptionType: 1 | 2 | 3;
    // 叫号时间
    callTime?: string;
}

export interface OldPatient {
    name: string;
    invoice: string;
    callSign: 0 | 1;
    signInNumber: number;
    signInTime: string;
    window: Window;
}

export enum CallSign {
    Called = 1,
    NotCalled = 0,
}

export interface OldFakePatient {
    BRXM: string;
    CKH: Window;
    FPHM: string;
    JHBZ: 0 | 1;
    XH: string;
    QDSJ: string;
}

export enum Window {
    One = "1",
    Two = "2",
    Three = "3",
}

export interface NewFakePatient {
    YFSB: 2 | 7;
    JHBZ: 0 | 1;
    FPHM: string;
    BRXM: string;
    QDRQ: string;
    QDLX: 0 | 1;
    QDXH: number;
    CFLX: 1 | 2 | 3;
    HJRQ?: string;
    ID: number;
}
