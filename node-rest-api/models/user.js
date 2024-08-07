

const { default: mongoose } = require('mongoose');
const moongose = require ('mongoose');
const Schema = moongose.Schema();


const userSchema = new Schema({


    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    status: {
        type: String, 
        default: "I am new!"
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    


});


module.exports = mongoose.model('User', userSchema);