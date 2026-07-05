import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext, useMemo } from "react";
import ProductInfoSkeleton from "../../components/skeleton/ProductInfoSkeleton";
import { useSelector } from "react-redux";
import MyContext from "../../context/MyContext";
import { formatPrice } from "../../utils/formatPrice";
import { getDiscountPercentage } from "../../utils/getDiscountPercentage";
import RelatedProducts from "../../relatedProduct/RelatedProducts";
import { handleWishlist } from "../../utils/wishlist";
import { FaHeart, FaRegHeart, FaTruckFast } from "react-icons/fa6";
import { handleCartClick } from "../../utils/toggleCart";
import StockStatus from "../../components/stockStatus/StockStatus";
import Rating from "../../components/rating/Rating";
import { getDeliveryDate } from "../../utils/getDeliveryDate";

function ProductInfo() {
  const { getAllProducts, loader, profile } = useContext(MyContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  // safer check
  const isInCart = cartItems.some(item => item.id === id && item.userid === profile?.uid);
  const wishlistItems = useSelector(state => state.wishlist);

  // get product from context
  const product = getAllProducts.find(item => item.id === id) || null;

  const isWishlisted = wishlistItems.some(
    item =>
      item.id === id &&
      item.userid === profile?.uid
  );

  const discountPercentage = product
    ? getDiscountPercentage(
      product.originalPrice,
      product.price
    )
    : 0;

  const relatedProducts = useMemo(() => {
    return product
      ? getAllProducts
        .filter(
          (item) =>
            item.category === product.category &&
            item.id !== product.id
        )
        .slice(0, 4)
      : [];
  }, [product, getAllProducts]);

  if (loader) {
    return (
      <ProductInfoSkeleton />
    );
  }

  if (!product) {
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

  const highlights = [
    {
      label: "Brand",
      value: product.brand
    },
    {
      label: "Category",
      value: product.category
    }
  ];

  const deliveryFeatures = [
    {
      title: "Fast Delivery",
      value: `${product.deliveryDays} Days`,
      image:
        "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png"
    },

    {
      title: "Warranty",
      value: product.warranty,
      image:
        "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/81_81_Amazon_protect._CB562550732_.png"
    },

    {
      title: "Easy Return",
      value: product.returnPolicy,
      image:
        "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png"
    }
  ];

  return (
    <Layout className="max-w-6xl mx-auto p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="m-4 font-semibold px-4 py-1 bg-pink-700 text-white rounded-lg
                    hover:bg-pink-500 transition duration-300"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-pink-100 shadow-md rounded-2xl p-6">

        {/* Image Section*/}
        <div className="relative bg-white rounded-xl shadow-md p-4 flex justify-center">
          {discountPercentage > 0 && (
            <div className="absolute top-4 left-4 z-10 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
              {discountPercentage}% OFF
            </div>
          )}

          {/* Trending Product */}
          {product.trending && (
            <div className="absolute top-4 right-4 z-10 bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
              🔥 Trending
            </div>
          )}

          {/* Wishlist Toggle*/}
          <button
            type="button"
            onClick={() => handleWishlist({ navigate, profile, product, isWishlisted })}
            className="absolute top-14 right-10 z-10 cursor-pointer bg-white p-2 rounded-full shadow-md"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-500 text-xl" />
            )}
          </button>

          {/* Image */}
          <img
            loading="lazy"
            src={product.imageUrl}
            alt={product.title}
            className="rounded-lg max-h-[400px] object-contain p-4 hover:scale-105 transition-all duration-300" />
        </div>

        {/* Content */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">{product.title}</h1>

          {/* Description*/}
          <p className="mt-4">{product.description}</p>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-3">

            <span
              className="bg-green-500 text-white px-2 py-1 rounded-lg font-bold"
            >
              {product.rating ?? 4.5}
            </span>

            <Rating rating={product.rating ?? 4.5} size="text-xl" />

            <span className="text-gray-500 text-md">
              ({product.totalReviews ?? 149} Reviews)
            </span>

          </div>

          <div className="mt-6 flex items-center gap-3 flex-wrap">

            <span className="text-3xl font-bold text-pink-600">
              ₹{formatPrice(product.price)}
            </span>

            {Number(product.originalPrice) > Number(product.price) && (
              <>
                <p className="text-gray-400 text-sm">
                  <span>M.R.P:</span> <span className="line-through">₹{formatPrice(product.originalPrice)}</span>
                </p>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          {/* Delivery details */}
          <div className="text-sm mt-1">

            {
              product.deliveryType === "free" ? (
                <p className="flex text-green-600">
                  <FaTruckFast className="mr-2 text-xl" />
                  FREE Delivery
                </p>
              ) : (
                <p className="flex font-semibold text-green-600">
                  <FaTruckFast className="mr-2 text-xl" />
                  Delivery Charge ₹{product.deliveryCharge}
                </p>
              )
            }

            <p className="font-bold">
              Get it by {getDeliveryDate(product.deliveryDays ?? 0)}
            </p>

          </div>

          {/* Stock */}
          <div className="mt-4">
            <StockStatus stock={product.stock} />
          </div>

          {/* Product Highlights */}

          <div className="mt-8 bg-gradient-to-br from-pink-100 to-white rounded-xl shadow-sm p-5">

            <h2 className="font-bold text-xl mb-4">
              Product Highlights
            </h2>

            <div className="grid grid-cols-2 gap-4" >
              {highlights.map((info, index) => (
                <div
                  key={index}
                  className="bg-pink-100 shadow-lg text-center rounded-lg p-3"
                >

                  <p className="text-sm text-gray-500">{info.label}</p>
                  <p className="font-semibold">{info.value}</p>

                </div>

              ))}
            </div>

          </div>

          {/* Delivery Cards */}
          <div className="mt-5 grid grid-cols-3 gap-4">

            {deliveryFeatures.map(
              (feature, index) => (
                <div
                  key={index}
                  className="bg-pink-100 shadow-lg rounded-lg p-3 text-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="m-auto bg-white rounded-xl w-10"
                  />

                  <p className="font-semibold">
                    {feature.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {feature.value}
                  </p>

                </div>
              )
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              disabled={Number(product.stock) <= 0}
              onClick={() => handleCartClick({ product, profile, navigate, isInCart })}
              className={`flex-1 py-3 rounded-lg text-white font-bold transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed
                              ${isInCart ? "bg-red-700 hover:bg-red-500" : "bg-pink-700 hover:bg-pink-500"
                }`}
            >
              {isInCart ? "🗑 Remove from Cart" : "🛒 Add to Cart"}
            </button>

            <button
              disabled={product.stock <= 0}
              className="flex-1 font-bold bg-orange-500 text-white py-3 rounded-lg
                                  hover:bg-orange-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
              Buy Now
            </button>
          </div>
        </div>

      </div>

      {/* Related Products */}
      <div className="mt-10 shadow-lg rounded-xl">
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>

    </Layout>
  );
}

export default ProductInfo;