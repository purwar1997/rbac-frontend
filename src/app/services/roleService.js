import { sendAPIRequest } from '../../utils/axiosConfig';

export const fetchRoles = async () => {
  const config = {
    method: 'get',
    url: '/roles',
  };

  return sendAPIRequest(config);
};

export const fetchRoleById = async roleId => {
  const config = {
    method: 'get',
    url: `/roles/${roleId}`,
  };

  return sendAPIRequest(config);
};

export const addNewRole = async roleDetails => {
  const config = {
    method: 'post',
    url: '/roles',
    data: roleDetails,
  };

  return sendAPIRequest(config);
};

export const editRole = async (roleId, updates) => {
  const config = {
    method: 'put',
    url: `/roles/${roleId}`,
    data: updates,
  };

  return sendAPIRequest(config);
};
