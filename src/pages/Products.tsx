import ProductCard from "@/components/productCard/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/ProductType";
import { FormEvent, useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Products = () => {
    // State for searchTerm, minPrice, and maxPrice
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    // Fetching all products initially
    const { isLoading, data: allProducts } = useGetAllProductsQuery({ searchTerm, minPrice, maxPrice });

    // Effect to determine and set the maximum product price from the fetched data
    useEffect(() => {
        if (allProducts) {
            const maxProductPrice = Math.max(...allProducts.data.map((product: TProduct) => product.price) || [0]);
            setMaxPrice((prevMaxPrice) => (prevMaxPrice === 0 ? maxProductPrice : prevMaxPrice));
        }
    }, [allProducts]);

    // Handle the search term submission
    const handleSearchTerm = (e: FormEvent) => {
        e.preventDefault();
        setSearchTerm((e.target as HTMLFormElement).search.value);
    };

    // Handle changes to min price input on blur
    const handleMinPriceBlur = (e: FormEvent) => {
        setMinPrice(Number((e.target as HTMLInputElement).value));
    };

    // Handle changes to max price input on blur
    const handleMaxPriceBlur = (e: FormEvent) => {
        setMaxPrice(Number((e.target as HTMLInputElement).value));
    };

    // Show loading state if data is not yet loaded
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // Get unique categories from products
    const allCategories = allProducts?.data.map((product: TProduct) => product?.category);
    const categories = allCategories?.filter((item: string, index: number) =>
        allCategories.indexOf(item) === index
    );

    return (
        <div className="flex flex-col justify-start items-start">
            {/* Title section */}
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

            {/* Main content section */}
            <div className="container mx-auto flex justify-between items-stretch h-full gap-8">
                {/* Filtering section */}
                <div className="w-[25%] border-r border-secondary/20 px-5 py-10 flex flex-col justify-start items-start gap-6">
                    {/* Search input */}
                    <form onSubmit={handleSearchTerm} className="flex justify-start items-stretch w-full">
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

                    {/* Sorting options */}
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <h3 className="font-primary text-xl font-semibold">Sort</h3>
                        <div className="flex flex-col justify-start items-start w-full gap-1">
                            <Button variant={"gray"}>Price, low to high</Button>
                            <Button variant={"gray"}>Price, high to low</Button>
                        </div>
                    </div>

                    {/* Category filters */}
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <h3 className="font-primary text-xl font-semibold">Categories</h3>
                        <div className="flex flex-col justify-start items-start w-full gap-1">
                            {categories?.map((category: string, index: number) => (
                                <Button key={index} variant={"gray"}>{category}</Button>
                            ))}
                        </div>
                    </div>

                    {/* Price range filter */}
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <h3 className="font-primary text-xl font-semibold">Price</h3>
                        <div className="w-full flex justify-between items-center gap-12">
                            {/* Min price input */}
                            <Input
                                defaultValue={minPrice}
                                onBlur={handleMinPriceBlur}
                            />
                            {/* Max price input */}
                            <Input
                                defaultValue={maxPrice}
                                onBlur={handleMaxPriceBlur}
                            />
                        </div>
                    </div>

                    {/* Reset filter button */}
                    <Button variant={"large"} className="w-full">
                        <RiDeleteBin6Line className="text-xl" /> Clear all
                    </Button>
                </div>

                {/* Products display section */}
                <div className="w-[75%] px-5 py-10 grid grid-cols-3 gap-x-10 gap-y-12">
                    {allProducts?.data?.map((product: TProduct, idx: number) => (
                        <ProductCard key={idx} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;