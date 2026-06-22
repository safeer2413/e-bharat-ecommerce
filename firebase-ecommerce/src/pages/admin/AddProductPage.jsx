import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { HashLoader } from "react-spinners";
import { uploadImage } from "../../utils/cloudinary";
import ProductFormPage from "./ProductFormPage";

const AddProductPage = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Product State
  const [product, setProduct] = useState({
    title: "",
    brand: "",

    category: "",
    description: "",

    price: "",
    originalPrice: "",

    stock: "",

    imageUrl: "",

    deliveryDays: "",
    warranty: "",
    returnPolicy: "",
  });


  const addProduct = async (e) => {
    e?.preventDefault();

    if (product.title == "" || product.price == "" || (!product.imageUrl && !imageFile)) {
      return toast.error("Please fill all the fields");
    }

    setIsLoading(true);

    try {

      let downloadURL = "";

      if (imageFile) {
        downloadURL = await uploadImage(imageFile);
      }

      const productRef = collection(fireDB, "products");
      const productWithTime = {
        ...product,
        price: Number(product.price),
        originalPrice: Number(product.originalPrice),
        stock: Number(product.stock),
        deliveryDays: Number(product.deliveryDays),
        imageUrl:
          downloadURL ||
          product.imageUrl ||
          "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg",

        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit"
        }),

        time: Timestamp.now()
      };

      await addDoc(productRef, productWithTime);
      toast.success("Product Added Successfully");
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-pink-50 via-rose-100
                     to-pink-200 flex items-center justify-center p-6 relative ">
      <div className="relative bg-white backdrop-blur-md border border-pink-200
                       shadow-2xl rounded-3xl p-8 w-full max-w-5xl">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-1 border border-pink-400 font-semibold
                           bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-50
                           transition-all duration-300"
        >
          ← Back
        </button>

        {isLoading && (
          <div className="absolute h-full max-h-screen inset-x-0 top-0 z-[9999]
               flex justify-center items-center
               bg-black/20 backdrop-blur-sm">
            <HashLoader
              color="#fd4967"
              size={50}
            />
          </div>
        )}

        {/* Heading */}
        <h1 className="w-fit mx-auto text-2xl font-bold text-pink-600 border-2 border-red-700 rounded-xl px-5 py-2 mb-6">
          Add Product
        </h1>

        <form onSubmit={addProduct} className="space-y-8">

          <ProductFormPage
            product={product}
            setProduct={setProduct}
            imageFile={imageFile}
            setImageFile={setImageFile}
            buttonText="Add Product"

          />
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;