import { NextResponse } from "next/server";
import { fa, fakerZH_CN as faker } from "@faker-js/faker";

import {
    CallSignNumber,
    NewFakePatient,
    PharmacyType,
    PrescriptionType,
    SignType,
} from "~/types/patient";

const newFakePatient = (): NewFakePatient => ({
    BRXM: faker.person.fullName(),
    CFLX: faker.helpers.enumValue(PrescriptionType),
    FPHM: faker.string.numeric(8), // 发票号码
    ID: faker.number.int(),
    JHBZ: faker.helpers.enumValue(CallSignNumber),
    QDLX: faker.helpers.enumValue(SignType),
    QDRQ: faker.date.recent().toISOString(),
    QDXH: faker.number.int(),
    YFSB: faker.helpers.enumValue(PharmacyType),
});

export const patients: NewFakePatient[] = Array.from(
    { length: 0 },
    newFakePatient,
).sort((a, b) => a.QDXH - b.QDXH);

export const setCallSign = (FPHM: string, JHBZ: CallSignNumber) => {
    patients.forEach(patient => {
        if (patient.FPHM === FPHM) {
            patient.JHBZ = JHBZ;
        }
    });
};

export async function POST() {
    patients.push({
        QDXH: Number(patients[patients.length - 1]?.QDXH || 0) + 1,
        BRXM: faker.person.fullName(),
        CFLX: 3,
        FPHM: faker.string.numeric(8), // 发票号码
        ID: faker.number.int(),
        JHBZ: CallSignNumber.NotCalled,
        QDLX: faker.helpers.enumValue(SignType),
        QDRQ: faker.date.recent().toISOString(),
        YFSB: faker.helpers.enumValue(PharmacyType),
        HJRQ: faker.date.recent().toISOString(),
    });

    if ([8, 12, 16, 22, 33, 44, 55, 66, 77].includes(patients.length)) {
        patients.push({
            QDXH: Number(patients[patients.length - 1]?.QDXH || 0) + 1,
            BRXM: faker.person.fullName(),
            CFLX: 3,
            FPHM: faker.string.numeric(8), // 发票号码
            ID: faker.number.int(),
            JHBZ: CallSignNumber.Calling,
            QDLX: faker.helpers.enumValue(SignType),
            QDRQ: faker.date.recent().toISOString(),
            YFSB: faker.helpers.enumValue(PharmacyType),
            HJRQ: faker.date.recent().toISOString(),
        });
    }

    return NextResponse.json([
        {
            DATA: patients,
        },
    ]);
}
