export interface NewPatient {
    id: number;
    // 药房
    // 2代表草药房(药剂科)，7代表东院草药房(药剂科)
    pharmacy: PharmacyType;
    // 1代表已叫号，0代表未叫号
    callSign: CallSignNumber;
    // 发票号
    invoice: string;
    // 病人姓名
    name: string;
    // 签到时间
    signInTime: string;
    // 签到类型, 0代表未喊号，1代表已喊号
    signInType: SignType;
    // 签到序号
    signInNumber: number;
    // 处方类型，1代表西药，2代表中成药，3代表中草药
    prescriptionType: PrescriptionType;
    // 叫号时间
    callTime?: string;
}

export interface OldPatient {
    name: string;
    invoice: string;
    callSign: CallSign;
    signInNumber: number;
    signInTime: string;
    window: Window;
}

export enum CallSign {
    Called = "1",
    NotCalled = "0",
}

export enum CallSignNumber {
    Called = 1,
    NotCalled = 0,
}

export interface OldFakePatient {
    BRXM: string;
    CKH: Window;
    FPHM: string;
    JHBZ: CallSign;
    XH: string;
    QDSJ: string;
}

export enum Window {
    One = "1",
    Two = "2",
    Three = "3",
}

export interface NewFakePatient {
    YFSB: PharmacyType;
    JHBZ: CallSignNumber;
    FPHM: string;
    BRXM: string;
    QDRQ: string;
    QDLX: SignType;
    QDXH: number;
    CFLX: PrescriptionType;
    HJRQ?: string;
    ID: number;
}

export enum PharmacyType {
    // 西药房
    WesternMedicine = 2,
    // 草药房
    ChineseHerbalMedicine = 7,
}

export enum SignType {
    Signed = 1,
    NotSigned = 0,
}

export enum PrescriptionType {
    // 西药
    WesternMedicine = 1,
    // 中成药
    ChinesePatentDrug = 2,
    // 中草药
    ChineseHerbalMedicine = 3,
}
