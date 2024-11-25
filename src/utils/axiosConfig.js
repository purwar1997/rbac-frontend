import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api';
axios.defaults.timeout = 2000;
axios.defaults.timeoutErrorMessage =
  'Request timed out. Please try again shortly or check your internet connection.';

export default axios;
