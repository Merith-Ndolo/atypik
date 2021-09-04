import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { addSection } from "../../actions/sectionAction";
import { Switch } from "antd";

const SectionForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  // data slide 1
  const [file, setFile] = useState("");
  const [titre, setTitre] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [reverse, setReverse] = useState(false);

  const toggler = () => {
    reverse ? setReverse(false) : setReverse(true);
  };

  const imageHandleChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelSection = () => {
    setTitre("");
    setParagraph("");
    setFile("");
    setSelectedImage("");
  };

  const handleSection = async () => {
    const data = new FormData();
    data.append("sectionId", userData._id);
    data.append("role", userData.role);
    data.append("titre", titre);
    data.append("paragraph", paragraph);
    data.append("reverse", reverse);
    if (file) data.append("file", file);
    await dispatch(addSection(data));
    console.log(data);
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody>
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

                  <textarea
                    class="form-control rounded-0"
                    id="exampleFormControlTextarea2"
                    rows="3"
                    name="paragraph"
                    placeholder="Texte..."
                    onChange={(e) => setParagraph(e.target.value)}
                    value={paragraph}
                  ></textarea>
                  <br />
                  <Switch onClick={toggler} />
                  {reverse ? (
                    <span> Disposition à droite</span>
                  ) : (
                    <span> Disposition à gauche</span>
                  )}
                  <br />
                  <label for="file">Ajouter une image</label>
                  <br />
                  <input
                    required
                    style={{ width: "140px" }}
                    type="file"
                    id="file"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={imageHandleChange}
                  />
                </div>
                <div className="row">
                  {selectedImage !== "" && (
                    <img
                      height="300px"
                      width="100%"
                      src={selectedImage}
                      alt=""
                    />
                  )}
                </div>
                <div className="footer-form">
                  <div className="btn-send">
                    {titre && paragraph && file && (
                      <>
                        <button
                          className="btn waves-effect waves-light"
                          type="submit"
                          onClick={cancelSection}
                        >
                          Annuler
                        </button>
                        <button
                          className="btn waves-effect waves-light"
                          type="submit"
                          onClick={handleSection}
                        >
                          Envoyer
                        </button>
                      </>
                    )}
                    {!(titre && paragraph && file) && (
                      <div>Veuillez remplir toutes les informations!</div>
                    )}
                  </div>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SectionForm;
