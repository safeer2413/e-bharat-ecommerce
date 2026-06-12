import React, { useState } from 'react'

function ImageUpload({ product, setProduct, imageFile, setImageFile, inputStyle }) {

    const [imageMode, setImageMode] = useState("upload");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
    };

    const previewImage =
        imageMode === "url"
            ? product.imageUrl
            : imageFile
                ? URL.createObjectURL(imageFile)
                : "";

    return (
        <>
            <div className="flex gap-6">

                <label className="flex items-center gap-3 font-semibold text-pink-600">
                    <input
                        type='radio'
                        name="imageMode"
                        value="upload"
                        checked={imageMode === "upload"}
                        onChange={() => {
                            setImageMode("upload");
                            setProduct({
                                ...product,
                                imageUrl: ""
                            })
                        }
                        }
                    />
                    Upload Image
                </label>

                <label className="flex items-center gap-2 font-semibold text-pink-600">
                    <input
                        type='radio'
                        name="imageMode"
                        value="url"
                        checked={imageMode === "url"}
                        onChange={() => {
                            setImageMode("url");
                            setImageFile(null);
                        }
                        }
                    />
                    Paste URL
                </label>

                {
                    imageMode === "upload" && (

                        <input
                            type="file"
                            accept="image/*"
                            className={inputStyle}
                            onChange={handleImageChange}
                        />
                    )
                }
                {
                    imageMode === "url" && (

                        <input
                            type="text"
                            placeholder="Paste Image URL"
                            value={product.imageUrl}
                            className={inputStyle}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    imageUrl: e.target.value
                                })
                            }
                        />
                    )
                }
            </div>
            <div className='mt-5 flex justify-center'>
                {/* Preview */}
                {(previewImage || product.imageUrl) && (
                    <img
                        src={previewImage || product.imageUrl}
                        alt="Preview"
                        className="h-64 w-full max-w-md object-contain bg-white border border-pink-200 rounded-xl"
                    />
                )}
            </div>
        </>
    )
}

export default ImageUpload