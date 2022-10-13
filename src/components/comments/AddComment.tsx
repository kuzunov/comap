import { Button, ClickAwayListener, Input, Popover } from "@mui/material";
import React, { useState } from "react";
import { Form, useFetcher } from "react-router-dom";
import { IdType } from "../../model/sharedTypes";
import { CommentsApi } from "../../service/CommentsApi";
import { useAuth } from "../users/UserContext";

type Props = {
  parentId: IdType;
};

const AddComment = ({ parentId }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { currentUserState, getToken } = useAuth();
  const openCommentForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const closeCommentForm = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const popOverId = openPopover ? "simple-popover" : undefined;
  const [body, setBody] = useState("");
  const fetcher = useFetcher();

  const createComment = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let token = getToken();
    fetcher.submit(
      {
        comment: JSON.stringify({
          body: body,
          authorId: currentUserState.currentUser.id,
        }),
        token: token ? token : "",
      },
      { method: "post", action: `${window.location.pathname}/comments?index` }
    );
  };
  return (
    <>
      <Button onClick={openCommentForm}>Add Comment</Button>
      <ClickAwayListener onClickAway={closeCommentForm}>
        <Popover
          id={popOverId}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={closeCommentForm}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Form onSubmit={createComment}>
            <Input
              name="body"
              onChange={(e) => setBody(e.target.value)}
              type="text"
            ></Input>

            <Button onClick={createComment}>Add Comment</Button>
          </Form>
        </Popover>
      </ClickAwayListener>
    </>
  );
};

export default AddComment;
