import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Layout } from "@/components/layout";
import Login from "@/pages/login";
import SignUp from "@/pages/signup";
import { useAuth } from "@/lib/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        lazy: async () => {
          const { default: Component } = await import("@/pages");
          return { Component };
        },
      },
      {
        path: "/transactions",
        lazy: async () => {
          const { default: Component } = await import("@/pages/transactions");
          return { Component };
        },
      },
      {
        path: "/cards",
        lazy: async () => {
          const { default: Component } = await import("@/pages/cards");
          return { Component };
        },
      },
      {
        path: "/charts",
        lazy: async () => {
          const { default: Component } = await import("@/pages/charts");
          return { Component };
        },
      },
      {
        path: "/settings",
        children: [
          {
            path: "profile",
            lazy: async () => {
              const { default: Component } = await import(
                "@/pages/settings/profile"
              );
              return { Component };
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
]);
