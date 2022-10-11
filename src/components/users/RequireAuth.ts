import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./UserContext";

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
    let navigate = useNavigate();
  
    if (!auth.currentUserState.isLoggedIn) {
      console.log(auth)
      navigate("/login",{state:{ from: location }, replace:true});
    }
  
    return children;
  }