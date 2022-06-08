let express = require('express');
let app = express();
let bodyParser = require("body-parser");
require('dotenv').config();

console.log("Hello World");

app.use(bodyParser.urlencoded({extended: false}));

app.post("/name", (req, res) => {
    res.json({
        name: req.body.first + " " + req.body.last,
    })
})

app.use((req, res, next) => {
    let string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
  });

  app.get("/:word/echo", (req, res) => {
    const {word} = req.params;
    res.json({
      echo: word
    });
  });
  
    app.get("/name", (req, res) => {
        const firstname = req.query.first;
        const lastname = req.query.last;
        res.json({
            name: `${firstname} ${lastname}`
        })
        })

  app.get(
    "/now",
    (req, res, next) => {
      req.time = new Date().toString();
      next();
    },
    (req, res) => {
      res.send({
        time: req.time
      });
    }
  );  

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  res.json({
    "message": (process.env.MESSAGE_STYLE == "uppercase")?"HELLO JSON": "Hello json"
  })
})































 module.exports = app;
