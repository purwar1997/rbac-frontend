import { PERMISSIONS } from '../constants';

const { VIEW_USERS, ADD_USER, EDIT_USER, VIEW_ROLES, ADD_ROLE, EDIT_ROLE } = PERMISSIONS;

export const getRouteActions = id => ({
  '/': VIEW_USERS,
  '/users/add': ADD_USER,
  [`/users/${id}/edit`]: EDIT_USER,
  '/roles': VIEW_ROLES,
  '/roles/add': ADD_ROLE,
  [`/roles/${id}/edit`]: EDIT_ROLE,
});
