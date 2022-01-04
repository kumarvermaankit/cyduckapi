
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

const router = express.Router();
const Question = require("../models/Question").Question;
const QuestionSchema = require("../models/Question").QuestionSchema;
const UserProfile = require("../models/UserProfile.models");
const Q = require("../models/Q").Q
const QSchema = require("../models/Q").QSchema

const gold = mongoose.model("gold", QSchema);
const silver = mongoose.model("silver", QSchema);
const bronze = mongoose.model("bronze", QSchema);
const extra = mongoose.model("extra", QSchema);

const app = express();

app.use(cors());
var uniqid = require('uniqid');





var darray = [];

var darray1 = []

var darray2 = [];

var darray3 = [];

var darray4 = [];
var darray5 = [];

var users = []


var no_of_mquestions = 0
var no_of_squestions = 0

var activePage = []

var associatedcommunities = ["codechef", "codesauce", "mait"]

// var storage=multer.diskStorage({
//     destination: (req,file,cb)=>{

//         cb(null,"./client/src/components/uploads");
//     },
//     filename: (req,file,cb)=>{
//         cb(null,Date.now()+"-"+file.originalname)
//     }
//     });

// const fileFilter=(req,file,cb)=>{
//     if(file.mimetype==='image.jpeg' || file.mimetype==='image.png' ){
//         cb(null,true)
//     }
//     else{
//        cb(null,false)
//     }
// }    

// const upload=multer({
//     storage:storage,
//     limits:{
//         fileSize:1024*1024*5
//     }

// })




router.post("/createcommunity", (req, res, next) => {
    const newCommunity = mongoose.model(req.body.community, QuestionSchema);
})



router.get("/allusers", (req, res, next) => {
    UserProfile.find()
        .then((result) => {
            result.map((each) => {
                users.push(each.username)
            })

            res.send({ data: users })
            users = []
            return
        })
        .catch((err) => {
            res.send({ data: false })
        })



})






