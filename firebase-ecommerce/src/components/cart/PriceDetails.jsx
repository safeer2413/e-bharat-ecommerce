import { formatPrice } from "../../utils/formatPrice"
import Loader from "../loader/Loader"

function PriceDetails({ totalQuantity, grandTotal, totalDiscount, totalDeliveryCharge, totalOriginalPrice }) {

    return (
        <>
            {/* RIGHT SIDE - PRICE DETAILS */}
            <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl border
                             border-pink-100 p-5 shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="font-semibold border-b border-pink-100 pb-3 mb-4 text-lg">
                    Price Details
                </h2>

                <div className="flex justify-between text-sm mb-2">
                    <span>Items ({totalQuantity})</span>
                    <span>+ ₹{formatPrice(totalOriginalPrice)}</span>
                </div>

                <div className="flex justify-between text-sm mb-2 text-green-600">
                    <span>Discount</span>
                    <span>- ₹{totalDiscount}</span>
                </div>

                <div className="flex justify-between text-sm mb-2">
                    <span>Delivery</span>
                    <span className="text-green-600">+ ₹{totalDeliveryCharge}</span>
                </div>

                <hr className="my-3 border-pink-100" />

                <div className="flex justify-between font-bold text-lg">
                    <span>Grand Total</span>
                    <span>₹{formatPrice(grandTotal)}</span>
                </div>
            </div>
        </>
    )
}

export default PriceDetails