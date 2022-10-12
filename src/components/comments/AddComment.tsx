import { Button, ClickAwayListener, Input, Popover } from '@mui/material';
import React, { FormEvent, FormEventHandler, useState } from 'react'
import { Form, useLocation } from 'react-router-dom';
import { IdType } from '../../model/sharedTypes';
import { CommentsApi } from '../../service/CommentsApi';
import { useAuth } from '../users/UserContext';

type Props = {
  parentId:IdType;
}

const AddComment = ({parentId}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const {currentUserState,getToken} = useAuth();
  const openCommentForm = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }
  const closeShare = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const popOverId = openPopover ? 'simple-popover' : undefined;
    const [open, setOpen] = useState(true);
    const [body, setBody] = useState('');
    const handleClose = () => {
      setOpen(false);
    };
const addComment = (e:React.SyntheticEvent) => {
  e.preventDefault();
  console.log(body)
  const commentBody = body;
  if (commentBody) {
    CommentsApi.createComment({body: commentBody, authorId: currentUserState.currentUser.id},'events',parentId,getToken())
  }
}
const updateBody =  (e:React.ChangeEvent<HTMLInputElement>) => {
  setBody(e.target.value)
}
  return (<>
    <Button onClick={openCommentForm}>Add Comment</Button>
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
                >
                  <Input onChange={updateBody} name='body' type='text'></Input>
                  <Button onClick={addComment}>Add Comment</Button>
            </Popover>
  </ClickAwayListener>
    </>
  )
}

export default AddComment