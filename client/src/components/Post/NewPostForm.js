import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utilitaires";
import { addPost, getPosts } from "../../actions/postAction";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBInput, MDBCard, MDBCardBody } from "mdbreact";
import { GoogleData } from "../../data/GoogleData";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formSubmit, setFormSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const [titre, setTitre] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [prix, setPrix] = useState("");
  const [date_open, setDate_open] = useState("");
  const [date_close, setDate_close] = useState("");
  const [departement, setDepartement] = useState("");
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");
  const [type, setType] = useState("");
  const [nbr_personne, setNbr_personne] = useState("");
  const status = "ajout_images";
  const clientId = null;
  const [postPicture, setPostPicture] = useState("");
  const [video, setVideo] = useState("");
  const [file, setFile] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();

  const [selectedImages, setSelectedImages] = useState([]);
  // const imageHandleChange = (e) => {
  //   if (e.target.files) {
  //     const fileArray = Array.from(e.target.files).map((file) =>
  //       URL.createObjectURL(file)
  //     );

  //     setSelectedImages((prevImages) => prevImages.concat(fileArray));
  //     setFile(e.target.files[0]);
  //   }
  // };
  // const renderPhotos = (source) => {
  //   return source.map((photo) => {
  //     return <img height="200px" width="50%" src={photo} alt="" key={photo} />;
  //   });
  // };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (message && file !== []) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("role", userData.role);
      data.append("message", message);
      data.append("titre", titre);
      data.append("superficie", superficie);
      data.append("prix", prix);
      data.append("date_open", date_open);
      data.append("date_close", date_close);
      data.append("departement", departement);
      data.append("lng", lng);
      data.append("lat", lat);
      data.append("type", type);
      data.append("status", status);
      data.append("clientId", clientId);
      data.append("nbr_personne", nbr_personne);
      if (file) data.append("file", file);
      data.append("video", video);
      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
      setFormSubmit(true);
      console.log(file);
    } else {
      alert("Veuillez entrer toutes les informations ");
      console.log(file);
    }
  };

  const cancelPost = () => {
    setMessage("");
    setTitre("");
    setSuperficie("");
    setPrix("");
    setDate_open("");
    setDate_close("");
    setDepartement("");
    setLat("");
    setLng("");
    setType("");
    setPostPicture("");
    setVideo("");
    setFile("");
    setSelectedImages("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [userData, message, video]);

  return (
    <>
      {formSubmit ? (
        <>
          <p
            className="success"
            style={{ textAlign: "center", paddingTop: "15%" }}
          >
            Votre publication a bien été enregistrée, rendez-vous dans la
            rubrique "Mes offres" pour ajouter 4 autres images.
            <br /> Ce nombre d'image est requis suite a une expérience des
            locataires.
            <br />
            Après cette étape, votre publication devra être valider par notre
            équipe, pour figurer sur liste des offres.
          </p>
          <div class="success-animation">
            <svg
              class="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                class="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                class="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>

          <span></span>
        </>
      ) : (
        <>
          <MDBCard>
            <MDBCardBody>
              <span class="card-title activator grey-text text-darken-4">
                Nouvelle annonce
              </span>
              <form action="" enctype="multipart/form-data">
                <div className="grey-text">
                  <MDBInput
                    required
                    label="titre"
                    type="text"
                    name="titre"
                    id="titre"
                    onChange={(e) => setTitre(e.target.value)}
                    value={titre}
                  />
                  <br />
                  <select
                    name="type"
                    id="type"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    class="browser-default custom-select"
                  >
                    <option value="">----- Type -----</option>
                    <option value="cabane dans les arbres">
                      cabane dans les arbres
                    </option>
                    <option value="cabane flottante">cabane flottante</option>
                    <option value="yourte">yourte</option>
                    <option value="yourte">Autre</option>
                  </select>

                  <MDBInput
                    label="superficie (m²)"
                    type="number"
                    name="superficie"
                    id="superficie"
                    onChange={(e) => setSuperficie(e.target.value)}
                    value={superficie}
                  />
                  <br />
                  <select
                    name="departement"
                    id="departement"
                    onChange={(e) => setDepartement(e.target.value)}
                    value={departement}
                    class="browser-default custom-select"
                  >
                    <option value="">--- Département ---</option>
                    {GoogleData.sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                    }).map((val, key) => {
                      return (
                        <option value={val.name} key={key}>
                          {val.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="row">
                    <div className="col-6">
                      <MDBInput
                        label="Longitude"
                        type="number"
                        name="lng"
                        id="lng"
                        onChange={(e) => setLng(e.target.value)}
                        value={lng}
                      />
                    </div>
                    <div className="col-6">
                      <MDBInput
                        label="Latitude"
                        type="number"
                        name="lat"
                        id="lat"
                        onChange={(e) => setLat(e.target.value)}
                        value={lat}
                      />
                    </div>
                  </div>
                  <MDBInput
                    label="prix (€) /nuit"
                    type="number"
                    name="prix"
                    id="prix"
                    onChange={(e) => setPrix(e.target.value)}
                    value={prix}
                  />
                  <MDBInput
                    required
                    label="nombre de personne"
                    type="number"
                    name="nbr_personne"
                    id="nbr_personne"
                    onChange={(e) => setNbr_personne(e.target.value)}
                    value={nbr_personne}
                  />
                  <MDBInput
                    required
                    label="Date début de disponibilité"
                    type="date"
                    name="date_open"
                    id="date_open"
                    onChange={(e) => setDate_open(e.target.value)}
                    value={date_open}
                  />
                  <MDBInput
                    required
                    label="Date fin de disponibilité"
                    type="date"
                    name="date_close"
                    id="date_close"
                    onChange={(e) => setDate_close(e.target.value)}
                    value={date_close}
                  />
                  <textarea
                    class="form-control rounded-0"
                    id="exampleFormControlTextarea2"
                    rows="3"
                    name="message"
                    placeholder="Décrivez votre offre..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  ></textarea>
                  <br />
                </div>
                <div className="footer-form">
                  <div className="icon">
                    {isEmpty(video) && (
                      <>
                        <input
                          required
                          type="file"
                          id="file"
                          name="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={handlePicture}
                        />
                      </>
                    )}
                    {video && (
                      <button
                        className="btn waves-effect waves-light"
                        onClick={() => setVideo("")}
                      >
                        Supprimer video
                      </button>
                    )}
                  </div>
                  {!isEmpty(error.format) && <p>{error.format}</p>}
                  {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
                  <div className="btn-send">
                    {message || postPicture || video.length > 20 ? (
                      <button
                        className="btn waves-effect waves-light"
                        className="cancel"
                        onClick={cancelPost}
                      >
                        Annuler la plublication
                      </button>
                    ) : null}
                    <br />
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      onClick={handlePost}
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
          <MDBCard>
            <MDBCardBody>
              <span class="card-title activator grey-text text-darken-4">
                Aperçu
              </span>
              {message || postPicture || video.length > 20 ? (
                <div className="content">
                  <div className="row">
                    {" "}
                    {postPicture && (
                      <img
                        height="50%"
                        width="100%"
                        src={postPicture}
                        alt=""
                        key={postPicture}
                      />
                    )}
                  </div>

                  {video && (
                    <iframe
                      style={{ width: "100%", height: "100%" }}
                      src={video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video}
                    ></iframe>
                  )}
                </div>
              ) : null}
            </MDBCardBody>
          </MDBCard>
        </>
      )}
    </>
  );
};

export default NewPostForm;
