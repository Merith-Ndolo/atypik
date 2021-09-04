import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPrise, getPosts } from "../../actions/postAction";
import { isEmpty, timestampParser } from "../Utilitaires";

const CardPrises = ({ post }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [selectedImages, setSelectedImages] = useState([]);
  const dispatch = useDispatch();

  const handlePrise = () => {
    if (text || file) {
      const data = new FormData();
      data.append("priseId", userData._id);
      data.append("prisePseudo", userData.pseudo);
      data.append("file", file);
      data.append("text", text);

      dispatch(addPrise(data, post._id))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""))
        .then(() => setSelectedImages(""));
    }
  };

  const imageHandleChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      setFile(e.target.files[0]);
    }
  };

  const renderPhotos = (source) => {
    if (source) {
      return source.map((photo) => {
        return (
          <img
            height="200px"
            width="100%"
            src={photo}
            alt="prise de vue"
            key={photo}
            style={{ borderRadius: "15px" }}
          />
        );
      });
    }
  };

  const cancelPrise = () => {
    setFile("");
    setText("");
    setSelectedImages("");
  };

  return (
    <div>
      {post.titre}
      <br />
      {post.prises.map((prise) => {
        return (
          <div className="container" style={{ marginTop: "15px" }}>
            <h2 style={{ fontSize: "15px" }}>
              <img
                height="30"
                width="30"
                style={{ borderRadius: "50%" }}
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === prise.priseId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="prise de vue image"
              />
              {prise.prisePseudo}{" "}
              <span style={{ fontSize: "10px" }}>
                {timestampParser(prise.timestamp)}
              </span>
            </h2>
            <p>{prise.text}</p>
            {prise.prisePicture && (
              <img
                height="200"
                width="100%"
                src={prise.prisePicture}
                alt="card-pic"
                className="card-pic"
                style={{ borderRadius: "15px" }}
              />
            )}
          </div>
        );
      })}

      <br />
      {text || selectedImages ? (
        <div className="container">{renderPhotos(selectedImages)}</div>
      ) : null}
      <br />
      {userData._id && (
        <form
          action=""
          onSubmit={handlePrise}
          className="prise-form"
          encType="multipart/form-data"
        >
          <textarea
            className="form-control rounded-0"
            id="exampleFormControlTextarea2"
            rows="3"
            name="text"
            placeholder="Racontez-nous..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
          <br />
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={imageHandleChange}
          />
          <br />
          <br />
          {text !== "" && (
            <>
              <input
                className="btn waves-effect waves-light"
                type="button"
                value="Annuler"
                onClick={cancelPrise}
              />
              <button
                className="fas fa-paper-plane btn waves-effect waves-light"
                aria-hidden="true"
                type="submit"
              ></button>
            </>
          )}
          <br />
        </form>
      )}
    </div>
  );
};

export default CardPrises;
