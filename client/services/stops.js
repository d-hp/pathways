import axios from 'axios';
const baseUrl = 'http://localhost:3001';

const getStop = async (stop, path) => {
  const res = await axios.get(`${baseUrl}/paths/${path}/stops/${stop}`);
  return res.data;
};

const getStops = async () => {
  const res = await axios.get(`${baseUrl}/stops`);
  return res.data;
};

export default { getStops, getStop };
