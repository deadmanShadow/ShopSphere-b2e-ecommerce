import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router-dom"
import LoadingSpinner from "./components/LoadingSpinner"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { useCartStore } from "./stores/useCartStore"
import { useUserStore } from "./stores/useUserStore"


function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;
  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      {/* Background radial gradient */}
      <div
        className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)] pointer-events-none z-0'
      ></div>
      <div className=" relative z-50 pt-20">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
      </Routes>
      </div>
      <Toaster/>
    </div>
  )
}

export default App
