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
  const URL = process.env.REACT_APP_SERVER_URI;

  const [modalOpen, setModalOpen] = useState(false);
  const [popContent, setPopContent] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${URL}/members/signup`,
        {
          email: data.email,
          password: data.password,
          nickname: data.name,
        },
        { headers: { withCredentials: true } }
      );
      popupOpen('가입이 완료되었습니다');


    } catch (error) {
      if (error.response.status === 409) {
        popupOpen('이미 존재하는 회원입니다');
      }
    }
  };

  const popupOpen = (content) => {
    setModalOpen(true);
    setPopContent(
      <>
        <div>{content}</div>
        <button className="confirm">
          <Link to="/login" className="moveLogin">
            확인
          </Link>
        </button>
      </>
    );
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
                value: 2,
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
                value: 4,
                message: '4자리 이상 비밀번호를 사용하세요.',
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
        {modalOpen && <HaveUser>{popContent}</HaveUser>}
      </SignUpLayout>
    </Main>
  );
};

export default SignUp;

//
