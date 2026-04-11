import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast';
import NoPage from './pages/nopage/NoPage'
import HomePage from './pages/homepage/HomePage'
import ProductInfo from './pages/productInfo/ProductInfo'
import ScrollTop from './components/scrollTop/ScrollTop'
import CartPage from './pages/cart/CartPage'
import AllProduct from './pages/allproduct/AllProduct'
import LoginPage from './pages/registration/Login'
import SignupPage from './pages/registration/Signup'
import UserDashboard from './pages/user/UserDashboard'
import AdminDashboard from './pages/admin/AdminDashboad'
import AddProductPage from './pages/admin/AddProductPage'
import UpdateProductPage from './pages/admin/UpdateProductPage'
import ProtectRouteForUser from './components/ProtectRoute.jsx/ProtectRouteForUser';
import ProtectRouteForAdmin from './components/ProtectRoute.jsx/ProtectRouteForAdmin';

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
        <Route
          path="/user-dashboard"
          element={
            <ProtectRouteForUser>
              <UserDashboard />
            </ProtectRouteForUser>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectRouteForAdmin>
              <AdminDashboard />
            </ProtectRouteForAdmin>
          }
        />
        <Route path="/addproduct"
          element={
            <ProtectRouteForAdmin>
              <AddProductPage />
            </ProtectRouteForAdmin>}
        />
        <Route path="/updateproduct/:id"
          element={
            <ProtectRouteForAdmin>
              <UpdateProductPage />
            </ProtectRouteForAdmin>
          }
        />
      </Routes>
      <Toaster />
    </>
  )
}

export default App