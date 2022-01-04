const mongoose=require("mongoose");

var Schema=mongoose.Schema;

const QuestionSchema= new Schema({
    documentname:{
        type:"String"
    },
    questions:[{
 
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
        documentname:{
            type:"String"
        },
        keywords:[],
         index_no:{
             type:"Number",
             default:0
         },
      
         links:{},
        community:{
        type:"String",
        default:"none"
         }
        }],
       

},{timestamps:true})

const Question=mongoose.model("Question",QuestionSchema);

module.exports={
    Question,
    QuestionSchema
};