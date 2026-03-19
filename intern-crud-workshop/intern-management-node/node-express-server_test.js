const express = require("express");
const cors = require('cors');

const app = express();
const port = 3112;

const internList = [];

const TestIntern = {
    internId:1,
    internName:'Sandy',
    internEmail: 'sandy@gmail.com',
    internPhone:94544545,
    internStatus: 'Active'
}

const addIntern= (internDetail)=>{
    internList.push(internDetail);
}

addIntern(TestIntern);
app.use(cors());


// Read Intern Data
app.get('/interns',(req,res)=>{
// res.set("content-type","application/json");
    res.json({
        data:internList,
        message:"Intern List Success"
    })
})



app.listen(port,()=>{
    console.log("Server started at the port :",port);    
})