import { NextResponse } from "next/server";
import { fakerZH_CN as faker } from "@faker-js/faker";

import { CallSign, OldFakePatient, Window } from "~/types/patient";

const newFakePatient = (): OldFakePatient => ({
    BRXM: faker.person.fullName(),
    FPHM: faker.string.numeric(8), // 发票号码
    CKH: faker.helpers.enumValue(Window), // 窗口号
    JHBZ: faker.helpers.enumValue(CallSign), // 叫号标志
    QDSJ: faker.date.recent().toISOString(), // 签到时间
    XH: faker.string.numeric({ length: { min: 2, max: 4 }, exclude: ["0"] }), // 签到序号
});

const patients: OldFakePatient[] = Array.from(
    { length: 0 },
    newFakePatient,
).sort((a, b) => Number(a.XH) - Number(b.XH));

export async function POST() {
    patients.push({
        XH: (Number(patients[patients.length - 1]?.XH || 0) + 1).toString(),
        BRXM: faker.person.fullName(),
        FPHM: faker.string.numeric(8), // 发票号码
        CKH: faker.helpers.enumValue(Window), // 窗口号
        JHBZ: faker.helpers.enumValue(CallSign), // 叫号标志
        QDSJ: faker.date.recent().toISOString(), // 签
    });

    return NextResponse.json({
        result: patients,
    });
}
