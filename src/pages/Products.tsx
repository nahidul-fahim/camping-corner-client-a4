import ProductCard from "@/components/productCard/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/ProductType";
import { FormEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


const Products = () => {

    // state for searchTerm and minPrice
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);

    // get all products
    const { isLoading, data: allProducts } = useGetAllProductsQuery({ searchTerm, minPrice });

    if (isLoading) {
        return <p>Loading...</p>
    }

    // getting the categories
    const allCategories = allProducts?.data.map((product: TProduct) => product?.category);
    const categories = allCategories?.filter((item: string, index: number) =>
        allCategories.indexOf(item) === index
    );

    // getting the max price
    const maxPrice = Math.max(...allProducts?.data.map((product: TProduct) => product.price) || [0]);

    // filtering functionalities
    const handleSearchTerm = (e: FormEvent) => {
        e.preventDefault();
        setSearchTerm((e.target as HTMLFormElement).search.value);
    };

    const handleMinPriceChange = (e: FormEvent) => {
        console.log(e.target.value)
        setMinPrice(Number((e.target as HTMLInputElement).value));
    };

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
                    <form
                        onSubmit={handleSearchTerm}
                        className="flex justify-start items-stretch w-full">
                        <input
                            id="search"
                            name="search"
                            placeholder="Search products"
                            className="focus:outline-none px-4 py-2 border-l border-y border-customGray rounded-l-md w-full"
                        />
                        <button type="submit" title="Search" className="px-4 py-2 border-r border-y border-customGray rounded-r-md hover:bg-primary duration-200 hover:text-white">
                            <FaArrowRight />
                        </button>
                    </form>

                    {/* sort */}
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <h3 className="font-primary text-xl font-semibold">Sort</h3>
                        <div className="flex flex-col justify-start items-start w-full gap-1">
                            {/* low to high */}
                            <Button variant={"gray"}>
                                Price, low to high
                            </Button>
                            {/* high to low */}
                            <Button variant={"gray"}>
                                Price, high to low
                            </Button>
                        </div>
                    </div>

                    {/* categories */}
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <h3 className="font-primary text-xl font-semibold">Categories</h3>
                        <div className="flex flex-col justify-start items-start w-full gap-1">
                            {
                                categories?.map((category: string, index: number) =>
                                    <Button
                                        key={index}
                                        variant={"gray"}
                                    >
                                        {category}
                                    </Button>)
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
                                defaultValue={0}
                                onChange={handleMinPriceChange}
                            />
                            {/* max price */}
                            <Input
                                defaultValue={maxPrice} />
                        </div>
                    </div>

                    {/* reset filter button */}
                    <Button variant={"large"} className="w-full"><RiDeleteBin6Line className="text-xl" /> Clear all</Button>

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
            </div>
        </div>
    );
};

export default Products;