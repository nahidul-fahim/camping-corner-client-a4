/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { useDeleteProductMutation, useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import OpenModal from "@/components/openModal/OpenModal";
import { DialogClose } from "@/components/ui/dialog";
import ErrorComponent from "@/components/error/ErrorComponent";
import { toast } from "sonner";


type TProduct = Record<string, any>


const ProductManagement = () => {

    const [deleteProduct, { isLoading: isDeleting, isError: isDeleteError }] = useDeleteProductMutation();
    // current data
    const { error, isLoading, data, refetch } = useGetAllProductsQuery(undefined);


    // handle delete a product
    const handleDeleteProduct = async (id: string) => {
        const toastId = toast.loading("Deleting product!");
        const result = await deleteProduct(id).unwrap();
        if (result?.success) {
            toast.success(result?.message, { id: toastId, duration: 2000 });
            refetch();
        }
        else {
            toast.error(result?.message, { id: toastId, duration: 2000 });
        }
    }


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
                    {/* delete button */}
                    <OpenModal
                        trigger={
                            <button>
                                <MdDeleteOutline className="text-red-500 hover:text-red-700 duration-200" />
                            </button>
                        }
                        title="Are you sure?"
                        description="Are you sure you want to delete the product? You cannot undo this."
                    >
                        <div className="w-full flex justify-end items-center gap-3">
                            {/* edit product button */}
                            <Button variant={"secondary"}>Cancel</Button>
                            {/* delete product modal */}
                            <DialogClose asChild>
                                <Button
                                    disabled={isDeleting}
                                    variant={"destructive"}
                                    onClick={() => handleDeleteProduct(row?._id)}
                                >
                                    {isDeleting ? "Deleting..." : "Yes! Delete"}
                                </Button>
                            </DialogClose>
                        </div>
                    </OpenModal>
                </span>
        },
    ]


    // loading and conditional data
    if (isLoading) {
        return <p>Loading....</p>
    }
    if (error || isDeleteError) {
        return <ErrorComponent />
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