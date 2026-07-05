export const formatPrice = (price) => {
    return Number(price).toLocaleString("en-IN");
};

export const parsePrice = (price) => {
    return Number(
        String(price).replace(/₹|,/g, "")
    );
};