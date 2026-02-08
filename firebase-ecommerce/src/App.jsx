import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import NoPage from './pages/nopage/NoPage'
import HomePage from './pages/homepage/HomePage'
import ProductInfo from './pages/productInfo/ProductInfo'
import ScrollTop from './components/scrollTop/ScrollTop'
import CartPage from './pages/cart/CartPage'
import AllProduct from './pages/allproduct/AllProduct'
import LoginPage from './pages/registration/Login'
import SignupPage from './pages/registration/Signup'
import UserDashboad from './pages/user/UserDashboad'
import AdminDashboard from './pages/admin/AdminDashboad'

function App() {
  return (
    <>

      <ScrollTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<NoPage />} />
        <Route path="/productInfo/:id" element={<ProductInfo />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/allproduct" element={<AllProduct />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user-dashboard" element={<UserDashboad />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

    </>
  )
}

export default App