import {
    FaStar,
    FaStarHalfAlt,
    FaRegStar
} from "react-icons/fa";

function Rating({ rating, size }) {

    const stars = [];

    for (let i = 1; i <= 5; i++) {

        if (rating >= i) {

            stars.push(
                <FaStar
                    key={i}
                    className={`text-orange-500 ${size}`}
                />
            );

        } else if (rating >= i - 0.5) {

            stars.push(
                <FaStarHalfAlt
                    key={i}
                    className={`text-orange-500 ${size}`}
                />
            );

        } else {

            stars.push(
                <FaRegStar
                    key={i}
                    className={`text-gray-300 ${size}`}
                />
            );
        }
    }

    return (
        <div className="flex items-center gap-1">
            {stars}
        </div>
    );
}

export default Rating;