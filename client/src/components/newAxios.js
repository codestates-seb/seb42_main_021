import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
const URL = process.env.REACT_APP_SERVER_URI;
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: 'http://15.164.5.43',
});

instance.interceptors.request.use(function (config) {
  const accessToken = Cookies.get('accessToken');

  if (!accessToken) {
    config.headers['Authorization'] = undefined;
    return config;
  }
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  }
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const refreshToken = Cookies.get('refreshToken');
    const originalConfig = error.config;

    if (error.response.status === 401 && !originalConfig.sent) {
      originalConfig.sent = true;

      try {
        const response = await axios.post(
          `${URL}/api/refresh`,
          {},
          {
            headers: {
              Authorization: 'Undefined',
              Refresh: `${refreshToken}`,
            },
          }
        );
        const newAccessToken = response.headers.authorization.slice(7);
        const decodedAccessToken = jwt_decode(newAccessToken);
        const accessTokenExpires = new Date(decodedAccessToken.exp * 1000);

        Cookies.set('accessToken', newAccessToken, {
          expires: accessTokenExpires,
        });
        return await instance.request(originalConfig);
      } catch (error) {
        console.log('토큰 갱신 에러');
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
