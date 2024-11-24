export const PERMISSIONS = Object.freeze({
  VIEW_USERS: 'view_users',
  ADD_USER: 'add_user',
  EDIT_USER: 'edit_user',
  DELETE_USER: 'delete_user',
  ACTIVATE_USER: 'activate_user',
  DEACTIVATE_USER: 'deactivate_user',
  ARCHIVE_USER: 'archive_user',
  RESTORE_USER: 'restore_user',
  VIEW_ROLES: 'view_roles',
  ADD_ROLE: 'add_role',
  EDIT_ROLE: 'edit_role',
});

export const PERMISSIONS_DESCRIPTION = Object.freeze({
  [PERMISSIONS.VIEW_USERS]: 'View users',
  [PERMISSIONS.ADD_USER]: 'Add a new user',
  [PERMISSIONS.EDIT_USER]: 'Edit a user',
  [PERMISSIONS.DELETE_USER]: 'Delete a user',
  [PERMISSIONS.ACTIVATE_USER]: 'Activate a user',
  [PERMISSIONS.DEACTIVATE_USER]: 'Deactivate a user',
  [PERMISSIONS.ARCHIVE_USER]: 'Archive a user',
  [PERMISSIONS.RESTORE_USER]: 'Restore an archived user',
  [PERMISSIONS.VIEW_ROLES]: 'View roles',
  [PERMISSIONS.ADD_ROLE]: 'Add a new role',
  [PERMISSIONS.EDIT_ROLE]: 'Edit a role',
});
