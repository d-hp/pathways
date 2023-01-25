const stopsRouter = require('express').Router({ mergeParams: true });
const stations = require('../api/api.js');
const moment = require('moment');

stopsRouter.get('/:stop', async (req, res) => {
  const stop = req.params.stop;
  const path = req.params.path;
  // console.log('stop', stop);
  const data = await stations.singleStationArrivals(stop, path);
  // console.log('data', data);
  const singleStation = data;

  singleStation.routes.forEach((route) => {
    if (route.lineId === path) {
      res.locals.exactArrivals = route.arrivals;
    }
  });

  const getCurrentTime = (arrivalTime) => {
    let currentTime = new Date();

    let hours = currentTime.getHours();

    let minutes;
    if (currentTime.getMinutes().toString().length === 1) {
      minutes = '0' + currentTime.getMinutes();
    } else {
      minutes = currentTime.getMinutes().toString();
    }

    let seconds;
    if (currentTime.getSeconds().toString().length === 1) {
      seconds = '0' + currentTime.getSeconds();
    } else {
      seconds = currentTime.getSeconds().toString();
    }

    let regFormat =
      hours + ':' + minutes.substring(-2) + ':' + seconds.substring(-2);

    let moment1 = moment(regFormat, 'hh:mm:ss');
    // console.log('moment1', moment1);
    let moment2 = moment(arrivalTime, 'hh:mm:ss');
    // console.log('moment2', moment2);
    let etaCalc = moment2.diff(moment1, 'minutes');
    // console.log('etaCalc', etaCalc);

    if (etaCalc < 0 || etaCalc == null) {
      etaCalc = 0;
    }

    return etaCalc;
  };

  // console.log('res.locals.exactArrivals', res.locals.exactArrivals);

  res.locals.etas = [];
  res.locals.exactArrivals.forEach((arrival) => {
    res.locals.etas.push(getCurrentTime(arrival));
  });
  // console.log('singleStation', singleStation);
  res
    .status(200)
    .send([
      res.locals.exactArrivals,
      singleStation.stationName,
      res.locals.etas,
    ]);
});

stopsRouter.get('/', async (req, res) => {
  const data = await stations.makeLinesAndStations();
  const stationList = data[0];
  res.status(200).send(stationList);
});

// stopsRouter.get('/:id', (req, res) => {});

// stopsRouter.post('/', async (req, res) => {});

// stopsRouter.put('/:id', async (req, res) => {});

module.exports = stopsRouter;
