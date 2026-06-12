import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { HashLoader } from "react-spinners";

function Login() {

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const userLoginHandler = async (e) => {
    e.preventDefault();

    if (!userLogin.email.trim() || !userLogin.password.trim()) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoader(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(fireDB, "user", uid));

      // check document exists
      if (!userDoc.exists()) {
        toast.error("User data not found in database");
        setLoader(false);
        return;
      }

      const userData = userDoc.data();

      // safe save
      localStorage.setItem("user", JSON.stringify(userData));

      setUserLogin({ email: "", password: "" });
      toast.success("Login Successful");

      // navigation logic
      if (userData.role === "admin") {
        navigate("/admin-dashboard");
      } else if (userData.role === "user") {
        navigate("/user-dashboard");
      } else {
        toast.error("Invalid user role");
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-200 relative">
      <div className="w-full max-w-md bg-pink-400 p-8 rounded-xl shadow-lg">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Login
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
            type="email"
            required
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({
                ...userLogin, email: e.target.value
              })
            }}
            className="w-full px-4 py-2 placeholder:text-pink-400
                         text-pink-600 rounded-lg border border-pink-600 bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({
                ...userLogin, password: e.target.value
              })
            }}
            className="w-full px-4 py-2 placeholder:text-pink-400
                         text-pink-600 rounded-lg border border-pink-600 bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            onClick={userLoginHandler}
            className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Have an account?{" "}
          <Link to="/signup" className="text-pink-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
