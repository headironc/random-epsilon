import { useEffect, useMemo, useState } from "react";
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

import { Pagination } from "~/types";
import { Patient } from "~/types/patient";

interface Query extends Pagination {}

const columns: ColumnDef<Patient>[] = [
    {
        header: "签到序号",
        accessorKey: "signInNumber",
        size: 400,
    },
    {
        header: "姓名",
        accessorKey: "name",
        size: 528,
    },
];

export default function Pharmacy(props: { patients: Patient[] }) {
    const wait = props.patients
        .filter(patient => patient.callSign === 0)
        .sort((a, b) => a.signInNumber - b.signInNumber);

    const take = props.patients
        .filter(patient => patient.callSign === 1)
        .sort((a, b) => a.signInNumber - b.signInNumber);

    return (
        <div className="grid grid-cols-2 gap-x-4">
            <Patients type="wait" patients={wait} />
            <Patients type="take" patients={take} />
        </div>
    );
}

type Title = "请取药" | "准备中";
type Status = "Ready" | "Preparing";

export type Type = "take" | "wait";

const typeRecord: Record<Type, { title: Title; status: Status }> = {
    take: {
        title: "请取药",
        status: "Ready",
    },
    wait: {
        title: "准备中",
        status: "Preparing",
    },
};

function Patients(props: { type: Type; patients: Patient[] }) {
    let type = typeRecord[props.type];

    const [query, setQuery] = useState<Query>({
        limit: 6,
        offset: 0,
    });

    const { patients, count } = useMemo(() => {
        const count = props.patients.length;

        let add =
            count === 0
                ? 6
                : count % query.limit === 0
                ? 0
                : query.limit - (count % query.limit);

        const placeholder = Array(add).fill({
            window: "",
            callSign: 0,
            invoice: "",
            name: "",
            signInNumber: 0,
            signInTime: "",
        });

        return {
            count,
            patients: [...props.patients, ...placeholder],
        };
    }, [props.patients]);

    const pageCount = useMemo(
        () => Math.ceil(count / query.limit),
        [count, query.limit],
    );

    const current = useMemo(
        () =>
            patients.slice(
                query.offset * query.limit,
                query.offset * query.limit + query.limit,
            ),
        [patients, query],
    );

    const table = useReactTable({
        data: current,
        columns,
        pageCount,
        state: {
            pagination: {
                pageSize: query.limit,
                pageIndex: query.offset,
            },
        },
        getCoreRowModel: getCoreRowModel(),
    });

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
        <Table>
            <TableCaption className="p-4">
                <div className="flex items-center justify-center gap-x-8">
                    <div className="flex items-center gap-x-8 text-4xl">
                        <span>{type.title}</span>
                        <span>{type.status}</span>
                    </div>
                    <span className="text-3xl">
                        第 {pageCount === 0 ? query.offset : query.offset + 1} /{" "}
                        {pageCount} 页
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
                        {row.getVisibleCells().map(cell => (
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
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
