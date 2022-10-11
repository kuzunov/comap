import { Button, ClickAwayListener, Input, Popover } from '@mui/material';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { IdType } from '../../model/sharedTypes';
import { CommentsApi } from '../../service/CommentsApi';

type Props = {
  parentId:IdType;
}

const AddComment = ({parentId}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
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
    const handleClose = () => {
      setOpen(false);
    };
const addComment = () => {
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
                  <Input />
                  <Button onClick={addComment}>Submit Comment</Button>
                </Popover>
    </ClickAwayListener>
    </>
  )
}

export default AddComment