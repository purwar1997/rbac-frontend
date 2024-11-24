import { sendAPIRequest } from '../../utils/axiosConfig';

export const fetchUsers = async () => {
  const config = {
    method: 'get',
    url: '/users',
  };

  return sendAPIRequest(config);
};

export const fetchUserById = async userId => {
  const config = {
    method: 'get',
    url: `/users/${userId}`,
  };

  return sendAPIRequest(config);
};

export const addNewUser = async userDetails => {
  const config = {
    method: 'post',
    url: '/users',
    data: userDetails,
  };

  return sendAPIRequest(config);
};

export const editUser = async (userId, updates) => {
  const config = {
    method: 'put',
    url: `/users/${userId}`,
    data: updates,
  };

  return sendAPIRequest(config);
};

export const deleteUser = async userId => {
  const config = {
    method: 'delete',
    url: `/users/${userId}`,
  };

  return sendAPIRequest(config);
};

export const activateUser = async userId => {
  const config = {
    method: 'put',
    url: `/users/${userId}/activate`,
  };

  return sendAPIRequest(config);
};

export const deactivateUser = async userId => {
  const config = {
    method: 'put',
    url: `/users/${userId}/deactivate`,
  };

  return sendAPIRequest(config);
};

export const archiveUser = async userId => {
  const config = {
    method: 'put',
    url: `/users/${userId}/archive`,
  };

  return sendAPIRequest(config);
};

export const restoreUser = async userId => {
  const config = {
    method: 'put',
    url: `/users/${userId}/restore`,
  };

  return sendAPIRequest(config);
};
