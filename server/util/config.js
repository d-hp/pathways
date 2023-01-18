require('dotenv').config({ path: './.env' });

const MTA_API_KEY = process.env.MTA_API_KEY;
const PORT = process.env.PORT;

module.exports = { MTA_API_KEY, PORT };
