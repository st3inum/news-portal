const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({
    headline:{
        type:String,
        require: [true,'Please provide a headline'],
        maxlength:50
    },
    description:{
        type:String,
        require: [true,'Please provide description'],
        maxlength:100
    },
    author:{
        type:String,
        default: 'Anonymus'
    },
},{timestamps:true})

module.exports = mongoose.model('News',NewsSchema)