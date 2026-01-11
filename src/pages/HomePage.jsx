import React from 'react';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Demo from "../components/Demo";
import Features from "../components/Features";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Products />
        <Demo />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;