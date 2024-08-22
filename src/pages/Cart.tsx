import ErrorComponent from "@/components/error/ErrorComponent";
import DataTable from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useUserCartProductQuery } from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/hooks";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";


const Cart = () => {

    // getting the current user
    const userData = useAppSelector(selectCurrentUser);
    const currentUser = userData?.user;
    const { error, isLoading, data: cartProducts, refetch } = useUserCartProductQuery(currentUser?._id);

    console.log("user cart product", cartProducts)


    // table columns


    // conditional loading and error
    if (error) {
        return <ErrorComponent />
    }
    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="p-10 container mx-auto flex flex-col justify-start items-start gap-5">
            <h3 className="font-primary text-3xl font-medium text-primary">Cart</h3>
            {/* <DataTable
                tableColumns={tableColumns}
                tableRows={data?.data?.products} /> */}
        </div>
    );
};

export default Cart;