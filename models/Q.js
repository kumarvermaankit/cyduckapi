const mongoose=require("mongoose");

var Schema=mongoose.Schema;

const QSchema= new Schema({
    documentname:{
        type:"String"
    },
    
 
id:{
    type:"String",
    required:true  
},

time:{
    type:"String",
    required:true
},
username:{
    type:"String",
    required:true
},
        question_title:{
            type:"String",
           default:"none"
            },
            answer:[{
                description:"",
                ans:"",
                id:"",
                vote:false,
                ansusername:"",
                index:{type:"Number"},
                upvote:{
                    type:"Number",
                    default:0
                },
                images:[{}],
                likedBy:[],
                links:{},
                comments:[{
                    comment:"",
                    username:"",
                    
}]
            }],
         
        question_content:{
            type:"String",
           default:"none"
        },
        

        imginfo:[{}],
        
        comments:[{
            comment:"",
            username:"",
        
        }],
        value:{
            type:"Object",
            default:{amount:0}
        },
        
        keywords:{
            type:"Object",
            language:[],
            framework:[],
            fields:[]
         
        },
         index_no:{
             type:"Number",
             default:0
         },
      
        
        communities:[]
    
       

},{timestamps:true})

const Q=mongoose.model("EachQuestion",QSchema);

module.exports={
    Q,
    QSchema
};