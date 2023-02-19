const express = require("express");
const https = require("https");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
  const url = "https://v2.jokeapi.dev/joke/Programming";
  https.get(url, function(response) {
    response.on("data", function(data) {

      const jokePattern = JSON.parse(data);
      let firstPart;

      if (jokePattern.type === "twopart") {

        firstPart = JSON.stringify(jokePattern.setup);
        firstPart = firstPart.substring(1, firstPart.length - 1);

        let secondPart = JSON.stringify(jokePattern.delivery);
        secondPart = secondPart.substring(1, secondPart.length - 1);

        res.render("index", {
          firstPartInIndexEjs: firstPart,
          secondPartInIndexEjs: secondPart
        });

      } else {

        firstPart = JSON.stringify(jokePattern.joke);
        firstPart = firstPart.substring(1, firstPart.length - 1);

        res.render("index", {
          firstPartInIndexEjs: firstPart,
          secondPartInIndexEjs: ""
        });
      }

    });
  });
});

app.post("/", function(req, response) {
  response.redirect("/");
});

app.listen(process.env.PORT || 80, function() {
  console.log("Server is running on port 80.");
})
