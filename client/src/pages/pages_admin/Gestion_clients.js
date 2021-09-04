import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import { dateParser, isEmpty } from "../../components/Utilitaires";
import { useSelector } from "react-redux";
import { deleteUser } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import NavBarAdmin from "../../components/PageAccueil/NavBarAdmin";
import DropdownAdmin from "../../components/PageAccueil/DropDownAdmin";

const Gestion_clients = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const deleteQuote = (id) => dispatch(deleteUser(id, userData.role));

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  const [isOpenNav, setIsOpenNav] = useState(false);

  const toggle = () => {
    setIsOpenNav(!isOpenNav);
  };

  return (
    <div>
      <NavBarAdmin toggle={toggle} />
      <DropdownAdmin isOpen={isOpenNav} toggle={toggle} />
      <div className="container">
        <div className="col-12" style={{ paddingTop: "100px" }}>
          <br />
          <h1>Gestion des clients</h1>
          <>
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <MDBTable>
                <MDBTableHead color="primary-color">
                  <tr>
                    <th>Image</th>
                    <th>Pseudo</th>
                    <th>Email</th>
                    <th>Membre depuis</th>
                    <th>Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user.role === "client") {
                        return (
                          <tr>
                            <td>
                              <img
                                height="40"
                                width="40"
                                style={{ borderRadius: "50%" }}
                                src={user.picture}
                                alt="poster-pic"
                              />
                            </td>
                            <td>{user.pseudo}</td>
                            <td>{user.email}</td>
                            <td>{dateParser(user.createdAt)}</td>
                            <td>
                              <button
                                type="submit"
                                className="btn btn-danger"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Voulez-vous supprimer cet utilisateur ?"
                                    )
                                  ) {
                                    deleteQuote(user._id);
                                    window.location.reload(false);
                                  }
                                }}
                              >
                                <i class="fas fa-trash-alt"></i>
                              </button>{" "}
                              <button type="submit" className="btn btn-warning">
                                <NavLink
                                  style={{ color: "black" }}
                                  to={{
                                    pathname: "/user_view",
                                    search: `id=${user._id}`,
                                  }}
                                  exact
                                >
                                  <i className="fas fa-eye"></i>
                                </NavLink>
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                </MDBTableBody>
              </MDBTable>
            )}
          </>
          <MDBTableFoot>Created by "@Merith"</MDBTableFoot>
        </div>
      </div>
    </div>
  );
};
export default Gestion_clients;
