import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import { uploadImage } from "../../utils/cloudinary";
import ProductFormPage from "./ProductFormPage";

function UpdateProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

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

  })

  useEffect(() => {
    const getSingleProduct = async () => {
      setIsLoading(true);

      const docRef = doc(fireDB, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const product = docSnap.data();

        setProduct({
          title: product.title,
          brand: product.brand,

          category: product.category,
          description: product.description,

          price: product.price,
          originalPrice: product.originalPrice,

          stock: product.stock,

          imageUrl: product.imageUrl,

          deliveryDays: product.deliveryDays,
          warranty: product.warranty,
          returnPolicy: product.returnPolicy,
        });
      }

      setIsLoading(false);
    };

    if (id) {
      getSingleProduct();
    }
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    if (product.title == "" || product.price == "" || (!product.imageUrl && !imageFile)) {
      return toast.error("Please fill all the fields");
    }
    setIsLoading(true);

    try {
      let imageUrl = product.imageUrl;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const docRef = doc(fireDB, "products", id);
      await updateDoc(docRef,
        {
          ...product,
          imageUrl,
          updatedAt: Timestamp.now(),
        });
      toast.success("Product Updated Successfully");
      navigate("/admin-dashboard");

    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=" min-h-screen bg-gradient-to-br from-pink-50 via-rose-100
                     to-pink-200 flex items-center justify-center p-6 relative ">
      <div className="relative bg-white backdrop-blur-md border border-pink-200
                       shadow-2xl rounded-3xl p-8 w-full max-w-5xl">

        <button
          onClick={() => navigate(-1)}
          className="mb-3 font-semibold px-4 py-1 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-300"
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

        {/* Title */}
        <h1 className="w-fit mx-auto text-2xl font-bold text-pink-600 border-2 border-red-700 rounded-xl px-5 py-2 mb-6">
          Update Product
        </h1>

        <form onSubmit={updateProduct} className="space-y-4">

          <ProductFormPage
            product={product}
            setProduct={setProduct}
            imageFile={imageFile}
            setImageFile={setImageFile}
            buttonText="Update Product"
            isLoading={isLoading}

          />

        </form>
      </div>
    </div>
  )
}

export default UpdateProductPage