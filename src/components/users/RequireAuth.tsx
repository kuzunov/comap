import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "./UserContext";

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    const token = auth.getToken!()
    
    if (!auth.currentUserState.isLoggedIn || !!token) {
      return <Navigate to="/login" replace/>
    }
  
    return children;
  }