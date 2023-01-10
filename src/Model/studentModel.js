const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

const studentSchema=new mongoose.Schema({
    teacherId:{type:ObjectId,ref:"Teacher"},
    name:{type:String},
    subject:{type:String},
    marks:{type:Number},
    isDeleted:{type:Boolean,default:false}
},{timestamps:true})

module.exports=mongoose.model('Student',studentSchema)