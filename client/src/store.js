import { configureStore } from '@reduxjs/toolkit';

import pathReducer from '../reducers/pathReducer';
import notificationReducer from '../reducers/notificationReducer';

export default configureStore({
  reducer: {
    paths: pathReducer,
    notification: notificationReducer,
  },
});
