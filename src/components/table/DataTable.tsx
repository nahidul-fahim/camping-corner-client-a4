/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type Column = {
    title: string;
    renderCell: (row: any, rowIdx: number) => React.ReactNode;
};

type TDataTableProps = {
    tableName?: string;
    tableColumns: Column[];
    tableRows: any[];
}

const DataTable = ({ tableName, tableColumns, tableRows }: TDataTableProps) => {
    return (
        <div className="w-full mx-auto flex flex-col justify-start items-start gap-5">
            {tableName &&
                <h3 className="font-primary text-3xl font-medium text-primary">{tableName}</h3>}
            <Table>
                <TableHeader>
                    <TableRow className="bg-accent">
                        {
                            tableColumns?.map((column, index) =>
                                <TableHead
                                    key={index}
                                    className="w-[300px] text-secondary font-semibold"
                                >
                                    {column?.title}
                                </TableHead>
                            )
                        }
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tableRows?.map((row, rowIdx) =>
                        <TableRow key={rowIdx}>
                            {
                                tableColumns?.map((column, columnIdx) =>
                                    <TableCell key={columnIdx}>
                                        {column?.renderCell(row, rowIdx)}
                                    </TableCell>
                                )
                            }
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default DataTable;