import { useEffect, useState } from "react";
import { graphqlClient } from "../utils/graphqlClient";
import { searchRepoQuery } from "../utils/queries";

export default function useRepoSearch(username, pageNumber) {
  const [reposLoading, setReposLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [skills, setSkills] = useState({});

  useEffect(() => {
    setRepos([]);
  }, [username]);

  useEffect(() => {
    setReposLoading(true);
    setError(false);
    
    graphqlClient.rawRequest(searchRepoQuery, {username: username})
      .then((res) => {
        const repos = toRepositories(res.data);
        setRepos((previousRepos) => {
          return [...previousRepos, ...repos];
        });
        let obj = skills;
        repos.forEach((repo) => {
          if (repo.languages) {
            repo.languages.forEach((language) => {
              obj[language] = obj[language] ? obj[language]++ : 1;
            })
          }
        });
        setSkills(obj);
        setHasMore(repos.length > 0);
        setReposLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [username, pageNumber, skills]);
  return { reposLoading, error, repos, hasMore, skills };
}

function toRepositories(data) {
  let result = [];
  if (data.user)
  {
    result = data.user.repositories.nodes.map((x) => {
      return {
        name: x.name,
        description: x.description,
        projectsUrl: x.projectsUrl,
        languages: x.languages.nodes.map((l) => {
          return l.name
        })
      }
    })
  }
  return result;
}