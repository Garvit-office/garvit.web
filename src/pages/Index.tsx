import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import Timeline from "./Timeline";
import Poetry from "./Poetry";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/poetry" element={<Poetry />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Index;