const express = require("express");
const cors = require('cors');
const app=express();
const port=3112;

const internList = [];

const TestIntern = {
    internId:1,
    internName:'Samruthha',
    internEmail: 'sam@gmail.com',
    internPhone:9342015368,
    internStatus: 'Active'
}

const addIntern= (internDetail)=>{
    internList.push(internDetail);
}


addIntern(TestIntern);

app.use(cors());
app.use(express.json());


//read data
app.get('/interns',(req,res)=>{
    res.json({
data:internList,
message:"Intern List Success"
    })
})

// Create an intern
app.post("/interns", (req, res) => {
    console.log(req.body);
    
  const { internName, internEmail,internPhone,internStatus } = req.body;
  const newInternId = internList.length + 1;
  addIntern({ internId: newInternId, internName, internEmail,internPhone,internStatus });
  res.status(200).send({ message: `Name:${internName} is added Succcessfully!` });
});
app.listen(port,()=>{
    console.log("Server started at port:" ,port);
})

// To Update a Intern data. 
app.put("/interns/:id", (req, res) => {
  console.log("Entering into Update Intern");
  
  const internId = parseInt(req.params.id);
  const { internName, internEmail,internPhone,internStatus } = req.body;
  const internData = internList.find((curintern) => curintern.internId == internId);
  internData.internName = internName;
  internData.internEmail = internEmail;
  internData.internPhone = internPhone;
  internData.internStatus = internStatus;
  res.json({ message: `Name:${internName} is updated Succcessfully!` });
});
  


// To delete an intern
app.delete("/interns/:id", (req, res) => {
  const internId = req.params.id;
  const internIndex = internList.findIndex((curintern) => curintern.internId == internId);

  const deletedintern = internList.splice(internIndex, 1)[0];
  console.log("deletedintern:",deletedintern);
  
  res.json({
      message: `Name:${deletedintern.internName} is deleted Succcessfully!`,
    });
  
});
