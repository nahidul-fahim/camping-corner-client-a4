import RHFormProvider from "@/components/form/RHFormProvider";
import RHInput from "@/components/form/RHInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
    // states
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // handle show password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // redux hooks
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    // submission
    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Logging in");

        try {
            const loginInfo = {
                email: data?.email,
                password: data?.password,
            };
            // send the formData to api
            const res = await login(loginInfo).unwrap();

            if (res?.success) {
                navigate("/")
                // setting the user to state
                dispatch(setUser({
                    user: res?.data
                }));
                toast.success("Log in successful!", { id: toastId, duration: 2000 });
            } else {
                toast.error(res?.message, { id: toastId, duration: 2000 });
            }
        } catch (error) {
            toast.error("Something went wrong!", { id: toastId, duration: 2000 });
        }
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Background section */}
            <div className="md:fixed top-0 left-0 h-40 md:h-full w-full md:w-2/5 z-[-10]"
                style={{
                    backgroundImage: "url('/bg/bgAlone.webp')",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
            </div>

            {/* form section */}
            <div className="w-full md:ml-[40%] container mx-auto p-5 md:p-10 bg-white flex flex-col justify-center items-start overflow-x-hidden">
                <h2 className="text-3xl font-primary text-primary font-bold mb-5">Welcome back</h2>
                <RHFormProvider onSubmit={onSubmit} className="space-y-5 w-full">
                    <div className="w-full md:w-4/5 xl:w-3/5 space-y-5">
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
                                className="absolute top-[60%] right-3"
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
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in" : "Login"}
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