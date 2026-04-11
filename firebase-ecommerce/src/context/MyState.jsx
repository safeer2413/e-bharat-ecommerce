import { useEffect, useState } from "react";
import MyContext from "./MyContext"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

function MyState({ children }) {
    const [loader, setLoader] = useState(false);
    const [getAllProducts, setGetAllProducts] = useState([]);

    const getAllProductsHandler = () => {

        setTimeout(() => {
            setLoader(true);
        }, 0);

        const q = query(
            collection(fireDB, "products"),
            orderBy("time")
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {

                let allProducts = [];

                snapshot.forEach((doc) => {
                    allProducts.push({
                        ...doc.data(),
                        id: doc.id
                    });
                });

                setGetAllProducts(allProducts);
                setLoader(false);
            },
            (error) => {
                console.log(error);
                setLoader(false);
            }
        );

        return unsubscribe;
    };

    useEffect(() => {
        return getAllProductsHandler();
    }, []);

    return (
        <MyContext.Provider value={{ loader, setLoader, getAllProducts, getAllProductsHandler }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState