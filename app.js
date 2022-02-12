require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const axios = require("axios");
const CryptoJS = require("./hmac-md5");
const enc = require("./enc-base64-min");
const language = "en-gb";
enc();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Get all symptoms
app.post("/symptoms", (req, res, next) => {
  const { token } = req.body;
  let url = `https://sandbox-healthservice.priaid.ch/symptoms?token=${token}&language=${language}`;
  axios
    .get(url)
    .then((resp) => {
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//get token
app.post("/loginToken", (req, res, next) => {
  var uri = "https://sandbox-authservice.priaid.ch/login";
  var secret_key = "Rs35Lba2M8Kkw4Z7W";
  var computedHash = CryptoJS.HmacMD5(uri, secret_key);
  var computedHashString = computedHash.toString(CryptoJS.enc.Base64);

  const config = {
    headers: {
      Authorization: `Bearer jubelsinaga13@gmail.com:${computedHashString}`,
    },
  };

  axios
    .post(uri, {}, config)
    .then((resp) => {
      console.log(resp);
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//get diagnosis
app.post("/diagnosis", (req, res, next) => {
  let { symptoms, gender, yearOfBirth, token } = req.body;
  // let symptoms = [10, 17];
  // let gender = "male";
  // let yearOfBirth = 1992;
  let url = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=${symptoms}&gender=${gender}&year_of_birth=${yearOfBirth}&token=${token}&language=${language}`;
  axios
    .get(url)
    .then((resp) => {
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.listen(port, () => {
  console.log("Server runs on port", port);
});
