import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { updateParam, uploadSlidePicture } from "../../actions/paramAction";

const UpdateParam = ({ slid }) => {
  const dispatch = useDispatch();
  const [selectedImg, setSelectedImg] = useState([]);
  const [getImage, setGetImage] = useState(false);
  const userData = useSelector((state) => state.userReducer);

  // data slide 1
  const [file, setFile] = useState("");
  const [titreUpdate, setTitreUpdate] = useState("");
  const [prixUpdate, setPrixUpdate] = useState("");
  const [tempsUpdate, setTempsUpdate] = useState("");

  const imageChange = (e) => {
    setSelectedImg(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setGetImage(true);
  };

  const handleAll = () => {
    handlePicture();
    updateItem();
  };

  const handlePicture = () => {
    const data = new FormData();
    data.append("titre", slid.titre);
    data.append("prix", slid.prix);
    data.append("role", userData.role);
    data.append("temps", slid.temps);
    data.append("paramId", slid._id);
    data.append("file", file);

    dispatch(uploadSlidePicture(data, slid._id));
  };

  const updateItem = () => {
    if (titreUpdate || prixUpdate || tempsUpdate) {
      dispatch(
        updateParam(
          slid._id,
          titreUpdate,
          prixUpdate,
          tempsUpdate,
          userData.role
        )
      );
    }
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody>
              <form action="" enctype="multipart/form-data">
                <div className="grey-text">
                  <input
                    defaultValue={slid.titre}
                    label="titre"
                    type="text"
                    onChange={(e) => setTitreUpdate(e.target.value)}
                  />
                  <br />
                  <br />
                  <input
                    label="prix"
                    type="number"
                    onChange={(e) => setPrixUpdate(e.target.value)}
                    defaultValue={slid.prix}
                  />
                  <br />
                  <br />
                  <br />
                  <select
                    name="temps"
                    id="temps"
                    onChange={(e) => setTempsUpdate(e.target.value)}
                    value={tempsUpdate}
                    class="browser-default custom-select"
                  >
                    <option defaultValue={slid.temps}>{slid.temps}</option>
                    <option value="Nuit">Nuit</option>
                    <option value="Jour">Jour</option>
                    <option value="Semaine">Semaine</option>
                    <option value="Mois">Mois</option>
                  </select>
                </div>
                <br />
                <label for="file">Changer d'image</label>
                <br />
                <input
                  style={{ width: "140px" }}
                  type="file"
                  id="file"
                  name="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={imageChange}
                />

                <br />
                <br />
                <div className="row">
                  {getImage === false ? (
                    <img
                      height="300px"
                      width="100%"
                      src={slid.picture}
                      alt=""
                    />
                  ) : (
                    <img height="300px" width="100%" src={selectedImg} alt="" />
                  )}
                </div>
                <br />
                <div className="footer-form">
                  <div className="btn-send">
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      onClick={handleAll}
                    >
                      Valider
                    </button>
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

export default UpdateParam;
