import React from "react";

const RepoCard = React.forwardRef((props, ref) => {
  let { repo } = props;
  return (
    <a
      ref={ref}
      href={repo.url}
      className="repoCard"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="repoTitle">{repo.name}</div>
      <p>{repo.description}</p>
      <div>
        {repo.languages &&
          repo.languages.length > 0 &&
          repo.languages.map((s) => <span key={s}>{s}</span>)}
      </div>
    </a>
  );
});

export default RepoCard;
