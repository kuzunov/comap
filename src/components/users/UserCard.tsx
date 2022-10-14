import { Card, Avatar, Box, Typography } from '@mui/material'
import LensIcon from "@mui/icons-material/Lens";

import { IUser, USER_STATUS } from '../../model/user'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const UserCard = (user: IUser) => {
    const [address,setAddress] = useState<string>('');
    const geocoder = new google.maps.Geocoder();
    if (user.location && typeof user.location !=="string"){
    geocoder
    .geocode({ location: user.location })
    .then((response) => {
        if (response.results[0]) {
            setAddress(response.results[0].formatted_address)
        }
     })
    }
  return (
    <Link style={{ textDecoration: 'none' }} to={`/users/${user.id}`}>
    <Card sx={{
        display: 'flex',
        padding: '1px',
        minWidth: 288,
        borderRadius: 12,
        boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
        '& > *:nth-of-type(1)': {
          marginRight: '5px',
        },
        '& > *:nth-of-type': {
          flex: 'auto',
        },
        margin: '10px',
      }} elevation={0}>
    <Avatar src={user.avatar} />
    <Box>
      <Typography >{user.username} <LensIcon sx={{fontSize:'10pt'}}
            color={user.status === USER_STATUS.ACTIVE ? "success" : "error"}
          /> </Typography>
      <Typography>{`${user.firstName} ${user.lastName}`} • {address}</Typography>
      <Box display={'flex'} alignItems={'center'}>
      </Box>
    </Box>
  </Card></Link>
  )
}

export default UserCard