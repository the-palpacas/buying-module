const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/database');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/:id', express.static(path.resolve(__dirname, './../public/dist')));

app.listen(8000, () => console.log('Buying module listening on port 8000!'));

app.get('/:id', (req, res) => {
  db.retrieve(req.params.id, (err, result) => {
    if (err) {
      res.sendStatus(500);
      throw err;
    } else {
      res.json(result);
    }
  });
});
