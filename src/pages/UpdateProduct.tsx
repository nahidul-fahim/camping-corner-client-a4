import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import RHFormProvider from "@/components/form/RHFormProvider";
import RHInput from "@/components/form/RHInput";
import RHTextArea from "@/components/form/RHTextArea";
import { useGetSingleProductQuery, useUpdateProductMutation } from "@/redux/features/product/productApi";
import RHFileSelect from "@/components/form/RHFileSelect";
import { useParams } from "react-router-dom";
import ErrorComponent from "@/components/error/ErrorComponent";

const UpdateProduct = () => {

    const { id } = useParams();
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
    const onSubmit = async (data: FieldValues) => {

        const toastId = toast.loading("Updating product!");
        try {

            const updatedData = new FormData();

            const updatedProductData = {
                ...currentData,
                ...data,
                name: data?.name ?? currentData?.name,
                category: data?.category ?? currentData?.category,
                description: data?.description ?? currentData?.description,
                price: Number(data?.price ?? currentData?.price),
                quantity: Number(data?.quantity ?? currentData?.quantity),
            };

            // Append the file
            if (productImage) {
                updatedData.append('file', productImage)
            }
            else {
                updatedProductData.image = currentData?.image
            }

            console.log("Current data =>", currentData)
            console.log("Complete data =>", updatedProductData)

            // append the data
            updatedData.append('data', JSON.stringify(updatedProductData))

            // send the formData to api
            await updateProduct({id, updatedData}).unwrap();
            toast.success("Product updated!", { id: toastId, duration: 2000 });
        } catch (error) {
            toast.error("Something went wrong!", { id: toastId, duration: 2000 });
        }
    };

    // loading component and error component
    if (isLoading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <ErrorComponent />
    }


    return (
        <div className="relative flex min-h-[100vh]">
            <div className="fixed top-0 left-0 h-full w-2/5"
                style={{
                    backgroundImage: "url('/bg/bgHill1.webp')",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
            </div>

            <div className="ml-[40%] container mx-auto p-10 overflow-y-auto bg-offWhite">
                <h2 className="text-3xl font-primary text-primary font-bold mb-5">Update Product</h2>
                <RHFormProvider onSubmit={onSubmit} className="space-y-5">
                    <div className="space-y-5 pr-20">
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
                        <RHTextArea
                            name="description"
                            placeholder="Product description"
                            defaultValue={currentData?.name}
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