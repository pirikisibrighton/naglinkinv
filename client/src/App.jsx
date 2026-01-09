import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Services from "./components/Services";

import Architecture from "./pages/Architecture";
import UrbanPlanning from "./pages/UrbanPlanning";
import Construction from "./pages/Construction";
import LandSurveying from "./pages/LandSurveying";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  return (
    <Router>
      <div className="w-full flex flex-col min-h-screen">
        <ToastContainer />

        <main className="flex-grow w-full">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Services />
                  <About />
                  <Projects />
                  <GoogleOAuthProvider clientId={CLIENT_ID}>
                    <Testimonials />
                  </GoogleOAuthProvider>
                  <Contact />
                </>
              }
            />

            <Route path="/architecture" element={<Architecture />} />
            <Route path="/urban-planning" element={<UrbanPlanning />} />
            <Route path="/land-surveying" element={<LandSurveying />} />
            <Route path="/construction" element={<Construction />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
