import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../../components/Utilitaires";
import NavBarAdmin from "../../components/PageAccueil/NavBarAdmin";
import DropdownAdmin from "../../components/PageAccueil/DropDownAdmin";

const User_view = (props) => {
  const usersData = useSelector((state) => state.usersReducer);
  const [isOpenNav, setIsOpenNav] = useState(false);

  const toggle = () => {
    setIsOpenNav(!isOpenNav);
  };

  return (
    <div>
      <NavBarAdmin toggle={toggle} />
      <DropdownAdmin isOpen={isOpenNav} toggle={toggle} />
      <div className="container" style={{ paddingTop: "100px" }}>
        <MDBContainer>
          <bcomplexe r />
          <MDBRow>
            <MDBCol md="12">
              <MDBCard>
                <MDBCardBody>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((users) => {
                      if (`?id=${users._id}` === props.location.search) {
                        return (
                          <>
                            <p> Profil de {users.pseudo}</p>
                            <p>
                              Compte crée le : {dateParser(users.createdAt)}
                            </p>
                            <div className="row">
                              <div className="col-6">
                                <ul>
                                  <li>Pseudo: {users.pseudo}</li>
                                  <li>Email: {users.email}</li>
                                  <li>Tel: {users.tel}</li>
                                </ul>
                              </div>
                              <div className="col-6">
                                <div className="left-part">
                                  <h3>Photo de profil</h3>
                                  <img
                                    height="400"
                                    width="100%"
                                    src={users.picture}
                                    alt="user-pic"
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default User_view;