router.post("/usernamechange", (req, res, next) => {


    UserProfile.findOne({ username: req.body.oldusername })
        .then((result) => {
            result.username = req.body.username
            result.save()
            res.send({ data: true })
            return
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get("/info/:username", (req, res, next) => {


    UserProfile.findOne({ username: req.params.username })
        .then((result) => {

            res.send({ data: { phone: result.phone_number, college: result.college, upi: result.upi_id, skills: result.skills, answered: result.answered, email: result.email } })
        })
})

router.post("/phone", (req, res, next) => {


    UserProfile.findOne({ username: req.body.username })
        .then((result) => {
            result.phone_number = req.body.phone
            result.save()
            res.send({ data: true })
            return
        })
        .catch((err) => {
            res.send({ data: err })
        })
})

router.post("/college", (req, res, next) => {


    UserProfile.findOne({ username: req.body.username })
        .then((result) => {
            result.college = req.body.college
            result.save()
            res.send({ data: true })
            return
        })
        .catch((err) => {
            res.send({ data: err })
        })
})

router.post("/upi", (req, res, next) => {


    UserProfile.findOne({ username: req.body.username })
        .then((result) => {
            result.upi_id = req.body.upi
            result.save()
            res.send({ data: true })
            return
        })
        .catch((err) => {
            res.send({ data: err })
        })
})


router.post("/addskill", (req, res, next) => {


    UserProfile.findOne(({ username: req.body.username }))
        .then((result) => {
            console.log(result.skills)
            result.skills = req.body.skills;

            result.save();
            res.send({ data: true });
            return;
        })
        .catch((err) => {
            res.send({ data: err })
        })
})






// router.post("/",upload.array("file",10),(req,res,next)=>{

// console.log(req.files)

// try{
//     req.files.map((each)=>{
//         imgobject.push(each)
//     })
// res.send({data:true})

// }
// catch(err){
// console.log(err);
// }    


// })

router.post("/questioncheck", (req, res, next) => {
    var index_no = 0

    var id = uniqid(req.body.info.username)



    var documentname;

    if ((req.body.question.paymentinfo.amount) / 100 === 10) {
        documentname = "gold"
    }
    else if ((req.body.question.paymentinfo.amount) / 100 === 5) {
        documentname = "silver"
    }
    else if ((req.body.question.paymentinfo.amount) / 100 === 3) {
        documentname = "bronze"
    }
    else {
        documentname = "extra"
    }

    // console.log(req.body.keywords.language,req.body.keywords.frameworks)

    const newdocument = {
        documentname: req.body.document,
        imginfo: req.body.imageinfo,
        question_title: req.body.question.title,
        question_content: req.body.question.content,
        answer: [],
        username: req.body.info.username,
        time: req.body.time,
        id: id,
        comments: [],
        value: req.body.question.paymentinfo,
        documentname: documentname,
        keywords: [...req.body.keywords.languages, ...req.body.keywords.frameworks, ...req.body.keywords.fields],
        index_no: index_no,
        links: req.body.links,
        communities: req.body.communities

    }

    try {
        //     Question.findOne({documentname:documentname})

        //     .then((result)=>{

        //          if(!result || result===null){
        //              Question.create(newdocument)
        //          }
        //         else{
        //         console.log("already ")     
        //         }
        //        

        //     })
        //   .catch(err=>console.log(err));

        if (documentname === "gold") {
            gold.create(newdocument)
        }
        else if (documentname === "silver") {
            silver.create(newdocument)
        }
        else if (documentname === "bronze") {
            bronze.create(newdocument)
        }
        else if (documentname === "extra") {
            extra.create(newdocument)
        }

        res.send({ data: true })
    }
    catch (err) {
        console.log(err);
    }

    try {
        UserProfile.findOne({ username: req.body.info.username })
            .then((user) => {
                user.questions.push({
                    question_id: id,
                    index_no: index_no,
                    docname: documentname
                })
                user.save()
            })
    }
    catch (err) {
        console.log(err)
    }

})

router.post("/question", (req, res, next) => {
    req.connection.setTimeout(1000 * 60 * 10);




    var index_no = 0

    var id = uniqid(req.body.info.username)



    var documentname;

    if ((req.body.question.paymentinfo.amount) / 100 === 10) {
        documentname = "gold"
    }
    else if ((req.body.question.paymentinfo.amount) / 100 === 5) {
        documentname = "silver"
    }
    else if ((req.body.question.paymentinfo.amount) / 100 === 3) {
        documentname = "bronze"
    }
    else {
        documentname = "extra"
    }

    const newdocument = {
        documentname: documentname,
        questions: [{
            imginfo: req.body.imageinfo,
            question_title: req.body.question.title,
            question_content: req.body.question.content,
            answer: [],
            username: req.body.info.username,
            time: req.body.time,
            id: id,
            comments: [],
            value: req.body.question.paymentinfo,
            documentname: documentname,
            keywords: [...req.body.keywords.language, ...req.body.keywords.frameworks, ...req.body.keywords.fields],
            index_no: index_no,
            links: req.body.links,
            community: req.body.community
        }]
    }

    try {
        Question.findOne({ documentname: documentname })

            .then((result) => {

                if (!result || result === null) {
                    Question.create(newdocument)
                }
                else {
                    index_no = result.questions.length;
                    result.questions.push({


                        question_title: req.body.question.title,
                        question_content: req.body.question.content,
                        answer: [],
                        imginfo: req.body.imageinfo,
                        username: req.body.info.username,
                        time: req.body.time,
                        id: id,
                        value: req.body.question.paymentinfo,
                        documentname: documentname,
                        keywords: [...req.body.keywords.language, ...req.body.keywords.frameworks, ...req.body.keywords.fields],
                        index_no: index_no,
                        links: req.body.links

                    })
                    result.save();


                }
                res.send({ data: true })

            })
            .catch(err => console.log(err));

    }
    catch (err) {
        console.log(err);
    }

    try {
        UserProfile.findOne({ email: req.body.info.email })
            .then((result) => {
                result.questions.push({
                    question_id: id,
                    index_no: index_no,
                    docname: documentname
                })
                result.save();
            })

    }
    catch (err) {
        console.log(err)
    }


    imgobject = []


})

var activepage = 1;
var no_of_questions = 0;

router.post("/activepage", (req, res, next) => {

    activepage = req.body.pageNumber;

    res.send({ data: true })

})


function arrsplicer(arr, active) {
    arr.splice(0, (6 * (active - 1)))
    arr.splice(6, arr.length)
}



async function Main2(activepage) {
    var a1 = [];
    var a2 = [];
    var a3 = [];
    var a4 = [];
    try {
        gold.find({}, { id: 1, question_title: 1, index_no: 1, documentname: 1, time: 1, username: 1 })
            .then((result) => {
                no_of_questions = no_of_questions + result.length;
                a1 = result

                result.length = 0;
            })

    }
    catch (err) {
        console.log(err);
    }



}




router.get("/allquestions/:activepage", async (req, res, next) => {

    async function Main(Question, activepage) {


        try {
            const result = await Question.find({}, { id: 1, question_title: 1, index_no: 1, documentname: 1, time: 1, username: 1 })

            no_of_questions = no_of_questions + result.length;
            result.map((each) => {
                if (darray.length > (6 * (activepage))) {
                    return;
                }
                darray.push(each)
            })

            result.length = 0;

            // if (result.length > (6 * (activepage))) {
            //     result.splice(0, (6 * (activepage - 1)))
            // }



            // result.map(each => {

            //     if (darray.length > 6 * activepage) {
            //         return
            //     }

            //     var idx = result.indexOf(each)

            //     if (darray.length < (6 * activepage)) {
            //         darray.push({ info: { id: each.id, question_title: each.question_title, index_no: each.index_no, documentname: each.documentname, time: each.time, username: each.username }, index: idx })

            //     }














            // })




        }
        catch (err) {
            console.log(err);
        }


        return darray

    }


    function sendarr(darr) {



        arrsplicer(darr, req.params.activepage)



        try {
            res.send({ arr: darr, pagenumber: activepage, no_of_questions: no_of_questions });
            darray = [];
            refreshcontroller--
            no_of_questions = 0;
            activepage = 1
        }
        catch (err) {
            console.log(err);
        }
    }


    const d = await Main(gold, req.params.activepage)
    if (d && d.length < (6 * req.params.activepage)) {

        const d2 = await Main(silver, req.params.activepage)
        if (d2 && d2.length < (6 * req.params.activepage)) {
            const d3 = await Main(bronze, req.params.activepage)

            if (d3 && d3.length < (6 * req.params.activepage)) {


                const d4 = await Main(extra, req.params.activepage)
                if (d4) {
                    sendarr(d4)
                }
            }
            else {
                sendarr(d3)
            }
        }
        else {
            sendarr(d2)
        }
    }
    else {
        sendarr(d)
    }





    // Main(gold, req.params.activepage).then((d) => {
    //     if (d && d.length < (6 * req.params.activepage)) {
    //         Main(silver, req.params.activepage).then((d2) => {
    //             if (d2 && d2.length < (6 * req.params.activepage)) {
    //                 Main(bronze, req.params.activepage).then((d3) => {
    //                     if (d3 && d3.length < (6 * req.params.activepage)) {
    //                         Main(extra, req.params.activepage).then((d4) => {
    //                             sendarr(d4)
    //                         })
    //                     }
    //                     else {
    //                         sendarr(d3)
    //                     }
    //                 })
    //             }
    //             else {
    //                 sendarr(d2)
    //             }
    //         })
    //     }
    //     else {
    //         sendarr(d)
    //     }
    // })

    // const d = await Main(gold, req.params.activepage)
    // if (d && d.length < (6 * req.params.activepage)) {

    //     const d2 = await Main(silver, req.params.activepage)
    //     if (d2 && d2.length < (6 * req.params.activepage)) {
    //         const d3 = await Main(bronze, req.params.activepage)

    //         if (d3 && d3.length < (6 * req.params.activepage)) {


    //             const d4 = await Main(extra, req.params.activepage)
    //             if (d4) {
    //                 sendarr(d4)
    //             }
    //         }
    //         else {
    //             sendarr(d3)
    //         }
    //     }
    //     else {
    //         sendarr(d2)
    //     }
    // }
    // else {
    //     sendarr(d)
    // }
})





// router.get("/goldquestions",(req,res,next)=>{




//     Main(gold)
//     .then((darr)=>{
//         try{
//             res.send({arr:darr,pagenumber:activepage,no_of_questions:no_of_questions});
//         darray=[];
//         refreshcontroller--
//         no_of_questions=0;
//         activepage=1
//         }
//         catch(err){
//             console.log(err);
//         }
//     })

// })

// router.get("/extraquestions",(req,res,next)=>{
//     Main(extra)
//     .then((darr)=>{
//         try{
//             res.send({arr:darr,pagenumber:activepage,no_of_questions:no_of_questions});
//         darray=[];
//         refreshcontroller--
//         no_of_questions=0;
//         activepage=1
//         }
//         catch(err){
//             console.log(err);
//         }
//     })
// })

// router.get("/silverquestions",(req,res,next)=>{
//     Main(silver)
//     .then((darr)=>{
//         try{
//             res.send({arr:darr,pagenumber:activepage,no_of_questions:no_of_questions});
//         darray=[];
//         refreshcontroller--
//         no_of_questions=0;
//         activepage=1
//         }
//         catch(err){
//             console.log(err);
//         }
//     })
// })
// router.get("/bronzequestions",(req,res,next)=>{
//     Main(bronze)
//     .then((darr)=>{
//         try{
//             res.send({arr:darr,pagenumber:activepage,no_of_questions:no_of_questions});
//         darray=[];
//         refreshcontroller--
//         no_of_questions=0;
//         activepage=1
//         }
//         catch(err){
//             console.log(err);
//         }
//     })
// })


router.get("/", (req, res, next) => {
    req.connection.setTimeout(1000 * 60 * 10);



    async function Main() {
        try {
            const result = await Question.find()
            result.map(res => {

                res.questions.map((each) => {
                    var idx = res.questions.indexOf(each)
                    no_of_questions++;
                    if (darray.length < (6 * activepage)) {
                        darray.push({ info: { id: each.id, question_title: each.question_title, index_no: each.index_no, documentname: each.documentname, time: each.time, username: each.username }, index: idx })

                    }
                })



                if (darray.length > 6 * (activepage - 1)) {
                    darray.splice(0, (6 * (activepage - 1)))
                }









            })




        }
        catch (err) {
            console.log(err);
        }

        return darray
    }

    Main()
        .then((darr) => {
            try {
                res.send({ arr: darr, pagenumber: activepage, no_of_questions: no_of_questions });
                darray = [];
                refreshcontroller--
                no_of_questions = 0;
                activepage = 1
            }
            catch (err) {
                console.log(err);
            }
        })






})



router.get("/question/:id/:document/:username", (req, res, next) => {


    async function FindQuestion(Question) {
        try {
            Question.findOne({ id: req.params.id })
                .then((result) => {

                    res.send({ data: result })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    switch (req.params.document) {
        case "gold": FindQuestion(gold)
            break;
        case "silver": FindQuestion(silver)
            break;
        case "bronze": FindQuestion(bronze)
            break;
        case "extra": FindQuestion(extra)
            break;
    }



})


router.get("/community/:name/:activepage", async (req, res, next) => {





    async function getCommunity(Question, value) {

        if (darray3.length < 6 * value) {

            var findings = await Question.find({ communities: [req.params.name] }, { id: 1, question_title: 1, index_no: 1, documentname: 1, time: 1, username: 1 })
            no_of_questions = findings.length + no_of_questions
            findings.map((res) => {

                if (darray3.length > 6 * value) {
                    return
                }

                darray3.push(res);

            })

            findings.length = 0;
        }
        return darray3
    }


    function sendarr(darr) {

        arrsplicer(darr, req.params.activepage)

        try {
            res.send({ arr: darr, pagenumber: activepage, no_of_questions: no_of_questions });
            darray3 = [];
            refreshcontroller--
            no_of_questions = 0;
            activepage = 1
        }
        catch (err) {
            console.log(err);
        }
    }



    if (associatedcommunities.includes(req.params.name.toLocaleLowerCase()) === false) {
        try {
            res.send(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    else {
        const d = await getCommunity(gold, req.params.activepage)
        if (d && d.length < (6 * req.params.activepage)) {

            const d2 = await getCommunity(silver, req.params.activepage)
            if (d2 && d2.length < (6 * req.params.activepage)) {
                const d3 = await getCommunity(bronze, req.params.activepage)

                if (d3 && d3.length < (6 * req.params.activepage)) {


                    const d4 = await getCommunity(extra, req.params.activepage)
                    if (d4) {
                        sendarr(d4)
                    }
                }
                else {
                    sendarr(d3)
                }
            }
            else {
                sendarr(d2)
            }
        }
        else {
            sendarr(d)
        }
    }







})



router.get("/groupsearch/:name/:field/:framework/:language/:activepage", async (req, res, next) => {
    console.log(req.params)
    var lstr = req.params.language;
    lstr = lstr.split(",")
    for (var i = 0; i < lstr.length; i++) {
        if (lstr[i] === "C  ") {
            lstr[i] = "C++"
        }
    }
    var fstr = req.params.field;
    fstr = fstr.split(",")

    var frstr = req.params.framework;
    frstr = frstr.split(",")

    const searcharr = [...lstr, ...fstr, ...frstr];


    var count = 0;

    async function search(Question, value) {
        if (darray2.length < 6 * value) {

            var findings = await Question.find({ keywords: searcharr, communities: [req.params.name] }, { id: 1, question_title: 1, index_no: 1, documentname: 1, time: 1, username: 1 })

            no_of_questions = no_of_questions + findings.length;
            findings.map((res) => {

                if (darray2.length > 6 * value) {
                    return
                }

                darray2.push(res);

            })
        }
        return darray2

    }

    function sendarr(darr) {

        arrsplicer(darr, req.params.activepage)
        try {

            res.send({ arr: darr, pagenumber: activepage, no_of_questions: no_of_questions });
            darray2 = [];
            refreshcontroller--
            no_of_questions = 0;
            activepage = 1
        }
        catch (err) {
            console.log(err);
        }
    }

    const d = await search(gold, req.params.activepage)
    if (d && d.length < (6 * req.params.activepage)) {

        const d2 = await search(silver, req.params.activepage)
        if (d2 && d2.length < (6 * req.params.activepage)) {
            const d3 = await search(bronze, req.params.activepage)

            if (d3 && d3.length < (6 * req.params.activepage)) {


                const d4 = await search(extra, req.params.activepage)
                if (d4) {
                    sendarr(d4)
                }
            }
            else {
                sendarr(d3)
            }
        }
        else {
            sendarr(d2)
        }
    }
    else {
        sendarr(d)
    }





})


router.post("/group_join", async (req, res, next) => {

    try {
        const user = await UserProfile.findOne({ username: req.body.username })
        if (user) {
            user.communities.push(req.body.group)
            user.save()
            res.status(200).json(true)
        }
        else {
            console.log("User Not Found")
        }
    }
    catch (err) {
        console.log(err)
    }

})


router.post("/group_leave", async (req, res, next) => {
    try {
        const user = await UserProfile.findOne({ username: req.body.username })
        if (user) {
            var idx = user.communities[req.body.group]
            user.communities.splice(idx, 1)
            user.save()
            res.status(200).json(true)
        }
        else {
            console.log("User Not Found")
        }
    }
    catch (err) {
        console.log(err)
    }

})




router.get("/mygroups/:username", async (req, res, next) => {

    try {
        const user = await UserProfile.findOne({ username: req.params.username })
        if (user) {
            res.status(200).json(user.communities)
        }
        else {
            console.log("User Not Found")
        }
    }
    catch (err) {
        console.log(err)
    }
})



router.get("/searching/:field/:language/:framework/:activepage", async (req, res, next) => {

    var lstr = req.params.language;
    lstr = lstr.split(",")
    for (var i = 0; i < lstr.length; i++) {
        if (lstr[i] === "C  ") {
            lstr[i] = "C++"
        }
    }
    var fstr = req.params.field;
    fstr = fstr.split(",")

    var frstr = req.params.framework;
    frstr = frstr.split(",")

    const searcharr = [...lstr, ...fstr, ...frstr];


    var count = 0;

    async function search(Question, value) {
        if (darray2.length < 6 * value) {
            var findings = await Question.find({ keywords: searcharr }, { id: 1, question_title: 1, index_no: 1, documentname: 1, time: 1, username: 1 })
            no_of_questions = no_of_questions + findings.length;
            findings.map((res) => {

                if (darray2.length > 6 * value) {
                    return
                }

                darray2.push(res);

            })
        }
        return darray2

    }

    function sendarr(darr) {

        arrsplicer(darr, req.params.activepage)

        try {
            res.send({ arr: darr, pagenumber: activepage, no_of_questions: no_of_questions });
            darray2 = [];
            refreshcontroller--
            no_of_questions = 0;
            activepage = 1
        }
        catch (err) {
            console.log(err);
        }
    }

    const d = await search(gold, req.params.activepage)
    if (d && d.length < (6 * req.params.activepage)) {

        const d2 = await search(silver, req.params.activepage)
        if (d2 && d2.length < (6 * req.params.activepage)) {
            const d3 = await search(bronze, req.params.activepage)

            if (d3 && d3.length < (6 * req.params.activepage)) {


                const d4 = await search(extra, req.params.activepage)
                if (d4) {
                    sendarr(d4)
                }
            }
            else {
                sendarr(d3)
            }
        }
        else {
            sendarr(d2)
        }
    }
    else {
        sendarr(d)
    }




})


router.get("/stringsearch/:string/:activepage", async (req, res, next) => {
    var searcharr = req.params.string.split(" ");

    async function search(Question, value) {
        if (darray5.length < 6 * value) {
            var findings = await Question.find({}, { id: 1, question_title: 1, index_no: 1, documentname: 1, time: 1, username: 1 })

            no_of_questions = no_of_questions + findings.length;
            var notincludearray = ["what", "which", "how", "is", "are"]

            findings.map((each) => {

                if (darray5.length > 6 * value) {
                    return
                }

                for (var i = 0; i < searcharr.length; i++) {
                    if (searcharr[i] === each.id) {
                        darray5.push(each);

                        break;
                    }
                    else if (each.question_title.toLowerCase().includes(searcharr[i].toLowerCase()) && notincludearray.includes(searcharr[i].toLowerCase()) === false) {
                        darray5.push(each)

                        break;
                    }
                }


            })
        }
        return darray5

    }


    function sendarr(darr) {

        arrsplicer(darr, req.params.activepage)

        try {
            res.send({ arr: darr, pagenumber: activepage, no_of_questions: no_of_questions });
            darray5 = [];
            refreshcontroller--
            no_of_questions = 0;
            activepage = 1
        }
        catch (err) {
            console.log(err);
        }
    }


    const d = await search(gold, req.params.activepage)
    if (d && d.length < (6 * req.params.activepage)) {

        const d2 = await search(silver, req.params.activepage)
        if (d2 && d2.length < (6 * req.params.activepage)) {
            const d3 = await search(bronze, req.params.activepage)

            if (d3 && d3.length < (6 * req.params.activepage)) {


                const d4 = await search(extra, req.params.activepage)
                if (d4) {
                    sendarr(d4)
                }
            }
            else {
                sendarr(d3)
            }
        }
        else {
            sendarr(d2)
        }
    }
    else {
        sendarr(d)
    }



})


router.get("/search/:field/:language/:framework/:string", (req, res, next) => {
    req.connection.setTimeout(1000 * 60 * 10);


    var lstr = req.params.language;
    lstr = lstr.split(",")
    for (var i = 0; i < lstr.length; i++) {
        if (lstr[i] === "C  ") {
            lstr[i] = "C++"
        }
    }
    var fstr = req.params.field;
    fstr = fstr.split(",")

    var frstr = req.params.framework;
    frstr = frstr.split(",")




    Question.find()
        .then((result) => {
            if (result) {
                result.map((each) => {
                    each.questions.map((res) => {
                        var count = 0
                        if (darray2.length < (6 * activepage)) {


                            if (res.keywords["field"] !== null) {
                                res.keywords["field"].map((f) => {
                                    fstr.map((e) => {

                                        if (f === e) {

                                            var idx = each.questions.indexOf(res)
                                            darray2.push({ info: { id: res.id, question_title: res.question_title, index_no: res.index_no, documentname: res.documentname, time: res.time, username: res.username }, index: idx })
                                            count++
                                        }
                                    })
                                })
                            }
                            if (count > 0) {
                                return
                            }
                            if (res.keywords["language"] !== null) {
                                res.keywords["language"].map((l) => {
                                    lstr.map((e) => {


                                        if (l === e) {

                                            var idx = each.questions.indexOf(res)
                                            darray2.push({ info: { id: res.id, question_title: res.question_title, index_no: res.index_no, documentname: res.documentname, time: res.time, username: res.username }, index: idx })
                                            return
                                        }
                                    })
                                })
                            }
                            if (count > 0) {
                                return
                            }
                            if (res.keywords["framework"] !== null) {
                                res.keywords["framework"].map((f) => {
                                    frstr.map((e) => {
                                        if (f === e) {

                                            var idx = each.questions.indexOf(res)
                                            darray2.push({ info: { id: res.id, question_title: res.question_title, index_no: res.index_no, documentname: res.documentname, time: res.time, username: res.username }, index: idx })
                                            return
                                        }
                                    })
                                })
                            }
                            if (count > 0) {
                                return
                            }




                            var array = [];
                            var nof = 0
                            array = req.params.string.split(" ");



                            var notincludearray = ["what", "which", "how", "is", "are"]

                            for (var i = 0; i < array.length; i++) {
                                if (array[i] === res.id) {
                                    var idx = each.questions.indexOf(res)
                                    darray2.push({ info: { id: res.id, question_title: res.question_title, index_no: res.index_no, documentname: res.documentname, time: res.time, username: res.username }, index: idx })
                                    return
                                }
                                if (array[i].length > 2) {
                                    if ((res.question_title.toLowerCase()).includes(array[i].toLowerCase()) && notincludearray.includes(array[i].toLowerCase()) === false) {
                                        var idx = each.questions.indexOf(res)

                                        darray2.push({ info: { id: res.id, question_title: res.question_title, index_no: res.index_no, documentname: res.documentname, time: res.time, username: res.username }, index: idx })
                                        return;
                                    }
                                }

                            }



                        }

                    })
                })
            }
            else {
                res.send("No search results found")
            }
            if (darray2.length === 0) {
                darray2.push(null)
            }
            no_of_questions = darray2.length;

            if (darray2.length > 6 * (activepage - 1)) {
                darray2.splice(0, (6 * (activepage - 1)))
            }
            try {
                res.send({ arr: darray2, pagenumber: activepage, no_of_questions: no_of_questions });
                darray2 = [];

                no_of_questions = 0;
                activepage = 1
            }
            catch (err) {
                console.log(err);
            }
        })
})

router.get('/mq/:username', (req, res, next) => {

    if (darray1.length > (6 * (activepage - 1))) {
        darray1.splice(0, (6 * (activepage - 1)))
    }

    res.send({ arr: darray1, pagenumber: activepage, no_of_questions: no_of_mquestions });
    darray1 = []
    no_of_mquestions = 0;
    activepage = 1;

})



router.get("/myquestions/:username/:activepage", async (req, res, next) => {




    function sendarr(darr) {

        arrsplicer(darr, req.params.activepage)

        try {
            res.send({ arr: darr, pagenumber: activepage, no_of_questions: no_of_questions });
            darray4 = [];
            refreshcontroller--
            no_of_questions = 0;
            activepage = 1
        }
        catch (err) {
            console.log(err);
        }
    }


    async function getUserQuestions() {
        var username = req.params.username;

        const result = await UserProfile.findOne({ username: username }, { "questions.question_id": 1, "questions.docname": 1 })

        return result
    }


    async function getQuestions(Question, id) {




        const r = await Question.findOne({ id: id }, { id: 1, question_title: 1, index_no: 1, documentname: 1, time: 1, username: 1 })
        console.log(r)
        if (r !== null) {
            return r;
        }
        else {
            return false;
        }



    }



    const result = await getUserQuestions()



    if (result) {

        async function helper() {



            const d = result.questions.map((each) => {

                if (each.docname === "gold") {
                    const result = getQuestions(gold, each.question_id)

                    return result
                    // if (arr.length < (6 * req.params.activepage)) {

                    //     if (result !== false) {
                    //         arr.push(result);
                    //     }

                    // }
                }
                else if (each.docname === "silver") {
                    const result = getQuestions(silver, each.question_id)

                    return result
                    // if (arr.length < (6 * req.params.activepage)) {

                    //     if (result !== false) {
                    //         arr.push(result);
                    //     }
                    // }
                }
                else if (each.docname === "bronze") {
                    const result = getQuestions(bronze, each.question_id)

                    return result
                    // if (arr.length < (6 * req.params.activepage)) {

                    //     if (result !== false) {
                    //         arr.push(result);
                    //     }
                    // }
                }
                else if (each.docname === "extra") {
                    const result = getQuestions(extra, each.question_id)

                    return result
                    // if (arr.length < (6 * req.params.activepage)) {

                    //     if (result !== false) {
                    //         arr.push(result);
                    //     }
                    // }
                }
            })

            const arr = await Promise.all(d)

            return arr

        }


        const a = await helper()
        console.log(a)
        if (a) {
            sendarr(a)
        }

    }





})

var refreshcontroller = 2

router.get("/r/d", (req, res, next) => {

    if (refreshcontroller < 1) {
        refreshcontroller = 2
    }

    req.connection.setTimeout(1000 * 60 * 10);

})


router.get("/answer/:id/:document/:username", (req, res, next) => {

    async function getanswer(Question) {
        try {
            Question.findOne({ id: req.params.id })
                .then((ques) => {

                    res.send({ ans: ques.answer })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        catch (err) {
            res.send(err)
        }
    }

    switch (req.params.document) {
        case "gold": getanswer(gold)
            break;
        case "silver": getanswer(silver)
            break;
        case "bronze": getanswer(bronze)
            break;
        case "extra": getanswer(extra)
            break;
    }




})

router.post("/addanswer", async (req, res, next) => {





    var l;

    var id = uniqid(req.body.ansuser)

    async function addanswer(Question) {

        try {
            Question.findOne({ id: req.body.id })
                .then((ques) => {

                    if (ques.answer.length === 0) {
                        l = 0
                    }
                    else {

                        l = ques.answer.length

                    }


                    ques.answer.push({
                        description: req.body.title,
                        ans: req.body.content,
                        ansusername: req.body.ansuser,
                        vote: false,
                        index: l,
                        id: id,
                        links: req.body.links,
                        images: req.body.imglinks
                    })




                    ques.save();
                    res.send({ data: l })

                    return
                })
                .catch(err => console.log(err));
        }
        catch (err) {
            res.send(err)
        }
    }



    switch (req.body.document) {
        case "gold": addanswer(gold)
            break;
        case "silver": addanswer(silver)
            break;
        case "bronze": addanswer(bronze)
            break;
        case "extra": addanswer(extra)
            break;
    }


    function add() {


        try {

            UserProfile.findOne({ username: req.body.ansuser })
                .then((result) => {
                    var t = result.answered.length
                    result.answered.push({
                        docname: req.body.document,
                        question_id: req.body.id,

                        index: t,
                        id: id
                    })

                    return result.save()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        catch (err) {
            console.log(err)
        }



    }


    add()






})



router.post("/autodelete", async (req, res, next) => {



    async function Delete(Question) {
        let result;
        try {
            result = await Question.findOne({ id: req.body.id })
            result.documentname = "extra"
            if (result) {
                console.log("hsghghdsgj")
                Question.deleteOne({ id: req.body.id })
                    .then(() => {
                        res.send(true)
                    })
            }




        }
        catch (err) {
            console.log(err)
        }



















        return result

    }


    var result = false;

    switch (req.body.document) {
        case "gold": result = await Delete(gold)
            break;
        case "silver": result = await Delete(silver)
            break;
        case "bronze": result = await Delete(bronze)
            break;
        case "extra": result = await Delete(extra)
            break;
    }


    if (result !== false) {
        const newdocument = {
            documentname: result.documentname,

            question_title: result.question_title,
            question_content: result.question_content,
            answer: result.answer,
            username: result.username,
            time: result.time,
            id: result.id,
            comments: result.comments,
            value: result.value,

            keywords: result.keywords,
            index_no: result.index_no,

            communities: result.communities

        }

        try {
            extra.findOne({ id: newdocument.id })
                .then((result) => {
                    if (!result) {
                        extra.create(newdocument)
                    }
                })
        }
        catch (err) {
            console.log(err)
        }


    }

















})



// router.post("/autoupdate",(req,res,next)=>{



//     console.log(q,"j")



// q=""



// })

// router.post("autouserupdate",(req,res,next)=>{


// })


router.post("/vote", (req, res, next) => {

    async function vote(Question) {
        Question.findOne({ id: req.body.id })
            .then((ques) => {

                ques.answer[req.body.ansindex].vote = !(ques.answer[req.body.ansindex].vote)
                return ques.save();
            })
    }

    switch (req.body.document) {
        case "gold": vote(gold)
            break;
        case "silver": vote(silver)
            break;
        case "bronze": vote(bronze)
            break;
        case "extra": vote(extra)
            break;
    }





})

router.post("/comment", (req, res) => {



    async function addcomment(Question) {
        try {
            Question.findOne({ id: req.body.id })
                .then((ques) => {
                    ques.comments.push({ comment: req.body.comment, username: req.body.useronline })

                    res.send({ data: true })
                    return ques.save();
                })
                .catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)

        }
    }


    switch (req.body.document) {
        case "gold": addcomment(gold)
            break;
        case "silver": addcomment(silver)
            break;
        case "bronze": addcomment(bronze)
            break;
        case "extra": addcomment(extra)
            break;
    }


})

router.post("/answercomment", (req, res) => {

    async function addcomment(Question) {
        try {


            Question.findOne({ id: req.body.id })
                .then((q) => {
                    q.answer[req.body.ansindex].comments.push({ comment: req.body.comment, username: req.body.useronline })
                    res.send({ data: true })
                    return q.save();
                })
                .catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    }

    switch (req.body.document) {
        case "gold": addcomment(gold)
            break;
        case "silver": addcomment(silver)
            break;
        case "bronze": addcomment(bronze)
            break;
        case "extra": addcomment(extra)
            break;
    }

})


router.post("/delete/:username/:questionid", (req, res) => {
    req.connection.setTimeout(1000 * 60 * 10);

    try {
        Question.findOne({ documentname: req.body.document })
            .then((ques) => {
                ques.questions[req.body.index] = ques.questions[ques.questions.length - 1]
                ques.questions.pop()
                res.send({ data: true })
                return ques.save();
            })
    }
    catch (err) {
        console.log(err)
    }

    try {
        UserProfile.findOne({ username: req.params.username })
            .then((result) => {
                for (var i = 0; i < result.questions.length; i++) {
                    if (result.questions[i].question_id === req.params.questionid) {

                        result.questions[i] = result.questions[result.questions.length - 1]
                        result.questions.pop()
                        break;
                    }
                }
                return result.save()
            })
    }
    catch (err) {
        console.log(err)
    }
})


router.post("/codeeditor", (req, res) => {


    async function codeditor(Question) {
        try {
            Question.findOne({ id: req.body.id })
                .then((result) => {
                    result.question_content = req.body.content;

                    result.save()
                    res.send({ data: true })
                    return
                })
                .catch((err) => {
                    res.send(err)
                })
        }
        catch (err) {
            res.send(err)
        }




    }


    switch (req.body.document) {
        case "gold": codeditor(gold)
            break;
        case "silver": codeditor(silver)
            break;
        case "bronze": codeditor(bronze)
            break;
        case "extra": codeditor(extra)
            break;
    }

})




router.post("/upvote/:state", (req, res) => {


    async function upvote(Question) {
        try {
            Question.findOne({ id: req.body.id })
                .then((result) => {


                    if (req.params.state === "true") {
                        result.answer[req.body.ansindex].upvote = result.answer[req.body.ansindex].upvote + 1
                        result.answer[req.body.ansindex].likedBy.push(req.body.username)
                    }
                    else if (req.params.state === "false") {
                        result.answer[req.body.ansindex].upvote = result.answer[req.body.ansindex].upvote - 1
                        var idx = result.answer[req.body.ansindex].likedBy.indexOf(req.body.username)
                        result.answer[req.body.ansindex].likedBy.splice(idx, 1)
                    }

                    result.save()
                    res.send({ data: true })
                    return
                })
        }
        catch (err) {
            console.log(err)
        }
    }


    switch (req.body.document) {
        case "gold": upvote(gold)
            break;
        case "silver": upvote(silver)
            break;
        case "bronze": upvote(bronze)
            break;
        case "extra": upvote(extra)
            break;
    }


})






module.exports = router;

