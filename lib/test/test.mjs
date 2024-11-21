import { write } from "../handlers/file.handler.mjs";

console.log('TEST');



let updateUsers = write("./lib/db/test.txt", "hello");