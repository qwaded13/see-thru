const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Information = require('./dbLoader')
const cors = require('cors')

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const apiPassword = process.env.SHOPIFY_API_PASSWORD;
const scopes = 'read_products';
const forwardingAddress = "https://4accd955.ngrok.io"; // Replace this with your HTTPS Forwarding address
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan('dev'))


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getScripts', (req, res) => {
  
  let options = {
    uri: `https://${apiKey}:${apiPassword}@withseethru.myshopify.com/admin/api/2019-07/script_tags.json`,
    json: true
  }

  request(options)
    .then((response) => {
      res.send(response)
    }
  )
});

app.get('/addScript', (req, res) => {

  let options = {
    method: 'POST',
    uri: `https://${apiKey}:${apiPassword}@withseethru.myshopify.com/admin/api/2019-07/script_tags.json`,
    body: {
      "script_tag": {
        "event": "onload",
        "src": "https://drive.google.com/uc?export=view&id=1LERTRu2ZxRlBIrL1Ib9LY0zcdumW3ROz"
      }
    },
    json: true
  }

  request(options)
    .then((response) => {
      res.send(response)
    }
  )
});

app.get('/removeScript', (req, res) => {
  let options = {
    method: 'DELETE',
    uri: `https://${apiKey}:${apiPassword}@withseethru.myshopify.com/admin/api/2019-07/script_tags/31385976879.json`
  }

  request(options)
    .then((response) => {
      res.send(response)
    }
  )
});

app.get('/getDescription', (req, res) => {
  let ingredient = req.query.item
  console.log(ingredient)
  Information.findOne({
      attributes: ['description'],
      where: {
        ingredient: ingredient
      }
    }).then(({dataValues}) => {
      console.log('results from query', dataValues.description);
      res.header("Access-Control-Allow-Origin", "*");
      res.send(dataValues.description)
    }).catch((err) => console.log(err))
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});