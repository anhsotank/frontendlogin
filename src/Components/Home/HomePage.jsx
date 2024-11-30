import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { useNavigate } from "react-router-dom"; 
import {deleteUser, getAllUsers} from "../../rudux/apiRequest"
import { useEffect } from "react";

const HomePage = () => {

  const user =useSelector((state)=> state.auth.login?.currentUser)
  const listUsers =useSelector((state)=> state.users.users?.allUsers)

  console.log(user.accessToken)
  const dispatch= useDispatch()
  const navigate =useNavigate()
  // DUMMY DATA


  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user?.accessToken) {
      getAllUsers(user.accessToken, dispatch);
      
    }
  }, [user]);



  const handleDelete =(id)=>{
      console.log(id)
      deleteUser(user?.accessToken)
  }
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role : ${user?.isAdmin ? `Admin `:`User`}`}
      </div>
      <div className="home-userlist">
        {listUsers?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick= {()=>handleDelete(user._id) }>Delete</div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
