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

    // handle image change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        if (file) {
            setProductImage(file);
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };

    // send the new data to server
    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Creating new product!");
        try {
            const formData = new FormData();

            // Append the file
            if (productImage) {
                formData.append('file', productImage)
            }

            const productData = {
                name: data?.name,
                description: data?.description,
                category: data?.category,
                price: Number(data?.price),
                quantity: Number(data?.quantity),
                rating: Number(data?.rating)
            };

            formData.append('data', JSON.stringify(productData));
            // send the formData to api
            await createProduct(formData).unwrap();
            toast.success("Created new product!", { id: toastId, duration: 2000 });
        } catch (error) {
            toast.error("Something went wrong!", { id: toastId, duration: 2000 });
        }
    };


    return (
        <div className="relative flex min-h-[100vh]">

            {/* image section */}
            <div className="fixed top-0 left-0 h-full w-2/5"
                style={{
                    backgroundImage: "url('/bg/bgHill.webp')",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
            </div>

            {/* form section */}
            <div className="ml-[40%] container mx-auto p-10 overflow-y-auto bg-offWhite">
                <h2 className="text-3xl font-primary text-primary font-bold mb-5">Add New Product</h2>
                <RHFormProvider onSubmit={onSubmit} className="space-y-5">
                    <div className="space-y-5 pr-20">
                        <RHInput
                            type="text"
                            name="name"
                            placeholder="Product name"
                            label="Product name"
                            className="w-full"
                        />
                        <RHInput
                            type="text"
                            name="category"
                            placeholder="Product category"
                            label="Product category"
                            className="w-full"
                        />
                        <RHInput
                            type="number"
                            name="quantity"
                            placeholder="Product quantity"
                            label="Product quantity"
                            minValue={0}
                            className="w-full"
                        />
                        <RHInput
                            type="number"
                            name="price"
                            placeholder="Product price"
                            label="Product price"
                            minValue={0}
                            className="w-full"
                        />
                        <RHInput
                            type="number"
                            name="rating"
                            placeholder="Product rating"
                            label="Product rating"
                            minValue={1}
                            step={0.1}
                            maxValue={5}
                            className="w-full"
                        />
                        <RHTextArea
                            name="description"
                            placeholder="Product description"
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
                        disabled={isLoading}>
                        {isLoading ? "Creating product" : "Add Product"}
                    </button>
                </RHFormProvider>
            </div>
        </div>
    );
};

export default AddNewProduct;