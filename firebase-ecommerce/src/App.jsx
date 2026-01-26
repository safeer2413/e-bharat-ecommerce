import { Route, Router, Routes } from 'react-router-dom'
import './App.css'                                                                                                                                                    
import NoPage from './pages/nopage/NoPage'
import HomePage from './pages/homepage/HomePage'

function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/*" element={<NoPage />} ></Route>
      </Routes>
    
    </>
  )
}

export default App