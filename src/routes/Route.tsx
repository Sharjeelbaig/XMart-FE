import { useEffect } from "react";
import { isLoggedIn } from "../utilities/isLoggedIn";
import { useNavigate } from "react-router-dom";

export default function Route({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn() && window.location.pathname !== "/login") {
      if (window.location.pathname !== "/register") {
        window.location.href = "/login";
      }
    }
  }, [navigate, localStorage]);
  return <div className="h-full">{children}</div>;
}
