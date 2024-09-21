import { useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MdOutlineCancel } from "react-icons/md";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useDeleteCartItemMutation,
  useUserCartProductQuery,
} from "@/redux/features/cart/cartApi";
import {
  addCartItems,
  selectCartProducts,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { addToCheckout } from "@/redux/features/checkout/checkoutSlice";
import { TCartItem } from "@/types/ProductType";
import ErrorComponent from "@/components/error/ErrorComponent";
import OpenModal from "@/components/openModal/OpenModal";
import DataTable from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import LoadingComponent from '@/components/loadingComponent/LoadingComponent';

const Cart = () => {
  const userData = useAppSelector(selectCurrentUser);
  const currentUser = userData?.user;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    error,
    isLoading,
    data: cartData,
    refetch,
  } = useUserCartProductQuery(currentUser?._id, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteCartItem] = useDeleteCartItemMutation();
  const allCartProducts = useAppSelector(selectCartProducts);

  useEffect(() => {
    if (!isLoading) {
      dispatch(
        addCartItems({
          items: cartData?.data,
        })
      );
    }
  }, [cartData?.data, dispatch, isLoading]);

  const handleCartQuantity = (cartId: string, quantity: number) => {
    dispatch(updateQuantity({ cartId, quantity }));
  };

  const handleDeleteCartProduct = async (id: string) => {
    const toastId = toast.loading("Removing cart product!");
    const result = await deleteCartItem(id).unwrap();
    if (result?.success) {
      toast.success(result?.message, { id: toastId, duration: 2000 });
      refetch();
    } else {
      toast.error(result?.message, { id: toastId, duration: 2000 });
    }
  };

  const { totalPrice, isOutOfStock } = useMemo(() => {
    let total = 0;
    let outOfStock = false;
    allCartProducts?.forEach((item: TCartItem) => {
      total += item.quantity * item.product.price;
      if (item.quantity > item.product.quantity) {
        outOfStock = true;
      }
    });

    return { totalPrice: total.toFixed(2), isOutOfStock: outOfStock };
  }, [allCartProducts]);

  const handlePlaceOrder = () => {
    const cartProducts = allCartProducts.map((item: TCartItem) => ({
      cartId: item._id,
      product: item?.product._id,
      productName: item?.product.name,
      productPrice: item?.product.price,
      productImage: item?.product.image,
      quantity: item?.quantity,
    }));

    const checkoutDetails = {
      cartProducts: cartProducts,
      total: Number(totalPrice),
      userId: currentUser?._id
    };

    dispatch(addToCheckout({ checkoutDetails }));
    navigate("/checkout")
  };

  const tableColumns = [
    {
      title: "",
      renderCell: (row: TCartItem) => (
        <span className="flex justify-center items-center text-xl w-full">
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
              <DialogClose asChild>
                <Button
                  variant={"destructive"}
                  onClick={() => handleDeleteCartProduct(row?._id)}
                >
                  Yes! Remove
                </Button>
              </DialogClose>
            </div>
          </OpenModal>
        </span>
      ),
    },
    {
      title: "Serial",
      renderCell: (_row: TCartItem, rowIdx: number) => <span>{rowIdx + 1}</span>,
    },
    {
      title: "Image",
      renderCell: (row: TCartItem) => (
        <img
          src={row?.product?.image}
          alt={row?.product?.name}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded object-cover"
        />
      ),
    },
    {
      title: "Product",
      renderCell: (row: TCartItem) => (
        <span className="flex justify-center items-center w-fit text-sm sm:text-base">
          {row?.product?.name}
        </span>
      ),
    },
    {
      title: "Price",
      renderCell: (row: TCartItem) => (
        <span className="font-medium text-sm sm:text-base">${row?.product?.price}</span>
      ),
    },
    {
      title: "Quantity",
      renderCell: (row: TCartItem) => {
        const cartQuantity = row?.quantity as number;
        return (
          <span className="flex justify-start items-center">
            <button
              onClick={() => handleCartQuantity(row?._id, -1)}
              disabled={cartQuantity === 1}
              className="w-6 h-6 sm:w-7 sm:h-7 text-black border border-bodyText/30 font-semibold hover:bg-secondary hover:text-white duration-200 disabled:text-black/40 disabled:bg-transparent disabled:cursor-not-allowed"
            >
              -
            </button>
            <p className="border-y border-bodyText/30 h-6 sm:h-7 w-8 sm:w-10 text-xs sm:text-sm flex justify-center items-center font-medium">
              {cartQuantity}
            </p>
            <button
              onClick={() => handleCartQuantity(row?._id, 1)}
              disabled={cartQuantity === row?.product?.quantity}
              className="w-6 h-6 sm:w-7 sm:h-7 text-black border border-bodyText/30 font-semibold hover:bg-secondary hover:text-white duration-200 disabled:text-black/40 disabled:bg-transparent disabled:cursor-not-allowed"
            >
              +
            </button>
          </span>
        );
      },
    },
    {
      title: "Subtotal",
      renderCell: (row: TCartItem) => {
        const cartProductQuantity = row?.quantity;
        const subtotal = cartProductQuantity * row?.product?.price;
        return <span className="font-medium text-sm sm:text-base">${subtotal.toFixed(2)}</span>;
      },
    },
  ];

  if (error) {
    return <ErrorComponent />;
  }
  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 container mx-auto flex flex-col justify-start items-start gap-5">
      <h1 className="font-primary text-2xl sm:text-3xl font-medium text-primary">Cart</h1>

      <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-6 lg:gap-10">
        {allCartProducts.length === 0 ? (
          <div className="w-full lg:w-2/3 flex justify-center items-center">
            <p className="text-lg font-medium text-bodyText">No products in the cart.</p>
          </div>
        ) : (
          <div className="w-full lg:w-2/3 overflow-x-auto">
            <DataTable tableColumns={tableColumns} tableRows={allCartProducts} />
          </div>
        )}

        <div className="w-full lg:w-1/3 flex flex-col justify-start items-start border border-bodyText/10 rounded-lg">
          <div className="bg-white px-4 sm:px-5 py-3 rounded-t-lg w-full">
            <h4 className="font-semibold text-base sm:text-lg bg-white">Order Summary</h4>
          </div>

          <div className="bg-customGray flex flex-col justify-start items-start gap-1 w-full p-4 sm:p-5 rounded-b-lg">
            <div className="flex justify-between items-center mb-2 w-full">
              <span className="text-gray-600 text-sm sm:text-base">Subtotal:</span>
              <span className="font-medium text-sm sm:text-base">${totalPrice}</span>
            </div>
            <div className="flex justify-between items-center mb-2 w-full">
              <span className="text-gray-600 text-sm sm:text-base">Shipping:</span>
              <span className="font-medium text-sm sm:text-base">$0.00</span>
            </div>
            <div className="flex justify-between items-center mb-4 w-full">
              <span className="text-gray-600 text-sm sm:text-base">Estimated Tax:</span>
              <span className="font-medium text-sm sm:text-base">$0.00</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-600 text-sm sm:text-base">Total:</span>
              <span className="font-medium text-base sm:text-lg">${totalPrice}</span>
            </div>

            <Button
              className="w-full mt-4"
              disabled={isOutOfStock || allCartProducts.length === 0}
              onClick={handlePlaceOrder}
            >
              {isOutOfStock ? "Out of stock" : "Proceed to checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;