import { Box, Button } from "@mui/material";
import { BaseSyntheticEvent, useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { USER_LOGIN_SCHEMA } from "../../config";
import { UserListener } from "../../model/sharedTypes";
import { Guest, IUser } from "../../model/user";
import UserFormInputTextField from "./UserFormInputTextField"
import SendIcon from '@mui/icons-material/Send';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useAuth } from "./UserContext";
;



type Props = {
  //handleLogin: UserListener;
};
type loginFormInput = {
  username:string,
  password:string,
}

export const Login = ({}: Props) => {  
  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useAuth();
  let from = location.state?.from?.pathname || "/";
  const { control, handleSubmit, formState: {errors,isValid} } = useForm<loginFormInput>({
    defaultValues: {username:"",password:""},
    mode: 'onChange',
   // resolver: yupResolver(USER_LOGIN_SCHEMA),
});


const onSubmit = (data: loginFormInput, event: BaseSyntheticEvent<object, any, any> | undefined) => {
  event?.preventDefault();
    if (data.username && data.password) {
      const user = {
        username: data.username,
        password: data.password,
      } as IUser;
      if (userContext.login){ userContext.login(user);navigate(from, {replace:true})}
    }
  };
  const onRegister = ()=> {
    navigate("/register", { state: { user: Guest } });
  };
  return (
<Box
    component="form"
    sx={{
        width:"180px",
        padding: '5px',
        '& .MuiTextField-root': { m: 1, minHeight:'50px'},
         '& .MuiButton-root': { m: 1, width: '20ch' },
        // '& .MuiInputLabel-root': {m:1, margin: '5px'},
    }}
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit(onSubmit)}
>
    <UserFormInputTextField name='username' label='Username' control={control} error={errors.username?.message} />
    <UserFormInputTextField name='password' label='Password' type="password" control={control} error={errors.password?.message} />
    <Button variant="contained" endIcon={<SendIcon />} color='success' type='submit' disabled={!isValid}>
                Log in
            </Button>
        <Button variant="contained" endIcon={<AppRegistrationIcon />} onClick = {onRegister}type='button'>
            Register
          </Button>
    </Box>
  );
};

export default Login;
