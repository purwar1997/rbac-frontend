import { sendAPIRequest } from '../../utils/axiosConfig';
import { delay } from '../../utils/helperFunctions';

export const login = async username => {
  const config = {
    method: 'get',
    url: `/users/exists?username=${username}`,
  };

  return sendAPIRequest(config);
};

export const logout = async () => {
  await delay(2000);
};

export const fetchLoggedInUser = async id => {
  const config = {
    method: 'get',
    url: `/users/${id}`,
  };

  return sendAPIRequest(config);
};
