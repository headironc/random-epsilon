"use client";

import { useMemo } from "react";
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
            const response = await fetch(
                "/api/patients/east-courtyard/herbal-pharmacy",
                {
                    method: "POST",
                },
            );

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const { result }: { result: NewFakePatient | NewFakePatient[] } =
                await response.json();

            console.log(result);

            if (Array.isArray(result)) {
                const patients = result.map<NewPatient>(item => ({
                    id: item.ID,
                    name: item.BRXM,
                    prescriptionType: item.CFLX,
                    invoice: item.FPHM,
                    callSign: item.JHBZ,
                    pharmacy: item.YFSB,
                    callTime: item.HJRQ,
                    signInNumber: Number(item.QDXH),
                    signInTime: item.QDRQ,
                    signInType: item.QDLX,
                    benefited: item.SFYM === "1",
                }));

                return patients;
            }

            if (!result?.FPHM) return [];

            const patient: NewPatient = {
                id: result.ID,
                name: result.BRXM,
                prescriptionType: result.CFLX,
                invoice: result.FPHM,
                callSign: result.JHBZ,
                pharmacy: result.YFSB,
                callTime: result.HJRQ,
                signInNumber: Number(result.QDXH),
                signInTime: result.QDRQ,
                signInType: result.QDLX,
                benefited: result.SFYM === "1",
            };

            return [patient];
        },
        refetchInterval: 1000 * 2,
    });

    const patients = useMemo(() => {
        if (!data) {
            return [];
        }

        const cache = data
            .filter(patient => patient.pharmacy === "7")
            .sort((a, b) => a.signInNumber - b.signInNumber);

        const patients = new Map<string, NewPatient>(
            cache.map(patient => [patient.signInNumber.toString(), patient]),
        );

        return Array.from(patients.values());
    }, [data]);

    if (error) {
        return <ErrorComponent message={error.message} />;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Layout title="中药房">
            <main className="flex h-full flex-col justify-between">
                <HerbalPharmacy patients={patients} pharmacy="7" />
            </main>
        </Layout>
    );
}
