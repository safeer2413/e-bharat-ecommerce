import { useState } from "react";

// sample search data (replace with product data / props later)
const searchData = [
    {
        name: "Fashion",
        image:
            "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
    },
    {
        name: "Shirt",
        image:
            "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
    },
    {
        name: "Jacket",
        image:
            "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
    },
    {
        name: "Mobile",
        image:
            "https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg",
    },
    {
        name: "Laptop",
        image:
            "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
    },
];
function SearchBar() {
    const [search, setSearch] = useState("");

    const filterSearchData = searchData
        .filter((obj) =>
            obj.name.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 8);

    return (
        <div className="relative">
            {/* search input */}
            <div className="flex justify-center">
                <input
                    type="text"
                    placeholder="Search here"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-200 placeholder-gray-500 rounded-lg py-1 px-2 w-64 outline-none text-black"
                />
            </div>

            {/* search drop-down */}
            {search && (
                <div className="absolute z-50 mt-1 w-64 bg-gray-200 rounded-lg p-2">
                    {filterSearchData.length > 0 ? (
                        filterSearchData.map((item, index) => (
                            <div
                                key={index}
                                className="py-2 px-2 hover:bg-gray-300 rounded cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <img className="w-10" src={item.image} alt={item.name} />
                                    <span className="text-black">{item.name}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 p-auto">
                            <img className="w-40 h-16 mx-auto " src="https://www.assignmentdesk.co.uk/templates/assignmentdesk/images/no-result.png" alt="img" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
