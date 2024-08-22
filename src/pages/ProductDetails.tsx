import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { Rating } from "@smastrom/react-rating";
import { useParams } from "react-router-dom";
import '@smastrom/react-rating/style.css'
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAddNewCartItemMutation } from "@/redux/features/cart/cartApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const ProductDetails = () => {

    const { id } = useParams();
    const [productQuantity, setProductQuantity] = useState(1);

    // rtk query api
    const { isLoading, data } = useGetSingleProductQuery(id);
    const [
        addNewCartItem,
        { isLoading: newCartLoading }
    ] = useAddNewCartItemMutation();

    // getting the current user
    const userData = useAppSelector(selectCurrentUser);
    const currentUser = userData?.user;

    if (isLoading) {
        return <p>Loading...</p>
    }

    // getting current product
    const product = data?.data;

    // send the new cart product data to server
    const handleAddCartItem = async () => {
        const cartItemInfo = {
            product: product?._id,
            user: currentUser?._id,
            quantity: productQuantity
        };

        const res = await addNewCartItem(cartItemInfo).unwrap();
        if (res.success) {
            toast.success("Added to cart!", { duration: 2000 })
        }
        else {
            toast.error("Something went wrong!", { duration: 2000 })
        }
    };

    return (
        <div className="container mx-auto p-5 flex justify-center items-start gap-16">
            {/* left side */}
            <div className="w-1/3">
                <img
                    src={product?.image}
                    alt={product?.name}
                    className="rounded" />
            </div>

            {/* right side */}
            <div className="w-2/3 flex flex-col justify-start items-start gap-4 h-full">
                {/* title */}
                <h2 className="text-2xl font-bold">{product?.name}</h2>

                {/* price */}
                <p className="text-2xl font-primary font-bold text-primary">${product?.price}</p>

                {/* rating */}
                <span className="flex justify-start items-center gap-1">
                    <p className="text-bodyText/70">Rating:</p>
                    <Rating
                        style={{ maxWidth: 80 }}
                        value={product?.rating}
                        readOnly
                    />
                    <p className="text-bodyText text-sm">{`(${product?.rating})`}</p>
                </span>

                {/* quantity */}
                <span className="flex justify-start items-center gap-1">
                    <p className="text-bodyText/70">In stock: <span className="text-bodyText">{product?.quantity}</span></p>
                </span>

                {/* description */}
                <p className="text-bodyText/70">{product?.description}</p>

                {/* Quantity control */}
                <div className="flex justify-start items-center gap-2">
                    <p className="text-bodyText/80 font-medium">Quantity:</p>
                    <span className="flex justify-start items-center">
                        {/* decrease */}
                        <button
                            disabled={productQuantity === 1}
                            onClick={() => setProductQuantity(productQuantity - 1)}
                            className="size-7 text-black border border-bodyText/30 font-semibold hover:bg-secondary hover:text-white duration-200 disabled:text-black/40 disabled:bg-transparent disabled:cursor-not-allowed">
                            -
                        </button>
                        {/* quantity */}
                        <p className="border-y border-bodyText/30 h-7 w-10 text-[15px] flex justify-center items-center font-medium">{productQuantity}</p>
                        {/* increase */}
                        <button
                            onClick={() => setProductQuantity(productQuantity + 1)}
                            disabled={productQuantity === product?.quantity}
                            className="size-7 text-black border border-bodyText/30 font-semibold hover:bg-secondary hover:text-white duration-200 disabled:text-black/40 disabled:bg-transparent disabled:cursor-not-allowed">
                            +
                        </button>
                    </span>
                </div>

                {/* add to cart button */}
                <Button
                    onClick={handleAddCartItem}
                    disabled={newCartLoading || productQuantity === product?.quantity || product?.quantity === 0}>
                    {newCartLoading ? "Adding to cart..." : "Add to Cart"}
                </Button>
            </div>
        </div>
    );
};

export default ProductDetails;