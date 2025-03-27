import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "@/services/auth";
import { useUserStore } from "@/store/useUserStore";
import Cookies from "js-cookie";
import { User } from "@/types/user";

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userId: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    const token = Cookies.get("access_token");
    const storedUserId = Cookies.get("userId");
    if (token && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      setIsAuthenticated(true);
      setUserId(response.user._id);
      setUser(response.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserId(null);
    clearUser();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
