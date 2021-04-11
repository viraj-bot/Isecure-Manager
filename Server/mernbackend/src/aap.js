const express = require('express');
const path = require('path');
const app = express();
require("./db/conn");

const Register = require("./models/registers.js");
const passwordScehma = require('./models/passschema.js');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on port no ${port}`);
});

const static_path = path.join(__dirname, "../public");
console.log(path.join(__dirname, "../public"));
app.use(express.static(static_path));

app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/register", async (req, res) => {
    try {
        const username = req.body.username;
        console.log(req.body.username);
        console.log(req.body.password);
        // res.send(req.body.username);
        const newUser = new Register({
            username: req.body.signupusername,
            email: req.body.email,
            password: req.body.signuppassword
        })
        const newreg = await newUser.save();
        // res.status(201).send("Registered sucessfully");
        res.status(201).render("addpasswd");
        console.log("Registered sucessfull");

        app.post("/addpass", async (req, res) => {
            console.log("recieved");
            try {
                console.log(req.body.password);
                // var cursor = await passwordScehma.find({ username: username, websites: { $elemMatch: req.body.website } }).toArray(async function (err, docs1) {
                //     if (err) {
                //         console.log(err);

                //     }
                //     else {
                //         callback(null, docs1);
                //     }
                // });
                // console.log(cursor);
                // passwordScehma.update({passwords.$,req.body.password},{})
                // const query = { "name": "Popeye" };
                // const updateDocument = {
                //     $push: { "passwords.$[].req.body.": "fresh mozzarella" }
                // };
                // const result = await pizza.updateOne(query, updateDocument);
                await passwordScehma.findOneAndUpdate({
                    username: username
                }, {
                    $addToSet: {
                        websites: req.body.website,
                        passwords: req.body.password
                    }
                });
                res.send("Data inserted Sucessfully");
                passwordScehma.find({ usernem: username }, function (err, users) {
                    if (err) console.log(err);
                    var vari = users;
                    console.log(users);
                })



                // var newreg = new passwordScehma({
                //     username: username,
                //     websites: req.body.website,
                //     passwords: req.body.password
                // });
                // console.log(req.body.website + " tes3");
                // const done = await newreg.save(function (err, dat) {
                //     if (err) {
                //         console.log(req.body.website + "tes1");
                //         console.log(err);
                //         console.log(req.body.website + "tes2");
                //     }
                //     else {
                //     }
                // });
            }
            catch (error) {
                console.log(error);
                res.send("Couldn't add data in database");
                // var query2 = { username: username };
                // var newreg = new passwordScehma({
                //     username: username,
                //     website: req.body.website,
                //     password: req.body.password
                // });
                // const nepass = await newreg.save();
            }
        });
        app.post("/showpass", async (req, res) => {
            console.log("show passwords");
            passwordScehma.find({ username: username }, { "passwords": 1, "websites": 1 }, function (err, users) {
                if (err) console.log(err);
                console.log(users);
                var vari = JSON.stringify(users);
                console.log(vari);
                res.send(vari);
            });
        });
    }
    catch (error) {
        console.log(error);
        var query2 = { username: username };
        var newreg = new passwordScehma({
            username: username,
            website: req.body.website,
            password: req.body.password
        });
        const nepass = await newreg.save();
    }
});


app.post("/login", async (req, res) => {
    try {
        const username = req.body.signinusername;
        const passwd = req.body.signinpassword;
        const check1 = await Register.findOne({ username: username });
        const check2 = await Register.findOne({ email: username });

        if (check1.password === passwd || check2.password === passwd) {
            // res.status(201).send("Login sucessfull");    
            res.status(201).render("addpasswd");
            console.log("Login sucessfull");


            app.post("/addpass", async (req, res) => {
                console.log("recieved");
                try {
                    console.log(req.body.password);
                    // var cursor = await passwordScehma.find({ username: username, websites: { $elemMatch: req.body.website } }).toArray(async function (err, docs1) {
                    //     if (err) {
                    //         console.log(err);

                    //     }
                    //     else {
                    //         callback(null, docs1);
                    //     }
                    // });
                    // console.log(cursor);
                    // passwordScehma.update({passwords.$,req.body.password},{})
                    // const query = { "name": "Popeye" };
                    // const updateDocument = {
                    //     $push: { "passwords.$[].req.body.": "fresh mozzarella" }
                    // };
                    // const result = await pizza.updateOne(query, updateDocument);
                    await passwordScehma.findOneAndUpdate({
                        username: username
                    }, {
                        $addToSet: {
                            websites: req.body.website,
                            passwords: req.body.password
                        }
                    });
                    res.send("Data inserted Sucessfully");
                    passwordScehma.find({ usernem: username }, function (err, users) {
                        if (err) console.log(err);
                        var vari = users;
                        console.log(users);
                    })



                    // var newreg = new passwordScehma({
                    //     username: username,
                    //     websites: req.body.website,
                    //     passwords: req.body.password
                    // });
                    // console.log(req.body.website + " tes3");
                    // const done = await newreg.save(function (err, dat) {
                    //     if (err) {
                    //         console.log(req.body.website + "tes1");
                    //         console.log(err);
                    //         console.log(req.body.website + "tes2");
                    //     }
                    //     else {
                    //     }
                    // });
                }
                catch (error) {
                    console.log(error);
                    res.send("Couldn't add data in database");
                    // var query2 = { username: username };
                    // var newreg = new passwordScehma({
                    //     username: username,
                    //     website: req.body.website,
                    //     password: req.body.password
                    // });
                    // const nepass = await newreg.save();
                }
            });
            app.post("/showpass", async (req, res) => {
                console.log("show passwords");
                passwordScehma.find({ username: username }, { "passwords": 1, "websites": 1 }, function (err, users) {
                    if (err) console.log(err);
                    console.log(users);
                    var vari = JSON.stringify(users);
                    console.log(vari);
                    res.send(vari);
                });
            });
        }
        else {
            res.send("Username or password is incorrect");
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Username or Password is incorrect");
    }
})

