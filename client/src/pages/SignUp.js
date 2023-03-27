import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import Main from '../components/main/Main';
import logo1 from '../img/logo1.png';
import MainHeader from '../components/main/MainHeader';
import {
  ErrorMsg,
  HaveUser,
  LogoImgBox,
  SignUpContainer,
  SignUpInputBox,
  SignUpLayout,
  SignUpSubmitBox,
} from '../components/signup/Signup.styled';

const SignUp = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
        {modalOpen && (
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

//
