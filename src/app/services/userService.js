import axios from '../../utils/axiosConfig';

export const fetchUsers = async () => {
  const config = {
    method: 'GET',
    url: '/users',
  };

  return axios(config);
};

export const fetchUserById = async userId => {
  const config = {
    method: 'GET',
    url: `/users/${userId}`,
  };

  return axios(config);
};

export const addNewUser = async userDetails => {
  const config = {
    method: 'POST',
    url: '/users',
    data: userDetails,
  };

  return axios(config);
};

export const editUser = async ({ userId, updates }) => {
  const config = {
    method: 'PUT',
    url: `/users/${userId}`,
    data: updates,
  };

  return axios(config);
};

export const deleteUser = async userId => {
  const config = {
    method: 'DELETE',
    url: `/users/${userId}`,
  };

  return axios(config);
};

export const activateUser = async userId => {
  const config = {
    method: 'PUT',
    url: `/users/${userId}/activate`,
  };

  return axios(config);
};

export const deactivateUser = async userId => {
  const config = {
    method: 'PUT',
    url: `/users/${userId}/deactivate`,
  };

  return axios(config);
};

export const archiveUser = async userId => {
  const config = {
    method: 'PUT',
    url: `/users/${userId}/archive`,
  };

  return axios(config);
};

export const restoreUser = async userId => {
  const config = {
    method: 'PUT',
    url: `/users/${userId}/restore`,
  };

  return axios(config);
};
