const config = require('../util/config');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const fetch = require('node-fetch');
const papa = require('papaparse');
const fs = require('fs');
const path = require('path');

const parseProto = async () => {
  const data = [];
  try {
    const res = await fetch(
      'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
      {
        headers: {
          'x-api-key': config.MTA_API_KEY,
        },
      }
    );
    if (!res.ok) {
      //if fetch was not successful -> return error
      const err = new Error(`${res.url}: ${res.status} ${res.statusText}`);
      err.response = res;
      throw err;
      process.exit(1); //1 indicates exit with failure
    }
    //if fetch was successful, parse the responce using arrayBuffer()
    const buffer = await res.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer)
    );
    //parse through the decoded protocol buffer that is now of array type
    feed.entity.forEach((entity) => {
      //if the tripUpdate field exists on a particular entity
      if (entity) {
        data.push(entity);
      }
    });
    //return our data array containing all entities provided by api
    return data;
  } catch (exception) {
    console.log(exception);
    process.exit(1); //1 indicates exit with failure
  }
};

const parseCSV = async (fileName) => {
  const file = await fs.createReadStream(
    path.resolve(__dirname, `../util/static/${fileName}`)
  );

  return new Promise((resolve, reject) => {
    papa.parse(file, {
      header: true,
      complete: (results, file) => {
        resolve(results.data);
      },
      error: (err, file) => {
        reject(err);
      },
    });
  });
};

const makeLinesAndStations = async () => {
  //initialize data structure to store desired output
  let stations = [];
  let lines = [];
  //parse static files provided by GTFS
  const routes = await parseCSV('routes.csv');
  const stops = await parseCSV('stops.csv');
  //iterate through stops array
  stops.forEach((stop, index) => {
    for (let station of stations) {
      if (station.stationName === stop.stop_name) {
        station.stopIds.push(stop.stop_id);
        return;
      }
    }
    const newStation = {
      stationId: index,
      stationName: stop.stop_name,
      stopIds: [stop.stop_id],
    };
    stations.push(newStation);
  });
  //iterate through routes array
  routes.forEach((route) => {
    const newLine = {
      lineId: route.route_id,
      color: route.route_color,
    };
    lines.push(newLine);
  });

  const data = [stations, lines];
  return data;
};

const unixTimeToReg = (timestamp) => {
  let time = timestamp.toNumber();
  let date = new Date(time * 1000);

  let day = date.get;
  let hours = date.getHours();
  let minutes = '0' + date.getMinutes();
  let seconds = '0' + date.getSeconds();

  let regFormat =
    hours + ':' + minutes.substring(-2) + ':' + seconds.substring(-2);

  return regFormat;
};

const calculateArrivals = async () => {
  const feed = await parseProto();
  let [stations, lines] = await makeLinesAndStations();

  const filteredFeed = feed.filter((entity) => entity.tripUpdate);

  stations = stations.map((station) =>
    Object.assign({}, station, { routes: [] })
  );

  filteredFeed.forEach((entity) => {
    const routeIdOfEntity = entity.tripUpdate.trip.routeId;
    //iterate through the stopTimeUpdates on current entity
    entity.tripUpdate.stopTimeUpdate.forEach((update) => {
      //each UPDATE on the entity should be:
      //parsed for arrival time & stopId
      // const arrivalTime = unixTimeToReg(update.arrival.time);
      const arrivalTime = update.arrival.time;
      const stopId = update.stopId;
      //for each update, we still have to find the corresponding
      //station that has this stopId ...
      //check if that station has a route that matches the
      //routeId of entity already
      stations.forEach((station) => {
        //check if any of the stopIds of current station is equal to stopId
        if (station.stopIds.includes(stopId)) {
          if (station.routes.length >= 1) {
            //if it is, iterate through the routes array of that station
            station.routes.forEach((route) => {
              //check if any of the route objects have a lineId corresponding to the routeId of our original entity
              if (route.lineId === routeIdOfEntity) {
                //if the route object already exists, simply push the arrivalTime of this update to the arrivals array
                route.arrivals.push(arrivalTime);
              } else {
                //otherwise, create a new route object with that lineId & arrival-time, and push that to this stations routes field
                let newRoute = {
                  lineId: routeIdOfEntity,
                  arrivals: [arrivalTime],
                };
                station.routes.push(newRoute);
              }
            });
          } else {
            let newRoute = {
              lineId: routeIdOfEntity,
              arrivals: [arrivalTime],
            };
            station.routes.push(newRoute);
          }
        }
      });
    });
  });
  return stations;
};

const getStationArrivals = async () => {
  const stations = await calculateArrivals();

  stations.forEach((station) => {
    if (station.routes.length >= 1) {
      station.routes.forEach((route) => {
        route.arrivals.sort((a, b) => a - b);
        route.arrivals.forEach((arrival, index) => {
          route.arrivals[index] = unixTimeToReg(arrival);
        });
      });
    }
  });
  return stations;
};

module.exports = getStationArrivals;
