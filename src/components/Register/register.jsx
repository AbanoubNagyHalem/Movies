import axois from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  const [errorList, setErrorList] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  function getCurrentErr(key) {
    for (const err of errorList) {
      if (err.context.key == key) {
        return err.message;
      }
    }
    return "";
  }

  function getUser(e) {
    setErrorList([]);

    let inputValue = e.target.value;
    let newUser = { ...user };
    newUser[`${e.target.id}`] = inputValue;
    console.log(newUser);
    setUser(newUser);
  }

  async function submitForm(e) {
    e.preventDefault();
    setFlag(true);

    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      age: Joi.number().min(18).max(60).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: ["com", "net"] })
        .required(),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9._-]+$/)
        .required(),
    });

    let joiResponse = schema.validate(user, { abortEarly: false });

    if (joiResponse.error) {
      setErrorList(joiResponse.error.details);
      setFlag(false);
    } else {
      let { data } = await axois.post(
        "http://route-egypt-api.herokuapp.com/signup",
        user
      );
      if (data.errors) {
        setMessage(data.message);
      } else {
        navigate("/login");
      }
    }
  }

  return (
    <>
      <div className="w-75 mx-auto">
        <form onSubmit={submitForm}>
          {message.length == 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{message}</div>
          )}

          {/* {errorList.map((err, idx) => (
            <div key={idx} className="alert alert-danger">
              {err.message}
            </div>
          ))} */}

          <label htmlFor="first_name">first_name</label>
          <input
            onChange={getUser}
            type="text"
            className="my-3 form-control"
            id="first_name"
            placeholder="first_name"
          />
          {getCurrentErr("first_name").length == 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">
              {getCurrentErr("first_name")}
            </div>
          )}
          <label htmlFor="last_name">last_name</label>
          <input
            onChange={getUser}
            type="text"
            className="my-3 form-control"
            id="last_name"
            placeholder="last_name"
          />
          {getCurrentErr("last_name").length == 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">
              {getCurrentErr("last_name")}
            </div>
          )}
          <label htmlFor="age">age</label>
          <input
            onChange={getUser}
            type="number"
            className="my-3 form-control"
            id="age"
            placeholder="age"
          />
          {getCurrentErr("age").length == 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{getCurrentErr("age")}</div>
          )}
          <label htmlFor="email">email</label>
          <input
            onChange={getUser}
            type="email"
            className="my-3 form-control"
            id="email"
            placeholder="email"
          />
          {getCurrentErr("email").length == 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">{getCurrentErr("email")}</div>
          )}
          <label htmlFor="password">password</label>
          <input
            onChange={getUser}
            type="password"
            className="my-3 form-control"
            id="password"
            placeholder="password"
          />
          {getCurrentErr("password").length == 0 ? (
            ""
          ) : (
            <div className="alert alert-danger">
              {getCurrentErr("password")}
            </div>
          )}
          <button className="btn btn-outline-info">
            {flag ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
