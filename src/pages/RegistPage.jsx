import Navbar from "@/components/RegistPage/Navbar";
import Hero from "@/components/RegistPage/Hero";
import Footer from "@/components/RegistPage/Footer";

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
