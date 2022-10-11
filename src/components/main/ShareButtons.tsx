import { Card } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { API_BASE_URL } from '../../evn.var.config';

type NavigationProps = {
    open:boolean;
    anchorEl:HTMLElement;
    handleClose:()=>void;
    entityId:string;}

const ShareButtons = () => {
  const location = useLocation();
  const urlToShare = API_BASE_URL+(location.pathname).replace('/share','')
  return (
    <Card  sx={{ maxWidth:"100px", maxHeight:"50px"}} onClick={(e:React.MouseEvent)=>e.stopPropagation()}>
      <FacebookShareButton  url={urlToShare}><FacebookIcon size={40} round={true}/></FacebookShareButton>
      <TwitterShareButton url={urlToShare}><TwitterIcon size={40} round={true}/></TwitterShareButton>
    </Card>
  )
}

export default ShareButtons