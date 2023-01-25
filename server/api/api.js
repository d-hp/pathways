const config = require('../util/config');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const fetch = require('node-fetch');
const papa = require('papaparse');
const fs = require('fs');
const path = require('path');

const parseProto = async (ENDPOINT) => {
  const data = [];
  try {
    const res = await fetch(`${ENDPOINT}`, {
      headers: {
        'x-api-key': config.MTA_API_KEY,
      },
    });
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
  let stationIdGenerator = 0;

  stops.forEach((stop, index) => {
    for (let station of stations) {
      if (station.stationName === stop.stop_name) {
        station.stopIds.push(stop.stop_id);
        return;
      }
    }
    const newStation = {
      stationId: stationIdGenerator,
      stationName: stop.stop_name,
      stopIds: [stop.stop_id],
    };
    stationIdGenerator += 1;
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
  let time = timestamp?.toNumber();
  let date = new Date(time * 1000);

  let day = date.get;
  let hours = date.getHours();
  let minutes;
  if (date.getMinutes().toString().length === 1) {
    minutes = '0' + date.getMinutes();
  } else {
    minutes = date.getMinutes().toString();
  }
  let seconds;
  if (date.getSeconds().toString().length === 1) {
    seconds = '0' + date.getSeconds();
  } else {
    seconds = date.getSeconds().toString();
  }

  let regFormat =
    hours + ':' + minutes.substring(-2) + ':' + seconds.substring(-2);

  return regFormat;
};

const calculateArrivals = async (ENDPOINT) => {
  const feed = await parseProto(ENDPOINT);
  let [stations, lines] = await makeLinesAndStations();

  const filteredFeed = feed.filter((entity) => entity.tripUpdate);

  stations = stations.map((station) =>
    Object.assign({}, station, { routes: [] })
  );
  filteredFeed.forEach((entity) => {
    let routeIdOfEntity = entity.tripUpdate.trip.routeId;
    //iterate through the stopTimeUpdates on current entity
    entity.tripUpdate.stopTimeUpdate.forEach((update) => {
      //each UPDATE on the entity should be: parsed for arrival time & stopId

      let arrivalTime = update?.arrival?.time;
      let stopId = update?.stopId;

      //for each update, we still have to find the corresponding
      //station that has this stopId ...
      //check if that station has a route that matches the routeId of entity already
      stations.forEach((station) => {
        //check if any of the stopIds of current station is equal to stopId

        if (station.stopIds.includes(stopId)) {
          //if it is, iterate through the routes array of that station
          //consider substituting this foreach for the routes array into a helper function
          //to simply the logic further allowing us to debug this code and populate list properly
          let hasPushedData = false;
          // let booleanFlag = false;
          station.routes.forEach((route) => {
            //check if any of the route objects have a lineId corresponding to the routeId of our original entity
            if (route.lineId === routeIdOfEntity) {
              //if the route object already exists, simply push the arrivalTime of this update to the arrivals array
              route.arrivals.push(arrivalTime);
              // station.routes.push(route);
              hasPushedData = true;
              // return false;
            }
          });
          if (hasPushedData !== true) {
            newRoute = {
              lineId: routeIdOfEntity,
              arrivals: [],
            };
            newRoute.arrivals.push(arrivalTime);
            // route.push(newRoute);
            station.routes.push(newRoute);
          }
        }
      });
    });
  });
  return stations;
};

const getStationArrivals = async (path) => {
  const endpoints = {
    1: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
    2: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
    3: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
    4: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
    5: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
    6: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
    7: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
    A: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
    C: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
    E: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
    J: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz',
    Z: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz',
    G: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g',
    B: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm',
    D: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm',
    F: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm',
    M: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm',
    N: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw',
    Q: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw',
    R: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw',
    W: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw',
    L: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l',
  };

  let ENDPOINT;

  if (path in endpoints) {
    ENDPOINT = endpoints[path];
  }

  const stations = await calculateArrivals(ENDPOINT);

  // let newStations = stations.map(station => )

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

const singleStationArrivals = async (stationNum, path) => {
  const stations = await getStationArrivals(path);
  console.log(stations);
  let obj = {};

  // const singleStation = stations.filter(
  //   (station) => station.stationId === stationNum
  // );

  stations.forEach((station) => {
    if (station.stationId.toString() === stationNum.toString()) {
      obj = {
        stationId: station.stationId,
        stationName: station.stationName,
        routes: station.routes,
        stopIds: station.stopIds,
      };
    }
  });

  return obj;
};

const getAllPathNames = async (route) => {
  // const linesAndStations = await makeLinesAndStations();
  // const stations = linesAndStations[0];
  const pathList = await parseCSV('path_lists.csv');

  const stationNameList = [];

  pathList.forEach((path) => {
    if (path.path === route) {
      stationNameList.push(path.stationName);
    }
  });

  return stationNameList;
};

module.exports = {
  singleStationArrivals,
  getStationArrivals,
  makeLinesAndStations,
  getAllPathNames,
};
