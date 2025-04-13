import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import About from "./pages/About2"
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import PrivateRouter from "./auth/PrivateRouter.jsx"
import Login from "./auth/Login";
import Register from "./auth/Register";
import AuthLayout from "./auth/AuthLayout";

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<PrivateRouter />} >
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
        </Route>
        

        {/* <Route path="concerts">
          <Route index element={<ConcertsHome />} />
          <Route path=":city" element={<City />} />
          <Route path="trending" element={<Trending />} />
        </Route> */}
      </Routes>

    </BrowserRouter>
    
    </>
  )
}

export default App
