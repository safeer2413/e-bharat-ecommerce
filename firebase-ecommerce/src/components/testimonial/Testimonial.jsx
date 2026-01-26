function Testimonial() {
    return (
        <section className="body-font p-5 bg-pink-100 rounded-md items-center border-2 border-pink-300">
            <div className="text-center mt-5">
                <p className="text-2xl text-dark font-bold">Testimonial</p>
                <p className="text-md text-dark font-bold">What our <i className="text-pink-600">Customers</i> are saying</p>
            </div>
            <div className="flex flex-col grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
                <div className="container border-2 rounded-lg border-pink-300 mx-auto p-5 shadow-lg shadow-pink-300 hover:shadow-xl hover:shadow-pink-400 transition duration-300">
                    <img src="/images/Safeerkhan.png" className="rounded-full w-24 h-24 object-cover mx-auto" alt="Safeerkhan" />
                    <p className="text-sm text-dark font-bold text-center mt-3">Shopping here is super easy and smooth. The product categories are well organized, checkout is fast, and delivery updates are very clear. I had a great experience!</p>
                    <hr className="w-24  mx-auto border-2 border-pink-800 my-2" />
                    <p className="text-md text-pink-600 font-bold text-center">Safeerkhan</p>
                    <p className="text-xs font-bold italic text-center">Customer</p>
                </div>
                <div className="container border-2 rounded-lg border-pink-300 mx-auto p-5 shadow-lg shadow-pink-300 hover:shadow-xl hover:shadow-pink-400 transition duration-300">
                    <img src="/images/RiyasKhan.jpg" className="rounded-full w-24 h-24 object-cover mx-auto" alt="Safeerkhan" />
                    <p className="text-sm text-dark font-bold text-center mt-3">This e-commerce platform is very user-friendly and mobile responsive. The search and filter options helped me find exactly what I wanted within seconds.</p>
                    <hr className="w-24  mx-auto border-2 border-pink-800 my-2" />
                    <p className="text-md text-pink-600 font-bold text-center">Riyaskhan</p>
                    <p className="text-xs font-bold italic text-center">Customer</p>
                </div>
                <div className="container border-2 rounded-lg border-pink-300 mx-auto p-5 shadow-lg shadow-pink-300 hover:shadow-xl hover:shadow-pink-400 transition duration-300">
                    <img src="/images/Ajin.jpg" className="rounded-full w-24 h-24 object-cover mx-auto" alt="Safeerkhan" />
                    <p className="text-sm text-dark font-bold text-center mt-3">Excellent service and quality products. Secure payment, fast delivery, and great customer support make this one of my favorite online shopping platforms.</p>
                    <hr className="w-24  mx-auto border-2 border-pink-800 my-2" />
                    <p className="text-md text-pink-600 font-bold text-center">Ajin Thomas</p>
                    <p className="text-xs font-bold italic text-center">Customer</p>
                </div>
            </div>

        </section>
    )
}

export default Testimonial