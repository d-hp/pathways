import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import HomePage from './pages/home/HomePage.jsx';
import PathPage from './pages/path/PathPage.jsx';
import PathSearch from './pages/path/PathSearch.jsx';
import StopPage from './pages/stop/StopPage.jsx';
import TripPage from './pages/trip/TripPage.jsx';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import SimpleBottomNavigation from './pages/shared/Footer.jsx';
import { useEffect, useState } from 'react';
import stopService from '../services/stops.js';

const App = () => {
  const [stationList, setStationList] = useState(null);
  useEffect(() => {
    stopService.getStops().then((data) => setStationList(data));
  }, []);

  return (
    <Container>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        minHeight='100vh'
        marginBottom='75px'
      >
        <Typography
          variant='h3'
          component={Link}
          id='title'
          sx={{ marginBottom: '70px' }}
          to={`/`}
        >
          pathways.nyc
        </Typography>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/paths'
            element={<PathSearch stations={stationList} />}
          />
          <Route path='/paths/:route' element={<PathPage />} />
          <Route path='/paths/:route/stops/:stop' element={<StopPage />} />
          <Route path='/' element={<TripPage />} />
        </Routes>
        <SimpleBottomNavigation />
      </Box>
    </Container>
  );
};

export default App;
