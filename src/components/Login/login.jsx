import axois from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ decodeToken }) {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

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
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: ["com", "net"] })
        .required(),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9._-]+$/)
        .required(),
    });

    let joiResponse = schema.validate(user, { abortEarly: false });

    if (joiResponse.error) {
      console.log("In If Error");
      setErrorList(joiResponse.error.details);
      setFlag(false);
    } else {
      console.log("ELSE");
      let { data } = await axois.post(
        "http://route-egypt-api.herokuapp.com/signin",
        user
       
      );
      
      if (data.message == "incorrect password") {
        setMessage(data.message);
      } else {
        localStorage.setItem("tkn", data.token);
        decodeToken();
        navigate("/home");
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

          {errorList.map((err, idx) => (
            <div key={idx} className="alert alert-danger">
              {err.message}
            </div>
          ))}

          <label htmlFor="email">email</label>
          <input
            onChange={getUser}
            type="email"
            className="my-3 form-control"
            id="email"
            placeholder="email"
          />
          <label htmlFor="password">password</label>
          <input
            onChange={getUser}
            type="password"
            className="my-3 form-control"
            id="password"
            placeholder="password"
          />

          <button className="btn btn-outline-info">
            {flag ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
