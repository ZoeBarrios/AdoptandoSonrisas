import { useLocation } from "wouter";
import useAuthStore from "../stores/useAuthStore";
import { closeSession } from "../utils/localStorageFunctions";

export const useAuth = () => {
  const [__, setLocation] = useLocation();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    closeSession();
    setLocation("/");
  };
  return { handleLogout };
};
