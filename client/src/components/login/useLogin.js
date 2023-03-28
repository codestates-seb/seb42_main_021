import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

axios.defaults.withCredentials = true;

const useLogin = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();
  const  [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const invalidMessage = !isDirty ? undefined : errors.email ? 'true' : 'false';

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`http://15.164.5.43/members/login`, {
        email: data.email,
        password: data.password,
      });
      console.log(res);
      const headers = res.headers.get();
      console.log(headers);
      const decodedAccessToken = jwt_decode(res.headers.authorization);
      const decodedRefreshToken = jwt_decode(res.headers.refresh);
      const accesseTokenExpire = new Date(decodedAccessToken.exp * 1000);
      const refreshTokenExpire = new Date(decodedRefreshToken.exp * 1000);

      setCookie('accessToken', res.headers.authorization.slice(7), {
        expires: accesseTokenExpire,
      });
      setCookie('refreshToken', res.headers.refresh, {
        expires: refreshTokenExpire,
      });
      navigate('../product');
    } catch (error) {
      if (error.response.status === 401) {
        setModalOpen(true);
      }
    }
  };

  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
    isDirty,
    isSubmitting,
    ModalOpen: modalOpen,
    invalidMessage,
  };
};

export default useLogin;
