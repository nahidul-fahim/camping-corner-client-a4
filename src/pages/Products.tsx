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

    // getting the categories
    const allCategories = allProducts?.data.map((product: TProduct) => product?.category);
    const categories = allCategories?.filter((item: string,
        index: number) =>
        allCategories.indexOf(item) === index
    );

    // getting the max price
    const maxPrice = Math.max(...allProducts?.data.map((product: TProduct) => product.price));

    console.log(maxPrice);

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
                <div className="w-[25%] border-r border-secondary/20 px-5 py-10 flex flex-col justify-start items-start gap-6">
                    {/* search input */}
                    <div className="flex justify-start items-center w-full">
                        <Input
                            id="search"
                            name="search"
                            placeholder="Search products"
                        />
                        <Button variant="outline">
                            <FaArrowRight />
                        </Button>
                    </div>

                    {/* categories */}
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <h3 className="font-primary text-xl font-semibold">Categories</h3>
                        <div className="flex flex-col justify-start items-start w-full gap-1">
                            {
                                categories.map((category: string, index: number) =>
                                    <p key={index}
                                        className="text-black bg-customGray/60 hover:bg-customGray duration-200 pl-8 py-2 rounded-sm cursor-pointer text-left w-full">
                                        {category}
                                    </p>)
                            }
                        </div>
                    </div>


                    {/* price range */}
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <h3 className="font-primary text-xl font-semibold">Price</h3>
                        {/* price inputs */}
                        <div className="w-full flex justify-between items-center gap-12">
                            {/* min price */}
                            <Input
                                defaultValue={0} />
                            {/* max price */}
                            <Input
                                defaultValue={maxPrice} />
                        </div>
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
