import { FaBoxOpen, FaListUl, FaUsers } from "react-icons/fa";
import Layout from "../../components/layout/Layout";

const AdminDashboard = () => {
    const admin = {
        name: "Safeerkhan",
        email: "test@gmail.com",
        avatar: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
    };

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
                    <div className="bg-pink-100 border border-pink-300 rounded-xl 
                        text-center py-4 mb-6">
                        <h1 className="text-2xl font-bold text-pink-600">
                            Admin Dashboard
                        </h1>
                    </div>

                    {/* Admin Card */}
                    <div className="bg-pink-100 border border-pink-300 rounded-xl 
                        flex flex-col items-center py-6 mb-8">

                        <img
                            src={admin.avatar}
                            alt="admin"
                            className="w-24 h-24 rounded-full mb-4"
                        />

                        <p className="font-semibold text-pink-600">
                            Name : {admin.name}
                        </p>
                        <p className="text-pink-600">
                            Email : {admin.email}
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((item) => (
                            <div
                                key={item.id}
                                className="bg-pink-100 border border-pink-300 
                         rounded-xl p-6 text-center"
                            >
                                <div className="flex justify-center text-pink-600 mb-2">
                                    {item.icon}
                                </div>

                                <h2 className="text-xl font-bold text-pink-600">
                                    {item.value}
                                </h2>

                                <p cglassName="text-pink-600 font-medium">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </Layout>
    );
};

export default AdminDashboard;
