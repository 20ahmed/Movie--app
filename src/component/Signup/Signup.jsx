import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { Helmet } from "react-helmet";

export default function Signup() {
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: " ",
    email: "",
    password: "",
    age: 0,
  });

  const navigate = useNavigate();

  function validateInputs() {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(6).required(),
      email: Joi.string().email({
        tlds: { allow: ["com", "net"] },
      }),

      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      age: Joi.number().min(18).max(100).required(),
    });
    return schema.validate(user, { abortEarly: false });
  }

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    // console.log(myUser);
  }

  async function callingApi() {
    let { data } = await axios.post(
      "https://sticky-note-fe.vercel.app/signup",
      user
    );
    console.log(data.message);
    if (data.message === "success") {
      setIsLoading(false);
      navigate("./Login");
    } else {
      setError(data.message);
      console.log(data);
      setIsLoading(false);
    }
  }

  function submitForm(e) {
    e.preventDefault();

    setIsLoading(true);

    const valideCheck = validateInputs();
    if (valideCheck.error) {
      setErrorList(valideCheck.error.details);

      setIsLoading(false);
    } else {
      callingApi();
    }
  }
  // function ValidateApiResponse({ data }) {
  //   if (data.message === "success") {
  //     navigate("./Login");
  //   }
  // }

  // ValidateApiResponse();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign Up</title>
      </Helmet>
      <div>
        <div>
          <section className=" sign-up w-75 m-auto">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center m-auto h-100">
                <div className="col-lg-12 col-xl-11">
                  <div className="card text-black">
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center ">
                        <div className=" col-md-10 col-lg-6 col-xl-12 order-2 order-lg-1">
                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                            Sign up
                          </p>
                          {error !== "" ? (
                            <p className=" h6 alert alert-info fw-bold mb-5 mx-1 mx-md-4 mt-4">
                              {error} !
                            </p>
                          ) : (
                            ""
                          )}

                          <form onSubmit={submitForm} className="mx-1 mx-md-4">
                            {/*-------------- first  Name---------------- */}
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  onChange={getUserData}
                                  type="text"
                                  id="firstName"
                                  className="form-control"
                                  name="first_name"
                                />

                                <label
                                  className="form-label"
                                  htmlFor="firstName"
                                >
                                  First Name
                                </label>
                              </div>
                            </div>
                            {errorList.length > 0 ? (
                              <p className="alert alert-danger">
                                {
                                  errorList.filter(
                                    (err) => err.context.label === "first_name"
                                  )[0]?.message
                                }
                              </p>
                            ) : (
                              ""
                            )}

                            {/* first  Name ------------------------- */}

                            {/* Last  Name ------------------------- */}

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="lastName"
                                  className="form-control"
                                  name="last_name"
                                  onChange={getUserData}
                                />

                                <label
                                  className="form-label"
                                  htmlFor="lastName"
                                >
                                  Last Name
                                </label>
                              </div>
                            </div>

                            {errorList.length > 0 ? (
                              <p className="alert alert-danger">
                                {
                                  errorList.filter(
                                    (err) => err.context.label === "last_name"
                                  )[0]?.message
                                }
                              </p>
                            ) : (
                              ""
                            )}

                            {/* Last  Name ------------------------- */}

                            {/* ---------- Email---------------- */}
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="email"
                                  id="Email"
                                  className="form-control"
                                  name="email"
                                  onChange={getUserData}
                                />

                                <label className="form-label" htmlFor="Email">
                                  Your Email
                                </label>
                              </div>
                            </div>
                            <h3>{}</h3>
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
                                  onChange={getUserData}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="password"
                                >
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
                            {/* ---------- age---------------- */}

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <input
                                  type="number"
                                  id="age"
                                  className="form-control"
                                  name="age"
                                  onChange={getUserData}
                                />
                                <label className="form-label" htmlFor="age">
                                  Age
                                </label>
                              </div>
                            </div>
                            {errorList.length > 0 ? (
                              <p className="alert alert-danger">
                                {
                                  errorList.filter(
                                    (err) => err.context.label === "age"
                                  )[0]?.message
                                }
                              </p>
                            ) : (
                              ""
                            )}
                            {/* ---------- age---------------- */}
                            {/*  <div className="form-check d-flex justify-content-center mb-5">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="form2Example3c"
                            />
                            <label
                              className="form-check-label"
                              for="form2Example3"
                            >
                              I agree all statements in{" "}
                              <a href="#!">Terms of service</a>
                            </label>
                          </div>
 */}

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
                                  "Register"
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
      </div>
    </>
  );
}
