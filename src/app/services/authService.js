import axios from '../../utils/axiosConfig';
import { delay } from '../../utils/helperFunctions';

export const login = async username => {
  const config = {
    method: 'GET',
    url: `/users/exists?username=${username}`,
  };

  return axios(config);
};

export const logout = async () => {
  await delay(2000);
};

export const fetchLoggedInUser = async userId => {
  const config = {
    method: 'GET',
    url: `/users/${userId}`,
  };

  return axios(config);
};
