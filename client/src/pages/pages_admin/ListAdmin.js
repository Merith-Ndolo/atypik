import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableBody, MDBTableFoot, MDBTableHead } from "mdbreact";
import { dateParser, isEmpty } from "../../components/Utilitaires";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NavBarAdmin from "../../components/PageAccueil/NavBarAdmin";
import DropdownAdmin from "../../components/PageAccueil/DropDownAdmin";

const ListAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);

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
          <h1>
            Liste des Administrateurs
            <div style={{ textAlign: "right", paddingRight: "30px" }}>
              <NavLink exact to="/ajout_admin">
                <i className="fas fa-plus" title="Ajouter"></i>
              </NavLink>
            </div>
          </h1>

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
                      if (user.role === "administrateur") {
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
export default ListAdmin;
