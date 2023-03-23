import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

//라이브러리 이름 수정 =>axios말고
//instance

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use(function (config) {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  if (!accessToken) {
    config.headers['Authorization'] = undefined;
    config.headers['Refresh'] = `${refreshToken}`;
    return config;
  }
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    config.headers['Refresh'] = `${refreshToken}`;
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
          `/api/refresh`,
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
