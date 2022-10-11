import { Backdrop, Card, CardMedia, CardContent, Typography, CardActions, Button, Box, TextField, Autocomplete } from '@mui/material';
import React, { BaseSyntheticEvent, FormEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { IEvent } from '../../model/event';
import { IUser } from '../../model/user';
import MapHOC from '../maps/MapHOC';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

import UserFormInputTextField from '../users/UserFormInputTextField';
import { EventsApi } from '../../service/rest-api-client';
import { RequireAuth } from '../users/RequireAuth';
import { IdType } from '../../model/sharedTypes';
import { EVENT_ADD_SCHEMA, USER_FORM_SCHEMA } from '../../config';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../users/UserContext';

type Props = {
  event?:IEvent
}
type FormData = {
  id?:IdType;
  name:string,
  date:string,
  organizer:IdType,
  poster:string,
  description:string,
  locations:google.maps.MarkerOptions[],
  participants: string[]
};

const AddEvent = (props: Props) => {
  const {currentUserState} = useAuth();
  const navigate = useNavigate();
  const loaderEvent = useLoaderData() as IEvent;

  const determineEvent = () => {
    const newEvent = {
      id:undefined,
      name:"",
      date:"",
      organizer:'',
      poster:"",
      description:"",
      locations:[] as google.maps.MarkerOptions[],
      participants:[],       
    } as IEvent;
    return (loaderEvent)?loaderEvent:newEvent;
  }
    const [open, setOpen] = useState(false);
    let markers:google.maps.MarkerOptions[] = [];
    const [error,setError] = useState({valid:true,message:''});
    const { control, getValues, handleSubmit, reset, formState: {errors,isValid} } = useForm<FormData>({
      defaultValues: determineEvent(),
      mode: 'onChange',
      resolver: yupResolver(EVENT_ADD_SCHEMA),
  })
    const handleClose = () => {
      setOpen(false);
      navigate(-1);
    };
    const handleToggle = () => {
      setOpen(!open);
    };
    const onReset = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      reset();
    }
    const updateMarkerArray = (mapMarkers:google.maps.MarkerOptions[]) => {
      markers=mapMarkers;
    };
    useEffect(()=>{
        handleToggle();
        markers = (loaderEvent)?loaderEvent.locations:[];
    },[])
   const onSubmit = async (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
    event?.preventDefault();
    console.log(data)
    data.locations = markers;
    data.organizer = currentUserState.currentUser.id;
    data.date = new Date(data.date).getTime().toString();
    try {
    const resp = await EventsApi.create(data);
    console.log(resp);
    //(loaderEvent && data.id)?  EventsApi.update(data):  EventsApi.create(data)
    } catch (error) { console.log(error)}
    navigate(-1);
  }

  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <RequireAuth>
    {/* <ClickAwayListener onClickAway={handleClose}> */}
    <Card sx={{ width: "50%", maxHeight:"90%", overflowY:"auto"}} onClick={(e:React.MouseEvent)=>e.stopPropagation()}>
      {(!error.valid) && <>Error message: {error.message}</>} 
    <Box
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
      <CardContent >
      <UserFormInputTextField name='name' label='Name' control={control} error={errors.name?.message} />
      <UserFormInputTextField name='description' label='Description' control={control} error={errors.description?.message} />
      <UserFormInputTextField name='poster' label='Poster' control={control} error={errors.poster?.message} />
      <UserFormInputTextField name='date' label='Date' type="datetime-local" control={control} error={errors.date?.message} />
      <MapHOC center={{ lat: -34.397, lng: 150.644 }} zoom={15} markers={[]} style={{width:"500px", height:"300px"}} updateMarkerArray={updateMarkerArray} editable/>
      </CardContent>
      <CardActions>
      <Button variant="contained" endIcon={<SendIcon />} disabled={!isValid||!error.valid} type='submit'>
                Submit
            </Button>
            <Button variant="contained" endIcon={<CancelIcon />} color='warning' type='reset'>
                Reset
            </Button>
      </CardActions>
      </Box>
    </Card>
    {/* </ClickAwayListener> */}
    </RequireAuth>
    </Backdrop>
  )
  }
export default AddEvent