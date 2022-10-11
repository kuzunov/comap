import { Backdrop, Card, CardMedia, CardContent, Typography, ClickAwayListener, Popover, CardActions, IconButton, Button } from '@mui/material'
import React, { useState } from 'react'
import { Outlet, Form, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { IComment } from '../../model/comment'
import { IEvent } from '../../model/event'
import { IOrganization } from '../../model/organization'
import CommentsList from '../comments/CommentsList'
import MapHOC from '../maps/MapHOC'
import ShareIcon from '@mui/icons-material/Share';


type Props = {}

const OragnizationDetails = (props: Props) => {
  const {organization,local, comments} = useLoaderData() as {organization: IOrganization, local:boolean,comments:IComment[]};
  const navigate = useNavigate();
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
      local?navigate(-1):navigate("/organizations")
    };
    const handleToggle = () => {
      setOpen(!open);
    };

  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
    {/* <ClickAwayListener onClickAway={handleClose}> */}
    <Card  sx={{ width: "50%", maxHeight:"800px", overflowY: "auto"}} onClick={(e:React.MouseEvent)=>e.stopPropagation()}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {organization.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {organization.members.map(member => member.username)}
        </Typography>
          <MapHOC center={organization.mainLocation as google.maps.LatLngLiteral} zoom={15} markers={[organization.mainLocation]} style={{width:"500px", height:"300px"}}/>
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
        <CommentsList comments={comments}/>
      <CardActions>
        <IconButton  size="small" color="primary" onClick={openShare}>
          <ShareIcon/>
        </IconButton>
        <Form method='get' action={`edit`}>
          <Button type="submit" size="small">Edit</Button>
        </Form>
      </CardActions>
      
    </Card>
    {/* </ClickAwayListener> */}
    </Backdrop>
  )
}

export default OragnizationDetails