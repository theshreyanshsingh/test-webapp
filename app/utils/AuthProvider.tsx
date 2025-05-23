"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

interface UserData {
  userId: string;
  username: string;
  email: string;
  phone?: string;
  dp: string;
  fullname: string;
  id: string;
  isverified: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (userData: UserData, token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Define route types
  const publicRoutes = ["/auth/login", "/auth/signup"];
  const protectedRoutes = [
    "/main/home",
    "/main/chat",
    "/main/library",
    "/main/setting",
    "/main/product",
  ];

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("token");
      const userData = Cookies.get("userData");

      if (token && userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing user data:", error);
          // Clear invalid data
          Cookies.remove("token");
          Cookies.remove("userData");
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Handle route protection
  useEffect(() => {
    if (loading) return; // Don't redirect while loading

    const isPublicRoute = publicRoutes.includes(pathname);
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isAuthenticated && isPublicRoute) {
      // Authenticated user trying to access login/signup
      router.replace("/main/home");
    } else if (!isAuthenticated && isProtectedRoute) {
      // Unauthenticated user trying to access protected route
      router.replace("/auth/login");
    }
  }, [isAuthenticated, pathname, loading, router]);

  const login = (userData: UserData, token: string) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 15);

      Cookies.set("token", token, { expires: expirationDate });
      Cookies.set("userData", JSON.stringify(userData), {
        expires: expirationDate,
      });

      setUser(userData);
      setIsAuthenticated(true);

      router.push("/main/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userData");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/auth/login");
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
