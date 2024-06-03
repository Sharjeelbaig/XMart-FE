import { useEffect } from "react";
import { isLoggedIn } from "../utilities/isLoggedIn";
import { useNavigate } from "react-router-dom";

export default function Route({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const allowedRoutes = [
      "/login",
      "/register",
      "/about",
      "/contact",
      "/careers",
      "/payments",
      "/shipping",
      "/cancellation",
      "/return",
      "/terms",
      "/privacy",
    ];

    if (!isLoggedIn() && !allowedRoutes.includes(window.location.pathname)) {
      navigate("/login");
    }
  }, [navigate, localStorage]);
  return <div className="h-full">{children}</div>;
}
