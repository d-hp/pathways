import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import pathService from '../services/paths';
import HomePage from './pages/home/HomePage.jsx';
import PathPage from './pages/path/PathPage.jsx';
import StopPage from './pages/stop/StopPage.jsx';
import TripPage from './pages/trip/TripPage.jsx';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import SimpleBottomNavigation from './pages/shared/Footer.jsx';

const App = () => {
  return (
    <Container maxWidth={false}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        minHeight='100vh'
      >
        <Typography
          variant='h3'
          component='h1'
          id='title'
          sx={{ marginBottom: '95px' }}
        >
          pathways.nyc
        </Typography>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/paths' element={<PathPage />} />
          <Route path='/stops' element={<StopPage />} />
          <Route path='/' element={<TripPage />} />
        </Routes>
        <SimpleBottomNavigation />
      </Box>
    </Container>
  );
};

export default App;
