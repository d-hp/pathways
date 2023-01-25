const config = require('./util/config');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const pathsRouter = require('./controllers/paths');
const stopsRouter = require('./controllers/stops');

const cron = require('node-cron');

//serve static folders from public repository
// app.use('/', express.static(path.join(__dirname, 'public')));

//set cors options
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    callback(null, true);
  },
};

//enable middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('tiny'));

//setup routers
app.use('/paths', pathsRouter);
app.use('/stops', stopsRouter);

//setup root route get handler
// app.get('/', async (req, res) => {
//   res.locals.arrivals = await getStationArrivals();
//   res.status(200).json(res.locals.arrivals);
// });

//unknown endpoint handler
app.get('*', (req, res) => {
  res.status(404).json('404 Error: Unknown endpoint');
});

module.exports = app;

/* Schedule jobs using cron to make requests to external API at fixed intervals

getStationArrivals().then((data) => {
  console.log(data);
});

cron.schedule('* * * * *', () => {

  make request to the external API
  check if data is received, if not, do something
  else if data is received, scrub the data to match db schema
  insert into db

}); */
