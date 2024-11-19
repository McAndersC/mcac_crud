import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from './misc/helpers.mjs';
import clientRoutes from './routes/client/client.route.mjs';
import userRoutes from './routes/api/users/user.route.mjs';
import usersRoutes from './routes/api/users/users.route.mjs';

const server = {}

const expressServer = express();
expressServer.use(bodyParser.json())

// Statiske Filer
expressServer.use(express.static("client"))
expressServer.use(express.static("public"))

// Routes
expressServer.use(clientRoutes)

// Api Routes
expressServer.use(userRoutes)
expressServer.use(usersRoutes)

// Subscribers




server.run = () => {

    console.log('\n\n---------------------');
    console.log('Server Started', process.env.SERVER_PORT, process.env.SERVER_HOST);
    console.log('\n\n---------------------');

    expressServer.listen(process.env.SERVER_PORT, () => {

        console.log('Lytter vildt på port ', process.env.SERVER_PORT, dirname)

    })

}

export default server;