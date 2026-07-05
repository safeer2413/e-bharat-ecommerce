import { useEffect, useState } from "react";
import MyContext from "./MyContext"
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import { setWishlist } from "../redux/wishlistSlice";
import { loadCartFromCache } from "../services/cartService";
import { loadWishlistFromCache } from "../services/wishlistService";

function MyState({ children }) {

    const dispatch = useDispatch();

    const [authUser, setAuthUser] = useState(null);

    const [profile, setProfile] = useState(() => {
        return JSON.parse(localStorage.getItem("profile")) || null;
    });

    // ---------------- Loaders ----------------
    const [productLoader, setProductLoader] = useState(false);
    const [orderLoader, setOrderLoader] = useState(false);
    const [userLoader, setUserLoader] = useState(false);
    const [authLoader, setAuthLoader] = useState(true);

    const loader =
        productLoader ||
        orderLoader ||
        userLoader ||
        authLoader;

    // ---------------- Authentication ----------------
    useEffect(() => {
        setAuthLoader(true);

        const unsubscribeAuthUSerHandler = onAuthStateChanged(auth, async (currentUser) => {

            if (!currentUser) {
                setAuthUser(null);
                setProfile(null);
                dispatch(setCart([]));
                dispatch(setWishlist([]));
                setAuthLoader(false);
                return;
            }

            setAuthUser(currentUser);

            // Cart Restore
            const cachedCart = loadCartFromCache(currentUser.uid)

            dispatch(setCart(cachedCart));

            // Wishlist Restore
            const cachedWishlist = loadWishlistFromCache(currentUser.uid)

            dispatch(setWishlist(cachedWishlist));

            try {
                const userSnap = await getDoc(
                    doc(fireDB, "user", currentUser.uid)
                );

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setProfile(userData);
                    localStorage.setItem(
                        "profile",
                        JSON.stringify(userData)
                    );

                } else {
                    console.warn("User document not found");
                }

            } catch (error) {
                console.log("Catch Error:", error);
            } finally {
                setAuthLoader(false);
            }
        });

        return unsubscribeAuthUSerHandler;

    }, [dispatch]);

    // ---------------- Products ----------------
    const [getAllProducts, setGetAllProducts] = useState([]);
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

    // ---------------- Orders ----------------
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

    // ---------------- Users ----------------
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

    // ---------------- Initial Data ----------------
    useEffect(() => {
        const unsubscribeProducts = getAllProductsHandler();

        const unsubscribeOrders = getAllOrdersHandler();

        return () => {
            unsubscribeProducts();
            unsubscribeOrders();
        };

    }, []);

    return (
        <MyContext.Provider
            value={{
                authUser,
                profile,

                setAuthUser,
                setProfile,

                loader,
                authLoader,

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