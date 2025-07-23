const http = require("http");

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

const server = http.createServer((req, res) => {
  console.log("Processing Request..");

  if (req.url == "/home.html"  && req.method == "GET") {
    let respHTML = `
    <html>
    <body style="background-color:green;">
    <h2> Hello Message from Node Server</h2>
    </body>
    </html>
    `;
    res.end(respHTML);
    
  } else if (req.url == "/user-list" && req.method == "GET") {
    res.end(JSON.stringify(userList));

  } else if (req.url === "/add-user" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const { name, age } = JSON.parse(body);
        addUser({ name, age });
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User added" }));
      } catch (err) {
        res.writeHead(400);
        res.end("Invalid JSON");
      }
    });
  
} else {
    res.writeHead(404);
    res.end("Route not found");
  }
});

server.listen(3232, () => {
  console.log("Server started in port 3232");
});
