import Navbar from "@/components/LoginPage/Navbar";
import Hero from "@/components/LoginPage/Hero";
import Footer from "@/components/LoginPage/Footer";

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
