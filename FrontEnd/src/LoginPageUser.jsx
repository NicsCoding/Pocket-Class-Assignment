import { Link, Form, useActionData, redirect } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
export const onClickHandler = (type, setClick_val) => {
  setClick_val(type);
};
const Login_Page = () => {
  const [login, setLogin] = useState(true);
  const [clicked_Val, setClick_val] = useState("password");
  return (
    <div>
      <div className="login-sign-up-page" style={{ paddingTop: "100px" }}>
        <div className="setup-sign-up">
          <Form method="POST" action="/login-page">
            <center>
              <h1 className="center-title-heading">
                {login
                  ? "Sign in And Book"
                  : "Create account First then you can Book"}
              </h1>
            </center>
            <div className="main-login-email-password">
              <div className="login-email">
                <input
                  type="text"
                  name="email"
                  className="login-input"
                  placeholder="Email eg-(iamemail@gmail.com)"
                />
              </div>
              <div className="login-password">
                <div className="input-container">
                  <input
                    type={`${clicked_Val}`}
                    name="password"
                    className="login-input"
                    autoComplete="username new-password"
                    placeholder="Enter Your password (Min-Len:6)"
                  />
                </div>
                {clicked_Val === "password" ? (
                  <span
                    className="toggle_password_eye toggle_password"
                    onClick={() => onClickHandler("text", setClick_val)}
                  >
                    <FaEye color="black" size="25px" />
                  </span>
                ) : (
                  <span
                    className="toggle_password_eye_closed toggle_password"
                    onClick={() => onClickHandler("password", setClick_val)}
                  >
                    <IoEyeOffSharp color="black" size="25px" />
                  </span>
                )}
              </div>
            </div>
            <div className="guideLines each-style">
              <p>
                By signing Up, you agree to our{" "}
                <u style={{ color: "red", cursor: "pointer" }}>Terms Of Use</u>{" "}
                and{" "}
                <u style={{ color: "red", cursor: "pointer" }}>
                  Privacy Policy
                </u>{" "}
              </p>
            </div>
            <div className="submit-button each-style">
              <button type="submit" className="submit-button-style">
                Login Using Email
              </button>
            </div>
            <div className="cond-have-acc each-style">
              <center>
                <p>
                  {login ? "Don't have an account" : "Already Have an Account:"}
                  <button onClick={() => setLogin(!login)}>
                    <u style={{ color: "red" }}>
                      {login ? "login" : "Sign-Up"}
                    </u>
                  </button>
                </p>
              </center>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login_Page;
export const createLoginData = async (data) => {
  try {
    const FormData = await data.request.formData();
    const value = Object.fromEntries(FormData.entries());
    console.log(value);
    const res = await axios.post(
      "http://localhost:1729/instructor/creatingUser",
      value
    );
    localStorage.setItem("loginToken", res.data.user); // For token
    return redirect("/");
  } catch (err) {
    if (err.response.data.message) {
      alert(`${err.response.data.message}`);
      return {
        error:
          err.response?.data?.message || "Login-up failed. Please try again.",
      };
    }
  }
  return redirect("/login-page");
};
