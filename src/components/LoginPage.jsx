import React, { useState } from "react";
import Navbar from "./LoginPage/Navbar";
import Hero from "./LoginPage/Hero";
import Footer from "./LoginPage/Footer";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default LoginPage;