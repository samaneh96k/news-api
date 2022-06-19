const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');


const schemaCommentPage=new mongoose.Schema({
    name: { type: String, required: true },
    Email: { type: String, required: true },
    Website: String,
    Comment: { type: String, required: true },
    CreateDate: { type: Date, required: false },
    score:Number,
})
const schemaPage=new mongoose.Schema({
Title:{ type: String, required: true},
ShortText:{ type: String, required: false },
Text:{ type: String, required: false },
TagsPage: String,
imageUrl: String,

CreateDate:{ type: Date, required: false},
AddToSlide:{ type: Boolean, Default: false},
score:Number,
PageComment:[schemaCommentPage]
})
const schema= new mongoose.Schema({


   GroupTitle:{ type: String, required: true},
   score:Number,
   Pages:[schemaPage]
   

});



schema.index({GroupTitle:"text"});
  
 
module.exports=mongoose.model("cms",schema);