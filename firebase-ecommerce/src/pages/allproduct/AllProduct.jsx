import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout"

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
function AllProduct() {
    const Navigate = useNavigate();
    return (
        <Layout>
            <h3 className="font-semibold text-center text-2xl truncate py-6">
                All <i class="text-pink-600">Product's</i>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-6">

                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-pink-100 rounded-lg shadow-md hover:shadow-xl hover:shadow-pink-200 transition duration-300"
                    >
                        {/* Image */}
                        <div className="overflow-hidden rounded-t-lg">
                            <img
                                onClick={() => Navigate(`/productInfo/${product.id}`)}
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="font-semibold text-lg truncate">
                                {product.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {product.desc}
                            </p>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-pink-600 font-bold text-lg">
                                    ₹{product.price}
                                </span>

                                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">
                                    {product.trendingProductName}
                                </span>
                            </div>

                            <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default AllProduct