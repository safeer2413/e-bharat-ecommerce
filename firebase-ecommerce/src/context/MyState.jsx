import { useEffect, useState } from "react";
import MyContext from "./MyContext"
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function MyState({ children }) {

    const [user, setUser] = useState(null);
    const [getAllProducts, setGetAllProducts] = useState([]);

    const [productLoader, setProductLoader] = useState(false);
    const [orderLoader, setOrderLoader] = useState(false);
    const [userLoader, setUserLoader] = useState(false);
    const [authLoader, setAuthLoader] = useState(false);

    const loader =
        productLoader ||
        orderLoader ||
        userLoader ||
        authLoader;

    const getAuthUSerHandler = () => {

        setAuthLoader(true);
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            try {
                if (currentUser) {
                    const userRef = doc(fireDB, "user", currentUser.uid);

                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {

                        setUser({
                            uid: currentUser.uid,
                            email: currentUser.email,

                            ...userSnap.data()
                        });

                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {

                console.log(error);
                setUser(null);

            } finally {
                setAuthLoader(false);
            }
        }
        );

        return unsubscribe;
    }

    // Get all Products function
    const getAllProductsHandler = () => {

        setProductLoader(true);

        const q = query(
            collection(fireDB, "products"),
            orderBy("time")
        );

        const data = onSnapshot(q, (snapshot) => {

            let allProducts = [];

            snapshot.forEach((doc) => {
                allProducts.push({
                    ...doc.data(),
                    id: doc.id
                });
            });

            setGetAllProducts(allProducts);
            setProductLoader(false);
        },
            (error) => {
                console.log(error);
                setProductLoader(false);
            }
        );

        return data;
    };

    // Get all Orders function
    const [getAllOrders, setGetAllOrders] = useState([]);
    const getAllOrdersHandler = () => {

        setOrderLoader(true);

        const q = query(
            collection(fireDB, "orders"),
            orderBy("createdAt", "desc")
        );

        const data = onSnapshot(
            q,
            (snapshot) => {

                let allOrders = [];

                snapshot.forEach((doc) => {
                    allOrders.push({
                        ...doc.data(),
                        id: doc.id
                    });
                });

                setGetAllOrders(allOrders);
                setOrderLoader(false);
            },
            (error) => {
                console.log(error);
                setOrderLoader(false);
            }
        );

        return data;
    };

    const [allUsers, setAllUsers] = useState([]);
    const getAllUserHandler = () => {

        setUserLoader(true);
        const q = query(
            collection(fireDB, "user"),
        );

        const data = onSnapshot(q, (snapshot) => {

            const allUsers = snapshot.docs.map(
                (doc) => ({

                    ...doc.data(),
                    id: doc.id
                })

            );
            setAllUsers(allUsers);
            setUserLoader(false);
        },
            (error) => {
                console.log(error);
                setUserLoader(false);
            }
        );

        return data;
    };

    useEffect(() => {

        const unsubscribeAuthUSerHandler = getAuthUSerHandler();

        const unsubscribeProducts = getAllProductsHandler();

        const unsubscribeOrders = getAllOrdersHandler();

        return () => {
            unsubscribeAuthUSerHandler();
            unsubscribeProducts();
            unsubscribeOrders();
        };

    }, []);

    return (
        <MyContext.Provider value={{
            user,
            loader,

            getAllProducts,
            getAllProductsHandler,

            getAllOrders,
            getAllOrdersHandler,

            allUsers,
            getAllUserHandler
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState