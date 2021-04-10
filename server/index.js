const express = require("express");
const app=express();
const mysql=require("mysql");
 const cors= require('cors');
const port = 3001;

const {encrypt,decrypt}= require("./EncryptionHandler");

 app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root', 
    host:'localhost', 
    password:'password',
    database:'PasswordManager',
});

app.post("/addpassword", (req,res) =>{
   const {website,userName,password}=req.body;
    
   const hashedPassword= encrypt(password);

   db.query("INSERT INTO passwords (website,userName,password,iv) VALUES(?,?,?,?)",
   [website,userName,hashedPassword.password,hashedPassword.iv], (err,result) =>{
       if(err) console.log(err);
       else res.send("success");
   });
});


app.get('/showpasswords',(req,res) =>{

    db.query("SELECT * FROM passwords;",(err,result)=>{
        if(err)
        console.log(err);
        else
        res.send(result);
    })
})


app.post('/decryptpassword',(req,res) =>{
    res.send(decrypt(req.body))
})


app.listen(port, () =>{
    console.log("running");
});