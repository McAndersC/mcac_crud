// import path from 'node:path';
import url from 'node:url';
import { v4 as uuidv4 } from "uuid";

export const dirname = url.fileURLToPath(new URL('../../', import.meta.url));


export const getNewUID = () => {
    return uuidv4();
};