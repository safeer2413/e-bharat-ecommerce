import React from "react";
import ImageUpload from "./ImageUpload";
import { HashLoader } from "react-spinners";

const inputStyle = `
w-full px-4 py-3 rounded-xl border border-pink-300
bg-pink-50 text-pink-700 placeholder:text-pink-400
focus:outline-none focus:ring-2 focus:ring-pink-500
focus:border-transparent transition-all duration-300
`;

function ProductFormPage({ setProduct, product, imageFile, setImageFile, buttonText, isLoading }) {

    return (
        <>
            {/* Basic Information */}
            <section>
                <h2 className="text-xl font-bold text-pink-700 border-b border-pink-200 pb-2 mb-4">
                    Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                        type="text"
                        placeholder="Product Title"
                        value={product.title}
                        onChange={(e) =>
                            setProduct({ ...product, title: e.target.value })
                        }
                        className={inputStyle}
                    />

                    <input
                        type="text"
                        placeholder="Brand"
                        value={product.brand}
                        onChange={(e) =>
                            setProduct({ ...product, brand: e.target.value })
                        }
                        className={inputStyle}
                    />

                    <select
                        value={product.category}
                        onChange={(e) =>
                            setProduct({ ...product, category: e.target.value })
                        }
                        className={inputStyle}
                    >
                        <option value="">Select Category</option>
                        <option value="Sunglass">Sunglass</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Headphone">Headphone</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Home">Home</option>
                        <option value="Watch">Watch</option>
                    </select>

                </div>
            </section>

            {/* Pricing */}
            <section>
                <h2 className="text-xl font-bold text-pink-700 border-b border-pink-200 pb-2 mb-4">
                    Pricing & Inventory
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                        type="number"
                        placeholder="Selling Price"
                        value={product.price}
                        onChange={(e) =>
                            setProduct({ ...product, price: e.target.value })
                        }
                        className={inputStyle}
                    />

                    <input
                        type="number"
                        placeholder="Original Price"
                        value={product.originalPrice}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                originalPrice: e.target.value,
                            })
                        }
                        className={inputStyle}
                    />

                    <input
                        type="number"
                        placeholder="Stock Quantity"
                        value={product.stock}
                        onChange={(e) =>
                            setProduct({ ...product, stock: e.target.value })
                        }
                        className={inputStyle}
                    />

                </div>
            </section>

            {/* Shipping */}
            <section>
                <h2 className="text-xl font-bold text-pink-700 border-b border-pink-200 pb-2 mb-4">
                    Shipping & Services
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                        type="number"
                        placeholder="Delivery Days"
                        value={product.deliveryDays}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                deliveryDays: e.target.value,
                            })
                        }
                        className={inputStyle}
                    />

                    <select
                        value={product.warranty}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                warranty: e.target.value,
                            })
                        }
                        className={inputStyle}
                    >
                        <option value="">Select Warranty</option>
                        <option value="No Warranty">No Warranty</option>
                        <option value="6 Months">6 Months</option>
                        <option value="1 Year">1 Year</option>
                        <option value="2 Years">2 Years</option>
                    </select>

                    <div className="md:col-span-2">
                        <select
                            value={product.returnPolicy}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    returnPolicy: e.target.value,
                                })
                            }
                            className={inputStyle}
                        >
                            <option value="">Select Return Policy</option>
                            <option value="No Return">No Return</option>
                            <option value="7 Days Replacement">
                                7 Days Replacement
                            </option>
                            <option value="10 Days Return">
                                10 Days Return
                            </option>
                            <option value="30 Days Return">
                                30 Days Return
                            </option>
                        </select>
                    </div>

                </div>
            </section>


            {/* Product Media */}
            <section>
                <h2 className="text-xl font-bold text-pink-700 border-b border-pink-200 pb-2 mb-4">
                    Product Media
                </h2>

                <div>
                    <ImageUpload

                        product={product}
                        setProduct={setProduct}
                        inputStyle={inputStyle}
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                    />
                </div>
            </section>

            {/* Description */}
            <section>
                <h2 className="text-xl font-bold text-pink-700 border-b border-pink-200 pb-2 mb-4">
                    Description
                </h2>

                <textarea
                    rows={5}
                    placeholder="Product Description"
                    value={product.description}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            description: e.target.value,
                        })
                    }
                    className={inputStyle}
                />
            </section>

            {isLoading && (
                <div className="absolute h-screen inset-x-0 bottom-0 z-[9999]
               flex justify-center items-center
               bg-black/20 backdrop-blur-sm">
                    <HashLoader
                        color="#fd4967"
                        size={50}
                    />

                </div>
            )}
            <button
                type="submit"
                className="
                w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-pink-700 to-red-200
                hover:from-pink-600 hover:to-red-400
                shadow-lg hover:shadow-xl
                transition-all duration-300
                "
            >

                {buttonText}
            </button>

        </>
    );
}

export default ProductFormPage;