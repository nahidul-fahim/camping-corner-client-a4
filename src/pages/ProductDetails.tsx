import { useParams } from "react-router-dom";


const ProductDetails = () => {

    const { slug } = useParams();

    return (
        <div>
            <p>{slug}</p>
        </div>
    );
};

export default ProductDetails;