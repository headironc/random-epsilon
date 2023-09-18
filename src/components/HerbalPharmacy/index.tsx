"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useTts } from "tts-react";
import { useMutation } from "@tanstack/react-query";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

import { Pagination } from "~/types";
import { CallSign, NewPatient } from "~/types/patient";

interface Query extends Pagination {}

export default function HerbalPharmacy(props: { patients: NewPatient[] }) {
    const wait = props.patients.filter(patient => patient.signInType === 0);
    const take = props.patients.filter(patient => patient.signInType === 1);

    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(
        speechSynthesis.getVoices() ?? [],
    );

    useEffect(() => {
        const handler = () => setVoices(speechSynthesis.getVoices());

        speechSynthesis.addEventListener("voiceschanged", handler);

        return () =>
            speechSynthesis.removeEventListener("voiceschanged", handler);
    }, []);

    const voice = useMemo(
        () => voices.find(voice => voice.lang === "zh-CN"),
        [voices],
    );

    const [call, setCall] = useState<NewPatient | undefined>();

    useEffect(() => {
        if (!call) {
            setCall(take.find(patient => patient.callSign === "1"));
        }
    }, [call, take]);

    const setCallSign = (invoice: string, callSign: CallSign) => {
        take.forEach(patient => {
            if (patient.invoice === invoice) {
                patient.callSign = callSign;
            }
        });
    };

    return (
        <>
            <div className="grid h-full grid-cols-2 gap-x-4">
                <Patients patients={wait} title="准备中 Preparing" />
                <Patients patients={take} title="请取药 Ready" />
            </div>
            {call && (
                <Call
                    call={call}
                    setCall={setCall}
                    open={true}
                    voice={voice}
                    setCallSign={setCallSign}
                />
            )}
        </>
    );
}

const columns: ColumnDef<NewPatient>[] = [
    {
        header: "签到序号",
        accessorKey: "signInNumber",
        size: 400,
    },
    {
        header: "姓名",
        accessorKey: "name",
        size: 528,
        cell: ({ getValue }) => {
            const name = getValue<string>();

            return (
                <>
                    {name.length > 2
                        ? name.charAt(0) +
                          name.slice(1, name.length - 1).replace(/./g, "*") +
                          name.charAt(name.length - 1)
                        : name.charAt(0) + name.slice(1).replace(/./g, "*")}
                </>
            );
        },
    },
];

type Title = "请取药 Ready" | "准备中 Preparing";

function Patients(props: { patients: NewPatient[]; title: Title }) {
    const [query, setQuery] = useState<Query>({
        limit: 6,
        offset: 0,
    });

    const { patients, count } = useMemo(() => {
        const count = props.patients.length;

        let add =
            count === 0
                ? query.limit
                : count % query.limit === 0
                ? 0
                : query.limit - (count % query.limit);

        const placeholder = Array<NewPatient>(add).fill({
            callSign: CallSign.NotCalled,
            invoice: "",
            name: "",
            id: 0,
            pharmacy: 7,
            prescriptionType: 3,
            signInNumber: 0,
            signInTime: "",
            signInType: 0,
            callTime: "",
        });

        const patients: NewPatient[] = [
            ...props.patients,
            ...placeholder,
        ].slice(query.offset * query.limit, (query.offset + 1) * query.limit);

        return {
            count,
            patients,
        };
    }, [props.patients, query.limit, query.offset]);

    const pageCount = useMemo(
        () => Math.ceil(count / query.limit),
        [count, query.limit],
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.offset + 1 < pageCount) {
                setQuery({
                    ...query,
                    offset: query.offset + 1,
                });
            } else {
                setQuery({
                    ...query,
                    offset: 0,
                });
            }
        }, 8000);

        return () => clearTimeout(timer);
    }, [query, pageCount]);

    const table = useReactTable({
        data: patients,
        pageCount: pageCount,
        state: {
            pagination: {
                pageSize: query.limit,
                pageIndex: query.offset,
            },
        },
        manualPagination: true,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table>
            <TableCaption>
                <div className="flex items-center justify-center gap-x-8 py-5">
                    <span className="text-5xl">{props.title}</span>
                    <span className="text-4xl">
                        {pageCount !== 0 &&
                            `第 ${query.offset + 1} / ${pageCount} 页`}
                    </span>
                </div>
            </TableCaption>
            <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                                <TableHead
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className="p-4 text-center text-4xl"
                                    style={{
                                        width: header.column.getSize(),
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map(row => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map(cell => {
                            return (
                                <TableCell
                                    key={cell.id}
                                    className="h-32 text-center text-6xl"
                                >
                                    {cell.getValue()
                                        ? flexRender(
                                              cell.column.columnDef.cell,
                                              cell.getContext(),
                                          )
                                        : ""}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function Call({
    call,
    setCall,
    open,
    voice,
    setCallSign,
}: {
    call: NewPatient;
    setCall: Dispatch<SetStateAction<NewPatient | undefined>>;
    open: boolean;
    voice: SpeechSynthesisVoice | undefined;
    setCallSign: (invoice: string, callSign: CallSign) => void;
}) {
    const mutation = useMutation({
        mutationKey: ["patients", "cancel", call.invoice],
        mutationFn: () =>
            fetch(`/api/patients/herbal-pharmacy/${call.invoice}`, {
                method: "PATCH",
            }),
        onSuccess: () => {
            setCall(undefined);
            setCallSign(call.invoice, CallSign.NotCalled);
        },
    });

    useTts({
        children: `请${call.signInNumber}号${call.name}到草药房3号窗口取药`,
        voice,
        rate: 0.75,
        onEnd: () => mutation.mutate(),
        autoPlay: true,
    });

    return (
        <Dialog open={open}>
            <DialogTrigger className="hidden">Open</DialogTrigger>
            <DialogContent>
                <div className="px-6 py-12 text-center">
                    <span className="text-8xl tracking-wide">{`请${
                        call.signInNumber
                    }号${
                        call.name.charAt(0) +
                        call.name.slice(1).replace(/./g, "*")
                    }到草药房3号窗口取药`}</span>
                </div>
            </DialogContent>
        </Dialog>
    );
}
