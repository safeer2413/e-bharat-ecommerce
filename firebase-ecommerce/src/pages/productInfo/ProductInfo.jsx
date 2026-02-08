import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const products = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
    title: "Hand Painted Blue Kaushalam Tea Pot",
    desc: "Hand painted aluminium tea pot, ethically made with premium finish.",
    price: 150,
    category: "Home",
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
    title: "Kaushalam Copper Kalash Pot",
    desc: "Traditional copper kalash with handcrafted design.",
    price: 120,
    category: "Home",
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
    title: "Winter Jacket for Men",
    desc: "Stylish winter jacket with premium fabric and comfort fit.",
    price: 90,
    category: "Fashion",
    trendingProductName: "Trending",
    quantity: 1,
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg",
    title: "Smart Android Mobile",
    desc: "Latest android smartphone with powerful performance.",
    price: 300,
    category: "Electronics",
    trendingProductName: "Trending",
    quantity: 1,
  },
  {
    id: 5,
    image:
      "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
    title: "Laptop for Developers",
    desc: "High performance laptop suitable for coding and design.",
    price: 850,
    category: "Electronics",
    trendingProductName: "Featured",
    quantity: 1,
  },

  {
    id: 6,
    image:
      "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
    title: "Hand Painted Blue Kaushalam Tea Pot",
    desc: "Hand painted aluminium tea pot, ethically made with premium finish.",
    price: 150,
    category: "Home",
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 7,
    image:
      "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
    title: "Kaushalam Copper Kalash Pot",
    desc: "Traditional copper kalash with handcrafted design.",
    price: 120,
    category: "Home",
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 8,
    image:
      "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
    title: "Winter Jacket for Men",
    desc: "Stylish winter jacket with premium fabric and comfort fit.",
    price: 90,
    category: "Fashion",
    trendingProductName: "Trending",
    quantity: 1,
  },
  {
    id: 9,
    image:
      "https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg",
    title: "Smart Android Mobile",
    desc: "Latest android smartphone with powerful performance.",
    price: 300,
    category: "Electronics",
    trendingProductName: "Trending",
    quantity: 1,
  },
  {
    id: 10,
    image:
      "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
    title: "Laptop for Developers",
    desc: "High performance laptop suitable for coding and design.",
    price: 850,
    category: "Electronics",
    trendingProductName: "Featured",
    quantity: 1,
  },

  {
    id: 11,
    image:
      "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
    title: "Hand Painted Blue Kaushalam Tea Pot",
    desc: "Hand painted aluminium tea pot, ethically made with premium finish.",
    price: 150,
    category: "Home",
    trendingProductName: "Featured",
    quantity: 1,
  },
  {
    id: 12,
    image:
      "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
    title: "Kaushalam Copper Kalash Pot",
    desc: "Traditional copper kalash with handcrafted design.",
    price: 120,
    category: "Home",
    trendingProductName: "Featured",
    quantity: 1,
  },

];


function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-500">Product Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
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
        className="m-4 text-pink-600 font-semibold hover:underline"
      >
        ← Back to Products
      </button>

      <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap- bg-white shadow-lg rounded-lg p-6 mx-auto">

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={product.image}
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
                {index < product.rating ? "★" : "☆"}
              </span>
            ))}
          </div>

          <p className="text-gray-500 mt-4">
            Category: <span className="font-semibold">{product.category}</span>
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.desc}
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
      </div>
    </Layout>
  );
}

export default ProductInfo;
