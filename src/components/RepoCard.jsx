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
      <div>
        {repo.languages || repo.languages.length > 0
          ? repo.languages.map((s) => <span key={s}>{s}</span>)
          : repo.languages.map((a) => (
              <span
                key={a}
                className="shine"
                style={{ width: "50px", height: "20px"}}
              ></span>
            ))}
      </div>
    </a>
  );
});

export default RepoCard;
