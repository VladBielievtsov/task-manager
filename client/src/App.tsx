import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout redirectPath="/login" />}>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}

export default App;

// TODO:
// 1. setup Redux
// 2. save token and isAuth func in Redux
