import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import Timeline from "./Timeline";
import Contact from "./Contact";

const Index = () => {
  useEffect(() => {
    fetch("/api/visitor", { method: "POST" });
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Index;