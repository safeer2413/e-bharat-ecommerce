import { FaBoxOpen, FaListUl, FaUsers } from "react-icons/fa";
import Layout from "../../components/layout/Layout";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import ProductDetails from "../../components/admin/ProductDetails";
import OrderDetails from "../../components/admin/OrderDetails";
import UserDetails from "../../components/admin/UserDetails";
import { useContext, useEffect } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
    const context = useContext(MyContext);
    const { getAllProducts, getAllOrders, getAllUserHandler, allUsers, user: admin } = context;
    const navigate = useNavigate();

    const stats = [
        {
            id: 1,
            title: "Total Products",
            value: getAllProducts.length,
            icon: <FaBoxOpen size={28} />,
        },
        {
            id: 2,
            title: "Total Orders",
            value: getAllOrders.length,
            icon: <FaListUl size={28} />,
        },
        {
            id: 3,
            title: "Total Users",
            value: allUsers.length,
            icon: <FaUsers size={28} />,
        },
    ];

    useEffect(() => {

        if (admin?.role !== "admin") return;

        const unsubscribe =
            getAllUserHandler();

        return () => unsubscribe?.();

    }, [admin]);

    return (
        <Layout>
            <section className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Header */}
                    <div
                        className="bg-pink-200 border border-pink-300 rounded-xl
                                   px-4 py-4 mb-6 flex items-center justify-between"
                    >

                        {/* Back Button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="px-3 font-semibold py-1 font-medium
                                   bg-pink-700 text-white rounded-lg hover:bg-pink-500 transition duration-300 ease-in-out"
                        >
                            ← Back
                        </button>

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-pink-600">
                            Admin Dashboard
                        </h1>

                        {/* Empty spacer for perfect centering */}
                        <div className="w-[88px]" />

                    </div>

                    {/* Admin Card */}
                    <div className="bg-pink-200 border border-pink-300 rounded-xl 
                        flex flex-col items-center py-6 mb-8 text-pink-600">

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                            alt="admin"
                            className="w-24 h-24 rounded-full mb-4"
                        />

                        <p className="text-lg font-bold">
                            Name : <span className="font-normal">{admin?.name}</span>
                        </p>
                        <p className="text-lg font-bold">
                            Email : <span className="font-normal">{admin?.email}</span>
                        </p>
                        <p className="text-lg font-bold text-pink-300">
                            Created At : <span className="font-normal">{admin?.date}</span>
                        </p>
                    </div>

                    {/* Stats Cards */}

                    <Tabs>
                        <TabList className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((item) => (
                                <Tab
                                    key={item.id}
                                    className="bg-pink-200 border border-pink-300 text-pink-600
                                               rounded-xl p-6 text-center cursor-pointer
                                               transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                                    selectedClassName="shadow-lg scale-105 bg-pink-400 text-white border border-pink-500"
                                >

                                    <div className="flex justify-center  mb-2">
                                        {item.icon}
                                    </div>

                                    <h2 className="text-xl font-bold ">
                                        {item.value}
                                    </h2>

                                    <p className=" font-medium">
                                        {item.title}
                                    </p>
                                </Tab>

                            ))}
                        </TabList>

                        <TabPanel className="mt-8 shadow-lg rounded-lg shadow-pink-200">
                            <ProductDetails />
                        </TabPanel>
                        <TabPanel className="mt-8 shadow-lg rounded-lg shadow-pink-200">
                            <OrderDetails />
                        </TabPanel>
                        <TabPanel className="mt-8 shadow-lg rounded-lg shadow-pink-200">
                            <UserDetails />
                        </TabPanel>
                    </Tabs>

                </div>
            </section>
        </Layout>
    );
};

export default AdminDashboard;
