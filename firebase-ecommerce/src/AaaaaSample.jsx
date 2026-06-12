import { useState } from "react";

const products = [
    {
        id: 1,
        name: "iPhone",
        price: 80000
    },
    {
        id: 2,
        name: "Samsung",
        price: 50000
    },
    {
        id: 3,
        name: "Nothing Phone",
        price: 35000
    }
];

function ProductShow() {


    const [cart, setCart] = useState([]);

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0)
    // console.log(isCart)

    const getIsCart = (product) => {
        const isCart = cart.some((item) => item.id === product.id)
        return isCart
    }
    const getCartItem = (product) => {
        const cartItem = products.find((item) => item.id === product.id)
        return cartItem
    }

    const addCartHandler = (product) => {
        const cartItem = getCartItem(product)
        const isCart = getIsCart(cartItem)

        if (isCart) {

            const updateCart = cart.map((item) => {
                if (item.id === cartItem.id) {

                    return {
                        ...item, qty: item.qty + 1
                    }
                }
                return item
            })

            setCart(updateCart)
            return;
        }

        setCart([...cart, { ...cartItem, qty: 1 }])
    }

    const removeFromCart = (id) => {
        const filterCart = cart.filter((item) => item.id !== id)
        setCart(filterCart)
    }

    const decrementQty = (product) => {

        if (product.qty === 1) {

            return removeFromCart(product.id)
        }

        const updatedCart = cart.map((item) => {

            if (item.id === product.id) {
                return { ...item, qty: item.qty - 1 }
            }
            return item

        })
        setCart(updatedCart)
    }

    const incrementQty = (product) => {

        const updatedCart = cart.map((item) => {
            if (item.id === product.id) {
                return { ...item, qty: item.qty + 1 }
            }
            return item
        })

        setCart(updatedCart)
    }

    return (
        <>
            
            <h2 className="bg-gray-600 flex justify-between p-3 m-1 rounded-md font-semibold text-2xl">
                <span>Products</span> <span>Cart : ( {cart.length} )</span>
            </h2>
            <div className="grid grid-cols-3">
                {products.map((item) => (

                    <div key={item.id} className="text-center justify-between p-4 font-semibold rounded-md m-2 bg-yellow-500">
                        <h3>{item.name}</h3>
                        <h3>₹{item.price}</h3>
                        { }
                        <button className="bg-green-600 p-1 rounded-lg hover:bg-green-400" onClick={() => addCartHandler(item)}>Add To Cart</button>
                        <button className="bg-red-600 mt-2 p-1 rounded-lg hover:bg-red-400" onClick={() => removeFromCart(item.id)}>Remove From Cart</button>

                    </div>
                ))}

            </div>
            <>
                <h2 className="flex justify-between bg-lime-800 p-5 text-center m-1 rounded-md font-semibold text-2xl">
                    <span>Cart Items({cartCount})</span> <span>Total Amount : ₹ {totalAmount}</span>
                </h2>

                <div className="grid grid-cols-3">
                    {cart.map((item) => (

                        <div key={item.id} className="p-5 font-semibold grid rounded-md m-2 bg-orange-500">
                            <h3>{item.name}</h3>
                            <h3>₹{item.price}</h3>
                            <div className="flex justify-evenly">
                                <button
                                    onClick={() => { decrementQty(item) }}
                                    className="bg-white px-2 rounded-md hover:bg-gray-300">-</button>
                                <p>Qty :{item.qty}</p>
                                <button
                                    onClick={() => { incrementQty(item) }}
                                    className="bg-white px-2 rounded-md hover:bg-gray-300">+</button>
                            </div>

                            <h3>Total : ₹{item.price * item.qty} </h3>
                            <button className="bg-red-700 mt-2 p-1 rounded-lg hover:bg-red-400" onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                </div>

            </>
        </>
    )
}
export default ProductShow;