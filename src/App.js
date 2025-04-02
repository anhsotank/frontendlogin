// import HomePage from "./Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./Components/Login/Login";
// import Register from "./Components/Register/Register";
// import NavBar from "./Components/NavBar/NavBar";
// import { useState } from "react";

import { Fragment } from "react";

import { publicroutes } from "../src/routers";
import { DefaultLayout } from "./Components/Layout";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes> */}

        <Routes>
          {publicroutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
