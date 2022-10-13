import { IComment } from "../../model/comment";

const Comment = ({
  id,
  created,
  modified,
  body,
  authorId,
  authorUsername,
}: IComment & { authorUsername: string }) => {
  return <div>Comment: {`Author: ${authorUsername} Body: ${body}`}</div>;
};

export default Comment;
