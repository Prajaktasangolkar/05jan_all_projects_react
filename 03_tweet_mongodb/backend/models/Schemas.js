const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({

    // _id:ObjectId
    username:{type:String,require:true},
    fullname:{type:String,require:true},
    entryDate:{type:Date,default:Date.now}
});

const tweetSchema=new Schema({
    //_id 
    tweet:{type:String,require:true},
    user: {type:Schema.Types.ObjectId, ref:'users'}
});

const Users=mongoose.model('users',userSchema,"users");
const Tweets=mongoose.model('tweets',tweetSchema,'tweets')
const mySchemas={'Users':Users,"Tweets":Tweets}
//by mySchemas we can exports 2 schemas at same time 

module.exports=mySchemas;

