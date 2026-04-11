import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import ProductInfoSkeleton from "../../components/skeleton/ProductInfoSkeleton";
function ProductInfo() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const getProductData = async () => {
      setLoading(true)

      const docSnap = await getDoc(doc(fireDB, "products", id));

      if (docSnap.exists()) {
        setProduct(docSnap.data())
      }

      setLoading(false)
    }

    getProductData()
  }, [id])

  if (!product && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-500">Product Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <Layout className="max-w-6xl mx-auto p-6 relative">
      <button
        onClick={() => navigate(-1)}
        className="m-4 text-pink-600 font-semibold hover:underline"
      >
        ← Back to Products
      </button>

      {loading ? (
        <ProductInfoSkeleton />
      ) : (
        product && (<div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6 mx-auto">

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="rounded-lg max-h-[450px] object-cover shadow-md hover:scale-105 transition"
            />
          </div>

          {/* Content Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {product.title}
            </h1>

            <div className="flex items-center mt-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className="text-pink-500 text-xl">
                  {index < product?.rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            <p className="text-gray-500 mt-4">
              Category: <span className="font-semibold">{product.category}</span>
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6">
              <span className="text-3xl font-bold text-pink-600">
                ₹{product.price}
              </span>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition">
                Add to Cart
              </button>

              <button className="flex-1 border-2 border-pink-600 text-pink-600 py-3 rounded-lg hover:bg-pink-50 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>)
      )}

    </Layout>
  );
}

export default ProductInfo;