import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import Main from '../components/main/Main';
import logo1 from '../img/logo1.png';
import MainHeader from '../components/main/MainHeader';

const SignUpLayout = styled.div`
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
`;

const LogoImgBox = styled.img`
  width: 200px;
  margin-bottom: 30px;
`;
const SignUpContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SignUpInputBox = styled.input`
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
const SignUpSubmitBox = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 70px;
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

const HaveUser = styled.div`
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

const SignUp = () => {
  const [ModalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(`/members/signup`, {
        email: data.email,
        password: data.password,
        nickname: data.name,
      });
      console.log('성공');
      navigate('../login');
    } catch (error) {
      if (error.response.status === 409) {
        setModalOpen(true);
      }
    }
  };
  return (
    <Main>
      <MainHeader />
      <SignUpLayout>
        <LogoImgBox src={logo1} />
        <SignUpContainer onSubmit={handleSubmit(onSubmit)}>
          <SignUpInputBox
            type="text"
            name="name"
            placeholder="닉네임"
            autoComplete="on"
            aria-invalid={!isDirty ? undefined : errors.name ? 'true' : 'false'}
            {...register('name', {
              required: '닉네임은 필수 입력입니다.',
              minLength: {
                value: 1,
                message: '닉네임 형식에 맞지 않습니다.',
              },
            })}
          />
          {errors.name && (
            <ErrorMsg role="alert">{errors.name.message}</ErrorMsg>
          )}
          <SignUpInputBox
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
          {errors.id && (
            <ErrorMsg role="alert">{errors.email.message}</ErrorMsg>
          )}
          <SignUpInputBox
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
          <SignUpSubmitBox type="submit" disabled={isSubmitting}>
            회원가입
          </SignUpSubmitBox>
        </SignUpContainer>
        {ModalOpen && (
          <HaveUser>
            <div>이미 가입된 회원입니다</div>
            <button className="confirm">
              <Link to="/login" className="moveLogin">
                확인
              </Link>
            </button>
          </HaveUser>
        )}
      </SignUpLayout>
    </Main>
  );
};

export default SignUp;
