import { MDBCard, MDBCardBody } from "mdbreact";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utilitaires";
import Card from "./Card";

const SearchForm = () => {
  const posts = useSelector((state) => state.postReducer);
  const [searcharr, setSearcharr] = useState("");
  const [searchdep, setSearchdep] = useState("");
  const [type, setType] = useState("");

  const refrechSearch = () => {
    setSearcharr("");
    setSearchdep("");
    setType("");
  };

  return (
    <div>
      <MDBCard>
        <MDBCardBody>
          <div className="row">
            <div className="col-6">
              <label style={{ color: "#3a3a3a", fontWeight: "bold" }}>
                Date d'arriver
              </label>
              <input
                htmlFor="date_arr"
                type="date"
                id="date_arr"
                onChange={(e) => setSearcharr(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label style={{ color: "#3a3a3a", fontWeight: "bold" }}>
                Date de départ
              </label>
              <input
                htmlFor="date_dep"
                type="date"
                id="date_dep"
                onChange={(e) => setSearchdep(e.target.value)}
              />
            </div>
          </div>

          <div>
            {!isEmpty(posts[0]) &&
              posts.map((post) => {
                if (post.status === "non_reservé") {
                  if (
                    (searcharr < post.date_open ||
                      post.date_close > searcharr) &&
                    searcharr > post.date_open
                  ) {
                    if (searchdep <= post.date_close) {
                      return (
                        <div>
                          <p style={{ color: "#2950b9", fontWeight: "bold" }}>
                            Disponible
                          </p>
                          <Card post={post} key={post._id} />
                        </div>
                      );
                    }
                  }
                }
              })}
          </div>
          <div>
            {!isEmpty(posts[0]) &&
              posts.map((post) => {
                if (post.type === type && post.status === "non_reservé") {
                  return (
                    <div>
                      <p style={{ color: "green" }}>{post.type}</p>
                      <Card post={post} key={post._id} />
                    </div>
                  );
                }
              })}
          </div>
        </MDBCardBody>
      </MDBCard>
      <div className="row">
        <div className="col-5">
          <select
            onChange={(e) => setType(e.target.value)}
            name="type"
            id="type"
            class="browser-default custom-select"
          >
            <option value="">***Type***</option>
            <option value="cabane dans les arbres">
              cabane dans les arbres
            </option>
            <option value="cabane flottante">cabane flottante</option>
            <option value="yourte">yourte</option>
          </select>
        </div>
        <div className="col-2">
          <a class="btn-floating">
            <i
              title="Rafraîchir"
              onClick={refrechSearch}
              class="fas fa-sync-alt"
            ></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
