import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from './misc/helpers.mjs';
import clientRoutes from './routes/client/client.route.mjs';
import userRoutes from './routes/api/users/user.route.mjs';
import usersRoutes from './routes/api/users/users.route.mjs';
import subscriberRoute from './routes/api/subscriber/subscriber.route.mjs';
import subscribersRoutes from './routes/api/subscriber/subscribers.route.mjs';

const server = {}

const expressServer = express();

expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));

// Statiske Filer
expressServer.use(express.static("client"))
expressServer.use(express.static("public"))

// Routes
expressServer.use(clientRoutes)

// Api Routes
expressServer.use(userRoutes)
expressServer.use(usersRoutes)

// Subscribers
expressServer.use(subscriberRoute)
expressServer.use(subscribersRoutes)

server.run = () => {

    
    console.log('\n\n---------------------');
    console.log('Server Started', process.env.SERVER_PORT, process.env.SERVER_HOST);
    console.log('\n\n---------------------');

    expressServer.listen(process.env.SERVER_PORT, () => {

        console.log('Lytter vildt på port ', process.env.SERVER_PORT, dirname)

    })

}

export default server;