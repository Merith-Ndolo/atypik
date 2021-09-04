import axios from "axios";

export const GET_PARAM_ERRORS = "GET_PARAM_ERRORS";
export const ADD_PARAM = "ADD_PARAM";
export const GET_PARAM = "GET_PARAM";
export const GET_ALL_PARAMS = "GET_ALL_PARAMS";
export const DELETE_PARAM = "DELETE_PARAM";
export const UPDATE_PARAM = "UPDATE_PARAM";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";


export const addParam = (data) => {
    return (dispatch) => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}api/param`, data)
       .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_PARAM_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_PARAM_ERRORS, payload: "" });
          }
    });
  };
};


export const getParam = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/param/`)
      .then((res) => {
        dispatch({ type: GET_PARAM, payload: res.data});
      })
      .catch((err) => console.log(err));
  };
};

export const updateParam = (paramId, titre, prix, temps, role) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/param/${paramId}`,
      data:{titre, prix, temps, role}
    })
      .then((res) => {
        dispatch({ type: UPDATE_PARAM, payload: {titre, prix, temps, paramId, role}})
      })
      .catch((err) => console.log(err));
  }
};

export const deleteParam = (paramId, role) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/param/${paramId}`,
      data: {paramId, role}
    })
      .then((res) => {
        dispatch({ type: DELETE_PARAM, payload: { paramId, role } });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadSlidePicture = (data,id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/param/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_PARAM_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_PARAM_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/param/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

