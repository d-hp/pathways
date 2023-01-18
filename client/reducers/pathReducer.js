import { createSlice } from '@reduxjs/toolkit';
import pathService from '../services/paths.js';

const pathSlice = createSlice({
  name: 'paths',
  initialState: [],
  reducers: {
    setPaths(state, action) {
      return action.payload;
    },
    addPath(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { setPaths, addPath } = pathSlice.actions;

export const initializePaths = () => {
  return async (dispatch) => {
    const paths = await pathService.getAll();
    dispatch(setPaths(paths));
  };
};

export default pathSlice.reducer;
