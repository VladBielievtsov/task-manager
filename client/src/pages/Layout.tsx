import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import { useAppSelector } from "../hooks/redux";

interface ProtectedRouteProps {
  redirectPath: string;
}

export default function Layout({
  redirectPath = "/login",
}: ProtectedRouteProps) {
  const { userInfo } = useAppSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div>
      <Header />
      <main style={{ paddingTop: "64px" }}>
        <Outlet />
      </main>
    </div>
  );
}
