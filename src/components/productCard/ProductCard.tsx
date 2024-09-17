import { TProduct } from "@/types/ProductType";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type ProductCardProps = {
    product: TProduct;
};

const ProductCard = ({ product }: ProductCardProps) => {

    return (
        <div className="flex flex-col justify-center items-center gap-2 group">
            <Link to={`/products/${product?._id}`}>
                <img src={product?.image} alt={product?.name} className="size-[300px] rounded" />
            </Link>
            <Link to={`/products/${product?._id}`}>
                <h3 className="font-semibold text-secondary hover:text-primary duration-300 mt-2">{product?.name}</h3>
            </Link>
            <p className="text-black font-semibold font-primary">
                ${product?.price}
            </p>

            <Link to={`/products/${product?._id}`}>
                <Button variant={"outline"}>View Product</Button>
            </Link>
        </div>
    );
};

export default ProductCard;