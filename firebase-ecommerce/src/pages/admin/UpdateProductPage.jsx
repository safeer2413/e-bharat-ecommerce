import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";

function UpdateProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "fashion",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric"
      }
    )
  })

  useEffect(() => {
    const getSingleProduct = async () => {
      setisLoading(true);

      const docRef = doc(fireDB, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const product = docSnap.data();

        setProduct({
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
          description: product.description,
          quantity: product.quantity
        });
      }

      setisLoading(false);
    };

    if (id) {
      getSingleProduct();
    }
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    if (product.title == "" || product.price == "" || product.imageUrl == "") {
      return alert("Please fill all the fields");
    }

    setisLoading(true);

    try {
      const docRef = doc(fireDB, "products", id);
      await updateDoc(docRef, product);
      toast.success("Product Updated Successfully");
      navigate("/admin-dashboard");
      setisLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      setisLoading(false);
    }
  }

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
          Update Product
        </h1>

        <form onSubmit={updateProduct} className="space-y-4">

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
            Update Product
          </button>

        </form>
      </div>
    </div>
  )
}

export default UpdateProductPage