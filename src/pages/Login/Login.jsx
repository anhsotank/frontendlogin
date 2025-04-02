import { useState } from "react";
import FacebookLogin from '@greatsumini/react-facebook-login';
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, loginFacebook } from "../../rudux/apiRequest";
import { useDispatch ,useSelector} from "react-redux";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let msg =useSelector((state)=> state.auth?.login?.msg)
    

    const handlelogin = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
       

        // Clear error and proceed
        setError('');
        
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
        <div className="wrapper-login">

    <section className="login-container">
            <div className="login-title">Log in</div>
            <form className="form-login" onSubmit={handlelogin}>
                <label className="label-login">USERNAME</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className="label-login">PASSWORD</label>
                <input
                    className="input-login"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <button className="button-login" type="submit">login</button>
            </form>
            <FacebookLogin
                appId="610859561366768"
                onSuccess={(response) => {
                    console.log('Login Success!', response);
                }}
                onFail={(error) => {
                    console.log('Login Failed!', error);
                }}
                onProfileSuccess={handleSuccess}
            />
            <div className="login-register">Don't have an account yet?</div>
            <Link className="login-register-link" to="/register">Register one for free</Link>
            
            {msg&&(<div class="alert">
            <span class="alert-icon">⚠️</span>
            <span>{msg}</span>
            
            </div>)}
        </section>
        </div>
        
    );
};

export default Login;
