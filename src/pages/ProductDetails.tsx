import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { Rating } from "@smastrom/react-rating";
import { useParams } from "react-router-dom";
import '@smastrom/react-rating/style.css'
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const ProductDetails = () => {

    const { id } = useParams();
    const { isLoading, data } = useGetSingleProductQuery(id);

    // getting the current user
    const currentUser = useAppSelector(selectCurrentUser);

    console.log("Current user =>", currentUser);

    if (isLoading) {
        return <p>Loading...</p>
    }

    const product = data?.data;

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
            <div className="w-2/3 flex flex-col justify-start items-start gap-3 h-full">
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
                    <p className="text-bodyText/70">Quantity: <span className="text-bodyText">{product?.quantity}</span></p>
                </span>

                {/* description */}
                <p className="text-bodyText/70">{product?.description}</p>
            </div>
        </div>
    );
};

export default ProductDetails;