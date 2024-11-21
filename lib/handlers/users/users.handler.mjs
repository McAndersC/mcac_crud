import dbConnect from "../../db/dbConnect.mjs";
import userModel from "../../db/models/user.model.mjs";

export const getUsers = async () => {

    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

    await dbConnect();

    try {

        let data = await userModel.find({}); //.select('-__v')
        result = {status: 'ok', message: "Users fetched successfully", data: data}

    } catch (error) {   

        console.log(error)
       
    }

    return result

} 