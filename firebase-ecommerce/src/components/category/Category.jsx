import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const category = [
    {
        image: "https://cdn-icons-png.flaticon.com/128/670/670048.png",
        name: "Sunglass",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/128/2793/2793867.png",
        name: "Shirt",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/128/2353/2353209.png",
        name: "Headphone",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/128/644/644458.png",
        name: "Mobile",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/128/2888/2888701.png",
        name: "Laptop",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/128/7090/7090999.png",
        name: "Shoes",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/128/3674/3674465.png",
        name: "Home",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/128/9413/9413719.png",
        name: "Watch",
    },
];

function Category() {
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        const container = scrollRef.current;
        const amount = 200;

        container.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
        <div className="w-full bg-white py-6">
            <div className="mx-auto max-w-7xl px-4 relative">

                {/* 🔹 Mobile Arrows ONLY */}
                <button
                    onClick={() => scroll("left")}
                    className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 
          w-8 h-8 rounded-full bg-pink-500 text-white shadow"
                >
                    ‹
                </button>

                <button
                    onClick={() => scroll("right")}
                    className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 
          w-8 h-8 rounded-full bg-pink-500 text-white shadow"
                >
                    ›
                </button>

                {/* 🔹 Container */}
                <div
                    ref={scrollRef}
                    className="
            flex gap-8 overflow-x-auto scrollbar-hide px-8
            md:grid md:grid-cols-8 md:overflow-visible md:px-0
          "
                >
                    {category.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/category/${item.name}`)}
                            className="flex flex-col items-center cursor-pointer group min-w-[80px]"
                        >
                            {/* icon */}
                            <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center group-hover:scale-105 transition">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-contain"
                                />
                            </div>

                            {/* name */}
                            <p className="mt-2 text-sm font-semibold text-center">
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Category;