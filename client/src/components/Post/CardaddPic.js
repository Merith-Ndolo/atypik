import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPic, getPosts } from "../../actions/postAction";

const CardaddPic = ({ post }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [file, setFile] = useState("");
  const dispatch = useDispatch();

  const handlePost = () => {
    if (file) {
      const data = new FormData();
      data.append("picId", post._id);
      data.append("file", file);

      dispatch(addPic(data, post._id))
        .then(() => dispatch(getPosts()))
        .then(() => setSelectedImages(""));
    }
  };

  const imageHandleChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      // console.log(fileArray);
      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      setFile(e.target.files[0]);
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <img
          height="200px"
          width="100%"
          src={photo}
          alt=""
          style={{ borderRadius: "10px" }}
          key={photo}
        />
      );
    });
  };

  return (
    <div>
      <>
        {post.picture.map((pic) => {
          return (
            <div className="container">
              <img
                height="200"
                width="100%"
                src={pic}
                alt="card-pic"
                className="card-pic"
                style={{ padding: "5px", borderRadius: "10px" }}
              />
            </div>
          );
        })}
        <br />
        {selectedImages ? (
          <div className="container">{renderPhotos(selectedImages)}</div>
        ) : null}
        <br />
        {post.picture.length < 5 ? (
          <form action="" enctype="multipart/form-data">
            <input
              type="file"
              id="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={imageHandleChange}
            />
            <button
              className="btn waves-effect waves-light"
              type="submit"
              onClick={handlePost}
            >
              Envoyer
            </button>
          </form>
        ) : (
          <p></p>
        )}
      </>
    </div>
  );
};

export default CardaddPic;
