import './StopPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import stopService from '../../../services/stops.js';
import { Container, ListItem, ListItemButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import SingleRoute from '../shared/SingleRoute.jsx';

const StopPage = () => {
  const [station, setStation] = useState(null);
  const [arrivals, setArrivals] = useState(null);
  const [etas, setEtas] = useState(null);
  const { stop, route } = useParams();

  useEffect(() => {
    stopService.getStop(stop, route).then((data) => {
      setArrivals(data[0]);
      setStation(data[1]);
      setEtas(data[2]);
    });
  }, []);

  return (
    <div>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <SingleRoute routeToRender={route} />

        <Typography
          variant='h4'
          sx={{ marginTop: '10px', marginBottom: '60px' }}
          id='title-stop'
        >
          {station ? station : null}
        </Typography>
        <Box className='box-with-col'>
          <Typography
            variant='h7'
            sx={{ marginTop: '70px', marginBottom: '20px' }}
            className='stop-col-title'
          >
            Arriving in:
          </Typography>
          <Typography
            variant='h7'
            sx={{ marginTop: '35px', marginBottom: '20px' }}
            className='stop-col-title'
          >
            Time (ETA):
          </Typography>
        </Box>

        {arrivals &&
          arrivals
            .filter((arrival) => isNaN(arrival))
            .map((arrival, idx) => (
              <Box
                display='flex'
                key={idx}
                justifyContent='space-between'
                padding='20px'
                className='data-box'
              >
                <ListItemButton className='list-item-button'>{`${etas[idx]} minutes`}</ListItemButton>
                <ListItemButton className='list-item-button'>{`${arrival}`}</ListItemButton>
              </Box>
            ))}
      </Box>
    </div>
  );
};

export default StopPage;
