export const getDeliveryDate = (days) => {
    const date = new Date();

    date.setDate(
        date.getDate() + Number(days)
    );

    return date.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
};