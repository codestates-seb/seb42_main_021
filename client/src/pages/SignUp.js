import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';

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
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`/members/signup`, {
        email: data.email,
        password: data.password,
        nickname: data.name,
      });
      console.log('성공');
    } catch (error) {
      console.log(error);
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
                value: 8,
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
      </SignUpLayout>
    </Main>
  );
};

export default SignUp;
