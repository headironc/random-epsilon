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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

import { Pagination } from "~/types";
import { OldPatient } from "~/types/patient";

interface Query extends Pagination {}

export default function Pharmacy(props: {
    patients: OldPatient[];
    pharmacy: OldPatient["pharmacy"];
}) {
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

    console.log(voice);

    const [call, setCall] = useState<OldPatient | undefined>();

    useEffect(() => {
        if (!call) {
            setCall(props.patients.find(patient => patient.callSign === "1"));
        }
    }, [props.patients, call]);

    const [query, setQuery] = useState<Query>({
        limit: 12,
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

        const placeholder = Array<OldPatient>(add).fill({
            pharmacy: props.pharmacy,
            window: "1",
            callSign: "0",
            invoice: "",
            name: "",
            signInNumber: 0,
            signInTime: "",
            benefited: false,
        });

        const patients: OldPatient[] = [
            ...props.patients,
            ...placeholder,
        ].slice(query.offset * query.limit, (query.offset + 1) * query.limit);

        return {
            count,
            patients,
        };
    }, [props.patients, query.limit, query.offset, props.pharmacy]);

    call && console.log(call);

    const setCallSign = (invoice: string, callSign: OldPatient["callSign"]) => {
        patients.forEach(patient => {
            if (patient.invoice === invoice) {
                patient.callSign = callSign;
            }
        });
    };

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

    return (
        <>
            <div className="grid grid-cols-2">
                <Patients
                    patients={patients.slice(0, 6)}
                    offset={query.offset}
                    pageCount={pageCount}
                />
                <Patients
                    patients={patients.slice(6, 12)}
                    offset={query.offset}
                    pageCount={pageCount}
                />
            </div>
            <div className="flex items-center justify-center">
                <span className="text-6xl">
                    准备中 Preparing{" "}
                    {pageCount !== 0 &&
                        `第 ${query.offset + 1} / ${pageCount} 页`}
                </span>
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

const columns: ColumnDef<OldPatient>[] = [
    {
        header: "签到序号",
        accessorKey: "signInNumber",
        size: 400,
    },
    {
        header: "姓名",
        accessorKey: "name",
        size: 536,
        cell: ({ getValue, row }) => {
            const name = getValue<string>();

            return (
                <>
                    {name.length > 2
                        ? name.charAt(0) +
                          name.slice(1, name.length - 1).replace(/./g, "*") +
                          name.charAt(name.length - 1)
                        : name.charAt(0) + name.slice(1).replace(/./g, "*")}

                    {row.original.benefited ? "（优待）" : ""}
                </>
            );
        },
    },
];

function Patients(props: {
    patients: OldPatient[];
    offset: number;
    pageCount: number;
}) {
    const table = useReactTable({
        data: props.patients,
        pageCount: props.pageCount,
        state: {
            pagination: {
                pageSize: 6,
                pageIndex: props.offset,
            },
        },
        manualPagination: true,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table>
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
    call: OldPatient;
    setCall: Dispatch<SetStateAction<OldPatient | undefined>>;
    open: boolean;
    voice: SpeechSynthesisVoice | undefined;
    setCallSign: (invoice: string, callSign: OldPatient["callSign"]) => void;
}) {
    const mutation = useMutation({
        mutationKey: ["patients", "cancel", call.invoice],
        mutationFn: () =>
            fetch(`/api/patients/east-courtyard/pharmacy/call`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fphm: call.invoice,
                }),
            }),
        onSuccess: () => {
            setCall(undefined);
            setCallSign(call.invoice, "0");
        },
    });

    useTts({
        children: `请${call.signInNumber}号${call.name}${call.benefited ? "（优待）" : ""}到西药房${call.window}号窗口取药`,
        voice,
        rate: 0.75,
        onEnd: () => mutation.mutate(),
        autoPlay: true,
        onError: message => console.error(message),
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
                    }到西药房${call.window}号窗口取药`}</span>
                </div>
            </DialogContent>
        </Dialog>
    );
}
