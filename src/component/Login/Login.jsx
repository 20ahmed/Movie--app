import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { Helmet } from "react-helmet";

export default function Login({ getUserData }) {
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function validateInputs() {
    const schema = Joi.object({
      email: Joi.string().email({
        tlds: { allow: ["com", "net"] },
      }),

      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(user, { abortEarly: false });
  }

  function getUserRegisterData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function callingApi() {
    let { data } = await axios.post(
      "https://sticky-note-fe.vercel.app/signin",
      user
    );
    console.log(data.message);
    if (data.message === "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      getUserData();
      navigate("/UserProfile");
    } else {
      setError(data.message);
      console.log(data);
      setIsLoading(false);
    }
  }

  function submitForm(e) {
    setIsLoading(true);

    e.preventDefault();
    const valideCheck = validateInputs();
    console.log(errorList);
    if (valideCheck.error) {
      setErrorList(valideCheck.error.details);

      console.log(valideCheck.error);
      setIsLoading(false);
    } else {
      callingApi();
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Log In</title>
      </Helmet>
      <div className="container">
        <section className="vh-100">
          <div className="container h-75">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black">
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Login
                        </p>
                        {error !== "" ? (
                          <p className=" h6 alert alert-info fw-bold mb-5 mx-1 mx-md-4 mt-4">
                            {error} !
                          </p>
                        ) : (
                          ""
                        )}
                        <form onSubmit={submitForm} className="mx-1 mx-md-4">
                          {/* ---------- Email---------------- */}

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="Email"
                                className="form-control"
                                name="email"
                                onChange={getUserRegisterData}
                              />
                              <label className="form-label" htmlFor="Email">
                                Your Email
                              </label>
                            </div>
                          </div>
                          {errorList.length > 0 ? (
                            <p className="alert alert-danger">
                              {
                                errorList.filter(
                                  (err) => err.context.label === "email"
                                )[0]?.message
                              }
                            </p>
                          ) : (
                            ""
                          )}
                          {/* ---------- Email---------------- */}

                          {/* ---------- Pass---------------- */}

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="password"
                                className="form-control"
                                name="password"
                                onChange={getUserRegisterData}
                              />
                              <label className="form-label" htmlFor="password">
                                Password
                              </label>
                            </div>
                          </div>
                          {errorList.length > 0 ? (
                            <p className="alert alert-danger">
                              {
                                errorList.filter(
                                  (err) => err.context.label === "password"
                                )[0]?.message
                              }
                            </p>
                          ) : (
                            ""
                          )}
                          {/* ---------- Pass---------------- */}

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                            >
                              {isLoading === true ? (
                                <i
                                  className="fas fa-spin fa-spinner me-2 text-center"
                                  aria-hidden="true"
                                ></i>
                              ) : (
                                "Login"
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
