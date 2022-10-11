import { Button, Card, CardActions, CardContent, CardMedia, ClickAwayListener, IconButton, Popover, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop/Backdrop';
import { useState } from 'react';
import { Form, Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { IEvent } from '../../model/event';
import MapHOC from '../maps/MapHOC';
import ShareIcon from '@mui/icons-material/Share';
import CommentsList from '../comments/CommentsList';
import { IComment } from '../../model/comment';
import { useAuth } from '../users/UserContext';
import { USER_ROLE } from '../../model/user';
import AddComment from '../comments/AddComment';


type Props = {}

const EventDetails = (props: Props) => {
  const {event,local, comments} = useLoaderData() as {event: IEvent, local:boolean,comments:IComment[]};
  const navigate = useNavigate();
  const {currentUserState} = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const location = useLocation();
  const openShare = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    navigate(`share`,{replace:true})
  }
  const closeShare = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const popOverId = openPopover ? 'simple-popover' : undefined;
    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false);
      local?navigate(-1):navigate("/events")
    };
    const handleToggle = () => {
      setOpen(!open);
    };

    const addComment = () => {

    }
    
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
    {/* <ClickAwayListener onClickAway={handleClose}> */}
    <Card  sx={{ width: "50%", maxHeight:"800px", overflowY: "auto"}} onClick={(e:React.MouseEvent)=>e.stopPropagation()}>
      <CardMedia
        component="img"
        alt={event.name}
        height="140"
        image={event.poster}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
          <MapHOC center={event.locations[0].position as google.maps.LatLngLiteral} zoom={15} markers={event.locations} style={{width:"500px", height:"300px"}}/>
      </CardContent>
      <ClickAwayListener onClickAway={closeShare}>
        <Popover 
               id={popOverId}
               open={openPopover}
               anchorEl={anchorEl}
               onClose={closeShare}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                ><Outlet /></Popover>
        </ClickAwayListener>
      <CardActions>
        <IconButton  size="small" color="primary" onClick={openShare}>
          <ShareIcon/>
        </IconButton>
        <AddComment parentId={event.id}/>
        {(event.organizer === currentUserState.currentUser.id || currentUserState.currentUser.role===USER_ROLE.ADMIN) && 
        <Form method='get' action={`edit`}>
          <Button type="submit" size="small">Edit</Button>
        </Form>}
      </CardActions>
      <CommentsList comments={comments}/>

      
    </Card>
    {/* </ClickAwayListener> */}
    </Backdrop>
  )
}

export default EventDetails