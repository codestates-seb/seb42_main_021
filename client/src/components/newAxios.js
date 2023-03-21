import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const newAxios = axios.create({
  baseURL: 'http://localhost:3000',
});

newAxios.interceptors.request.use(function (config) {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  //액세스 토큰이 없는 경우
  if (!accessToken) {
    config.headers['Authorization'] = undefined;
    config.headers['Refresh'] = `${refreshToken}`;
    return config;
  }
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    config.headers['Refresh'] = `${refreshToken}`;
    console.log('토큰 존재');
    return config;
  }
});

newAxios.interceptors.response.use(
  function (response) {
    console.log('응답 ok');
    return response;
  },
  async function (error) {
    // const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    const originalConfig = error.config;
    //status가 500이고 아직 서버로 요청을 보내지 않았을 때

    if (error.response.status === 401 && !originalConfig.sent) {
      originalConfig.sent = true;
      try {
        const response = await axios.get(`/carts`, {
          headers: {
            //대신 만료된 액세스 토큰을 넣어주야함
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sImVtYWlsIjoic3NzQHNzcy5jb20iLCJzdWIiOiJzc3NAc3NzLmNvbSIsIm
            lhdCI6MTY3OTM4NjczMywiZXhwIjoxNjc5Mzg4NTMzfQ.kIq1rX5pYmgFQooR2rrEpw6LHPRwLsVEr6DbUzwPkaM`, //토큰 만료시간이 있다면 undefined로 바꾸기
            Refresh: `${refreshToken}`,
          },
        });
        const newAccessToken = response.headers.authorization.slice(7);
        console.log('갱신성공');
        const decodedAccessToken = jwt_decode(newAccessToken);
        const accesseTokenExpire = new Date(decodedAccessToken.exp * 1000);

        Cookies.set('accessToken', newAccessToken, accesseTokenExpire);

        // 원래 요청을실행
        //이전 설정값을 복원하고, 다시 요청하기 위해서 originalConfig를 활용
        return await newAxios.request(originalConfig);
      } catch (error) {
        console.log('토큰 갱신 에러');
      }
    }
    return Promise.reject(error);
  }
);

export default newAxios;

//서버로 요청
//액세스 토큰 값 존재 x =>서버의 401 받기
//401경우 아무 url로 get요청 => 만료된 액세스 토큰 값을 주면 200ok => 다시 액세스 토큰값을 받음
//액세스 토큰 값을 갈아끼우서 다시 서버로 찐 요청

//문제 : 왜 쿠키에 만료값이 제대로 안 들어가지??
//

//eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sImVtYWlsIjoic3NzQHNzcy5jb20iLCJzdWIiOiJzc3NAc3NzLmNvbSIsIm
//lhdCI6MTY3OTM4NjczMywiZXhwIjoxNjc5Mzg4NTMzfQ.kIq1rX5pYmgFQooR2rrEpw6LHPRwLsVEr6DbUzwPkaM
