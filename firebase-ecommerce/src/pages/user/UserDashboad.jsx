import React from "react";
import Layout from "../../components/layout/Layout";

const Dashboard = () => {
  return (
    <Layout>
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
            <div className="text-center md:text-left">
              <p className="text-lg font-semibold">
                Name : <span className="font-norma font-bold">Safeerkhan</span>
              </p>
              <p className="text-gray-600">
                Email : test@gmail.com
              </p>
            </div>
          </div>

          {/* ORDER DETAILS TITLE */}
          <h2 className="text-2xl font-bold mb-4">
            Order Details
          </h2>

          {/* ORDER CARD */}
          <div className="bg-white border rounded-xl overflow-hidden 
                        grid grid-cols-1 md:grid-cols-3">

            {/* LEFT : ORDER INFO */}
            <div className="bg-pink-50 p-6 border-r">
              <p className="mb-3">
                <span className="font-semibold">Order Id</span><br />
                #74557994327
              </p>

              <p className="mb-3">
                <span className="font-semibold">Date</span><br />
                4 March, 2023
              </p>

              <p className="mb-3">
                <span className="font-semibold">Total Amount</span><br />
                ₹84,499
              </p>

              <p>
                <span className="font-semibold">Order Status</span><br />
                <span className="text-green-600 font-medium">
                  Confirmed
                </span>
              </p>
            </div>

            {/* RIGHT : PRODUCT INFO */}
            <div className="md:col-span-2 p-6 flex gap-6 items-center">

              {/* Product Image */}
              <img
                src="https://static.nike.com/a/images/t_default/6e1d8.jpg"
                alt="Product"
                className="w-24 h-24 object-contain border rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  Nike Air Force 1 07 LV8
                </h3>
                <p className="text-gray-500">Orange</p>
                <p className="text-gray-500">Qty : 1</p>
              </div>

              {/* Price */}
              <div className="font-semibold text-lg">
                ₹61,999
              </div>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
