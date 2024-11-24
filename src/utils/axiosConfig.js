import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL + '/api',
});

client.defaults.headers.post['Content-Type'] = 'application/json';
client.defaults.headers.put['Content-Type'] = 'application/json';

export const sendAPIRequest = async config => {
  const response = await client(config);
  console.log(response);

  return response.data?.data;
};
