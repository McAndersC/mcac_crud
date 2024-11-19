import express from "express";
import { read } from "../../../handlers/file.handler.mjs";

const usersRoutes = express.Router();

// (R)ead GET  
usersRoutes.get('/api/users', async (req, res) => {

    let users = await read("./lib/db/users.json");
    users = JSON.parse(users);

    res.setHeader('Content-Type', "application/json");
    res.json({"message" : "Vi vil se data", "data" : users})

})


export default usersRoutes;