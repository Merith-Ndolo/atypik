import React, { useEffect, useState, lazy, Suspense } from "react";
import { UidContext } from "./components/UserIdConnect";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/userAction";
import GlobalStyle from "./pages/page_accueil/globalStyles";

const Routes = lazy(() => import("./components/Routes"));

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  //let indexdb = indexedDB.open("atypikhouseDB", 1);

  const renderLoader = () => <p>Loading</p>;

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <GlobalStyle />
      <Suspense fallback={renderLoader()}>
        <Routes />
      </Suspense>
    </UidContext.Provider>
  );
};

export default App;
