import { useEffect, useState } from "react";
import axios from "axios";

export default function useRepoSearch({ userName, pageNumber }) {
  const [reposLoading, setReposLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [skills, setSkills] = useState({});

  useEffect(() => {
    setRepos([]);
  }, [userName]);

  useEffect(() => {
    setReposLoading(true);
    setError(false);
    axios
      .get(
        `https://api.github.com/users/${userName}/repos?page=${pageNumber}&per_page=100&sort=updated`
      )
      .then((res) => {
        setRepos((previousRepos) => {
          return [...previousRepos, ...res.data];
        });
        let obj = { ...skills };
        res.data.forEach((repo) => {
          if (repo.language) {
            obj[repo.language] = obj[repo.language] ? obj[repo.language]++ : 1;
          }
        });
        setSkills(obj);
        setHasMore(res.data.length > 0);
        setReposLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [userName, pageNumber, skills]);
  return { reposLoading, error, repos, hasMore, skills };
}
