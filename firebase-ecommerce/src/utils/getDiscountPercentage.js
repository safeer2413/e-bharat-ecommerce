export const getDiscountPercentage = (originalPrice, sellingPrice) => {

    if (originalPrice <= 0) {
        return 0;
    }
    const discountPercentage =

        ((originalPrice - sellingPrice) / originalPrice) * 100;

    return Math.round(discountPercentage);

};