import {  useDispatch, useSelector } from "react-redux";
import "./home.css";
import { useNavigate } from "react-router-dom"; 
import {deleteUser, getAllUsers} from "../../rudux/apiRequest"
import { useEffect } from "react";

const HomePage = () => {

  const user =useSelector((state)=> state.auth.login?.currentUser)
  const userFB =useSelector((state)=> state.auth.loginFB?.currentUser)
  const msg =useSelector((state)=> state.users?.msg)
  const listUsers =useSelector((state)=> state.users.users?.allUsers)

  console.log(user?.accessToken)
  const dispatch= useDispatch()
  const navigate =useNavigate()
  // DUMMY DATA
  const currentUser = user || userFB;
  useEffect(() => {
     // Ưu tiên sử dụng `user`, nếu không thì dùng `userFB`
  
    if (!currentUser) {
      navigate("/login");
    } else if (currentUser?.accessToken) {
      getAllUsers(currentUser?.accessToken, dispatch);
    }
  }, [user, userFB]);



  const handleDelete =(id)=>{
      console.log(id)
      deleteUser(currentUser?.accessToken,dispatch,id)
  }
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role : ${user?.isAdmin ? `Admin `:`User`}`}
      </div>
      <div className="home-userlist">
        {listUsers?.map((user,index) => {
          return (
            <div className="user-container" key={index}>
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick= {()=>handleDelete(user._id) }>Delete</div>
            </div>
          );
        })}
      </div>
      {msg}
    </main>
  );
};

export default HomePage;
