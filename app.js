const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const client = require("@mailchimp/mailchimp_marketing");
const app = express();


client.setConfig({
  apiKey: "f2068650e555e518df5e9c99a1e8bf3a-us17",
  server: "us17",
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  const run = async () => {
    const response = await client.lists.addListMember("fc026ea79f", {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    }
  );
    console.log(response.status)
    if (response.status === "subscribed") {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    console.log(response);


  };
  run();
});




app.listen(process.env.PORT || 3000, function() {
  console.log("Server is on");
})
//f2068650e555e518df5e9c99a1e8bf3a-us17

//fc026ea79f
