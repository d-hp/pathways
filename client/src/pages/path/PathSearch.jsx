import '.././shared/shared.css';
import { ListItem, ListItemButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import pathService from '../../../services/paths.js';

const PathSearch = ({ stations }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [stops, setStops] = useState(null);
  const [paths, setPaths] = React.useState();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // useEffect(() => {
  //   pathService.getPaths(route).then((data) => setPaths(data));
  // }, []);

  useEffect(() => {
    const results = stations.filter((station) =>
      station.stationName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        padding='5px'
      >
        <Typography
          variant='h4'
          sx={{ marginTop: '10px', marginBottom: '60px' }}
          id='title-search'
        >
          Search for your station:
        </Typography>

        <TextField
          id='outlined-basic'
          label='Enter station name'
          variant='outlined'
          value={searchTerm}
          onChange={handleSearch}
        ></TextField>
        <Box
          id='stop-container'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          {searchResults &&
            searchResults.map((searchResult, idx) => (
              <ListItemButton key={idx}>
                {searchResult.stationName}
              </ListItemButton>
            ))}

          {/* <ListItemButton
            component={Link}
            to={`stops/${matchPathToId(path)}`}
            key={index}
          ></ListItemButton> */}
        </Box>
      </Box>
    </div>
  );
};

export default PathSearch;
