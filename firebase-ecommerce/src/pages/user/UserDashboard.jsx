import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/MyContext";
import Loader from "../../components/loader/Loader";
import OrderList from "./OrderList";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {

  const context = useContext(MyContext);
  const { getAllOrders, loader, user } = context;
  const navigate = useNavigate();
  console.log(user);
  if (!user) {
    return <Loader />;
  }
  return (
    <Layout>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="m-4 font-semibold px-4 py-1 bg-pink-700 text-white rounded-lg hover:bg-pink-500 transition duration-300"
      >
        ← Back
      </button>
      <section className="bg-gray-50 min-h-screen py-8">

        <div className="max-w-6xl mx-auto px-4">


          {/* USER CARD */}
          <div className="bg-pink-50 border border-pink-200 rounded-xl 
                        flex flex-col md:flex-ro items-center gap-6 p-6 mb-10">

            {/* Avatar */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
              alt="User"
              className="w-24 h-24 rounded-full border-4 border-pink-400"
            />

            {/* User Info */}
            <div className="text-center text-pink-400">
              <p className="text-md font-bold">{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ""}</p>
              <p className="text-xl font-bold">{user?.name}
              </p>
              <p className="font-bold">{user?.email}</p>
              <p className="text-md font-bold text-pink-200">
                Created At : <span className="font-normal">{
                  new Date(
                    user.createdAt.seconds * 1000
                  ).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                }</span>
              </p>
            </div>
          </div>

          {/* ORDER DETAILS TITLE */}
          <h2 className="text-2xl font-bold mb-4">
            Order Details
          </h2>

          {/* ORDER CARD */}
          {loader ? <Loader /> : <OrderList orders={getAllOrders} loader={loader} user={user} />}

        </div>
      </section>
    </Layout>
  );
};

export default UserDashboard;