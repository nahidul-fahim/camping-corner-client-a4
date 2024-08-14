import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ProductManagement from "../pages/ProductManagement";
import AddNewProduct from "@/pages/AddNewProduct";
import UpdateProduct from "@/pages/UpdateProduct";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/products/:slug",
                element: <ProductDetails />
            },
            {
                path: "/product-management",
                element: <ProductManagement />
            },
            {
                path: "/add-product",
                element: <AddNewProduct />
            },
            {
                path: "/update-product/:id",
                element: <UpdateProduct />
            },
        ]
    }
]);


export default router;