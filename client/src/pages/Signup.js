import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import {
  CardHeader,
  CardHeading,
  CardBody,
  CardButton,
} from "../components/SignCard";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email, password: formState.password,
        firstName: formState.firstName, lastName: formState.lastName
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="container my-1">
        <CardHeader>
          <CardHeading><h2>Signup</h2></CardHeading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleFormSubmit}>
              <div className="flex-row space-between my-2">
                <input
                  placeholder="First Name"
                  name="firstName"
                  type="firstName"
                  id="firstName"
                  onChange={handleChange}
                />
              </div>
            <div className="flex-row space-between my-2">
              <input
                placeholder="Last Name"
                name="lastName"
                type="lastName"
                id="lastName"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <input
                placeholder="Password"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row flex-end">
              <CardButton>
                <button type="submit">
                  Create Account
                </button>
              </CardButton>
            </div>

            <div className="flex-row flex-end">
              <Link to="/login">
              I already have an account
              </Link>
            </div>
          </form>
        </CardBody>
    </div>
  );

}

export default Signup;
