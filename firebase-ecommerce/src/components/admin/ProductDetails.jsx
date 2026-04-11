import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import { HashLoader } from "react-spinners";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function ProductDetails() {

    const context = useContext(MyContext);
    const { loader, setLoader, getAllProducts } = context;
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };
    const confirmDelete = () => {
        setLoader(true);
        const docRef = doc(fireDB, "products", deleteId);
        deleteDoc(docRef);
        toast.success("Product Deleted Successfully");
        setShowDeleteModal(false);
        setLoader(false);
    };

    return (
        <div className="bg-white rounded-xl shadow p-6 relative">

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-pink-600">
                    All Products
                </h2>

                {loader && (
                    <div className="absolute inset-0 z-50 
    flex justify-center items-center
    bg-white/20 backdrop-blur-[1px]">
                        <HashLoader
                            color="#fd4967"
                            size={50}
                        />
                    </div>
                )}

                <Link to="/addproduct">
                    <button className="bg-pink-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-pink-700">
                        Add Product
                    </button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border border-pink-300 text-sm">

                    <thead className="bg-pink-200 text-pink-600">
                        <tr>
                            <th className="p-3 border">S.No.</th>
                            <th className="p-3 border">Product Image</th>
                            <th className="p-3 border">Product Title</th>
                            <th className="p-3 border">Product Price</th>
                            <th className="p-3 border">Product Category</th>
                            <th className="p-3 border">Product Date</th>
                            <th className="p-3 border">Action</th>
                            <th className="p-3 border">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {getAllProducts.map((item, index) => (
                            <tr key={item.id} className="text-center">

                                <td className="p-3 border">
                                    {index + 1}
                                </td>

                                <td className="p-3 border">
                                    <img
                                        src={item.imageUrl}
                                        alt="product"
                                        className="w-12 h-12 mx-auto rounded"
                                    />
                                </td>

                                <td className="p-3 border">
                                    {item.title}
                                </td>

                                <td className="p-3 border">
                                    ₹ {item.price}
                                </td>

                                <td className="p-3 border">
                                    {item.category}
                                </td>

                                <td className="p-3 border">
                                    {item.date}
                                </td>

                                <td
                                    className="p-3 border text-green-600 font-semibold cursor-pointer"
                                    onClick={() => navigate(`/updateproduct/${item.id}`)}
                                >
                                    Edit
                                </td>

                                <td className="p-3 border text-red-500 font-semibold cursor-pointer">
                                    <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
                                </td>

                            </tr>


                        ))}
                    </tbody>

                </table>
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm 
  flex justify-center items-center z-50">

                        <div className="bg-white p-6 rounded-xl shadow-lg w-80">
                            <h2 className="text-lg font-semibold mb-4">
                                Delete Product?
                            </h2>

                            <p className="text-gray-600 mb-5">
                                Are you sure you want to delete this product?
                            </p>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>

        </div>
    );
}

export default ProductDetails;