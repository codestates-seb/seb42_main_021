import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Main from '../components/main/Main';
import MainHeader from '../components/main/MainHeader';
import logo1 from '../img/logo1.png';
import axios from 'axios';

const LoginLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  padding-left: 16px;
  padding-right: 16px;

  ::-webkit-scrollbar {
    display: none;
  }

  .moveSingup {
    margin-top: 30px;
    font-size: 13px;
    color: var(--grayblue);
    border-bottom: 1px solid var(--grayblue);
  }
`;
const LogoImgBox = styled.img`
  width: 200px;
  margin-bottom: 30px;
`;

const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginInputBox = styled.input`
  width: 400px;
  height: 40px;
  border: none;
  border-bottom: 2px solid var(--midgray);
  font-size: 20px;
  :focus {
    outline: none;
    border: 2px solid var(--blue);
    border-radius: var(--bd-rd);
    box-shadow: 5px 3px 3px var(--blue200);
  }
  :nth-child(n + 2) {
    margin-top: 30px;
  }
`;
const LoginSubmitBox = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 50px;
  border-radius: var(--bd-rd);
  background-color: var(--blue);
  font-size: 20px;
  color: var(--white);
  font-weight: 600;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 15px;
  margin-top: 10px;
`;

const OathLogin = styled.div`
  display: flex;
  width: 400px;
  padding: 5px;
  margin-top: 40px;
  justify-content: space-between;
  align-content: center;
  .googleLogin,
  .githubLogin {
    font-size: 15px;
    width: 180px;
    padding: 10px;
    border: 2px solid var(--midgray);
    border-radius: var(--bd-rd);
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`/members/login`, {
        email: data.email,
        password: data.password,
      });
      const decodedToken = jwt_decode(res.headers.authorization);
      const expire = new Date(decodedToken.exp * 1000);
      Cookies.set('accessToken', res.headers.authorization, true, {
        expire: expire,
      });
      Cookies.set('refreshToken', res.headers.refresh, true, {
        expire: expire,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <MainHeader />
      <LoginLayout>
        <LogoImgBox src={logo1} />
        <LoginContainer onSubmit={handleSubmit(onSubmit)}>
          <LoginInputBox
            type="email"
            placeholder="abc@chachapark.com"
            name="email"
            autoComplete="on"
            aria-invalid={
              !isDirty ? undefined : errors.email ? 'true' : 'false'
            }
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value:
                  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
                message: '이메일 형식에 맞지 않습니다.',
              },
            })}
          />
          {errors.email && (
            <ErrorMsg role="alert">{errors.email.message}</ErrorMsg>
          )}
          <LoginInputBox
            name="password"
            type="password"
            placeholder="****************"
            autoComplete="on"
            aria-invalid={
              !isDirty ? undefined : errors.password ? 'true' : 'false'
            }
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 8,
                message: '8자리 이상 비밀번호를 사용하세요.',
              },
            })}
          />
          {errors.password && (
            <ErrorMsg role="alert">{errors.password.message}</ErrorMsg>
          )}
          <OathLogin>
            <div className="googleLogin">
              <FcGoogle /> Log in with Google
            </div>
            <div className="githubLogin">
              <FaGithub /> Log in with Github
            </div>
          </OathLogin>
          <LoginSubmitBox type="submit" disabled={isSubmitting}>
            로그인
          </LoginSubmitBox>
        </LoginContainer>
        <Link to="/singup" className="moveSingup">
          회원가입
        </Link>
      </LoginLayout>
    </Main>
  );
};

export default Login;

//로그인 데이터를 서버에 post한다
//서버에서 액세스토큰과 리프레시토큰을 받아 저장한다(아마 쿠키)

//또 다른 api.js 를 만든다
//api.js 에서는 axios.create , interceptors(?)를 이용하여 액세스토큰이 만료되면 자동으로 토큰들을 서버에 주는 로직을 담고있다
//로그인 한 유저가 액세스토큰값이 있어야만 확인 할 수 있는데이터는
//axios.get이 아니라 아니라 api.get를 이용해서 서버에서 데이터를 받아온다
