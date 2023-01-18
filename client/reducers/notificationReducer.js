import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    setNotification(state, action) {
      return [action.payload.notification, action.payload.type];
    },
  },
});

export const { setNotification } = notificationSlice.actions;

let timeoutId = null;

export const createNotification = (notification, time, type) => {
  return (dispatch) => {
    dispatch(setNotification({ notification, type }));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch(setNotification([]));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
