/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import RHFormProvider from "@/components/form/RHFormProvider";
import RHInput from "@/components/form/RHInput";
import RHTextArea from "@/components/form/RHTextArea";
import { useGetSingleProductQuery, useUpdateProductMutation } from "@/redux/features/product/productApi";
import RHFileSelect from "@/components/form/RHFileSelect";
import { useNavigate, useParams } from "react-router-dom";
import ErrorComponent from "@/components/error/ErrorComponent";
import LoadingComponent from "@/components/loadingComponent/LoadingComponent";

const UpdateProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { error, isLoading, data } = useGetSingleProductQuery(id);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [productImage, setProductImage] = useState<File | null>(null);
    const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();

    const currentData = data?.data;

    useEffect(() => {
        if (currentData) {
            setImagePreview(currentData?.image)
        }
    }, [currentData])

    // handle image change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        if (file) {
            setProductImage(file);
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };

    // submit the updated information
    const onSubmit = async (formData: FieldValues) => {

        const toastId = toast.loading("Updating product!");
        try {
            const updatedData = new FormData();

            // filter out unchanged fields
            const updatedProductData = Object.entries(formData).reduce((acc, [key, value]) => {
                if (value !== undefined) {
                    if (key === "price" || key === "quantity" || key === "rating") {
                        const numberValue = Number(value);
                        if (numberValue !== currentData?.[key]) {
                            acc[key] = numberValue;
                        }
                    } else if (value !== currentData?.[key]) {
                        acc[key] = value;
                    }
                }
                return acc;
            }, {} as Record<string, any>);

            // Append the image file if it has been changed
            if (productImage) {
                updatedData.append('file', productImage);
            } else if (currentData?.image) {
                updatedProductData.image = currentData?.image;
            }

            // Append the filtered data as a JSON string
            updatedData.append('data', JSON.stringify(updatedProductData));

            // Send the FormData to the API
            await updateProduct({ id, productInfo: updatedData }).unwrap();
            toast.success("Product updated!", { id: toastId, duration: 2000 });
            navigate("/product-management");
        } catch (error) {
            toast.error("Something went wrong!", { id: toastId, duration: 2000 });
        }
    };

    // loading component and error component
    if (isLoading) {
        return <LoadingComponent />
    }
    if (error) {
        return <ErrorComponent />
    }

    return (
        <div className="relative flex flex-col md:flex-row min-h-[100vh]">
            <div className="md:fixed top-0 left-0 h-40 md:h-full w-full md:w-2/5 z-[-10]"
                style={{
                    backgroundImage: "url('/bg/bgHill1.webp')",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
            </div>

            <div className="md:ml-[40%] container mx-auto p-5 md:p-10 bg-white">
                <h2 className="text-2xl md:text-3xl font-primary text-primary font-bold mb-5">Update Product</h2>
                <RHFormProvider onSubmit={onSubmit} className="space-y-5">
                    <div className="space-y-5 pr-0 md:pr-20">
                        <RHInput
                            type="text"
                            name="name"
                            defaultValue={currentData?.name}
                            placeholder="Product name"
                            label="Product name"
                            className="w-full"
                        />
                        <RHInput
                            type="text"
                            name="category"
                            placeholder="Product category"
                            defaultValue={currentData?.category}
                            label="Product category"
                            className="w-full"
                        />
                        <RHInput
                            type="number"
                            name="quantity"
                            placeholder="Product quantity"
                            defaultValue={currentData?.quantity}
                            label="Product quantity"
                            minValue={0}
                            step={1}
                            className="w-full"
                        />
                        <RHInput
                            type="number"
                            name="price"
                            placeholder="Product price"
                            defaultValue={currentData?.price}
                            label="Product price"
                            minValue={0}
                            className="w-full"
                        />
                        <RHInput
                            type="number"
                            name="rating"
                            placeholder="Product rating"
                            defaultValue={currentData?.rating}
                            label="Product rating"
                            minValue={1}
                            step={0.1}
                            maxValue={5}
                            className="w-full"
                        />
                        <RHTextArea
                            name="description"
                            placeholder="Product description"
                            defaultValue={currentData?.description}
                            label="Product description"
                            className="w-full"
                        />
                        <RHFileSelect
                            name="image"
                            placeholder="Product image"
                            label="Product image"
                            className="w-full"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="mt-2">
                                <img src={imagePreview} alt="Selected Product" className="h-40 w-40 object-cover" />
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="border px-3 py-1 self-start bg-primary text-white rounded font-medium hover:bg-secondary duration-300 disabled:bg-primary/60 disabled:cursor-not-allowed"
                        disabled={updateLoading}>
                        {updateLoading ? "Updating..." : "Update Product"}
                    </button>
                </RHFormProvider>
            </div>
        </div>
    );
};

export default UpdateProduct;
