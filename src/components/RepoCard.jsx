import React from "react";

const RepoCard = React.forwardRef((props, ref) => {
  let { repo } = props;
  return (
    <a
      ref={ref}
      href={repo.html_url}
      className="repoCard"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="repoTitle">{repo.name}</div>
      <p>{repo.description}</p>
      {repo.language && <span>{repo.language}</span>}
    </a>
  );
});

export default RepoCard;
