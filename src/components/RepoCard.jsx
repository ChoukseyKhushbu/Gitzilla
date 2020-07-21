import React from "react";

const RepoCard = ({ repo }) => {
  return (
    <div className="repoCard">
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        {repo.name}
      </a>
      <p>{repo.description}</p>
      {repo.language && <span>{repo.language}</span>}
    </div>
  );
};

export default RepoCard;
