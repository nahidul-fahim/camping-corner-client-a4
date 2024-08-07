import { RxReload } from "react-icons/rx";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";


const ErrorComponent = () => {

    const navigate = useNavigate();

    return (
        <div className="h-[100vh] w-full flex flex-col gap-3 justify-center items-center">
            <p className="text-gray-500 text-xl font-medium">Oops! Something went wrong.</p>
            <div className="flex justify-center items-center gap-3">
                <Button variant={"secondary"} onClick={() => navigate(0)}><RxReload /> Reload</Button>
                <Button onClick={() => navigate(0)}><GoHome /> Back to home</Button>
            </div>
        </div>
    );
};

export default ErrorComponent;