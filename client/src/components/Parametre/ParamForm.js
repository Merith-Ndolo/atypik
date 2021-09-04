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
import { addParam } from "../../actions/paramAction";

const ParamForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  // data slide 1
  const [file, setFile] = useState("");
  const [titre, setTitre] = useState("");
  const [prix, setPrix] = useState("");
  const [temps, setTemps] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);

  const imageHandleChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelParam = () => {
    setTitre("");
    setPrix("");
    setTemps("");
    setFile("");
    setSelectedImage("");
  };

  const handleParam = async (e) => {
    const data = new FormData();
    data.append("paramId", userData._id);
    data.append("role", userData.role);
    data.append("titre", titre);
    data.append("prix", prix);
    data.append("temps", temps);
    if (file) data.append("file", file);
    await dispatch(addParam(data));

    console.log(prix);
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
                  <MDBInput
                    required
                    label="prix"
                    type="number"
                    name="prix"
                    id="prix"
                    onChange={(e) => setPrix(e.target.value)}
                    value={prix}
                  />
                  <br />
                  <select
                    name="temps"
                    id="temps"
                    onChange={(e) => setTemps(e.target.value)}
                    value={temps}
                    class="browser-default custom-select"
                    required
                  >
                    <option value="">----- Type -----</option>
                    <option value="Nuit">Nuit</option>
                    <option value="Jour">Jour</option>
                    <option value="Semaine">Semaine</option>
                    <option value="Mois">Mois</option>
                  </select>
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
                    {titre && prix && temps && file && (
                      <>
                        <button
                          className="btn waves-effect waves-light"
                          type="submit"
                          onClick={cancelParam}
                        >
                          Annuler
                        </button>
                        <button
                          className="btn waves-effect waves-light"
                          type="submit"
                          onClick={handleParam}
                        >
                          Envoyer
                        </button>
                      </>
                    )}
                    {!(titre && prix && temps && file) && (
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

export default ParamForm;
