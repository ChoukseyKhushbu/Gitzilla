import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import RepoCard from "./RepoCard";

const User = () => {
  let { userName } = useParams();
  const [userData, setuserData] = useState(null);
  const [repos, setrepos] = useState([]);
  const [skills, setSkills] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await Axios.get(`https://api.github.com/users/${userName}`);
        setuserData(res.data);
        const userRepos = await Axios.get(
          `${res.data.repos_url}?page=1&per_page=100&sort=updated`
        );
        // console.log(userRepos.data);
        setrepos(userRepos.data);
        let obj = {};
        userRepos.data.forEach((repo) => {
          // console.log(repo);
          if (repo.language) {
            obj[repo.language] = obj[repo.language] ? obj[repo.language]++ : 1;
          }
        });
        setSkills(obj);
      } catch (error) {
        console.log(error);
        console.log(error.response.status);
        document.body.innerHTML = "404 User not found!!!";
      }
    })();
  }, [userName]);

  return (
    <>
      <div className="sidebar user">
        <div>
          <div className="avatar shine">
            {userData && (
              <img src={userData.avatar_url} className="profile" alt="" />
            )}
          </div>
          {userData ? (
            <>
              <h1>{userData.name}</h1>
              <p>{userData.bio}</p>
            </>
          ) : (
            <>
              {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
              <h1 className="lines shine"></h1>
              <p className="lines shine"></p>
            </>
          )}
        </div>
        <div>
          <h3>Skills</h3>
          <div className="skills">
            {Object.keys(skills).length > 0
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
            <span>{userData.followers} followers</span>
            <span>{userData.following} following</span>
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
            <div>
              <i className="fas fa-map-marker-alt"></i>
              {userData.location}
            </div>
          </div>
        )}
      </div>
      <div className="main">
        <h1>Repositories</h1>
        <div className="repoContainer">
          {userData && repos.length > 0
            ? repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
            : [...Array(12)].map((p) => (
                <div
                  key={p}
                  className="repoCard shine"
                  style={{ height: "150px" }}
                ></div>
              ))}
        </div>
      </div>
    </>
  );
};

export default User;

// The below class component method I used to demonstrate a case
//  of updating the component when the prop passed to it changes

// class User extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userData: null,
//       repos: [],
//     };
//   }

//   fetchDetails() {
//     console.log("mounted");
//     let { userName } = this.props.match.params;
//     (async () => {
//       try {
//         const res = await Axios.get(`https://api.github.com/users/${userName}`);
//         // setuserData(res.data);
//         this.setState({
//           userData: res.data,
//         });
//         const userRepos = await Axios.get(res.data.repos_url);
//         console.log(userRepos.data);
//         // setrepos(userRepos.data);
//         this.setState({
//           repos: userRepos.data,
//         });
//       } catch (error) {
//         console.log(error.response.status);
//         document.body.innerHTML = "404 User not found!!!";
//       }
//     })();
//   }
//   componentDidMount() {
//     this.fetchDetails();
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props.match.params.userName !== prevProps.match.params.userName) {
//       this.fetchDetails();
//     }
//   }

//   render() {
//     console.log(this.props);

//     let { userData, repos } = this.state;
//     return (
//       <>
//         {userData ? (
//           <div>
//             <h1>{userData.name}</h1>
//             <Link to="/users/DivyanshBatham">DB</Link>
//             <br />
//             <Link to="/users/ChoukseyKhushbu">KC</Link>
//             {repos.map((repo) => {
//               return (
//                 <li key={repo.id}>
//                   {/* <a href={repo.html_url} target="_blank"> */}
//                   {repo.name}
//                   {/* </a> */}
//                 </li>
//               );
//             })}
//           </div>
//         ) : (
//           <>
//             <h1>loading...</h1>
//             <Link to="/users/DivyanshBatham">DB</Link>
//             <Link to="/users/ChoukseyKhushbu">KC</Link>
//           </>
//         )}
//       </>
//     );
//   }
// }
// export default User;
