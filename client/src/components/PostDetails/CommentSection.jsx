import React, { useState, useRef, useEffect } from "react";
import { Typography, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";
import useStyles from "./style";

const CommentSection = ({ post }) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  let commentsRef = useRef(null);
  const isFirstRender = useRef(true);
  const [comments, setComments] = useState(post?.comment);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (commentsRef.current) {
      const lastComment = commentsRef.current.lastChild;
      lastComment.scrollIntoView({
        behavior: "smooth",
        inline: "end",
        block: "end",
      });
    }
  }, [comments]);

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment("");

    //scroll();
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography variant='h6' gutterBottom>
            Comments
          </Typography>
          <div ref={commentsRef}>
            {comments.map((c, i) => (
              <Typography key={i} gutterBottom variant='subtitle2'>
                <strong>{c.split(": ")[0]}</strong>
                {c.split(":")[1]}
              </Typography>
            ))}
          </div>
        </div>
        {user?.result?.name && (
          <div style={{ width: "55%" }}>
            <Typography variant='h6' gutterBottom>
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant='outlined'
              label='Comment'
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant='contained'
              onClick={handleClick}>
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
