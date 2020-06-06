import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';

const fs = require('fs');
const { google } = require('googleapis');

const app = express();

const port = process.env.PORT || 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

mongoose.connect(process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log(err));

// boiler plate code modified from https://developers.google.com/sheets/api/quickstart/nodejs
let oAuth2Client;

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);

  const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;
  oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0],
  );

  fs.readFile('token.json', (_err, token) => {
    oAuth2Client.setCredentials(JSON.parse(token));
  });
});

app.use('/api/v1/phones', router);

app.use((err, _req, res, next) => {
  res.status(500).json({
    status: 500,
    data: {
      message: 'An error ocurred, please recheck your request parameters, then resend request!',
      error: err,
    },
  });
  next();
});

app.listen(port);

export {
  app,
  oAuth2Client,
  google,
};
