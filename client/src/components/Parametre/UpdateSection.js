import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSection,
  uploadSectionPicture,
} from "../../actions/sectionAction";

const UpdateSection = ({ sect }) => {
  const dispatch = useDispatch();
  const [selectedImg, setSelectedImg] = useState([]);
  const [getImage, setGetImage] = useState(false);

  // data slide 1
  const [file, setFile] = useState("");
  const [titreUpdate, setTitreUpdate] = useState("");
  const [paragraphUpdate, setParagraphUpdate] = useState("");
  const userData = useSelector((state) => state.userReducer);

  const imageChanged = (e) => {
    setSelectedImg(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setGetImage(true);
  };

  const handleAllDetail = (e) => {
    e.preventDefault();
    handlePicSection();
    updateItemSection();
  };

  const handlePicSection = () => {
    const data = new FormData();
    data.append("titre", sect.titre);
    data.append("paragraph", sect.paragraph);
    data.append("role", userData.role);
    data.append("sectionId", sect._id);
    data.append("file", file);

    dispatch(uploadSectionPicture(data, sect._id));
  };

  const updateItemSection = () => {
    if (titreUpdate || paragraphUpdate) {
      dispatch(
        updateSection(sect._id, titreUpdate, paragraphUpdate, userData.role)
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
                    defaultValue={sect.titre}
                    label="titre"
                    type="text"
                    onChange={(e) => setTitreUpdate(e.target.value)}
                  />
                  <br />
                  <textarea
                    class="form-control rounded-0"
                    id="exampleFormControlTextarea2"
                    rows="3"
                    name="paragraph"
                    placeholder="Texte..."
                    onChange={(e) => setParagraphUpdate(e.target.value)}
                    defaultValue={sect.paragraph}
                  ></textarea>
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
                  onChange={imageChanged}
                />

                <br />
                <br />
                <div className="row">
                  {getImage === false ? (
                    <img
                      height="300px"
                      width="100%"
                      src={sect.picture}
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
                      onClick={handleAllDetail}
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

export default UpdateSection;
