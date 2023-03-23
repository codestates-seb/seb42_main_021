import styled from 'styled-components';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Main from '../components/main/Main';
import MainHeader from '../components/main/MainHeader';
import logo1 from '../img/logo1.png';
import axios from 'axios';
import { useState } from 'react';
import useLogin from '../components/login/useLogin';

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

  .moveSignup {
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
const NoUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  width: 300px;
  padding: 7px;
  z-index: 200;
  border-radius: var(--bd-rd);
  border: 2px solid var(--midgray);
  background-color: white;

  .confirm {
    margin-top: 20px;
    font-size: 15px;
    padding: 5px;
    width: 40px;
    background-color: var(--blue);
    border-radius: var(--bd-rd);
  }
`;

const Login = () => {
  const {
    ModalOpen,
    errors,
    handleSubmit,
    isDirty,
    isSubmitting,
    onSubmit,
    register,
    invalidMessage, // 삼항연산자도 리턴문으로 갖고 오기 가능~~
  } = useLogin();

  //비지니스 로직 관심사 분리
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
            aria-invalid={invalidMessage}
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
                value: 1,
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
        {ModalOpen && (
          <NoUser>
            <div>없는 회원입니다 회원가입을 해 주세요</div>
            <button className="confirm">
              <Link to="/signup">확인</Link>
            </button>
          </NoUser>
        )}
        <Link to="/signup" className="moveSignup">
          회원가입
        </Link>
      </LoginLayout>
    </Main>
  );
};

export default Login;
