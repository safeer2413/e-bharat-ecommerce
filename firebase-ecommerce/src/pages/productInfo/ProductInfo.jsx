import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import ProductInfoSkeleton from "../../components/skeleton/ProductInfoSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import MyContext from "../../context/MyContext";
import { formatPrice } from "../../utils/formatPrice";

function ProductInfo() {
  const { getAllProducts, loader } = useContext(MyContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // ✅ safer check
  const isInCart = cartItems.some(item => item.id === id && item.userid === user?.uid);

  // ✅ get product from context
  const product = getAllProducts.find(item => item.id === id) || null;

  // ✅ toggle cart
  const handleCartClick = () => {
    if (!product) return;

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (isInCart) {
      dispatch(deleteFromCart({
        id: product.id,
        userid: user.uid
      }));
      toast.error("Removed from Cart");
    } else {
      const cleanProduct = {
        ...product,
        price: Number(product.price),
        userid: user?.uid,
        useremail: user?.email,
      };

      dispatch(addToCart(cleanProduct));
      toast.success("Added to Cart");
    }
  };

  // ❗ product + loading
  if (!product && !loader) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-500">Product Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <Layout className="max-w-6xl mx-auto p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="m-4 font-semibold px-4 py-1 bg-pink-700 text-white rounded-lg hover:bg-pink-500 transition duration-300"
      >
        ← Back
      </button>

      {loader ? (
        <ProductInfoSkeleton />
      ) : (
        product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-pink-100 shadow-md rounded-2xl p-6">

            {/* Image */}
            <div className="flex rounded-lg shadow-md justify-center">
              <img
                loading="lazy"
                src={product.imageUrl}
                alt={product.title}
                className="rounded-lg max-h-[400px] object-contain p-4"
              />
            </div>

            {/* Content */}
            <div>
              <h1 className="text-3xl font-bold">{product.title}</h1>

              <div className="flex mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < product.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  >
                    {i < product.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>

              <p className="mt-3">
                Category: <b>{product.category}</b>
              </p>

              <p className="mt-4">{product.description}</p>

              <h2 className="mt-6 text-2xl font-bold text-pink-600">
                ₹{formatPrice(product.price)}
              </h2>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleCartClick}
                  className={`flex-1 py-3 rounded-lg text-white transition duration-300 ${isInCart ? "bg-red-700 hover:bg-red-500" : "bg-pink-700 hover:bg-pink-500"
                    }`}
                >
                  {isInCart ? "Remove from Cart" : "Add to Cart"}
                </button>

                <button className="flex-1 border border-pink-600 bg-yellow-200 text-pink-600 py-3 rounded-lg hover:bg-green-400
                                  hover:text-white hover:border-yellow-600 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>

          </div>
        )
      )}
    </Layout>
  );
}

export default ProductInfo;