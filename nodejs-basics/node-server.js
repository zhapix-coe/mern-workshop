const http = require('http');

const server = http.createServer((req,res)=>{
console.log("Processing Request..");

let respHTML = `
<html>
<body style="background-color:green;">
<h2> Hello Message from Server</h2>
</body>
</html>

`;
if(req.url=="/home.html"){
res.end(respHTML);
}





});

server.listen(3232,()=>{
    console.log("Server started in port 3232");
    
});