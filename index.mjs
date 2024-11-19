import * as dotenv from 'dotenv';
import server from './lib/server.mjs';
dotenv.config({path: '.env.local', overide : true});
const application = {}

application.init = () => {

    console.log("Init application", process.env.SERVER_PORT)
    server.run();
}

application.init();

