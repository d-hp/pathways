import axios from 'axios';
const baseUrl = 'http://localhost:3001/paths';

const getPaths = async (path) => {
  // Frontend service that will utilize axios.get to post to the baseUrl and paths endpoint specifically
  const res = await axios.get(`${baseUrl}/${path}`);
  return res.data;
};

export default { getPaths };
