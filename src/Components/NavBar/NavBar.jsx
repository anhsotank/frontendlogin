
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../rudux/apiRequest";
const NavBar = () => {
  const user =useSelector((state)=> state.auth.login.currentUser)
  const userFB =useSelector((state)=> state.auth.loginFB?.currentUser)
  const currentUser = user || userFB; 
  const dispatch =useDispatch()
  const navigate =useNavigate()
 console.log(userFB)

const handlLogOut =()=>{
  console.log('currentUser')
        logOut(dispatch,navigate)
}
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {currentUser? (
        <>
        <p className="navbar-user">Hi,  <span> {currentUser?.username}  </span> </p>
        <div className="navbar-logout" onClick= {handlLogOut} > Log out</div>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
