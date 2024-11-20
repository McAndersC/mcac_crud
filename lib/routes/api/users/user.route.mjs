import express from "express";
import { read, write } from "../../../handlers/file.handler.mjs";
import { getNewUID } from "../../../misc/helpers.mjs";
import * as mime from 'mime-types'
import multer from 'multer';
const userRoute = express.Router();


// Multer Setup for storage.
const userStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'public/users')
    },
    filename: function (req, file, cb) {
        
        let newFileName = getNewUID() + '.' + mime.extension(file.mimetype)
        let ext = mime.extension(file.mimetype)

        cb(null, newFileName);
    }
});

const upload = multer({ storage: userStorage });


// (C)reate POST  
userRoute.post('/api/user', upload.single('picture'), async (req, res) => {

    let users = await read("./lib/db/users.json");
    users = JSON.parse(users);

    console.log('FILE NAME', req.file)

    let newUser = {
        "id" : getNewUID(),
        "picture" : "/users/" + req.file.filename,
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
    let message = "Vi vil se data"
    console.log(req.body, req.query)

    let user = users.find( (user) => user.id === req.query.id )

    if(req.query.id)
    {
        if(!user) {
             message = "Vi kan ikke finde den pågældende bruger"
        }

    } else {
     
        message = "Du har ikke et id med i dit request"
    }

  
    // let user = users.find( (user) => user.name === req.query.name )

    res.setHeader('Content-Type', "application/json");

    res.json({"message" : message, "data" : user || []})



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