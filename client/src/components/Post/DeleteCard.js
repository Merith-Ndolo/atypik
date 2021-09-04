import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../actions/postAction";

const DeleteCard = (props) => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id, userData.role));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce post ?")) {
          deleteQuote();
        }
      }}
    >
       <i className="fas fa-trash"></i>
      
    </div>
  );
};

export default DeleteCard;
