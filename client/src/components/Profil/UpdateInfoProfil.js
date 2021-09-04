import React from "react";
import { useSelector } from "react-redux";
import UpdatePicture from "./UpdatePicture";
import { dateParser } from "../Utilitaires";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";

const UpdateInfoProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12" style={{ paddingTop: "10%" }}>
          <MDBContainer>
            <bcomplexe r />
            <MDBRow>
              <MDBCol md="12">
                <MDBCard>
                  <MDBCardBody>
                    <h2> Profil de {userData.pseudo}</h2>
                    <h3>({userData.role})</h3>
                    <p>Compte créé le : {dateParser(userData.createdAt)}</p>
                    <p>Pseudo: {userData.pseudo}</p>
                    <p>Email: {userData.email}</p>
                    <div className="row">
                      <div className="col-12">
                        <div className="left-part">
                          <img
                            height="30%"
                            width="100%"
                            style={{
                              borderRadius: "30px",
                              border: "2px solid #ff7979",
                            }}
                            src={userData.picture}
                            alt="user-pic"
                          />
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfoProfil;
