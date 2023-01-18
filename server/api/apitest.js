const config = require('../util/config');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const fetch = require('node-fetch');
const papa = require('papaparse');
const fs = require('fs');
const path = require('path');

const processProto = async () => {
  //make a fetch request to the google transit system to get the data
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

processProto().then((data) => console.log(data));

// const parseCSV = () => {
//     const file = await fs.createReadStream(
//       path.resolve(__dirname, `../util/static/${fileName}`)
//     );

//     return new Promise((resolve, reject) => {
//       papa.parse(file, {
//         header: true,
//         complete: (results, file) => {
//           resolve(results.data);
//         },
//         error: (err, file) => {
//           reject(err);
//         },
//       });
//     });
//   };
// })

const createData = async () => {
  onst makeLinesAndStations = async () => {
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


}
