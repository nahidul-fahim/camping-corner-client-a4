import { Outlet } from "react-router-dom";
import Header from "../header/Header";


const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default MainLayout;