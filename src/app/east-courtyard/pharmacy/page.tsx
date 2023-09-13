"use client";

import { useQuery } from "@tanstack/react-query";

import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import ErrorComponent from "~/components/Error";
import Pharmacy from "~/components/east-courtyard/Pharmacy";

import { OldFakePatient, Patient } from "~/types/patient";

export default function Page() {
    const { data, isLoading, error } = useQuery<
        Patient[],
        Error,
        Patient[],
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
                const patients = result.map<Patient>(item => ({
                    window: item.CKH,
                    callSign: item.JHBZ,
                    invoice: item.FPHM,
                    name: item.BRXM,
                    signInNumber: Number(item.XH),
                    signInTime: item.QDSJ,
                }));

                return patients;
            }

            const patient: Patient = {
                invoice: result.FPHM,
                name: result.BRXM,
                callSign: result.JHBZ,
                signInNumber: Number(result.XH),
                window: result.CKH,
                signInTime: result.QDSJ,
            };

            return [patient];
        },
        refetchInterval: 1000 * 3,
    });

    if (error) {
        return <ErrorComponent message={error.message} />;
    }

    if (isLoading) {
        return <Loading />;
    }

    const patients = data;

    return (
        <Layout title="西药房">
            <main>
                <Pharmacy patients={patients} />
            </main>
        </Layout>
    );
}
