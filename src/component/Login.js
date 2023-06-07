import { useState, useRef, useContext } from "react";
// import { useHistory } from "react-router-dom";
import classes from "./Login.module.css";
import AuthContext from "./store/auth-context";

const Login = () => {
//   const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();


  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const emailEntered = emailInputRef.current.value;
    const passwordEntered = passwordInputRef.current.value;
    const confermPasswordEntered= confirmPasswordInputRef.current.value;
    const emailRegEx = emailEntered.replace(/[^a-zA-Z0-9 ]/g, "");
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key =AIzaSyCA46gocHDViaISYg1lCBrbs8uhf59zHk4";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCA46gocHDViaISYg1lCBrbs8uhf59zHk4";
    }
    sendData(url, emailEntered, passwordEntered,confermPasswordEntered)
      .then((result) => {
        console.log("result", result);
        authCtx.login(result.idToken);
        localStorage.setItem("email", emailRegEx);
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        confirmPasswordInputRef.current.value="";
        console.log("User successfully signed up");
        // history.replace("/store");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendData = async (url, email, password,confermpassword) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        confermpassword:confermpassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    let errorMessage = "Authentication Faild !!";
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
      alert(errorMessage);
    }
    throw new Error(errorMessage);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email" style={{ marginLeft: "-18rem" }}>
            Your Email
          </label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="password" style={{ marginLeft: "-16rem" }}>
            Your Password
          </label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>

        {!isLogin&&(<div className={classes.control}>
          <label htmlFor="password" style={{ marginLeft: "-16rem" }}>
            confirm Password
          </label>
          <input
            type="password"
            id="password"
            required
            ref={confirmPasswordInputRef}
          />
        </div>)}

        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Sign up"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Have an account ? Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
