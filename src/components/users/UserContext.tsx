import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { Guest, IUser, USER_ROLE } from "../../model/user";
import { UsersApi } from "../../service/UsersApi";
interface userState {
    isLoggedIn: boolean,
    isLoginPending: boolean,
    loginError: string|undefined,
    isAdmin:boolean,
    currentUser: IUser,
}

const userInitialState = {
        isLoggedIn: false,
        isLoginPending: false,
        loginError: undefined,
        isAdmin: false,
        currentUser: Guest,
}

interface userContextType {
  currentUserState:userState,
  login?: (user:Partial<IUser>)=>void,
  logout?: () => void
} 
type ProviderProps = {children:React.ReactNode}
const UserContext = React.createContext<userContextType>({currentUserState: userInitialState})

export const UserContextProvider:React.FC<ProviderProps> = (props: ProviderProps ) => {
    const [cookies, setCookie, removeCookie] = useCookies(['comapauth']);
    const loggedUser = (cookies["comapauth"])?cookies["comapauth"]:{userId:undefined}
    const getUserInfo = async (userId:string) => {
      try {
      const user = await UsersApi.findById(userId);
      return user;
      }
      catch(err) {console.log(err)}
    }
    
    
    const [currentUserState,setCurrentUser] = useState<userState>(userInitialState);
    const setLoginPending = (isLoginPending:boolean) => setCurrentUser({...currentUserState,isLoginPending});
    const setLoginSuccess = (isLoggedIn:boolean) => setCurrentUser({...currentUserState,isLoggedIn});
    const setLoginError = (loginError?:string) => setCurrentUser({...currentUserState,loginError});
    if (loggedUser.userId && !currentUserState.isLoggedIn) {
      getUserInfo(loggedUser.userId).then((user) => {
      setCurrentUser((user)?
        {
          isLoggedIn:true,
          isLoginPending:false,
          isAdmin: user.role===USER_ROLE.ADMIN,
          currentUser:user,
          loginError:undefined
        }:userInitialState)
      });
    }
    let location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    const login = async (user:Partial<IUser>) => {
        setLoginPending(true);
        setLoginSuccess(false);
        setLoginError(undefined);
    
        const logged = await UsersApi.login(user);
        if (logged) {
          setLoginPending(false);
          setLoginSuccess(true);
          setLoginError(undefined);
          console.log(logged)
          if (logged.user.role === USER_ROLE.ADMIN) {setCurrentUser({...currentUserState, isAdmin:true})}
          setCurrentUser({...currentUserState, isLoggedIn: true, currentUser:logged.user});
          setCookie('comapauth',{token:logged.token,userId:logged.user.id},{expires: new Date(Date.now()+86400000)});
        }
               
        navigate(from, {replace:true});
      }
      const logout = () => {
        // setLoginPending(false);
        // setLoginError(undefined);
        removeCookie('comapauth')
        setCurrentUser({...userInitialState});
        navigate('/',{replace:true})
      };
      return (
        <UserContext.Provider value={{
          currentUserState,
          login,
          logout,
        }}>
          {props.children}
        </UserContext.Provider>
      );

   

}
export function useAuth() {
  return React.useContext(UserContext);
}
