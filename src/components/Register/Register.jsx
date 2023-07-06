import axios from "axios";
import Joi from "joi";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [errorListResgister, setErrorListResgister] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  useEffect(() => {
    // console.log(user);
  }, [user]);

  //function to change userData after enter any input
  let getUser = (e) => {
    console.log("change : ", e);
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };
  // submit function
  let submitRegister = async (e) => {
    e.preventDefault();
    setLoad(true);
    let validationResult = validationRegister(user);
    //console.log(validationResult.error.details);
    if (validationResult.error) {
      setLoad(false);
      setErrorListResgister(validationResult.error.details);
    } else {
      try {
        setErrorListResgister([]);
        let { data } = await axios.post(
          `https://route-egypt-api.herokuapp.com/signup`,
          user
        );
        //console.log(data);
        setLoad(false);
        if (data.message === "success") {
          //Navigate to login
          navigate("/Login");
        } else {
          console.log("error respon" + data.message);
          setError(data.message);
        }
      } catch {
        console.error(e);
      }
    }
  };

  let blurInput = (x) => {
    let validationResult = validationRegister(user);
    console.log(validationResult);
    console.log("x : ", x);
  };

  //validation Register function
  let validationRegister = (x) => {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(4).max(10).required(),
      last_name: Joi.string().alphanum().min(4).max(10).required(),
      age: Joi.number().min(18).max(80).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/
      ), //(?=.*?[0-9])(?=.*?[#?!@$%^&*-])
    });

    return schema.validate(x, { abortEarly: false });
  };

  return (
    <>
      <h2 className="text-center my-4">Register Now</h2>
      {error ? <div className="alert alert-danger">{error}</div> : ""}

      <form className="m-auto vh-100" onSubmit={submitRegister}>
        <label htmlFor="first_name" className="mt-4 mb-2">
          {" "}
          FristName:
        </label>
        <input
          onChange={getUser}
          onBlur={blurInput}
          type="text"
          className="form-control  my-1"
          name="first_name"
          id="first_name"
        />
        {errorListResgister.map((error, index) => {
          if (error.message.includes("first_name")) {
            console.log("errorListResgisters : ", errorListResgister);
            return (
              <div key={index} className="alert-danger p-2 my-2 rounded-2">
                {error.message}
              </div>
            );
          } else {
            return "";
          }
        })}

        <label htmlFor="last_name" className="mt-2 mb-1">
          {" "}
          lastName:
        </label>
        <input
          onChange={getUser}
          type="text"
          className="form-control  my-1"
          name="last_name"
          id="last_name"
        />
        {errorListResgister.map((error, index) => {
          if (error.message.includes("last_name")) {
            return (
              <div key={index} className="alert-danger p-2 my-2 rounded-2">
                {error.message}
              </div>
            );
          } else {
            return "";
          }
        })}

        <label htmlFor="age" className="mt-2 mb-1">
          {" "}
          age:
        </label>
        <input
          onChange={getUser}
          type="number"
          className="form-control  my-1"
          name="age"
          id="age"
        />
        {errorListResgister.map((error, index) => {
          if (error.message.includes("age")) {
            return (
              <div key={index} className="alert-danger p-2 my-2 rounded-2">
                {error.message}
              </div>
            );
          } else {
            return "";
          }
        })}

        <label htmlFor="email" className="mt-2 mb-1">
          {" "}
          your_email:
        </label>
        <input
          onChange={getUser}
          type="email"
          className="form-control  my-1"
          name="email"
          id="email"
        />
        {errorListResgister.map((error, index) => {
          if (error.message.includes("email")) {
            return (
              <div key={index} className="alert-danger p-2 my-2 rounded-2">
                {error.message}
              </div>
            );
          } else {
            return "";
          }
        })}
        <label htmlFor="password" className="mt-2 mb-1">
          {" "}
          password:
        </label>
        <input
          onChange={getUser}
          type="password"
          className="form-control  my-1"
          name="password"
          id="password"
        />
        {errorListResgister.map((error, index) => {
          if (error.message.includes("password")) {
            return (
              <div key={index} className="alert-danger p-2 my-2 rounded-2">
                * 1 uppercase letter.
                <br />* 1 lowercase letter.
                <br />* 1 special character.
                <br />* 1 number.
                <br />* min 5 characters.
              </div>
            );
          } else {
            return "";
          }
        })}

        <button type="supmit" className="btn btn-outline-info my-4">
          {load ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
        </button>
      </form>
    </>
  );
}
