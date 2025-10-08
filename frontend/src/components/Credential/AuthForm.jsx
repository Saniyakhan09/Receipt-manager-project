import { useState } from "react";
import Page from "../pages/Page";
import { useNavigate } from "react-router-dom"; 
function AuthForm() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); 
  const [message, setMessage] = useState("");
const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", 
      });

      const data = await res.json();
      setMessage(data.message);
      console.log("Register Response:", data);

      if(res.ok){
        localStorage.setItem("username", username);
        navigate("/page")
      }

    } catch (err) {
      console.error(err);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", 
      });

      const data = await res.json();
      setMessage(data.message);
      console.log("Login Response:", data);
      
      if(res.ok){
        localStorage.setItem("username", username);
        localStorage.setItem("userId", data.userId);
         localStorage.setItem("token", data.token);
         console.log("Login successful");
        navigate("/page")
      }
    } 
    catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form">
      <div className="form1">
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <h3 style={{color:"white"}}>Username</h3>
        <input
          type="text"
          placeholder="Type your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <h3 style={{color:"white"}}>Password</h3>

        <input
          type="password"
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="button" type="submit" >
          {isLogin ? "Login" : "Sign up"}
        </button>
        
      </form>

      <p className="message">{message}</p>

       <button className="switch button"  onClick={() => setIsLogin(!isLogin)}>
{isLogin ?"  Don't have an account? " :" Already have a account? "}
  
  <span className="link-text">{isLogin ? "Sign up" : "Login"}</span>
  
</button>

      </div>
    
    </div>
  );
}

export default AuthForm;