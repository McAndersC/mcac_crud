import express from "express";
import { read } from "../../../handlers/file.handler.mjs";

const subscribersRoutes = express.Router();

// (R)ead GET  
subscribersRoutes.get('/api/subscribers', async (req, res) => {

    let subscribers = await read("./lib/db/subscribers.json");
    subscribers = JSON.parse(subscribers);

    res.setHeader('Content-Type', "application/json");
    res.json({"message" : "Vi vil se data", "data" : subscribers})

})


export default subscribersRoutes;