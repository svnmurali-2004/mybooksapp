const mongoose= require("mongoose")

const mongoosebookmodel=new mongoose.Schema({
    name:{
        type:String
        ,default:""
    },
    author:{
        type:String
        ,default:""
    },
    image:{
        type:String,
        default:""
    },
    description:{
        type:String
        ,default:""
    },
    download_link:{
        type:String
        ,default:""
    }
})
const bookSchema=mongoose.model('mongoosebookmodel',mongoosebookmodel)
module.exports=bookSchema