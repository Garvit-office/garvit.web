import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Timeline", path: "/timeline" },
    { name: "Poetry", path: "/poetry" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-4 z-50 mx-4 md:mx-8"
      >
        <div className="glass rounded-3xl shadow-lg border-2 border-white/20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <Link
                to="/"
                className="text-2xl font-bold text-gradient"
              >
                AJ
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-primary"
                        : "text-foreground/60 hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button size="sm" className="gradient-primary text-white rounded-full">
                  Contact
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 left-4 right-4 z-40 md:hidden glass rounded-3xl p-6"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-semibold transition-colors ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-foreground/60 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="gradient-primary text-white rounded-full">
              Contact
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
};