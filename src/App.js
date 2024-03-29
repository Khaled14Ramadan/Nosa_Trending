import React, { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Movie from "./components/Movies/Movie";
import TvShow from "./components/TvShow/TvShow";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";

import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Footer from "./components/Footer/Footer";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import TvDetails from "./components/TvDetails/TvDetails";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import SignOut from "./components/fireBase/SignOut";
import "./App.css";
import MyProvider from "./DataCenter/MyProvider";

export default function App() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // const toasterCall = useCallback(() => {
  //   if ((toastState.message || "").length > 0) {
  //     toast(toastState.message, {
  //       position: "bottom-center",
  //       autoClose: 1750,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       type: toastState.type,
  //       draggable: true,
  //       style: { color: "#25282b" },
  //       progress: undefined,
  //       pauseOnHover: false,
  //       toastId: makeid(15),
  //       theme: "info",
  //       onClose: handleCloseToast,
  //     });
  //   }
  // }, [toastState]);

  // useEffect(() => toasterCall(), [toasterCall]);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData();
    }
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  let getUserData = () => {
    let decodedToken = jwtDecode(localStorage.getItem("userToken"));
    setUserData(decodedToken);
    console.log("tsts", decodedToken);
    // console.log(userData);
  };

  let logOut = () => {
    SignOut();
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  };

  function ProtectedRoute({ children }) {
    if (!localStorage.getItem("userToken")) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }

  return (
    <>
      <MyProvider>
        <ToastContainer />
        <Navbar logOut={logOut} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home searchName={searchName} />{" "}
              </ProtectedRoute>
            }
          /> */}
            <Route
              path="Nosa_Trending"
              element={
                <ProtectedRoute>
                  <Home />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <Home />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="movies"
              element={
                <ProtectedRoute>
                  <Movie />
                </ProtectedRoute>
              }
            />
            <Route
              path="tvshow"
              element={
                <ProtectedRoute>
                  <TvShow />
                </ProtectedRoute>
              }
            />
            {/* <Route path='login' element={<Login/> }/> */}
            <Route path="login" element={<SignInForm />} />
            <Route path="register" element={<SignUpForm />} />
            <Route path="login/register" element={<SignUpForm />} />
            <Route path="*" element={<Notfound />} />

            <Route path="moviedetails" element={<MovieDetails />}>
              <Route path=":id" element={<MovieDetails />} />
            </Route>
            <Route path="tvdetails" element={<TvDetails />}>
              <Route path=":id" element={<TvDetails />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </MyProvider>
    </>
  );
}
