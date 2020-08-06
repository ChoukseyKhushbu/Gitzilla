import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RepoCard from "./RepoCard";
import { Link } from "react-router-dom";
import useRepoSearch from "./useRepoSearch";
import { useRef } from "react";
import { useCallback } from "react";
import { graphqlClient } from "../utils/graphqlClient";
import { searchUserQuery } from "../utils/queries";

const User = () => {
  let { userName } = useParams();
  const [userData, setuserData] = useState(null);
  const [userFound, isUserFound] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const { reposLoading, error, repos, hasMore, skills } = useRepoSearch(
    userName,
    pageNumber
  );

  const observer = useRef();
  const lastRepoElementRef = useCallback(
    (node) => {
      if (reposLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [reposLoading, hasMore]
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await graphqlClient.request(searchUserQuery, {username: userName});
        setuserData(res.user);
      } catch (error) {
        isUserFound(false);
      }
    })();
  }, [userName]);

  return userFound ? (
    <>
      <div className="sidebar user">
        <div>
          <div className="avatar shine">
            {userData && (
              <img src={userData.avatarUrl} className="profile" alt="" />
            )}
          </div>
          {userData ? (
            <>
              <h1>
                {userData.name && userData.name.length > 0
                  ? userData.name
                  : userName}
              </h1>
              <p>{userData.bio}</p>
            </>
          ) : (
            <>
              {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
              <h1 className="lines shine" style={{ display: "block" }}></h1>
              <p className="lines shine"></p>
            </>
          )}
        </div>
        <div>
          <h3>Skills</h3>
          <div className="skills">
            {Object.keys(skills).length > 0 || repos.length > 0
              ? Object.keys(skills).map((s) => <span key={s}>{s}</span>)
              : [...Array(5)].map((a) => (
                  <span
                    key={a}
                    className="shine"
                    style={{ width: "50px", height: "20px" }}
                  ></span>
                ))}
          </div>
        </div>
        {userData && (
          <div className="social">
            <span>{userData.followers.totalCount} followers</span>
            <span>{userData.following.totalCount} following</span>
          </div>
        )}
        {userData && (
          <div className="details">
            {userData.company && (
              <div>
                <i className="fas fa-building"></i>
                {userData.company}
              </div>
            )}
            {userData.blog && (
              <div>
                <i className="fas fa-link"></i>
                <a
                  href={userData.blog}
                  style={{ color: "inherit" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.blog}
                </a>
              </div>
            )}
            {userData.location && (
              <div>
                <i className="fas fa-map-marker-alt"></i>
                {userData.location}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="main">
        <h1>Repositories</h1>
        <div className="repoContainer">
          {repos.map((repo, index) => {
            if (repos.length === index + 1) {
              return (
                <RepoCard ref={lastRepoElementRef} key={repo.id} repo={repo} />
              );
            } else return <RepoCard key={repo.id} repo={repo} />;
          })}
          {reposLoading &&
            !error &&
            [...Array(12)].map((p) => (
              <div
                key={p}
                className="repoCard shine"
                style={{ height: "150px" }}
              ></div>
            ))}
        </div>
      </div>
    </>
  ) : (
    <div className="error">
      <h1>Ooops!!</h1>
      <h2>404 User Not Found</h2>
      <Link to={`/`} className="button">
        Go Back
      </Link>
    </div>
  );
};

export default User;

