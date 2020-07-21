import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import User from "./User";
import Container from "./Container";
function App() {
  const [userName, setuserName] = useState("");

  const changeName = (name) => {
    console.log(name);
    setuserName(name);
  };
  return (
    <Switch>
      <Container>
        <Route path="/" exact>
          <Home changeName={changeName} userName={userName} />
        </Route>
        <Route path="/users/:userName" component={User} />
      </Container>
    </Switch>
  );
}

export default App;
