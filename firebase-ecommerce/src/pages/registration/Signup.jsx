import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HashLoader, PulseLoader } from "react-spinners";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";

function Signup() {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    // user signup State
    const [signupUser, setSignupUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    // user signup function
    const userSignup = async (e) => {
        e.preventDefault();
        //validation
        if (!signupUser.name.trim() || !signupUser.email.trim() || !signupUser.password.trim()) {
            toast.error("Please fill all the fields");
            return;
        }

        setLoader(true);

        try {
            const users = await createUserWithEmailAndPassword(auth, signupUser.email, signupUser.password);
            const user = {
                name: signupUser.name,       // form input
                email: users.user.email,     // firebase return
                uid: users.user.uid,         // firebase generated id
                role: "user",
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit"
                })
            }

            // Add user Details
            await setDoc(doc(fireDB, "user", user.uid), user);
            toast.success("User created successfully");

            setSignupUser({
                name: "",
                email: "",
                password: "",
                role: "user"
            });

            navigate("/login");

        } catch (error) {

            console.error(error);

            if (error.code === "auth/email-already-in-use") {
                toast.error("Email already exists");
            } else if (error.code === "auth/weak-password") {
                toast.error("Password must be at least 6 characters");
            } else {
                toast.error(error.message);
            }

        } finally {
            setLoader(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-200 relative">
            <div className="w-full max-w-md bg-pink-400 p-8 rounded-xl shadow-lg">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
                    Sign Up
                </h2>

                {loader && (
                    <div className="absolute inset-0 z-50 
                                     flex justify-center items-center
                                     bg-white/20 backdrop-blur-[1px]">
                        <HashLoader
                            color="#fd4967"
                            size={50}
                        />
                    </div>
                )}

                {/* Form */}
                <form className="space-y-4">
                    <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={signupUser.name}
                        onChange={(e) => setSignupUser({ ...signupUser, name: e.target.value })}
                        className="w-full px-4 py-2 placeholder:text-pink-400
                                     text-pink-600 rounded-lg border border-pink-600 bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />

                    <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={signupUser.email}
                        onChange={(e) => setSignupUser({ ...signupUser, email: e.target.value })}
                        className="w-full px-4 py-2 placeholder:text-pink-400
                                     text-pink-600 rounded-lg border border-pink-600 bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />

                    <input
                        type="password"
                        required
                        placeholder="Password"
                        value={signupUser.password}
                        onChange={(e) => setSignupUser({ ...signupUser, password: e.target.value })}
                        className="w-full px-4 py-2 placeholder:text-pink-400
                                     text-pink-600 rounded-lg border border-pink-600 bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />

                    <button
                        type="submit"
                        onClick={userSignup}
                        className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center mt-4">
                    Have an account?{" "}
                    <Link to="/login" className="text-pink-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>

                {loader && <p className="text-sm text-center mt-4"><PulseLoader color="#b4044b" size={10} /></p>}
            </div>
        </div>
    );
}

export default Signup;
