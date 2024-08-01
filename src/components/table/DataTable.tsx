import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Column = {
    title: string;
};

type TDataTableProps = {
    tableColumns: Column[];
    tableRows: any;
}



const DataTable = ({ tableColumns, tableRows }: TDataTableProps) => {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    {
                        tableColumns?.map((column, index) =>
                            <TableHead
                                key={index}
                                className="w-[300px]"
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
                                <TableCell className="font-medium">
                                    {column?.renderCell(row, rowIdx)}
                                </TableCell>
                            )
                        }
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default DataTable;