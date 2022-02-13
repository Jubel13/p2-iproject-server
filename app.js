require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const axios = require("axios");
const CryptoJS = require("./hmac-md5");
const enc = require("./enc-base64-min");
const language = "en-gb";
const mapboxAccessToken = process.env.MAPBOXTOKEN;
const geopifyAPI = process.env.GEOPIFYAPI
const secret_key
enc();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//? Variabel for longitude and latitude
let longitude;
let latitude;

//? Token for API Medic
let token;

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
  var secret_key = process.env.API_MEDIC_SECRET_KEY
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
      token = resp.data.Token;
      console.log(token);
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//get diagnosis
app.post("/diagnosis", (req, res, next) => {
  const { symptoms, gender, yearOfBirth } = req.body;
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

//get longitude and latitude
app.post("/coordinate", (req, res, next) => {
  const { location } = req.body;
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxAccessToken}&limit=1`;

  axios
    .get(url)
    .then((resp) => {
      longitude = resp.data.features[0].center[0];
      latitude = resp.data.features[0].center[1];
      console.log(longitude, latitude);
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get nearby hospital
app.post("/nearby", (req, res, next) => {
  let { radius, categories } = req.body;
  let limit = 20;
  let url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${longitude},${latitude},${radius}&limit=${limit}&apiKey=${geopifyAPI}`;
  axios
    .get(url)
    .then((resp) => {
      console.log(resp.data);
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
