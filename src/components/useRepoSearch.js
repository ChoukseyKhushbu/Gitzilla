import { useEffect, useState } from "react";
import { graphqlClient } from "../utils/graphqlClient";
import { searchRepoQuery } from "../utils/queries";

export default function useRepoSearch(username, currCursor) {
  const [reposLoading, setReposLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [skills, setSkills] = useState({});

  useEffect(() => {
    setRepos([]);
  }, [username]);

  useEffect(() => {
    setReposLoading(true);
    setError(false);

    graphqlClient
      .rawRequest(searchRepoQuery, { username: username, after: currCursor })
      .then((res) => {
        const { hasNextPage, endCursor } = res.data.user.repositories.pageInfo;
        const repos = toRepositories(res.data);
        setRepos((previousRepos) => {
          return [...previousRepos, ...repos];
        });
        let obj = skills;
        repos.forEach((repo) => {
          if (repo.languages) {
            repo.languages.forEach((language) => {
              obj[language] = obj[language] ? obj[language]++ : 1;
            });
          }
        });
        setSkills(obj);
        setHasMore(hasNextPage);
        setNextCursor(endCursor);
        setReposLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [username, currCursor, skills]);
  return { reposLoading, error, repos, hasMore, skills, nextCursor };
}

function toRepositories(data) {
  let result = [];
  if (data.user) {
    result = data.user.repositories.nodes
      .sort((a, b) => a.isFork - b.isFork)
      .map((x) => {
        return {
          id: x.id,
          name: x.name,
          description: x.description,
          url: x.url,
          languages: x.languages.nodes.map((l) => {
            return l.name;
          }),
        };
      });
  }
  return result;
}
