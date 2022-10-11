import { Box, InputLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Button } from '@mui/material';
import React, { BaseSyntheticEvent, FormEvent, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { USER_FORM_SCHEMA } from '../../config';
import { IUser, USER_GENDER, USER_ROLE, USER_STATUS } from '../../model/user';
import UserFormInputTextField from './UserFormInputTextField';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from './UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { isServerError, ServerError } from '../../model/sharedTypes';
import ErrorComponent from '../ErrorComponent';
import MapHOC from '../maps/MapHOC';
import { UsersApi } from '../../service/UsersApi';

type FormData = {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  description: string;
  gender: USER_GENDER;
  role: USER_ROLE;
  status: USER_STATUS
};
const emptyUser = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  avatar: '',
  description: '',
  gender: "m" as USER_GENDER,
  location:{lat:0,lng:0} as google.maps.LatLngLiteral,
  role: USER_ROLE.GUEST,
  status: USER_STATUS.ACTIVE
}
const EditUserForm = () => {
  const navigate = useNavigate();
  const [markers,setMarkers] = useState<google.maps.MarkerOptions[]>([]);
  const {currentUserState,login} = useAuth();
  const loaderData = useLoaderData() as IUser
  const user  = (loaderData)?loaderData:emptyUser
  const [serverErr,setServerErr] = useState<ServerError|undefined>(undefined);
  const { control, getValues, handleSubmit, reset, formState: {errors,isValid} } = useForm<FormData>({
    defaultValues: user,
    mode: 'onChange',
    resolver: yupResolver(USER_FORM_SCHEMA),
})
const validateAndReturnMarkers = () => {
  if (markers.length<1) return {lat:0,lng:0} as google.maps.LatLngLiteral;
  else return markers[0].position as google.maps.LatLngLiteral
}
const updateMarkersArray = (markers:google.maps.MarkerOptions[]) => {
  setMarkers(markers);
}
  
  const onSubmit = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
    event?.preventDefault();
    if (!currentUserState.isLoggedIn)
    {
      
      try{
      const userToReg = { ...data} as unknown as IUser;
      userToReg.location = validateAndReturnMarkers()
      
      const res = await UsersApi.register(userToReg);
      setServerErr(undefined);
      if (login)login({username:res.username,password:userToReg.password})
      navigate("/");
      } catch (err) {
        if (isServerError(err)) {
        setServerErr({status: err.status, message:err.message})}
      }
      } else {
        console.log('editing')
      const userToEdit = { ...data} as unknown as IUser;
      userToEdit.location = validateAndReturnMarkers();
      try {
        const res = await UsersApi.update(userToEdit);
        setServerErr(undefined);
        navigate("/users")
      } catch (err) {
        if (isServerError(err)) {
        setServerErr({status: err.status, message:err.message})}
      }
    }
  }
  const onReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
}
  const handleCancel = () => {
    navigate("/");
  };
  
  return <Box
  component="form"
  sx={{
      padding: '20px',
      '& .MuiTextField-root': { m: 1, width: 'calc(100% - 20px)' },
      '& .MuiButton-root': { m: 1, width: '25ch' },
      '& .MuiInputLabel-root': {m:1, margin: '5px'},
  }}
  noValidate
  autoComplete="off"
  onSubmit={handleSubmit(onSubmit)} onReset={onReset}
>
{(serverErr)?<ErrorComponent error={serverErr}/>:<></>}
<UserFormInputTextField name='id' label='ID' control={control} disabled size='small'/>
<UserFormInputTextField name='username' label='Username' control={control} error={errors.username?.message} />
<UserFormInputTextField name='password' label='Password' control={control} type="password" disabled={(getValues("id") !== currentUserState.currentUser.id && (user.hasOwnProperty('id')))? true : false} error={errors.password?.message}/>
<UserFormInputTextField name='firstName' label='First Name' control={control}error={errors.firstName?.message}/>
<UserFormInputTextField name='lastName' label='Last Name' control={control} error={errors.lastName?.message}/>
<UserFormInputTextField name='avatar' label='Avatar' control={control} error={errors.avatar?.message}/>
<UserFormInputTextField name='description' label='Description' control={control} error={errors.description?.message}/>
<Controller 
  control = {control}
  name= "gender"
  rules = {{required:true}}
  render = {({field}) => (
    <InputLabel>Gender
  <RadioGroup
    {...field}
    // defaultValue={getValues("gender") === "f"?"f":"m"}
  >
    <FormControlLabel
      value="f"
      control={<Radio />}
      label="Female"
    />
    <FormControlLabel
      value="m"
      control={<Radio />}
      label="Male"
    />
  </RadioGroup>
  </InputLabel>)}
/>
<MapHOC center={user.location} markers={[{position: user.location}]} maxNumOfMarkers={1} editable={(getValues("id") === currentUserState.currentUser.id)} updateMarkerArray={updateMarkersArray}/>


    {(currentUserState.isAdmin) && (
      <>
      <InputLabel>Status: 
        <Controller control = {control}
          name = "status"
          rules = {{required:true}}
          render = {({field}) => (
            
            <Select
              {...field}
              id="user-status"
              defaultValue={getValues("status")}
              label="Status"
              >
                      <InputLabel>Status</InputLabel>

          <MenuItem value={USER_STATUS.ACTIVE}>Active</MenuItem>
          <MenuItem value={USER_STATUS.DEACTIVATED}>Deactivated</MenuItem>
          <MenuItem value={USER_STATUS.SUSPENDED}>Suspended</MenuItem>
        </Select>
          )} />
        </InputLabel>
        <InputLabel>Role: 
        <Controller control = {control}
          name = "role"
          rules = {{required:true}}
          render = {({field}) => (
            <Select {...field}
              id="user-role"
              defaultValue={getValues("role")}
              label="Role"
            >
          <MenuItem value={USER_ROLE.ADMIN}>Admin</MenuItem>
          <MenuItem value={USER_ROLE.USER}>User</MenuItem>
        </Select> 
        )} /></InputLabel>
        
      </>
    )}
          <Button variant="contained" endIcon={<SendIcon />} 
          // disabled={
          //   !isValid
          //   } 
            type='submit'>
              Submit
          </Button>
          <Button variant="contained" endIcon={<CancelIcon />} color='warning' type='reset'>
              Reset
          </Button>
          <Button variant="contained" endIcon={<ExitToAppIcon />} onClick={handleCancel} color='error'>
                  Cancel
                </Button>
          </Box>
  //:<div className='errors'>Invalid User passed. Return to home.<Button endIcon={<ExitToAppIcon />}onClick={()=>{navigate('/')}}>Home</Button></div>
}

export default EditUserForm