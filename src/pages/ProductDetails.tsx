import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { Rating } from "@smastrom/react-rating";
import { useParams } from "react-router-dom";
import '@smastrom/react-rating/style.css'
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAddNewCartItemMutation } from "@/redux/features/cart/cartApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoadingComponent from "@/components/loadingComponent/LoadingComponent";
import { Badge } from "@/components/ui/badge";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
    const { id } = useParams();

    const { isLoading, data } = useGetSingleProductQuery(id);
    const [addNewCartItem, { isLoading: newCartLoading }] = useAddNewCartItemMutation();

    const userData = useAppSelector(selectCurrentUser);
    const currentUser = userData?.user;

    if (isLoading) {
        return <LoadingComponent />;
    }

    const product = data?.data;

    const handleAddCartItem = async () => {
        const cartItemInfo = {
            product: product?._id,
            user: currentUser?._id,
            quantity: 1
        };

        try {
            const res = await addNewCartItem(cartItemInfo).unwrap();
            if (res.success) {
                toast.success("Added to cart!", { duration: 2000 });
            } else {
                toast.error("Failed to add to cart.", { duration: 2000 });
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.", { duration: 2000 });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                {/* Left side - Image */}
                <div className="w-full lg:w-1/2 flex justify-center items-start">
                    <div className="w-full max-w-md overflow-hidden rounded-lg shadow-lg">
                        <img
                            src={product?.image}
                            alt={product?.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                {/* Right side - Product details */}
                <div className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-6">
                    <div>
                        <Badge className="mb-2">{product?.category}</Badge>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product?.name}</h1>
                        <p className="text-2xl font-primary font-bold text-primary">${product?.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Rating style={{ maxWidth: 100 }} value={product?.rating} readOnly />
                        <p className="text-sm text-gray-600">({product?.rating} out of 5)</p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-semibold">Availability:</p>
                        {product?.quantity > 0 ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                                In Stock ({product?.quantity} available)
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-800">
                                Out of Stock
                            </Badge>
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Product Description:</h3>
                        <p className="text-gray-700">{product?.description}</p>
                    </div>

                    <Button
                        onClick={handleAddCartItem}
                        disabled={newCartLoading || product?.quantity === 0}
                        className="w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                        <FaShoppingCart />
                        {newCartLoading ? "Adding to cart..." : "Add to Cart"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;