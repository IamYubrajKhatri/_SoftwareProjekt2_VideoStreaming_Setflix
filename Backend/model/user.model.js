import mongoose from "mongoose";

//now we deifine schema for user that every our user needs to have

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email :{
        type: String,
        required: true,
        unique: true,
    },
    password :{
        type: String,
        required: true,
    },
    image :{
        type: String,
        default: ""
    },
    searchHistory :{
        type: Array,
        default: []
    }

})


//now we create a modele for avobe designed schema
//this code means whater data is given in userSchema it is stored in USer collection
const User = mongoose.model("User",userSchema);
export default User;