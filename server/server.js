const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const queueRoute = require('./routes/queue.route.js');
const gameRoute = require('./routes/game.route.js');

app.use(cors());
app.use(bodyParser.json());
app.use('/queue', queueRoute);
app.use('/game', gameRoute);

app.listen(4000);