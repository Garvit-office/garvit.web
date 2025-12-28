import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import Timeline from "./Timeline";
import Poetry from "./Poetry";
import Contact from "./Contact";
import Gallery from "./Gallery";

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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/poetry" element={<Poetry />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Index;