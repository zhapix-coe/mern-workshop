const express = require("express");
const app = express();
const port  = 5252;


const userList = [];

// To add user data to the User List
const addUser = (userData) => {
  userList.push(userData);
};

// Sample user
const newUser = {
  name: "John",
  age: 20,
};

addUser(newUser);

//Static images / font / css / html - CDN
app.use(express.static("public"));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to IRP program - ExpressJS!')
})


app.get('/user-list', (req, res) => {  
  res.json(userList)
})


// To Simulate an error route
app.get('/error', (req, res, next) => {
  const err = new Error('Something went wrong!');
  err.status = 500;
  next(err); // Pass error to the error handler
});



// Custom error handler middleware (must have 4 args)

const handleError =(err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
}

app.use(handleError);




app.listen(port,()=>{
    console.log("Express Demo Server Started:::5252");    
})


// npm install -g nodemon