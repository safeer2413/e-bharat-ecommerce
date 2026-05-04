import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { HashLoader } from "react-spinners";

const AddProductPage = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Product State
  const [product, setProduct] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    quantity: 1,

  });

  const addProduct = async (e) => {
    e?.preventDefault();
    if (product.title == "" || product.price == "" || product.imageUrl == "") {
      return toast.error("Please fill all the fields");
    }
    setIsLoading(true);
    try {
      const productRef = collection(fireDB, "products");

      const productWithTime = {
        ...product,
        imageUrl:
          product.imageUrl ||
          "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg",
        time: Date.now(),
        date: new Date().toISOString()
      };
      await addDoc(productRef, productWithTime);
      toast.success("Product Added Successfully");
      navigate("/admin-dashboard");
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 relative">
      <div className="bg-pink-200 border border-pink-300 p-8 rounded-xl shadow-lg w-full max-w-md">

        <button
          onClick={() => navigate(-1)}
          className="mb-3 px-4 py-1 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-300"
        >
          ← Back
        </button>

        {isLoading && (
          <div className="absolute inset-0 z-50 
    flex justify-center items-center
    bg-white/20 backdrop-blur-[1px]">
            <HashLoader
              color="#fd4967"
              size={50}
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Add Product
        </h1>

        <form onSubmit={addProduct} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            placeholder="Product Title"
            value={product.title}
            onChange={(e) =>
              setProduct({ ...product, title: e.target.value })
            }
            className="w-full px-4 py-2 border border-pink-400 rounded-lg 
            bg-pink-100 text-pink-600 placeholder:text-pink-400
            focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Product Price"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            className="w-full px-4 py-2 border border-pink-400 rounded-lg 
            bg-pink-100 text-pink-600 placeholder:text-pink-400
            focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Image */}
          <input
            type="text"
            placeholder="Product Image Url"
            value={product.imageUrl}
            onChange={(e) =>
              setProduct({ ...product, imageUrl: e.target.value })
            }
            className="w-full px-4 py-2 border border-pink-400 rounded-lg 
            bg-pink-100 text-pink-600 placeholder:text-pink-400
            focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Category */}
          <select
            value={product.category}
            placeholder="-Select Category-"
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full px-4 py-2 border border-pink-400 rounded-lg 
            bg-pink-100 text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="sunglass">Sunglass</option>
            <option value="shirt">Shirt</option>
            <option value="headphone">Headphone</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
            <option value="shoes">Shoes</option>
            <option value="home">Home</option>
            <option value="watch">Watch</option>
          </select>

          {/* Description */}
          <textarea
            placeholder="Product Description"
            rows="4"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-pink-400 rounded-lg 
            bg-pink-100 text-pink-600 placeholder:text-pink-400
            focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg 
            font-semibold hover:bg-pink-700 transition"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProductPage;