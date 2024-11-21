import mongoose, { Schema } from 'mongoose';
mongoose.set('runValidators', true);

const userScheme = new Schema({

    name : {type: String, required : true},
    age : {type: Number, default : 0 },
    picture : {type: String, default: '/users/no-user.png'},

})

export default mongoose.models.user || mongoose.model('user', userScheme);

// {
//     "name": "Anders GO",
//     "age": "22",
//     "picture": "/users/no-user.jpg"
// },