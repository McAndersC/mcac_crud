import dbConnect from "../../db/dbConnect.mjs";
import userModel from "../../db/models/user.model.mjs";

export const createUser = async (user) => {

    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};
    await dbConnect();
    try {
        
        let userData = await userModel.create(user)

        result = {status: 'ok', message: "User created successfully", data: userData}

    } catch (error) {
    
        console.log(error)

    }

    return result;

}

export const updateUser = async (user) => {

    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

    await dbConnect();


    try {
        let data = await userModel.findByIdAndUpdate(user.id, user, {new: true});
        result = {status: 'ok', message: "User updated successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    return result

}

export const deleteUser = async (id) => {

    let result = {status: 'error', message: "An Error Occurred - See Database log.", data: []};

    await dbConnect();

    try {
        let data = await userModel.findByIdAndDelete(id);
        result = {status: 'ok', message: "User deleted successfully", data: data}

    } catch (error) {   

        console.log(error)
    }

    return result

}