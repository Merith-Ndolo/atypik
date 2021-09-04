import { MDBCard } from "mdbreact";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/postAction";
import { isEmpty, timestampParser } from "../Utilitaires";
import EditDeleteComment from "./EditDeleteComment";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <h2 style={{ fontSize: "15px" }}>
                <img
                  height="30"
                  width="30"
                  style={{ borderRadius: "50%" }}
                  src={
                    !isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === comment.commenterId)
                          return user.picture;
                        else return null;
                      })
                      .join("")
                  }
                  alt="commenter-pic"
                />
                {comment.commenterPseudo}{" "}
                <span style={{ fontSize: "10px" }}>
                  {timestampParser(comment.timestamp)}
                </span>
              </h2>
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo"></div>
              </div>
              <MDBCard
                style={{ backgroundColor: "#ecf0f1", borderRadius: "5px 10px" }}
                className="col-6"
              >
                {comment.text}
              </MDBCard>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <button
            className="fas fa-paper-plane"
            aria-hidden="true"
            type="submit"
          ></button>
          <br />
        </form>
      )}
    </div>
  );
};

export default CardComments;
