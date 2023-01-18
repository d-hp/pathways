import axios from 'axios';
const baseUrl = 'http://localhost:3001/routes';

const getPaths = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getPath = async () => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export default { getPaths, getPath };
