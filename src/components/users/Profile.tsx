import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react'
import { Link, Navigate, Outlet, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { IUser, USER_STATUS } from '../../model/user';
import { useAuth } from './UserContext';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import LensIcon from '@mui/icons-material/Lens';
import MapHOC from '../maps/MapHOC';
type Props = {}

const Profile = (props: Props) => {
  const {currentUserState} = useAuth();
  const navigate = useNavigate();
  const loaderData = useLoaderData() as unknown as IUser;
  const {id, username,avatar,firstName, lastName, description,gender,status,location} = loaderData || currentUserState.currentUser
  return (
    <Box>
          {(currentUserState.isLoggedIn && !loaderData) && <Button variant="contained" sx={{color:"white",margin:"5px 0px"}} onClick={() => {
            navigate(`/users/${id}/profile/edit`)
          }}>Edit Profile</Button>}
          <Avatar
  alt={username}
  src={avatar}
  sx={{ width: 100, height: 100 }}
/>
<Typography variant="h2">{username}{(gender==="m")?<MaleIcon/>:<FemaleIcon/>} {<LensIcon color={(status===USER_STATUS.ACTIVE)?'success':'error'}/>}</Typography>
<Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
<Typography variant="h5">{`About them: `}</Typography>
<Typography variant="subtitle2">{description}</Typography>
{(location) && <> <Typography variant="h5">They are mainly active around:</Typography> <MapHOC center={location} markers={[{position: location}]} /></>}
          </Box>
  )
}

export default Profile