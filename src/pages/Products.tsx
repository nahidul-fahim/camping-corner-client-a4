import ProductCard from "@/components/productCard/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/ProductType";
import { FaArrowRight } from "react-icons/fa";


const Products = () => {

    // get all products
    const { isLoading, data: allProducts } = useGetAllProductsQuery(undefined);

    console.log(allProducts);

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="flex flex-col justify-start items-start">
            {/* title */}
            <div className="w-full h-[300px] flex justify-center items-center bg-slate-300"
                style={{
                    backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/public/bg/bg3.webp')",
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'
                }}>
                <h3 className="font-primary text-5xl font-semibold text-primary">Products</h3>
            </div>

            {/* page content */}
            <div className="container mx-auto flex justify-between items-stretch h-full gap-8">
                {/* filtering section */}
                <div className="w-[25%] border-r border-secondary/20 px-5 py-10">
                    {/* search input */}
                    <div className="flex justify-start items-center">
                        <Input
                            id="search"
                            name="search"
                            placeholder="Search products"
                        />
                        <Button variant="outline">
                            <FaArrowRight />
                        </Button>
                    </div>
                </div>


                {/* website content */}
                <div className="w-[75%] px-5 py-10 grid grid-cols-3 gap-x-10 gap-y-12">
                    {
                        allProducts?.data?.map((product: TProduct, idx: number) =>
                            <ProductCard
                                key={idx}
                                product={product} />
                        )
                    }
                </div>
g
            </div>
        </div>
    );
};

export default Products;
