import { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import { LuSearchX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";

function SearchBar() {

    const context = useContext(MyContext);
    const { getAllProducts } = context;
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const filterSearchData = getAllProducts
        .filter((obj) =>
            obj.title.toLowerCase().includes(search.toLowerCase()) ||
            obj.brand.toLowerCase().includes(search.toLowerCase()) ||
            obj.category.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 8);

    return (
        <div className="relative">
            {/* search input */}
            <div className="flex justify-center relative">
                <FaSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-40 sm:w-64 rounded-lg border border-gray-300 bg-gray-100 py-1
                    
                                pl-10 pr-10 text-black outline-none focus:border-pink-500
                                focus:ring-2 focus:ring-pink-200" />
                {/* className="bg-gray-200 placeholder-gray-500 rounded-lg py-1 px-2 w-64 outline-none text-black" */}

                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600 transition"
                    >
                        <RxCross2 size={18} />
                    </button>
                )}
            </div>

            {/* search drop-down */}
            {search && (
                <div className="absolute z-50 mt-2 w-64 max-h-80 overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-400 p-2">
                    {filterSearchData.length > 0 ? (
                        filterSearchData.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-50 transition cursor-pointer"
                            >
                                <div
                                    onClick={() => {
                                        navigate(`/productInfo/${item.id}`);
                                        setSearch("");
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    <img className="w-10" src={item.imageUrl} alt={item.title} />
                                    <span className="text-black">{item.title}</span>
                                </div>
                            </div>
                        ))
                    ) : (

                        <div className="rounded-lg border border-pink-200 bg-pink-50 py-2 text-center">

                            <LuSearchX className="mx-auto text-2xl text-pink-400" />

                            <p className="mt-2 font-semibold text-pink-600">
                                No Products Found
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Please try another search.
                            </p>

                        </div>

                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;