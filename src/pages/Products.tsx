import { useEffect, useState } from "react";
import LoadingComponent from "@/components/loadingComponent/LoadingComponent";
import ProductCard from "@/components/productCard/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/ProductType";
import { FormEvent } from "react";
import { FaArrowRight, FaFilter, FaHeart, FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink, useSearchParams } from "react-router-dom";
import { addToWishlist, removeFromWishlist, selectWishlistItems, TWishlistProduct } from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Products = () => {
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector(selectWishlistItems);

    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [sort, setSort] = useState('');
    const [category, setCategory] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [searchParams] = useSearchParams();
    const categoryParams = searchParams.get('category') || '';
    useEffect(() => {
        if (categoryParams) {
            setCategory(categoryParams);
        }
    }, [categoryParams])

    // get all products
    const { isLoading, data } = useGetAllProductsQuery({ searchTerm, minPrice, maxPrice, sort, category });

    const handleSearchTerm = (e: FormEvent) => {
        e.preventDefault();
        setSearchTerm((e.target as HTMLFormElement).search.value);
    };

    const handleMinPriceBlur = (e: FormEvent) => {
        setMinPrice(Number((e.target as HTMLInputElement).value));
    };

    const handleMaxPriceBlur = (e: FormEvent) => {
        setMaxPrice(Number((e.target as HTMLInputElement).value));
    };

    const handleResetAll = () => {
        setSearchTerm("");
        setMinPrice(0);
        setMaxPrice(0);
        setSort('');
        setCategory("");
    };

    const isInWishlist = (productId: string) => {
        return wishlistItems.some((item: TWishlistProduct) => item.productId === productId);
    };

    const handleWishlistToggle = (product: TProduct) => {
        if (isInWishlist(product._id)) {
            dispatch(removeFromWishlist(product._id));
        } else {
            dispatch(addToWishlist({
                productId: product._id,
                productName: product.name,
                productPrice: product.price,
                productImage: product.image
            }));
        }
    };

    if (isLoading) {
        return <LoadingComponent />;
    }

    return (
        <div className="flex flex-col justify-start items-start">
            {/* Title section */}
            <div className="w-full h-[200px] md:h-[250px] lg:h-[300px] flex flex-col justify-center items-start bg-slate-300 px-5 md:px-10 py-5"
                style={{
                    backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/public/bg/bg3.webp')",
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'
                }}>
                <h1 className="font-primary text-left text-3xl md:text-4xl lg:text-5xl font-semibold text-primary">Products</h1>

                {/* Breadcrumb section */}
                <nav className="flex text-sm text-bodyText mt-4 font-medium">
                    <NavLink to="/" className="hover:text-primary duration-200">Home</NavLink>
                    <span className="mx-2">/</span>
                    <span className="text-gray-500">Products</span>
                </nav>
            </div>

            {/* Main content section */}
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-stretch h-full gap-5 lg:gap-8">
                {/* Filter toggle button for mobile/tablet */}
                <div className="lg:hidden w-full px-5 py-4">
                    <Button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full flex justify-center items-center gap-2"
                    >
                        <FaFilter /> {isFilterOpen ? "Hide Filters" : "Show Filters"}
                    </Button>
                </div>

                {/* Filtering section */}
                <div className={`w-full lg:w-[25%] lg:border-r border-secondary/20 px-5 py-10 flex flex-col justify-start items-start gap-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
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
                    <div className="w-full flex flex-col justify-start items-start gap-4 mt-4">
                        <h3 className="font-primary text-xl font-semibold">Sort</h3>
                        <div className="flex flex-col justify-start items-start w-full gap-1">
                            <Button
                                onClick={() => setSort('price')}
                                className={sort === 'price' ? "bg-black/50 text-white" : "bg-customGray/60"}
                                variant={"gray"}>
                                Price, low to high
                            </Button>
                            <Button
                                onClick={() => setSort('-price')}
                                className={sort === '-price' ? "bg-black/50 text-white" : "bg-customGray/60"}
                                variant={"gray"}>
                                Price, high to low
                            </Button>
                        </div>
                    </div>

                    {/* Category filters */}
                    <div className="w-full flex flex-col justify-start items-start gap-4 mt-4">
                        <h3 className="font-primary text-xl font-semibold">Categories</h3>
                        <div className="flex flex-col justify-start items-start w-full gap-1">
                            {data?.data?.uniqueCategories.map((categoryItem: string, index: number) => (
                                <Button
                                    key={index}
                                    variant={"gray"}
                                    onClick={() => setCategory(categoryItem)}
                                    className={category === categoryItem ? "bg-black/50 text-white" : "bg-customGray/60"}>
                                    {categoryItem}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Price range filter */}
                    <div className="w-full flex flex-col justify-start items-start gap-4 mt-4">
                        <h3 className="font-primary text-xl font-semibold">Price</h3>
                        <div className="w-full flex justify-between items-center gap-12">
                            <Input
                                defaultValue={minPrice === 0 ? "" : minPrice}
                                placeholder={minPrice === 0 ? "--" : ""}
                                onBlur={handleMinPriceBlur}
                            />
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
                        className="w-full mt-4">
                        <RiDeleteBin6Line className="text-xl" /> Clear all
                    </Button>
                </div>

                {/* Products display section */}
                <div className="w-full lg:w-[75%] px-5 py-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 md:gap-x-10 gap-y-12">
                    {
                        data?.data?.products.length === 0 ?
                            <div className="h-screen col-span-full flex justify-center items-start mt-14">
                                <p className="font-primary text-xl text-bodyText/70">No products found</p>
                            </div>
                            :
                            data?.data?.products.map((product: TProduct, idx: number) => (
                                <div key={idx} className="relative">
                                    <ProductCard product={product} />
                                    <Button
                                        onClick={() => handleWishlistToggle(product)}
                                        className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full"
                                    >
                                        {isInWishlist(product._id) ?
                                            <FaHeart className="text-red-500" /> :
                                            <FaRegHeart />
                                        }
                                    </Button>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;