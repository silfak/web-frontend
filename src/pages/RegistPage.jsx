import React from "react";
import Navbar from "./RegistPage/Navbar";
import Hero from "./RegistPage/Hero";
import Footer from "./RegistPage/Footer";

const RegistPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default RegistPage;