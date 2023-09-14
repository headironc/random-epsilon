"use client";

import { useQuery } from "@tanstack/react-query";

import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import ErrorComponent from "~/components/Error";
import HerbalPharmacy from "~/components/HerbalPharmacy";

import { NewFakePatient, NewPatient } from "~/types/patient";

export default function Page() {
    const { data, isLoading, error } = useQuery<
        NewPatient[],
        Error,
        NewPatient[],
        string[]
    >({
        queryKey: ["patients", "east-courtyard/herbal-pharmacy"],
        queryFn: async () => {
            const response = await fetch("/api/patients/herbal-pharmacy", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const [object]: [
                | NewFakePatient
                | {
                      DATA: NewFakePatient[];
                  },
            ] = await response.json();

            if ("DATA" in object) {
                const patients = object.DATA.map<NewPatient>(item => ({
                    id: item.ID,
                    name: item.BRXM,
                    prescriptionType: item.CFLX,
                    invoice: item.FPHM,
                    callSign: item.JHBZ,
                    pharmacy: item.YFSB,
                    callTime: item.HJRQ,
                    signInNumber: item.QDXH,
                    signInTime: item.QDRQ,
                    signInType: item.QDLX,
                }));

                return patients;
            }

            const patient: NewPatient = {
                id: object.ID,
                name: object.BRXM,
                prescriptionType: object.CFLX,
                invoice: object.FPHM,
                callSign: object.JHBZ,
                pharmacy: object.YFSB,
                callTime: object.HJRQ,
                signInNumber: object.QDXH,
                signInTime: object.QDRQ,
                signInType: object.QDLX,
            };

            return [patient];
        },
        refetchInterval: 1000 * 1,
    });

    if (error) {
        return <ErrorComponent message={error.message} />;
    }

    if (isLoading) {
        return <Loading />;
    }

    const patients = data.filter(
        patient => patient.pharmacy === 2 && patient.prescriptionType === 3,
    );

    return (
        <Layout title="草药房">
            <main className="flex h-full flex-col justify-between">
                <HerbalPharmacy patients={patients} />
            </main>
        </Layout>
    );
}
