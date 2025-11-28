import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "garvitchawla.office@gmail.com";
const ADMIN_PASSWORD = "Garvit@12345"; // You can change this

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check if user was previously logged in
  useEffect(() => {
    const savedEmail = localStorage.getItem("authEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple authentication - only your email and password work
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUserEmail(email);
      setIsAuthenticated(true);
      localStorage.setItem("authEmail", email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem("authEmail");
  };

  const isAdmin = () => {
    return userEmail === ADMIN_EMAIL && isAuthenticated;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
