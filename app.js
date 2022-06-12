//jshint esversion: 6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const {exit} = require("process");
const e = require("express");
const page = __dirname;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(page + "/index.html");
})

app.get("/signup", (req, res) => {
    res.sendFile(page + "/signup.html");
})

app.post("/createSomeone", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/a1167b1a39";

    const options = {
        method: "POST",
        auth: "calvinpark1:cd5affebdab812c1644a9413a7f184ea-us8"
    }

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(page + "/success.html");
        } else {
            res.sendFile(page + "/failure.html");
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    // request.write(jsonData);
    request.end();
})

app.post("/failure", (req, res) => {
  res.redirect("/signup");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is ruuning on port 3000");
})

//mailchamp API cd5affebdab812c1644a9413a7f184ea-us8 List id a1167b1a39