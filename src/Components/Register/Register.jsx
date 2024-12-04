import { useState } from "react";
import "./register.css";
import { registerUser } from "../../rudux/apiRequest";
import{useDispatch} from "react-redux"
import { useNavigate} from "react-router-dom";
import FacebookLogin from '@greatsumini/react-facebook-login';




const Register = () => {
    const [email,setEmail]= useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister =(e)=>{
        e.preventDefault()

            const newUser ={
                email: email,
                password: password,
                username: username

            }
            registerUser(newUser, dispatch ,navigate)
    }

    // const handleSuccess = async (response) => {
    //     console.log("Facebook Login Success:", response);
    //     try {
    //       const res = await fetch("http://localhost:8300/v1/auth/facebook", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ accessToken: response.accessToken }),
    //       });
    //       const data = await res.json();
    //       console.log("Server Response:", data);
    //     } catch (err) {
    //       console.error("Error sending token to server:", err);
    //     }
    //   };

    return ( 
        <section className="register-container">
              <div className="register-title"> Sign up </div>
            <form onSubmit={handleRegister}>
                <label>EMAIL</label>
                <input type="text" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} />
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)} />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit"> Create account </button>
            </form>
            <FacebookLogin
            appId="610859561366768"
            onSuccess={(response) => {
                console.log('Login Success!', response);
            }}
            onFail={(error) => {
                console.log('Login Failed!', error);
            }}
            onProfileSuccess={(response) => {
                console.log('Get Profile Success!', response);
            }}
            />
        </section>
        
     );
}
 
export default Register;