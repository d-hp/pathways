import axios from 'axios';
const baseUrl = 'http://localhost:3001/routes';

const getStops = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getStop = async () => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export default { getStops, getStop };
