import axios from "axios";

export const GET_SECTION_ERRORS = "GET_SECTION_ERRORS";
export const ADD_SECTION = "ADD_SECTION";
export const GET_SECTION = "GET_SECTION";
export const GET_ALL_SECTIONS = "GET_ALL_SECTIONS";
export const DELETE_SECTION = "DELETE_SECTION";
export const UPDATE_SECTION = "UPDATE_SECTION";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";


export const addSection = (data) => {
    return (dispatch) => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}api/section`, data)
       .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_SECTION_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_SECTION_ERRORS, payload: "" });
          }
    });
  };
};


export const getSection = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/section/`)
      .then((res) => {
        dispatch({ type: GET_SECTION, payload: res.data});
      })
      .catch((err) => console.log(err));
  };
};

export const updateSection = (sectionId, titre, paragraph , role) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/section/${sectionId}`,
      data:{titre, paragraph, role }
    })
      .then((res) => {
        dispatch({ type: UPDATE_SECTION, payload: {titre, paragraph, sectionId, role}})
      })
      .catch((err) => console.log(err));
  }
};

export const deleteSection = (sectionId, role) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/section/${sectionId}`,
      data: {sectionId, role}
    })
      .then((res) => {
        dispatch({ type: DELETE_SECTION, payload: { sectionId, role} });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadSectionPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/section/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_SECTION_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_SECTION_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/section/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

