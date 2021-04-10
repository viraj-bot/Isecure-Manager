
import './App.css';
import {useState, useEffect} from "react";
import axios from'axios';

function App() {

  const [website,setWebsite] = useState('');
  const [userName,setuserName] = useState('');
  const [password,setPassword] = useState('');
  const [passwordList,setPasswordList] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3001/showpasswords').then((response) =>{
      setPasswordList(response.data);
    });
  },[])


  const decryptedPassword=(encryption) =>{
    axios.post("http://localhost:3001/decryptpassword", {password :encryption.password,iv:encryption.iv})
    .then((response)=>{
      setPasswordList(passwordList.map((val) =>{
        return val.id==encryption.id ? {id: val.id,password: val.password, website: response.data, iv: val.iv} : val;
      }))
    })
  }

  const addPassword=() =>{
    axios.post('http://localhost:3001/addpassword',
    { website: website,
      userName: userName,
      password: password
    });
  };



  return (
    <div className="App">
      <div className ="add-password">
        <p className="para">Website</p>
        <input type="text" placeholder="ex./facebook"
         onChange = {(event) =>{setWebsite(event.target.value);}}></input>
        <p className="para">UserName</p>
        <input type="text" placeholder="ex./xyz@gmail.com"
        onChange = {(event) =>{setuserName(event.target.value);}}></input>
        <p className="para">Password</p>
        <input type="text" placeholder="ex./78jhf@hk9"
        onChange = {(event) =>{setPassword(event.target.value);}}></input>
        <button onClick={addPassword}>Add-User</button>
      </div>
      <div className="password">
        {
           passwordList.map((val,key) =>
           {return <div className="pswd" 
           onClick={()=>{decryptedPassword({password: val.password,iv: val.iv,id: val.id})}}
           key={key}
           ><h2>{val.website}</h2></div>})
        }
      </div>
    </div>
  );
}

export default App;
