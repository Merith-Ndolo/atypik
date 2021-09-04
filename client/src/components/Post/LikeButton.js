import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../UserIdConnect";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/postAction";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img width="20px" src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>
            Connectez-vous pour ajouter à vos favoris et pour commenter!
          </div>
        </Popup>
      )}
      {uid && liked === false && (
        <img
          width="20px"
          src="./img/icons/heart.svg"
          onClick={like}
          alt="like"
        />
      )}
      {uid && liked && (
        <img
          width="20px"
          src="./img/icons/heart-filled.svg"
          onClick={unlike}
          alt="unlike"
        />
      )}
    </div>
  );
};

export default LikeButton;
