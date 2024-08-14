import ProductCard from "@/components/productCard/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/ProductType";
import { FormEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Products = () => {
    // State for searchTerm, minPrice, and maxPrice
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [sort, setSort] = useState('-price');
    const [category, setCategory] = useState("");

    // Fetching all products initially
    const { isLoading, data: allProducts } = useGetAllProductsQuery({ searchTerm, minPrice, maxPrice, sort, category });

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

    // get max price
    // const maxProductPrice = allProducts?.data.reduce((max: number, product: TProduct) => {
    //     return product.price > max ? product.price : max;
    // }, 0);

    // reset all functionalities
    const handleResetAll = () => {
        setSearchTerm("");
        setMinPrice(0);
        setMaxPrice(0);
        setSort('-price');
        setCategory("");
    }


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

                            {/* low to high = price */}
                            <Button
                                onClick={() => setSort('price')}
                                variant={"gray"}>
                                Price, low to high
                            </Button>

                            {/* high to low = -price */}
                            <Button
                                onClick={() => setSort('-price')}
                                variant={"gray"}>
                                Price, high to low
                            </Button>
                        </div>
                    </div>

                    {/* Category filters */}
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <h3 className="font-primary text-xl font-semibold">Categories</h3>
                        <div className="flex flex-col justify-start items-start w-full gap-1">
                            {categories?.map((category: string, index: number) => (
                                <Button
                                    key={index}
                                    variant={"gray"}
                                    onClick={() => setCategory(category)}>
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Price range filter */}
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <h3 className="font-primary text-xl font-semibold">Price</h3>
                        <div className="w-full flex justify-between items-center gap-12">
                            {/* Min price input */}
                            <Input
                                defaultValue={minPrice === 0 ? "" : minPrice}
                                placeholder={minPrice === 0 ? "--" : ""}
                                onBlur={handleMinPriceBlur}
                            />
                            {/* Max price input */}
                            <Input
                                defaultValue={maxPrice === 0 ? "" : maxPrice}
                                placeholder={maxPrice === 0 ? "--" : ""}
                                onBlur={handleMaxPriceBlur}
                            />
                        </div>
                    </div>

                    {/* Reset filter button */}
                    <Button
                        variant={"large"}
                        onClick={handleResetAll}
                        className="w-full">
                        <RiDeleteBin6Line className="text-xl" /> Clear all
                    </Button>
                </div>

                {/* Products display section */}
                <div className="w-[75%] px-5 py-10 grid grid-cols-3 gap-x-10 gap-y-12">
                    {
                        allProducts?.data.length === 0 ?
                            <div className="h-screen col-span-3 flex justify-center items-start mt-14">
                                <p className="font-primary text-xl text-bodyText/70">No products found</p>
                            </div>
                            :
                            allProducts?.data?.map((product: TProduct, idx: number) => (
                                <ProductCard key={idx} product={product} />
                            ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;