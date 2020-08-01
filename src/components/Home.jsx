import React from "react";
import { Link } from "react-router-dom";
const Home = (props) => {
  const handleChange = async (e) => {
    const newUser = e.target.value;
    props.changeName(newUser);
  };
  return (
    <>
      <div className="leftContainer">
        <div className="content">
          <h1 className="heading">GitZilla</h1>
          <p>A resume builder for your GitHub profile.</p>
          <ul>
            <li>- Fetches your skills</li>
            <li>- Fetches your details</li>
            <li>- Links to your repos</li>
          </ul>

          <div className="inputContainer">
            <label htmlFor="Username" className="inputLabel">
              Enter your GitHub Username
            </label>
            <input
              name="Username"
              type="text"
              value={props.userName}
              onChange={handleChange}
            />
            <Link
              to={`/users/${props.userName}`}
              className="button"
              style={!props.userName ? { pointerEvents: "none" } : {}}
            >
              Generate Resume
            </Link>
          </div>
        </div>
      </div>
      <div className="rightContainer">
        <img
          className="octocat"
          src={require("../assets/femalecodertocat.png")}
          alt=" resume builder"
        />
      </div>
      <div className="mobileTop">
        <h1>GitZilla</h1>
        <p>A resume builder for your GitHub profile</p>
        <img
          className="mobileOctocat"
          src={require("../assets/femalecodertocat.png")}
          alt=" resume builder"
        />
      </div>
      <div className="mobileBottom">
        <div className="inputContainer">
          <label htmlFor="Username" className="inputLabel">
            Enter your GitHub Username
          </label>
          <input
            name="Username"
            type="text"
            value={props.userName}
            onChange={handleChange}
          />
          <Link
            to={`/users/${props.userName}`}
            className="button"
            style={!props.userName ? { pointerEvents: "none" } : {}}
          >
            Generate Resume
          </Link>
        </div>
      </div>
    </>
  );
};
export default Home;
