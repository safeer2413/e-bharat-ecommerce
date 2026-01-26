import { FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";
import FeatureCard from "./FeatureCard";

function FeatureTrack() {
    return (
        <section>
            <div className="container mx-auto px-5 py-10 md:py-14">
                <div className="flex flex-wrap -m-4 text-center">

                    <FeatureCard
                        icon={<FaShippingFast className="w-full h-full" />}
                        title="Fast Delivery"
                        description="We ensure quick and safe delivery of your products."
                    />

                    <FeatureCard
                        icon={<FaShieldAlt className="w-full h-full" />}
                        title="Secure Payments"
                        description="All transactions are encrypted and fully secure."
                    />

                    <FeatureCard
                        icon={<FaHeadset className="w-full h-full" />}
                        title="24/7 Support"
                        description="Our support team is always available to help you."
                    />

                </div>
            </div>
        </section>
    );
}

export default FeatureTrack;
