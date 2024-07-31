import { useGetAllProductsQuery } from "@/redux/features/product/productApi";



const ProductManagement = () => {

    const { data } = useGetAllProductsQuery(undefined);

    console.log(data);


    return (
        <div>

        </div>
    );
};

export default ProductManagement;