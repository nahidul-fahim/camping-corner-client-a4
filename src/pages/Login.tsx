import RHFormProvider from "@/components/form/RHFormProvider";
import RHInput from "@/components/form/RHInput";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";


const Login = () => {

    // states
    const [showPassword, setShowPassword] = useState(false);

    // handle show password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    // submission
    const onSubmit = (data: FieldValues) => {
        console.log(data);
    }


    return (
        <div className="relative flex min-h-[100vh]">

            {/* image section */}
            <div className="fixed top-0 left-0 h-full w-2/5"
                style={{
                    backgroundImage: "url('/bg/bgAlone.webp')",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
            </div>

            {/* form section */}
            <div className="ml-[40%] container mx-auto p-10 overflow-y-auto flex flex-col justify-center items-start">
                <h2 className="text-3xl font-primary text-primary font-bold mb-5">Welcome back</h2>
                <RHFormProvider onSubmit={onSubmit} className="space-y-5 w-full">
                    <div className="space-y-5 pr-20">
                        <RHInput
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            label="Your email"
                            className="w-full"
                        />
                        <div className="relative w-full">
                            <RHInput
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="*******"
                                label="Your password"
                                className="w-full"
                            />
                            <button
                                type="button"
                                className="absolute top-[60%] right-5"
                                onClick={handleShowPassword}>
                                {
                                    showPassword ?
                                        <IoIosEyeOff className="text-bodyText/70 text-lg" />
                                        :
                                        <IoIosEye className="text-bodyText/70 text-lg" />
                                }
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="border px-3 py-1 self-start bg-primary text-white rounded font-medium hover:bg-secondary duration-300 disabled:bg-primary/60 disabled:cursor-not-allowed"
                        // disabled={isLoading}
                        >
                            {/* {isLoading ? "Creating product" : "Add Product"} */}
                            Login
                        </button>
                    </div>
                </RHFormProvider>

                {/* login page link */}
                <span className="flex justify-start items-center gap-2 mt-7">
                    <p className="text-bodyText font-medium">Don't have an account?</p>
                    <Link to={"/register"} className="text-primary font-medium underline underline-offset-4 hover:text-secondary duration-200">Create an account</Link>
                </span>
            </div>
        </div>
    );
};

export default Login;