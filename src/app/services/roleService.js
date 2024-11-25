import axios from '../../utils/axiosConfig';

export const fetchRoles = async () => {
  const config = {
    method: 'GET',
    url: '/roles',
  };

  return axios(config);
};

export const fetchRoleById = async roleId => {
  const config = {
    method: 'GET',
    url: `/roles/${roleId}`,
  };

  return axios(config);
};

export const addNewRole = async roleDetails => {
  const config = {
    method: 'POST',
    url: '/roles',
    data: roleDetails,
  };

  return axios(config);
};

export const editRole = async ({ roleId, updates }) => {
  const config = {
    method: 'PUT',
    url: `/roles/${roleId}`,
    data: updates,
  };

  return axios(config);
};
