const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/v1/mobility', require('./routes/mobilityRoutes'));
app.use('/api/v1/mobility/test', require('./routes/mobilityRoutes'));

app.use('/api/v1/covid', require('./routes/covidRoutes'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
