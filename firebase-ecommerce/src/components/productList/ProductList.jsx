import { useContext } from "react";
import MyContext from "../../context/MyContext";
import AllProductSkeleton from "../skeleton/AllProductSkeleton";
import ProductCard from "../productCard/ProductCard";
function ProductList() {
    const context = useContext(MyContext);
    const { getAllProducts, loader } = context;
    
    return (
        <>
            {loader ? (
                <AllProductSkeleton />
            ) : (
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative min-h-60
                        ${getAllProducts.length === 0 ? "border-2 border-pink-300 rounded" : ""}`}
                >
                    {getAllProducts.length === 0 ? (
                        <div className="absolute p-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <h1 className="text-2xl font-semibold text-pink-300">
                                Product Not Found
                            </h1>
                        </div>
                    ) : (
                        getAllProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))
                    )}
                </div>

            )
            }
        </>
    );
}

export default ProductList;