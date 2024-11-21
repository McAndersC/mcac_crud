import express from "express";
import { read, write } from "../../../handlers/file.handler.mjs";
import { getNewUID } from "../../../misc/helpers.mjs";
import * as mime from 'mime-types'
import multer from 'multer';
import { createUser, deleteUser, updateUser } from "../../../handlers/users/user.handler.mjs";
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

// (C)reate POST MONGO
userRoute.post('/api/user', upload.single('picture'), async (req, res) => {

    let newUser = {
        "id" : getNewUID(),
        ...req.body,
        "picture" : "/users/no-user.jpg",
    }

    if(req.file) {

        newUser.picture = req.file.filename;

    }

    const result = await createUser(newUser);

    if(result.status === 'ok') {

        return res.status(201).send(result);

    } else {

        return res.status(200).send(result);

    }
})


// (C)reate POST  
// userRoute.post('/api/user', upload.single('picture'), async (req, res) => {

//     let users = await read("./lib/db/users.json");
//     users = JSON.parse(users);

//     console.log('FILE NAME', req.file)
    

//     let newUser = {
//         "id" : getNewUID(),
//         ...req.body,
//         "picture" : "/users/no-user.jpg",
//     }

//     if(req.file) {

//         newUser.picture = req.file.filename;

//     }

//     users = [
//         newUser,
//         ...users
//     ]

//     let updateUsers = write("./lib/db/users.json", JSON.stringify(users))
 
//     res.setHeader('Content-Type', "application/json");
//     res.json({"message" : "Vi vil se data", "data" : updateUsers})

// })

// (R)ead GET  
userRoute.get('/api/user', async (req, res) => {

    let users = await read("./lib/db/users.json");
    users = JSON.parse(users);
    let message = "Vi vil se data"
  

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
userRoute.put('/api/user', upload.single('picture'), async (req, res) => {

  
    let newUser = {
        ...req.body
    }

    if(req.file) {

        newUser.picture = req.file.filename;

    }

    console.log('NEWuser', newUser)

    let result = await updateUser(newUser)

    if(result.status === 'ok') {

        return res.status(200).send(result);

    } else {

        return res.status(200).send(result);

    }

    // Read Users
    // let users = await read("./lib/db/users.json");
    // users = JSON.parse(users);
    // console.log('TEST', req.body, req.file)

    // let userIndex = users.findIndex( (user) => user.id === req.body.id )
    // let currentUser = users[userIndex];



    // if(req.file) {

    //     currentUser.picture = req.file.filename;

    // }


    // users[userIndex] = {
    //     ...req.body,
    //     ...currentUser,
    // }

    // let updateUsers = write("./lib/db/users.json", JSON.stringify(users))

    // res.setHeader('Content-Type', "application/json");
    // res.json({"message" : "Vi vil se data", "data" : []})

})

// (D)elete DELETE  
userRoute.delete('/api/user', upload.single('picture'), async (req, res) => {


    let result = await deleteUser(req.body.id);


    if(result.status === 'ok') {

        return res.status(200).send(result);

    } else {

        return res.status(200).send(result);

    }

    // // let userIdToDelete = req.body.id;
    // let userIdToDelete = req.query.id;

    // console.log('userIdToDelete', userIdToDelete)

    // // Read Users
    // let users = await read("./lib/db/users.json");
    // users = JSON.parse(users);

    // let userIndex = users.findIndex( (user) => user.id === userIdToDelete )
    // users.splice(userIndex, 1);

    // let updateUsers = write("./lib/db/users.json", JSON.stringify(users))

    // res.setHeader('Content-Type', "application/json");
    // res.json({"message" : "Vi vil se data", "data" : userIdToDelete})

})

// (D)elete DELETE  
userRoute.delete('/api/user/:id', upload.single('picture'), async (req, res) => {

    let userIdToDelete = req.params.id;
    
    console.log('userIdToDelete', userIdToDelete)

    // Read Users
    let users = await read("./lib/db/users.json");
    users = JSON.parse(users);

    let userIndex = users.findIndex( (user) => user.id === userIdToDelete )
    users.splice(userIndex, 1);

    let updateUsers = write("./lib/db/users.json", JSON.stringify(users))

    res.setHeader('Content-Type', "application/json");
    res.json({"message" : "Vi vil se data", "data" : userIdToDelete})


})



export default userRoute;