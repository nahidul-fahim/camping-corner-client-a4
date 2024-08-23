import ErrorComponent from "@/components/error/ErrorComponent";
import OpenModal from "@/components/openModal/OpenModal";
import DataTable from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useUserCartProductQuery } from "@/redux/features/cart/cartApi";
import { addCartItems } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

const Cart = () => {
    // getting the current user
    const userData = useAppSelector(selectCurrentUser);
    const currentUser = userData?.user;

    // redux
    const { error, isLoading, data: cartProducts } = useUserCartProductQuery(currentUser?._id);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(addCartItems({
            items: cartProducts?.data
        }))
    }, [cartProducts?.data, dispatch]);

    // const [quantities, setQuantities] = useState({});

    // const handleQuantityChange = (productId: string, newQuantity: number, maxQuantity: number) => {
    //     if (newQuantity >= 1 && newQuantity <= maxQuantity) {
    //         setQuantities((prevQuantities) => ({
    //             ...prevQuantities,
    //             [productId]: newQuantity,
    //         }));
    //     }
    // };

    // table columns
    const tableColumns = [
        {
            title: '',
            renderCell: (row) =>
                <span className="flex justify-center items-center text-xl w-full">
                    {/* delete button */}
                    <OpenModal
                        trigger={
                            <button>
                                <MdOutlineCancel className="text-red-500 hover:text-red-700 duration-200" />
                            </button>
                        }
                        title="Are you sure?"
                        description="Are you sure to remove the product from cart?"
                    >
                        <div className="w-full flex justify-end items-center gap-3">
                            <DialogClose asChild>
                                <Button variant={"secondary"}>Cancel</Button>
                            </DialogClose>
                            {/* delete product modal */}
                            <DialogClose asChild>
                                <Button
                                    variant={"destructive"}
                                // onClick={() => handleDeleteProduct(row?._id)}
                                >
                                    Yes! Remove
                                </Button>
                            </DialogClose>
                        </div>
                    </OpenModal>
                </span>
        },
        {
            title: 'Serial',
            renderCell: (_row, rowIdx) => <span>{rowIdx + 1}</span>
        },
        {
            title: 'Image',
            renderCell: (row) =>
                <img
                    src={row?.product?.image}
                    alt={row?.product?.name}
                    className="size-[60px] rounded"
                />
        },
        {
            title: 'Product',
            renderCell: (row) => <span className="flex justify-center items-center w-fit">{row?.product?.name}</span>
        },
        {
            title: 'Price',
            renderCell: (row) => <span className="font-medium">${row?.product?.price}</span>
        },
        {
            title: 'Quantity',
            renderCell: (row) => {
                console.log("row data =>", row)
                const productId = row?.product?._id;
                const productQuantity = row?.quantity as number;
                return (
                    <span className="flex justify-start items-center">
                        {/* decrease */}
                        <button
                            disabled={productQuantity === 1}
                            className="size-7 text-black border border-bodyText/30 font-semibold hover:bg-secondary hover:text-white duration-200 disabled:text-black/40 disabled:bg-transparent disabled:cursor-not-allowed">
                            -
                        </button>
                        {/* quantity */}
                        <p className="border-y border-bodyText/30 h-7 w-10 text-[15px] flex justify-center items-center font-medium">{productQuantity}</p>
                        {/* increase */}
                        <button
                            disabled={productQuantity === row?.product?.quantity}
                            className="size-7 text-black border border-bodyText/30 font-semibold hover:bg-secondary hover:text-white duration-200 disabled:text-black/40 disabled:bg-transparent disabled:cursor-not-allowed">
                            +
                        </button>
                    </span>
                );
            }
        },
        // {
        //     title: 'Subtotal',
        //     renderCell: (row) => {
        //         const productId = row?.product?._id;
        //         const productQuantity = 99999;
        //         const subtotal = productQuantity * row?.product?.price;
        //         return <span className="font-medium">${subtotal.toFixed(2)}</span>;
        //     }
        // },
    ]

    // conditional loading and error
    if (error) {
        return <ErrorComponent />
    }
    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="p-10 container mx-auto flex flex-col justify-start items-start gap-5">
            <h3 className="font-primary text-3xl font-medium text-primary">Cart</h3>

            <DataTable
                tableColumns={tableColumns}
                tableRows={cartProducts?.data}
            />
        </div>
    );
};

export default Cart;