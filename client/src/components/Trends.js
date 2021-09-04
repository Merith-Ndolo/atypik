import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrends } from "../actions/postAction";
import { isEmpty } from "./Utilitaires";
import { NavLink } from "react-router-dom";

const Trends = () => {
  const posts = useSelector((state) => state.allPostsReducer);
  const trendList = useSelector((state) => state.bestofReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 3;
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);

  return (
    <div>
      <NavLink exact to="/bestof">
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post._id}>
                  <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                      {post.picture[0] !== "" && (
                        <>
                          <img
                            class="activator"
                            src={post.picture[0]}
                            alt="post-pic"
                          />
                          <span class="card-title">TENDANCE</span>
                        </>
                      )}
                    </div>
                    <div class="card-content">
                      <span class="card-title activator grey-text text-darken-4">
                        {post.titre}
                      </span>
                      <span class="card-title activator grey-text text-darken-4">
                        <i class=" right">
                          {post.likers.length}{" "}
                          <img
                            width="20px"
                            src="./img/icons/etoile-filled.png"
                            alt="unlike"
                          />
                        </i>
                      </span>
                      <span class="card-title activator grey-text text-darken-10">
                        {post.departement}
                      </span>
                      <p
                        style={{ fontSize: "15px" }}
                        class="card-title activator grey-text text-darken-1"
                      >
                        {post.message}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </NavLink>
    </div>
  );
};

export default Trends;
