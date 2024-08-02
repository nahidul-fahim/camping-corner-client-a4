/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { RxReload } from "react-icons/rx";
import { GoHome } from "react-icons/go";


type TProduct = Record<string, any>


const ProductManagement = () => {

    const navigate = useNavigate()

    const tableColumns = [
        {
            title: 'Serial',
            renderCell: (_row: TProduct, rowIdx: number) => <span>{rowIdx + 1}</span>
        },
        {
            title: 'Image',
            renderCell: (row: TProduct) =>
                <img
                    src={row?.image}
                    alt={row?.name}
                    className="size-[60px] rounded"
                />
        },
        {
            title: 'Product',
            renderCell: (row: TProduct) => <span>{row.name}</span>
        },
        {
            title: 'Category',
            renderCell: (row: TProduct) => <span>{row.category}</span>
        },
        {
            title: 'Price',
            renderCell: (row: TProduct) => <span className="font-medium">${row.price}</span>
        },
        {
            title: 'Actions',
            renderCell: (row: TProduct) =>
                <span className=" flex justify-start items-center gap-3 text-xl">
                    <CiEdit className="text-slate-700 hover:text-slate-400 duration-200" />
                    <MdDeleteOutline className="text-red-600 hover:text-red-400 duration-200" />
                </span>
        },
    ]

    // current data
    const { error, isLoading, data, } = useGetAllProductsQuery(undefined);


    // loading and conditional data
    if (isLoading) {
        return <p>Loading....</p>
    }
    if (error) {
        return <div className="h-[100vh] w-full flex flex-col gap-3 justify-center items-center">
            <p className="text-gray-500 text-xl font-medium">Oops! Something went wrong.</p>
            <div className="flex justify-center items-center gap-3">
                <Button variant={"secondary"} onClick={() => navigate(0)}><RxReload /> Reload</Button>
                <Button onClick={() => navigate(0)}><GoHome /> Back to home</Button>
            </div>
        </div>
    }

    return (
        <div className="p-10 w-full mx-auto flex flex-col justify-start items-start gap-5">
            <div className="w-full flex justify-between items-center">
                <h3 className="font-primary text-3xl font-medium text-primary">Product list</h3>
                {/* add new product button */}
                <Link to={"/add-product"}>
                    <Button><FaPlus /> Add new product</Button>
                </Link>
            </div>
            <DataTable
                // tableName="Product list"
                tableColumns={tableColumns}
                tableRows={data?.data} />
        </div>
    );
};

export default ProductManagement;