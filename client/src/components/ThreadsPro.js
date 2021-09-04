import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/postAction";
import Card from "./Post/Card";
import { isEmpty } from "./Utilitaires";

const ThreadsPro = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  const userData = useSelector((state) => state.userReducer);

  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
      setLoadPost(true);
    }
  }

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
              if ((post.posterId === userData._id) && (post.status !== "validation")) {
                return <Card post={post} key={post._id} />;
              }
          })}
      </ul>
    </div>
  );
};

export default ThreadsPro;
