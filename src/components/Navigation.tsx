import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X, Home, Briefcase, Clock, BookOpen, Mail, Images } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSound } from "@/hooks/useSound";

export const Navigation = () => {
  const { playSound } = useSound();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Gallery", path: "/gallery", icon: Images },
    { name: "Timeline", path: "/timeline", icon: Clock },
    { name: "Poetry", path: "/poetry", icon: BookOpen },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-3 md:top-4 z-50 mx-3 md:mx-8"
      >
        <div className="glass rounded-full shadow-lg border border-white/20 backdrop-blur-sm">
          <div className="container mx-auto px-3 md:px-6">
            <div className={`flex items-center justify-between ${location.pathname === "/" ? "h-auto md:h-14 py-2 md:py-0" : "h-12 md:h-14"}`}>
              <Link
                to="/"
                className="text-base md:text-xl font-bold flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                <span className="inline-block text-gradient">garvit.web</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => playSound('click')}
                    className={`text-sm font-medium transition-colors px-2 py-1 ${
                      isActive(item.path)
                        ? "text-primary"
                        : "text-foreground/60 hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile - Show all icons on all pages */}
              <div className="md:hidden flex items-center gap-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link key={item.name} to={item.path} onClick={() => playSound('click')}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full h-8 w-8 ${
                          isActive(item.path) ? "bg-primary/10 text-primary" : "hover:bg-muted/30"
                        }`}
                        title={item.name}
                      >
                        <IconComponent className="h-4 w-4" />
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};