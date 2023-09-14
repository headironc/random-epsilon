import { useMemo, useState } from "react";
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
    },
    {
        header: "姓名",
        accessorKey: "name",
    },
];

export default function Pharmacy(props: { patients: Patient[] }) {
    const [query, setQuery] = useState<Query>({
        limit: 12,
        offset: 0,
    });

    const { patients, count } = useMemo(() => {
        const count = props.patients.length;
        let patients: Patient[] = [];

        if (count > 12) {
            patients = props.patients.slice(query.offset, query.limit);
        } else {
            const placeholder = Array(12 - count).fill({
                window: "",
                callSign: 0,
                invoice: "",
                name: "",
                signInNumber: 0,
                signInTime: "",
            });

            patients = [...props.patients, ...placeholder];
        }

        return {
            count,
            patients,
        };
    }, [props.patients]);

    const table = useReactTable({
        data: patients,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <div className="flex-1">
                <Table>
                    <TableCaption className="p-4 text-4xl">取药</TableCaption>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="p-4 text-center text-4xl"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table
                            .getRowModel()
                            .rows.slice(0, 6)
                            .map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell
                                            key={cell.id}
                                            className="h-24 text-center text-5xl"
                                        >
                                            {cell.getValue()
                                                ? flexRender(
                                                      cell.column.columnDef
                                                          .cell,
                                                      cell.getContext(),
                                                  )
                                                : ""}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex-1">
                <Table>
                    <TableCaption className="p-4 text-4xl">配药</TableCaption>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="p-4 text-center text-4xl"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table
                            .getRowModel()
                            .rows.slice(6, 12)
                            .map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell
                                            key={cell.id}
                                            className="h-24 text-center text-5xl"
                                        >
                                            {cell.getValue()
                                                ? flexRender(
                                                      cell.column.columnDef
                                                          .cell,
                                                      cell.getContext(),
                                                  )
                                                : ""}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
