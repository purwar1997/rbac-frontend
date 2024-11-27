import axios from './axiosConfig';

export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const delay = milliSeconds => {
  return new Promise(resolve => {
    setTimeout(resolve, milliSeconds);
  });
};

export const isUserAllowed = (user, action) => user.role.permissions.includes(action);

export const handleClickOutside = (event, closeModal) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

export const handleAsyncThunks =
  apiService =>
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiService(data);
      return response?.data?.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = {
          status: error.response.status,
          data: error.response.data,
        };

        return rejectWithValue(errorData);
      }
    }
  };
