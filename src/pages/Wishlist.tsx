import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { removeFromWishlist, clearWishlist, selectWishlistItems, TWishlistProduct } from '@/redux/features/wishlist/wishlistSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const Wishlist = () => {
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector(selectWishlistItems);

    const handleRemoveFromWishlist = (productId: string) => {
        dispatch(removeFromWishlist(productId));
    };

    const handleClearWishlist = () => {
        dispatch(clearWishlist());
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="font-primary text-2xl sm:text-3xl font-medium text-primary mb-6">My Wishlist</h1>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-xl text-bodyText/60 font-medium mb-4">Your wishlist is empty</p>
                    <Link to="/products" className="text-primary underline underline-offset-4 hover:font-semibold duration-300">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item: TWishlistProduct) => (
                            <div key={item.productId} className="border rounded-lg overflow-hidden shadow-md">
                                <img src={item.productImage} alt={item.productName} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">{item.productName}</h2>
                                    <p className="text-gray-600 mb-4">${item.productPrice.toFixed(2)}</p>
                                    <div className="flex justify-between items-center">
                                        <Link to={`/products/${item.productId}`}>
                                            <Button variant={"outline"}>View Details</Button>
                                        </Link>
                                        <Button
                                            onClick={() => handleRemoveFromWishlist(item.productId)}
                                            variant="destructive"
                                            size="sm"
                                        >
                                            <FaTrash className="mr-2" /> Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-end">
                        <Button onClick={handleClearWishlist} variant="destructive">
                            Clear Wishlist
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Wishlist;