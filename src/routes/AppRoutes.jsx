import React from 'react'
import Home from '../pages/Public/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function AppRoutes() {
  return (
    <BrowserRouter basename='/Portfolio_IgorMartins'>
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes