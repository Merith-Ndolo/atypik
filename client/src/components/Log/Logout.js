import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import "../../style/index.css";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <a href="/">
      <div
        onClick={logout}
        style={{ textAlign: "center", paddingLeft: "82%", paddingRight: "18%" }}
      >
        {"  "}
        <i class="fas fa-power-off" style={{ color: "#17233e" }}></i>
      </div>
    </a>
  );
};

export default Logout;
