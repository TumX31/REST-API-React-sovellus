// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const athletesRouter = require('./routes/athletes');
app.use('/api/athletes', athletesRouter);

// health
app.get('/', (req, res) => res.send('Athletes API is running'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
