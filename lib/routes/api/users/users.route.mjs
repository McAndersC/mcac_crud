import express from "express";
import { read } from "../../../handlers/file.handler.mjs";
import { getUsers } from "../../../handlers/users/users.handler.mjs";

const usersRoutes = express.Router();

// (R)ead GET  
usersRoutes.get('/api/users', async (req, res) => {

    let result = await getUsers();

    
    if(result.status === 'ok') {

        return res.status(201).send(result);

    } else {

        return res.status(200).send(result);

    }

    // let users = await read("./lib/db/users.json");
    // users = JSON.parse(users);

    // let age = req.query.age;

    // if(age) {
    //     users = users.filter((user) => user.age == age);
    // }
    
    // res.setHeader('Content-Type', "application/json");
    // res.json({"message" : "Vi vil se data", "data" : users})

})



export default usersRoutes;