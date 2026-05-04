import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import ProductInfoSkeleton from "../../components/skeleton/ProductInfoSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import MyContext from "../../context/MyContext";

function ProductInfo() {
  const { getAllProducts, loader } = useContext(MyContext);

  // const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // ✅ safer check
  const isInCart = cartItems.some(item => item.id === id);

  // ✅ get product from context
  const product = getAllProducts.find(item => item.id === id) || null;

  // ✅ toggle cart
  const handleCartClick = () => {
    if (!product) return;

    if (isInCart) {
      dispatch(deleteFromCart(product.id));
      toast.error("Removed from Cart");
    } else {
      const cleanProduct = {
        ...product,
        time: product.time?.toMillis?.() || Date.now()
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
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-pink-600 font-semibold hover:underline"
      >
        ← Back to Products
      </button>

      {loader ? (
        <ProductInfoSkeleton />
      ) : (
        product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">

            {/* Image */}
            <div className="flex justify-center">
              <img
                loading="lazy"
                src={product.imageUrl}
                alt={product.title}
                className="rounded-lg max-h-[450px] object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <h1 className="text-3xl font-bold">{product.title}</h1>

              <div className="flex mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < product.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>

              <p className="mt-3">
                Category: <b>{product.category}</b>
              </p>

              <p className="mt-4">{product.description}</p>

              <h2 className="mt-6 text-2xl font-bold text-pink-600">
                ₹{product.price}
              </h2>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleCartClick}
                  className={`flex-1 py-3 rounded text-white ${isInCart ? "bg-red-600" : "bg-pink-600"
                    }`}
                >
                  {isInCart ? "Remove from Cart" : "Add to Cart"}
                </button>

                <button className="flex-1 border border-pink-600 text-pink-600 py-3 rounded">
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