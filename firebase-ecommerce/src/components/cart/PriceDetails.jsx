import { formatPrice } from "../../utils/formatPrice"
import Loader from "../loader/Loader"

function PriceDetails({ totalPrice, totalQuantity }) {

    return (
        <>
            {/* RIGHT SIDE - PRICE DETAILS */}

            <div className="bg-white border border-pink-100 rounded-xl shadow-md p-5">
                <h2 className="font-semibold border-b pb-3 mb-4 text-lg">
                    Price Details
                </h2>

                <div className="flex justify-between text-sm mb-2">
                    <span>Items ({totalQuantity})</span>
                    <span>₹{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-sm mb-2 text-green-600">
                    <span>Discount</span>
                    <span>- ₹0</span>
                </div>

                <div className="flex justify-between text-sm mb-2">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{formatPrice(totalPrice)}</span>
                </div>
            </div>
        </>
    )
}

export default PriceDetails