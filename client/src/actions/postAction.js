import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_PRISE = "ADD_PRISE";
export const ADD_ACT = "ADD_ACT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const EDIT_RESERVATION = "EDIT_RESERVATION";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_ACT = "DELETE_ACT";
export const GET_TRENDS = "GET_TRENDS";
export const GET_POST_ERRORS = "GET_POST_ERRORS";
export const UPDATE_STATUS = "UPDATE_STATUS";
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const ADD_PIC = "ADD_PIC";
export const ADD_RESERVATION = "ADD_RESERVATION";
export const SEND_MAIL = "SEND_MAIL";
export const SEND_JUSTIFICATIF = "SEND_JUSTIFICATIF";

//Affichage post unique
export const getPost = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/${id}`)
      .then((res) => {
        const array = res.data.slice(0, id);
        dispatch({ type: GET_POSTS, payload: array });
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

//Affichage de tous les posts
export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// Ajouter un post
export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      });
  };
};

// Les posts à la une
export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: sortedArray });
  };
};

// Ajouter un post aux favoris
export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

//Supprimer un post de la liste des favoris
export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

//Mis à jour descriptif du post
export const updatePost = (postId, message, role) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message, role },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId, role } });
      })
      .catch((err) => console.log(err));
  };
};

export const updateStatus = (postId, message, status, clientId, role) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message, status, clientId, role },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_STATUS,
          payload: { status, message, clientId, role, postId },
        });
      })
      .catch((err) => console.log(err));
  };
};

//Suppression post
export const deletePost = (postId, role) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { role },
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId, role } });
      })
      .catch((err) => console.log(err));
  };
};

//Ajouter un commentaire
export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

//Ajouter une reservation
export const addReservation = (
  postId,
  reservationId,
  personPseudo,
  role,
  paiement,
  date_open,
  date_close
) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/reserve-habitat/${postId}`,
      data: {
        reservationId,
        personPseudo,
        role,
        paiement,
        date_open,
        date_close,
      },
    })
      .then((res) => {
        dispatch({ type: ADD_RESERVATION, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

//paiement
export const editReservation = (postId, reservationId, paiement) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/edit-reservation/${postId}`,
      data: { reservationId, paiement },
    })
      .then((res) => {
        dispatch({
          type: EDIT_RESERVATION,
          payload: { postId, reservationId, paiement },
        });
      })
      .catch((err) => console.log(err));
  };
};

// envoyer un justificatif
export const sendJustificatif = (email, pseudo, prix, titre) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post/send-justificatif`,
      data: { email, pseudo, prix, titre },
    })
      .then((res) => {
        dispatch({
          type: SEND_JUSTIFICATIF,
          payload: { email, pseudo, prix, titre },
        });
      })
      .catch((err) => console.log(err));
  };
};

//Ajouter une prise de vue
export const addPrise = (data, postId) => {
  return (dispatch) => {
    return axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/post/prise-post/${postId}`,
        data
      )
      .then((res) => {
        dispatch({ type: ADD_PRISE, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

//Ajouter une activité
export const addAct = (data, postId) => {
  return (dispatch) => {
    return axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/post/act-post/${postId}`,
        data
      )
      .then((res) => {
        dispatch({ type: ADD_ACT, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

//Supprimer une activité
export const deleteAct = (postId, actId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/delete-act-post/${postId}`,
      data: { actId },
    })
      .then((res) => {
        dispatch({ type: DELETE_ACT, payload: { postId, actId } });
      })
      .catch((err) => console.log(err));
  };
};

//Ajouter une photo
export const addPic = (data, postId) => {
  return (dispatch) => {
    return axios
      .patch(`${process.env.REACT_APP_API_URL}api/post/add-pic/${postId}`, data)
      .then((res) => {
        dispatch({ type: ADD_PIC, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

//Modifier un commentaire
export const editComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
      data: { commentId, text },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
      })
      .catch((err) => console.log(err));
  };
};

//Supprimer un commentaire
export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
      data: { commentId },
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};

//Supprimer une reservation
export const deleteReserve = (postId, reservationId, email, titre, pseudo) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/delete-reserve/${postId}`,
      data: { reservationId, email, titre, pseudo },
    })
      .then((res) => {
        dispatch({
          type: DELETE_COMMENT,
          payload: { postId, reservationId, email, titre, pseudo },
        });
      })
      .catch((err) => console.log(err));
  };
};

// envoyer un mail
export const sendEmail = (email, pseudoPro, subject, text) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post/send-mail`,
      data: { email, pseudoPro, subject, text },
    })
      .then((res) => {
        dispatch({
          type: SEND_MAIL,
          payload: { email, pseudoPro, subject, text },
        });
      })
      .catch((err) => console.log(err));
  };
};
