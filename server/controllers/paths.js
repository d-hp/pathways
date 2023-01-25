const pathsRouter = require('express').Router();
const stations = require('../api/api.js');
const stopsRouter = require('./stops.js');

pathsRouter.use('/:path/stops', stopsRouter);

pathsRouter.get('/:path', async (req, res) => {
  // When a user clicks on a path, the id of that path should be sent
  const pathRequested = req.params.path;
  const stationList = await stations.getAllPathNames(pathRequested);
  res.status(200).send(stationList);
  // stationList.forEach((station) => {
  //   pathOfStations.push(station);
  // });
  // res.status(200).json('hello');
});

// pathsRouter.get('/:id', (req, res) => {});

// pathsRouter.post('/', async (req, res) => {});

// pathsRouter.put('/:id', async (req, res) => {});

module.exports = pathsRouter;
