import { useEffect, useState } from "react";
import axios from "axios";

export default function useRepoSearch(query, pageNumber) {
  const [reposLoading, setReposLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [skills, setSkills] = useState({});

  useEffect(() => {
    setRepos([]);
  }, [query]);

  useEffect(() => {
    setReposLoading(true);
    setError(false);
    axios
      .get(
        `https://api.github.com/users/${query}/repos?page=${pageNumber}&per_page=100&sort=updated`
      )
      .then((res) => {
        setRepos((previousRepos) => {
          return [...previousRepos, ...res.data];
        });
        // setSkills((prevSkills) => {
        //   let updatedSkills = { ...prevSkills };
        //   res.data.forEach((repo) => {
        //     if (repo.language) {
        //       updatedSkills[repo.language] = updatedSkills[repo.language]
        //         ? updatedSkills[repo.language]++
        //         : 1;
        //     }
        //   });
        //   return { updatedSkills };
        // });
        let obj = skills;
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
  }, [query, pageNumber, skills]);
  return { reposLoading, error, repos, hasMore, skills };
}
