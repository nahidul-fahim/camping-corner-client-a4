/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "@/components/table/DataTable";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";

type TProduct = Record<string, any>


const ProductManagement = () => {

    const tableColumns = [
        {
            title: 'Serial',
            renderCell: (row: TProduct, rowIdx: number) => <span>{rowIdx}</span>
        },
        {
            title: 'Product',
            renderCell: (row: TProduct) => <span>{row.name}</span>
        },
        {
            title: 'Image',
            renderCell: (row: TProduct) => <span>Image</span>
        },
        {
            title: 'Category',
            renderCell: (row: TProduct) => <span>{row.category}</span>
        },
        {
            title: 'Price',
            renderCell: (row: TProduct) => <span>${row.price}</span>
        },
        {
            title: 'Actions',
            renderCell: (row: TProduct) => <span>Actions</span>
        },
    ]


    const { error, isLoading, data, } = useGetAllProductsQuery(undefined);


    if (isLoading) {
        return <p>Loading....</p>
    }


    return (
        <div>
            <DataTable
                tableColumns={tableColumns}
                tableRows={data?.data} />
        </div>
    );
};

export default ProductManagement;