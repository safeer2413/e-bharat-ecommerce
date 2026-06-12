import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import Loader from "../loader/Loader";
const BuyNowModal = ({ setAddressInfo, addressInfo, handleBuyNow, loading }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            {/* Buy Now Button */}
            {loading ? (
                <div className="block lg:hidden">
                    <Loader />
                </div>
            ) : (
                <><Button
                    type="button"
                    onClick={handleOpen}
                    className="w-full py-3 text-center text-white 
                             bg-pink-600 rounded-xl hover:bg-pink-700 
                             transition-all duration-300 shadow-md"
                >
                    Checkout
                </Button>

                    {/* Modal */}
                    <Dialog
                        open={open}
                        handler={handleOpen}
                        className="bg-pink-50 shadow-2xl rounded-2xl"
                    >
                        <DialogBody className="p-6">

                            {/* Heading */}
                            <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
                                Order Details
                            </h2>

                            {/* Form */}
                            <div className="space-y-4">

                                {/* Name */}
                                <input
                                    type="text"
                                    required
                                    value={addressInfo.name}
                                    onChange={(e) => {
                                        setAddressInfo({
                                            ...addressInfo,
                                            name: e.target.value
                                        })
                                    }}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 rounded-lg border border-pink-200
                             bg-pink-50 text-pink-600 placeholder:text-pink-300
                             focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />

                                {/* Address */}
                                <input
                                    type="text"
                                    required
                                    value={addressInfo.address}
                                    onChange={(e) => {
                                        setAddressInfo({
                                            ...addressInfo,
                                            address: e.target.value
                                        })
                                    }}
                                    placeholder="Enter your address"
                                    className="w-full px-4 py-3 rounded-lg border border-pink-200 bg-pink-50 text-pink-600 placeholder:text-pink-300
                             focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />

                                {/* Pincode */}
                                <input
                                    type="number"
                                    required
                                    value={addressInfo.pincode}
                                    onChange={(e) => {
                                        setAddressInfo({
                                            ...addressInfo,
                                            pincode: e.target.value
                                        })
                                    }}
                                    placeholder="Enter your pincode"
                                    className="w-full px-4 py-3 rounded-lg border border-pink-200 bg-pink-50 text-pink-600 placeholder:text-pink-300
                             focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />

                                {/* Mobile */}
                                <input
                                    type="number"
                                    required
                                    value={addressInfo.mobile}
                                    onChange={(e) => {
                                        setAddressInfo({
                                            ...addressInfo,
                                            mobile: e.target.value
                                        })
                                    }}
                                    placeholder="Enter your mobile number"
                                    className="w-full px-4 py-3 rounded-lg border border-pink-200 bg-pink-50 text-pink-600 placeholder:text-pink-300
                             focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />

                                {/* Buy Button */}
                                <button
                                    type="submit"
                                    onClick={() => {
                                        handleBuyNow();
                                        handleOpen();
                                    }}
                                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg
                               transition-all duration-300 shadow-md"
                                >
                                    Checkout Now
                                </button>
                            </div>
                        </DialogBody>
                    </Dialog></>
            )}
        </>
    );
};

export default BuyNowModal;