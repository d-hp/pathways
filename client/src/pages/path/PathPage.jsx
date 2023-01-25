import './PathPage.css';
import { ListItemButton, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import pathService from '../../../services/paths.js';
import stopService from '../../../services/stops.js';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import SingleRoute from '../shared/SingleRoute.jsx';

const PathPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [paths, setPaths] = useState([]);
  const [stops, setStops] = useState([]);

  const { route } = useParams();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    pathService.getPaths(route).then((data) => {
      setPaths(data);
      setSearchResults(data);
    });
    stopService.getStops().then((data) => setStops(data));
  }, []);

  useEffect(() => {
    const results = paths.filter((path) =>
      path.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const matchPathToId = (path) => {
    let stopId;

    stops.forEach((stop) => {
      if (stop.stationName === path) {
        stopId = stop.stationId;
      }
    });

    return stopId;
  };

  return (
    <div>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        padding='5px'
        marginBottom='20px'
      >
        {/* <Typography
          variant='h4'
          sx={{ marginTop: '10px', marginBottom: '60px', fontSize: '1.5rem' }}
          id='title-path'
        >
          {`${route}-LINE`}
        </Typography> */}
        <SingleRoute className='single-route-logo' routeToRender={route} />
        <Box height='40px' width='100%'></Box>
        <TextField
          id='outlined-basic'
          label='Enter station name'
          variant='outlined'
          value={searchTerm}
          onChange={handleSearch}
          className='pathpageinput'
        ></TextField>
        <Box height='40px' width='100%'></Box>
        {searchResults &&
          searchResults.map((path, index) => (
            <ListItemButton
              component={Link}
              to={`stops/${matchPathToId(path)}`}
              key={index}
            >
              {path}
            </ListItemButton>
          ))}
      </Box>
    </div>
  );
};

export default PathPage;
