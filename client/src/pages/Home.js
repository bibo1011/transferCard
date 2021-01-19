import React from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { CardWrapper } from "../components/SignCard";

const Home = () => {
  const [show, setShow] = React.useState(false)
  return (
    <div className="container">
      <CardWrapper>
        {show ? (
          <Signup />
          ) : 
          <Login />
        } 
        <button class="signup-toggle" onClick={() => setShow(!show)}>{show ? "I already have an account" : "I want sign up"}</button>
      </CardWrapper>
     
    </div>
  );
};
export default Home;