const category = [
    {
        image: "https://cdn-icons-png.flaticon.com/256/4359/4359963.png",
        name: "Fashion",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/256/11833/11833323.png",
        name: "Shirt",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/256/8174/8174424.png",
        name: "Jacket",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/256/7648/7648246.png",
        name: "Mobile",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/256/12142/12142416.png",
        name: "Laptop",
    },
    {
        image: "https://cdn4.iconfinder.com/data/icons/clothes-donation-1/500/vab1367_4_sport_shoes_donation_isometric-512.png",
        name: "Shoes",
    },
    {
        image: "https://static.vecteezy.com/system/resources/previews/028/263/179/original/color-icon-for-furniture-vector.jpg",
        name: "Home",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/256/3145/3145765.png",
        name: "Books",
    },
];
function Category() {
    return (
        <div className="w-full bg-white py-6">
            <div className="mx-auto max-w-7xl px-4">
                <div
                    className="
            flex gap-8 overflow-x-auto scrollbar-hide
            md:grid md:grid-cols-6 lg:grid-cols-8 md:overflow-visible"
                >
                    {category.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center cursor-pointer group min-w-[80px]"
                        >
                            {/* circle icon */}
                            <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center group-hover:scale-105 transition duration-300">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-contain"
                                />
                            </div>

                            {/* name */}
                            <p className="mt-2 text-sm font-semibold capitalize text-center">
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

