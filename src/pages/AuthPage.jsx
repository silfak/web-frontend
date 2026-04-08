import React, { useState } from "react";
import Navbar from "./AuthPage/Navbar";
import Hero from "./AuthPage/Hero";
import Footer from "./AuthPage/Footer";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default AuthPage;