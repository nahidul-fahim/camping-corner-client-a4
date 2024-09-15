/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import RHFormProvider from "@/components/form/RHFormProvider";
import RHInput from "@/components/form/RHInput";
import RHTextArea from "@/components/form/RHTextArea";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import RHFileSelect from "@/components/form/RHFileSelect";

const AddNewProduct = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [productImage, setProductImage] = useState<File | null>(null);
    const [createProduct, { isLoading }] = useCreateProductMutation();

    // Handle image change and preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            setProductImage(file);
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };

    // Handle form submission
    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Creating new product!");
        try {
            const formData = new FormData();
            if (productImage) {
                formData.append("file", productImage);
            }
            const productData = {
                name: data?.name,
                description: data?.description,
                category: data?.category,
                price: Number(data?.price),
                quantity: Number(data?.quantity),
                rating: Number(data?.rating),
            };
            formData.append("data", JSON.stringify(productData));
            await createProduct(formData).unwrap();
            toast.success("Created new product!", { id: toastId, duration: 2000 });
        } catch (error) {
            toast.error("Something went wrong!", { id: toastId, duration: 2000 });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Background section */}
            <div className="md:fixed top-0 left-0 h-40 md:h-full w-full md:w-2/5 z-[-10]"
                style={{
                    backgroundImage: "url('/bg/bgHill.webp')",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
            </div>

            {/* Form section */}
            <div className="md:ml-[40%] container mx-auto p-5 md:p-10 bg-white">
                <h2 className="text-2xl lg:text-3xl font-primary text-primary font-bold mb-5">Add New Product</h2>
                <RHFormProvider onSubmit={onSubmit} className="space-y-5">
                    <div className="space-y-5 lg:pr-20">
                        <RHInput
                            type="text"
                            name="name"
                            placeholder="Camping tent"
                            label="Product name"
                            className="w-full"
                        />
                        <RHInput
                            type="text"
                            name="category"
                            placeholder="shelter"
                            label="Product category"
                            className="w-full"
                        />
                        <RHInput
                            type="number"
                            name="quantity"
                            placeholder="49"
                            label="Product quantity"
                            minValue={0}
                            step={1}
                            className="w-full"
                        />
                        <RHInput
                            type="number"
                            name="price"
                            placeholder="19.99"
                            label="Product price"
                            minValue={0}
                            className="w-full"
                        />
                        <RHInput
                            type="number"
                            name="rating"
                            placeholder="4.7"
                            label="Product rating"
                            minValue={1}
                            step={0.1}
                            maxValue={5}
                            className="w-full"
                        />
                        <RHTextArea
                            name="description"
                            placeholder="Details about the product goes here"
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
                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="mt-2">
                                <img
                                    src={imagePreview}
                                    alt="Selected Product"
                                    className="h-40 w-40 object-cover rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="border px-4 py-2 bg-primary text-white rounded font-medium hover:bg-secondary transition-colors duration-300 disabled:bg-primary/60 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating product..." : "Add Product"}
                    </button>
                </RHFormProvider>
            </div>
        </div>
    );
};

export default AddNewProduct;
