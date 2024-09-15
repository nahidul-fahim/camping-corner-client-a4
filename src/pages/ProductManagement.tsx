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
import { useEffect } from "react";
import LoadingComponent from "@/components/loadingComponent/LoadingComponent";

type TProduct = Record<string, any>;

const ProductManagement = () => {
    const [deleteProduct, { isLoading: isDeleting, isError: isDeleteError }] = useDeleteProductMutation();
    const { error, isLoading, data, refetch } = useGetAllProductsQuery("");

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleDeleteProduct = async (id: string) => {
        const toastId = toast.loading("Deleting product!");
        const result = await deleteProduct(id).unwrap();
        if (result?.success) {
            toast.success(result?.message, { id: toastId, duration: 2000 });
            refetch();
        } else {
            toast.error(result?.message, { id: toastId, duration: 2000 });
        }
    };

    const tableColumns = [
        {
            title: 'Serial',
            renderCell: (_row: TProduct, rowIdx: number) => <span>{rowIdx + 1}</span>,
        },
        {
            title: 'Image',
            renderCell: (row: TProduct) => (
                <img
                    src={row?.image}
                    alt={row?.name}
                    className="w-14 h-14 object-cover rounded"
                />
            ),
        },
        {
            title: 'Product',
            renderCell: (row: TProduct) => <span>{row.name}</span>,
        },
        {
            title: 'Category',
            renderCell: (row: TProduct) => <span>{row.category}</span>,
        },
        {
            title: 'Price',
            renderCell: (row: TProduct) => <span className="font-medium">${row.price}</span>,
        },
        {
            title: 'Actions',
            renderCell: (row: TProduct) => (
                <span className="flex justify-start items-center gap-3 text-xl">
                    <Link to={`/update-product/${row?._id}`}>
                        <CiEdit className="text-slate-700 hover:text-slate-400 duration-200" />
                    </Link>
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
                            <DialogClose asChild>
                                <Button variant={"secondary"}>Cancel</Button>
                            </DialogClose>
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
            ),
        },
    ];

    if (isLoading) {
        return <LoadingComponent />;
    }
    if (error || isDeleteError) {
        return <ErrorComponent />;
    }

    return (
        <div className="p-5 lg:p-10 container mx-auto flex flex-col justify-start items-start gap-5">
            <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h3 className="font-primary text-2xl lg:text-3xl font-medium text-primary">Product list</h3>
                <Link to={"/add-product"}>
                    <Button className="w-full lg:w-auto flex justify-center items-center">
                        <FaPlus /> Add new product
                    </Button>
                </Link>
            </div>
            <DataTable
                tableColumns={tableColumns}
                tableRows={data?.data?.products}
            />
        </div>
    );
};

export default ProductManagement;
