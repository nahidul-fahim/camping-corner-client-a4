import { useGetSingleProductQuery } from "@/redux/features/product/productApi";
import { useParams } from "react-router-dom";


const ProductDetails = () => {

    const { id } = useParams();
    const { isLoading, data } = useGetSingleProductQuery(id);

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
                <h2 className="text-2xl font-bold">{product?.name}</h2>
                <p className="text-2xl font-primary font-bold text-primary">${product?.price}</p>
                <p className="text-bodyText/70">{product?.description}</p>
            </div>
        </div>
    );
};

export default ProductDetails;