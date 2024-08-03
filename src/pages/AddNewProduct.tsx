import RHFormProvider from "@/components/form/RHFormProvider";
import RHInput from "@/components/form/RHInput";
import RHTextArea from "@/components/form/RHTextArea";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

const AddNewProduct = () => {

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    // handle image change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        }
    };


    return (
        <div className="relative flex min-h-[100vh]">

            {/* image */}
            <div className="fixed top-0 left-0 h-full w-2/5"
                style={{
                    backgroundImage: "url('/bg/bgHill.webp')",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
            </div>

            {/* form wrapper */}
            <div className="ml-[40%] container mx-auto p-10 overflow-y-auto bg-offWhite">
                <h2 className="text-3xl font-primary text-primary font-bold mb-5">Add New Product</h2>
                <RHFormProvider onSubmit={onSubmit} className="space-y-5">
                    <div className="space-y-5 pr-20">
                        {/* product name */}
                        <RHInput
                            type="text"
                            name="name"
                            placeholder="Product name"
                            label="Product name"
                            className="w-full"
                        />
                        {/* product category */}
                        <RHInput
                            type="text"
                            name="category"
                            placeholder="Product category"
                            label="Product category"
                            className="w-full"
                        />
                        {/* product quantity */}
                        <RHInput
                            type="number"
                            name="quantity"
                            placeholder="Product quantity"
                            label="Product quantity"
                            minValue={0}
                            className="w-full"
                        />
                        {/* product price */}
                        <RHInput
                            type="number"
                            name="price"
                            placeholder="Product price"
                            label="Product price"
                            minValue={0}
                            className="w-full"
                        />
                        {/* product description */}
                        <RHTextArea
                            name="description"
                            placeholder="Product description"
                            label="Product description"
                            className="w-full"
                        />
                        {/* product image */}
                        <RHInput
                            type="file"
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
                    <button type="submit" className="border px-3 py-1 self-start bg-primary text-white rounded font-medium hover:bg-secondary duration-300">
                        Add Product
                    </button>
                </RHFormProvider>
            </div>

        </div>
    );
};

export default AddNewProduct;