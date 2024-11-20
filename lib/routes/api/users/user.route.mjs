import express from "express";
import { read, write } from "../../../handlers/file.handler.mjs";
import { getNewUID } from "../../../misc/helpers.mjs";

const userRoute = express.Router();

// (C)reate POST  
userRoute.post('/api/user', async (req, res) => {

    let users = await read("./lib/db/users.json");
    users = JSON.parse(users);

    let newUser = {
        "id" : getNewUID(),
        ...req.body,
    }

    users = [
        newUser,
        ...users
    ]

    let updateUsers = write("./lib/db/users.json", JSON.stringify(users))
 
    res.setHeader('Content-Type', "application/json");
    res.json({"message" : "Vi vil se data", "data" : updateUsers})

})

// (R)ead GET  
userRoute.get('/api/user', async (req, res) => {

    let users = await read("./lib/db/users.json");
    users = JSON.parse(users);

    console.log(req.body, req.query)
    let user = users.find( (user) => user.id === req.query.id )
    // let user = users.find( (user) => user.name === req.query.name )

    
    res.setHeader('Content-Type', "application/json");
    res.json({"message" : "Vi vil se data", "data" : user})


})

// (U)pdate PUT  
userRoute.put('/api/user', async (req, res) => {

    // Read Users
    let users = await read("./lib/db/users.json");
    users = JSON.parse(users);

    let userIndex = users.findIndex( (user) => user.id === req.body.id )
    let currentUser = users[userIndex];


    users[userIndex] = {
        ...currentUser,
        ...req.body
    }

    let updateUsers = write("./lib/db/users.json", JSON.stringify(users))

    res.setHeader('Content-Type', "application/json");
    res.json({"message" : "Vi vil se data", "data" : []})

})

// (D)elete DELETE  
userRoute.delete('/api/user', async (req, res) => {


    // Read Users
    let users = await read("./lib/db/users.json");
    users = JSON.parse(users);

    let userIndex = users.findIndex( (user) => user.id === req.body.id )

    console.log("Before", users)

    users.splice(userIndex, 1);

    let updateUsers = write("./lib/db/users.json", JSON.stringify(users))

    res.setHeader('Content-Type', "application/json");
    res.json({"message" : "Vi vil se data", "data" : []})

})



export default userRoute;