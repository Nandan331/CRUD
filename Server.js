import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

mongoose.connect("mongodb://localhost:27017/fullstack")
    .then(() => console.log("Server connected"))
    .catch((err) => console.log("Some error", err));

const app = express()
app.use(cors({ origin: "http://localhost:3002" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String
});

const Users = mongoose.model('users', UserSchema);

// app.get('/login', cors(), (req, res) => {
//     // Implement login logic here
// });

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const check = await Users.findOne({ email:email });
        if (check) {
            if(check.password === password){
                res.json({message: "Signed in Successfull",check})
            }
            else{
                res.json({message: "Incorrect password"});
            }
        } else {
            res.json({message: "User not exist"});
        }
    } catch (e) {
        res.json("An error occurred");
    }
});

app.get('/', (req, res) => {
    res.send("Welcome to the Backend");
});

app.post('/sign_up', async (req, res) => {
    const data = new Users(req.body);
    try {
        await data.save();
        res.json("signed up successful"); 
    } catch (err) {
        console.error("Unable to SignUp error found", err);
        res.status(500).json("Unable to sign up");
    }
});

app.get('/show', async (req, res) => {
    try {
        const users = await Users.find({});
        res.json(users); // Send user data as JSON
    } catch (err) {
        res.status(500).json("Unable to get the users");
    }
});

app.get('/edit/:id', async (req, res) => {
    const user = await Users.findById(req.params.id);
    res.json(user);
});

app.post('/update/:id', async (req, res) => {
    try {
        await Users.findByIdAndUpdate(req.params.id, req.body);~
        res.json("Updated Successfully");
    } catch (err) {
        res.json("Unable to Update, found Error: " + err);
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id);
        res.json("User deleted Successfully");
    } catch (err) {
        res.json("Unable to delete the User: " + err);
    }
});

app.listen(4000, () => console.log("Server Started"));
