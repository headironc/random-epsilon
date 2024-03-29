"use client";

import { useQuery } from "@tanstack/react-query";

import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import ErrorComponent from "~/components/Error";
import Pharmacy from "~/components/east-courtyard/Pharmacy";

import { OldFakePatient, OldPatient } from "~/types/patient";

export default function Page() {
    const { data, isLoading, error } = useQuery<
        OldPatient[],
        Error,
        OldPatient[],
        string[]
    >({
        queryKey: ["patients", "east-courtyard/pharmacy"],
        queryFn: async () => {
            const response = await fetch(
                "/api/patients/east-courtyard/pharmacy",
                {
                    method: "POST",
                },
            );

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const {
                result,
            }: {
                result: OldFakePatient | OldFakePatient[];
            } = await response.json();

            if (Array.isArray(result)) {
                const patients = result.map<OldPatient>(item => ({
                    window: item.CKH,
                    callSign: item.JHBZ,
                    invoice: item.FPHM,
                    name: item.BRXM,
                    signInNumber: Number(item.XH),
                    signInTime: item.QDSJ,
                }));

                return patients;
            }

            if (!result.FPHM) {
                return [];
            }

            const patient: OldPatient = {
                invoice: result.FPHM,
                name: result.BRXM,
                callSign: result.JHBZ,
                signInNumber: Number(result.XH),
                window: result.CKH,
                signInTime: result.QDSJ,
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

    const patients = data.sort((a, b) => a.signInNumber - b.signInNumber);

    return (
        <Layout title="西药房">
            <main className="flex h-full flex-col justify-between">
                <Pharmacy patients={patients} />
            </main>
        </Layout>
    );
}
