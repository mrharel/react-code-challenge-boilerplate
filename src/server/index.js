const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const chalk = require('chalk');
const apiRoutes = require('./api');
const webpackConfig = require('./webpack.dev');


const PORT = 8080;
const BODY_LIMIT = '5000kb';
const STATIC_PATH = '/static';

// initializing the server
const app = express();

// setting the app port
app.set('port', PORT);

// initializing the body parser size limit
app.use(bodyParser.json({
  limit: BODY_LIMIT,
}));

// setting the static directory
app.use(STATIC_PATH, express.static(path.join(__dirname, 'static'), { maxAge: 31557600000 }));

// API Routes
app.use('/api', apiRoutes);

// Webpack
const compiler = webpack(webpackConfig);
const middlerware = webpackDevMiddleware(compiler, {
  noInfo: true,
  silent: true,
  stats: 'errors-only',
});

app.use(middlerware);

app.get('*', (req, res) => {
  // webpackDevMiddleware uses memory-fs internally to store build artifacts
  const fs = middlerware.fileSystem;
  fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});

app.listen(app.get('port'), () => {
  console.log(`${chalk.green('✓')} App is running at http://localhost:${app.get('port')}`); // eslint-disable-line
});
