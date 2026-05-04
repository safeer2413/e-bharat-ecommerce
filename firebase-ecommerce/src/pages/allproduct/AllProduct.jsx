import Layout from "../../components/layout/Layout"
import { useContext } from "react";
import MyContext from "../../context/MyContext";
import { HashLoader } from "react-spinners";
import AllProductSkeleton from "../../components/skeleton/AllProductSkeleton";
import ProductCard from "../../components/productCard/ProductCard";

function AllProduct() {
    const context = useContext(MyContext);
    const { getAllProducts, loader } = context;
    return (
        <Layout>
            <h3 className="font-semibold text-center text-2xl truncate py-6">
                All <i className="text-pink-600">Product's</i>
            </h3>

            {loader ? (
                <AllProductSkeleton />
            ) : (
                getAllProducts.length === 0 ? (
                    <div className="absolute border border-pink-300 rounded p-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h1 className="text-2xl font-semibold text-pink-300">
                            Product Not Found
                        </h1>
                    </div>
                ) :
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 min-h-80 gap-6 relative">
                        {getAllProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>


            )}

        </Layout>
    )
}

export default AllProduct