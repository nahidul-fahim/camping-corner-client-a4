import ErrorComponent from "@/components/error/ErrorComponent";
import OpenModal from "@/components/openModal/OpenModal";
import DataTable from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TCartItem } from "@/types/ProductType";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useMemo } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  // getting the current user
  const userData = useAppSelector(selectCurrentUser);
  const currentUser = userData?.user;
  const navigate = useNavigate();

  // redux
  const {
    error,
    isLoading,
    data: cartData,
    refetch,
  } = useUserCartProductQuery(currentUser?._id, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteCartItem] = useDeleteCartItemMutation();
  const dispatch = useAppDispatch();
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

  // handle cart quantity
  const handleCartQuantity = (cartId: string, quantity: number) => {
    dispatch(updateQuantity({ cartId, quantity }));
  };

  // handle cart product delete
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

  // handle total price and available quantity status
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


  // handle place order
  const handlePlaceOrder = () => {
    const cartProducts = allCartProducts.map((item: TCartItem) => (
      {
        cartId: item._id,
        product: item?.product._id,
        productName: item?.product.name,
        productPrice: item?.product.price,
        productImage: item?.product.image,
        quantity: item?.quantity,
      }
    ));

    const checkoutDetails = {
      cartProducts: cartProducts,
      total: Number(totalPrice),
      userId: currentUser?._id
    };

    dispatch(addToCheckout({ checkoutDetails }));
    navigate("/checkout")
  };

  // table columns
  const tableColumns = [
    {
      title: "",
      renderCell: (row: TCartItem) => (
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
          className="size-[60px] rounded"
        />
      ),
    },
    {
      title: "Product",
      renderCell: (row: TCartItem) => (
        <span className="flex justify-center items-center w-fit">
          {row?.product?.name}
        </span>
      ),
    },
    {
      title: "Price",
      renderCell: (row: TCartItem) => (
        <span className="font-medium">${row?.product?.price}</span>
      ),
    },
    {
      title: "Quantity",
      renderCell: (row: TCartItem) => {
        const cartQuantity = row?.quantity as number;
        return (
          <span className="flex justify-start items-center">
            {/* decrease */}
            <button
              onClick={() => handleCartQuantity(row?._id, -1)}
              disabled={cartQuantity === 1}
              className="size-7 text-black border border-bodyText/30 font-semibold hover:bg-secondary hover:text-white duration-200 disabled:text-black/40 disabled:bg-transparent disabled:cursor-not-allowed"
            >
              -
            </button>
            {/* quantity */}
            <p className="border-y border-bodyText/30 h-7 w-10 text-[15px] flex justify-center items-center font-medium">
              {cartQuantity}
            </p>
            {/* increase */}
            <button
              onClick={() => handleCartQuantity(row?._id, 1)}
              disabled={cartQuantity === row?.product?.quantity}
              className="size-7 text-black border border-bodyText/30 font-semibold hover:bg-secondary hover:text-white duration-200 disabled:text-black/40 disabled:bg-transparent disabled:cursor-not-allowed"
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
        return <span className="font-medium">${subtotal.toFixed(2)}</span>;
      },
    },
  ];

  // conditional loading and error
  if (error) {
    return <ErrorComponent />;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-10 container mx-auto flex flex-col justify-start items-start gap-5">
      <h1 className="font-primary text-3xl font-medium text-primary">Cart</h1>

      <div className="w-full flex justify-center items-start gap-10">
        {/* data table */}
        <div className="w-2/3">
          <DataTable tableColumns={tableColumns} tableRows={allCartProducts} />
        </div>

        {/* total price section */}
        <div className="w-1/3 flex flex-col justify-start items-start border border-bodyText/10 rounded-lg">
          <div className="bg-white px-5 py-3 rounded-t-lg">
            <h4 className="font-semibold text-lg bg-white">Order Summary</h4>
          </div>

          <div className="bg-customGray flex flex-col justify-start items-start gap-1 w-full p-5 rounded-b-lg">
            {/* subtotal */}
            <div className="flex justify-between items-center mb-2 w-full">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${totalPrice}</span>
            </div>
            {/* tax */}
            <div className="flex justify-between items-center mb-2 w-full">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-medium">$0.00</span>
            </div>
            {/* shipping */}
            <div className="flex justify-between items-center mb-2 w-full">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium">$0.00</span>
            </div>
            {/* total price */}
            <div className="flex justify-between items-center border-t pt-2 mt-2 w-full">
              <span className="text-black text-lg font-semibold">Total:</span>
              <span className="font-bold text-black text-lg">
                ${totalPrice}
              </span>
            </div>
            <Button
              className="mt-5 w-full"
              disabled={isOutOfStock}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
            {isOutOfStock && (
              <p className="text-red-500 font-medium text-center text-sm mt-2">
                Some items are out of stock. Please adjust your cart.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
