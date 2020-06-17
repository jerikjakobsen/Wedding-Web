import React,{useState} from 'react';
import './Styles/login.css';
import axios from "axios"
axios.defaults.baseURL = "https://us-central1-jenawedding-ecede.cloudfunctions.net/api"

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword]=useState('')

  const authenticate = () => {
    axios.post("/login", {
      email: email,
      password: password
    })
    .then(data => {
      localStorage.setItem("Authorization","Bearer " + data.data.token)
      window.location.href = "/"
    })
    .catch(err=> {
      console.log(err)
    })
  }

  return (
    <div className="login">
      <input style={{marginTop: "20%"}}type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
      <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      <button onClick={authenticate}>Login</button>
    </div>
  );
}

export default Login;