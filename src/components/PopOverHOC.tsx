import { ClickAwayListener, Popover } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = React.PropsWithChildren<HTMLCollection> & {
  action:string,
  ref: HTMLButtonElement|null,
}

const PopOverHOC = ({children,action,ref}:Props) => {
  const navigate = useNavigate();
  const btn = ref||null;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(btn);
  const openShare = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    navigate(action,{replace:true})
  }
  const closeShare = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const popOverId = openPopover ? 'simple-popover' : undefined;
  
  return (
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
                >{children}</Popover>
        </ClickAwayListener>
  )
}

export default PopOverHOC