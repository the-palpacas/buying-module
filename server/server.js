const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('../webpack.config');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/database');

const compiler = webpack(config);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(middleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.listen(8000, () => console.log('Buying module listening on port 8000!'));

app.get('/productID/details', (req, res) => {
  res.status(200).send();
});

