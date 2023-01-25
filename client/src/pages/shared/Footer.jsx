import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import RouteIcon from '@mui/icons-material/Route';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import { Link } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: '100vw',
        position: 'fixed',
        bottom: '0',
        marginTop: '5px',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to='/'
          label='Home'
          value='Home'
          icon={<HomeIcon />}
          sx={{ color: '#2b6777' }}
        />
        <BottomNavigationAction
          component={Link}
          to='/paths'
          label='Search'
          value='Paths'
          icon={<RouteIcon />}
          sx={{ color: '#2b6777' }}
        />
        <BottomNavigationAction
          component={Link}
          to='/stops'
          label='Login'
          value='Stops'
          icon={<DirectionsTransitIcon />}
          sx={{ color: '#2b6777' }}
        />
      </BottomNavigation>
    </Box>
  );
}
