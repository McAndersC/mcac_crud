import express from "express";
import { read, write } from "../../../handlers/file.handler.mjs";
import { getNewUID } from "../../../misc/helpers.mjs";

const subscriberRoute = express.Router();

// (C)reate POST  
subscriberRoute.post('/api/subscriber', async (req, res) => {

    let subscribers = await read("./lib/db/subscribers.json");
    subscribers = JSON.parse(subscribers);

    let newSubscriber = {
        "id" : getNewUID(),
        ...req.body,
    }

    subscribers = [
        newSubscriber,
        ...subscribers
    ]

    let updateSubscribers = write("./lib/db/subscribers.json", JSON.stringify(subscribers));
 
    res.setHeader('Content-Type', "application/json");
    res.json({"message" : "Vi vil se data", "data" : []});

})

// (R)ead GET  
subscriberRoute.get('/api/subscriber', async (req, res) => {

    res.setHeader('Content-Type', "application/json");
    res.json({"message" : "Vi vil se data", "data" : []});

})

// (U)pdate PUT  
subscriberRoute.put('/api/subscriber', async (req, res) => {

    // Read Subscribers
    let subscribers = await read("./lib/db/subscribers.json");
    subscribers = JSON.parse(subscribers);

    let subscriberIndex = subscribers.findIndex( (subscriber) => subscriber.id === req.body.id );

    subscribers[subscriberIndex] = {
        ...subscribers[subscriberIndex],
        ...req.body
    };

    let updateSubscriber = write("./lib/db/subscribers.json", JSON.stringify(subscribers));

    res.setHeader('Content-Type', "application/json");
    res.json({"message" : "Vi vil se data", "data" : []});

});

// (D)elete DELETE  
subscriberRoute.delete('/api/subscriber', async (req, res) => {

    // Read Subscribers
    let subscribers = await read("./lib/db/subscribers.json");
    subscribers = JSON.parse(subscribers);

    let subscriberIndex = subscribers.findIndex( (subscriber) => subscriber.id === req.body.id )
    subscribers.splice(subscriberIndex, 1);

    let updateSubscribers = write("./lib/db/subscribers.json", JSON.stringify(subscribers));

    res.setHeader('Content-Type', "application/json");
    res.json({"message" : "Vi vil se data", "data" : []})

})

export default subscriberRoute;