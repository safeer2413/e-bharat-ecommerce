import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-200">
      <div className="w-full max-w-md bg-pink-400 p-8 rounded-xl shadow-lg">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Login
        </h2>

        {/* Form */}
        <form className="space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 placeholder:text-pink-400
 text-pink-600 rounded-lg border border-pink-600 bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 placeholder:text-pink-400
 text-pink-600 rounded-lg border border-pink-600 bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
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
