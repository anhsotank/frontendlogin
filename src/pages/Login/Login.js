import { useState } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, loginFacebook } from "../../rudux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let msg = useSelector((state) => state.auth?.login?.msg);

  const handlelogin = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!username || !password) {
      toast.error("Username and password are required.");

      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");

      return;
    }

    const newUser = {
      username: username,
      password: password,
    };

    loginUser(newUser, dispatch, navigate);
  };

  const handleSuccess = async (response) => {
    const newUser = {
      username: response.name,
      FBid: response.id,
    };

    loginFacebook(newUser, dispatch, navigate);
  };

  return (
    <div className={cx("wrapper-login")}>
      <section className={cx("login-container")}>
        <div className={cx("login-title")}>Sign in</div>
        <form className={cx("form-login")} onSubmit={handlelogin}>
          <label className={cx("label-login")}>USERNAME</label>
          <input
            className={cx("input-login")}
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className={cx("label-login")}>PASSWORD</label>
          <input
            className={cx("input-login")}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={cx("button-login")} type="submit">
            Login
          </button>
        </form>
        {/* <FacebookLogin
          appId="610859561366768"
          onSuccess={(response) => {
            console.log("Login Success!", response);
          }}
          onFail={(error) => {
            console.log("Login Failed!", error);
          }}
          onProfileSuccess={handleSuccess}
        /> */}
        <div className={cx("login-register")}>Don't have an account yet?</div>
        <Link className={cx("login-register-link")} to="/register">
          Register one for free
        </Link>

        {/* {msg && (
          <div className={cx("alert")}>
            <span className={cx("alert-icon")}>⚠️</span>
            <span>{msg}</span>
           
          </div>
        )} */}
      </section>
    </div>
  );
}

export default Login;
