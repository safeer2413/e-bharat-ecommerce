import { FaBoxOpen, FaListUl, FaUsers } from "react-icons/fa";
import Layout from "../../components/layout/Layout";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import ProductDetails from "../../components/admin/ProductDetails";
import OrderDetails from "../../components/admin/OrderDetails";
import UserDetails from "../../components/admin/UserDetails";
import { useContext } from "react";
import MyContext from "../../context/MyContext";

const AdminDashboard = () => {
    const context = useContext(MyContext);
    const { getAllProducts } = context;
    const admin = JSON.parse(localStorage.getItem("user"));
    const stats = [
        {
            id: 1,
            title: "Total Products",
            value: 10,
            icon: <FaBoxOpen size={28} />,
        },
        {
            id: 2,
            title: "Total Orders",
            value: 10,
            icon: <FaListUl size={28} />,
        },
        {
            id: 3,
            title: "Total Users",
            value: 10,
            icon: <FaUsers size={28} />,
        },
    ];

    return (
        <Layout>
            <section className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Header */}
                    <div className="bg-pink-200 border border-pink-300 rounded-xl 
                        text-center py-4 mb-6">
                        <h1 className="text-2xl font-bold text-pink-600">
                            Admin Dashboard
                        </h1>
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
                            Name : <span className="font-normal">{admin.name}</span>
                        </p>
                        <p className="text-lg font-bold">
                            Email : <span className="font-normal">{admin.email}</span>
                        </p>
                        <p className="text-lg font-bold">
                            Date : <span className="font-normal">{admin.date}</span>
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
                                        {getAllProducts.length}
                                    </h2>

                                    <p className=" font-medium">
                                        {item.title}
                                    </p>
                                </Tab>

                            ))}
                        </TabList>

                        <TabPanel className="mt-8 shadow-lg shadow-pink-200">
                            <ProductDetails />
                        </TabPanel>
                        <TabPanel className="mt-8 shadow-lg shadow-pink-200">
                            <OrderDetails />
                        </TabPanel>
                        <TabPanel className="mt-8 shadow-lg shadow-pink-200">
                            <UserDetails />
                        </TabPanel>
                    </Tabs>

                </div>
            </section>
        </Layout>
    );
};

export default AdminDashboard;
