import { useEffect } from "react";
import AllRoute from "./AllRoute";
import Signup from "./pages/Signup";
import { useNavigate } from "react-router-dom";

function App() {
  const SignupForm = localStorage.getItem('SignupForm')
  const login_user=localStorage.getItem('login_user')
  const navigate = useNavigate()
  useEffect(()=>{
    if(SignupForm=="true"){
      if(login_user){
        navigate('/home')
      }
      else{
        navigate('/login')
      }
    }
    else{
      navigate('/')
    }
  },[SignupForm])
  return (

    <div>
      {SignupForm == "true" ? <AllRoute /> : <Signup />}

    </div>
  );
}

export default App;
