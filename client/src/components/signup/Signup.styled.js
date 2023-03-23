import styled from 'styled-components';

export const SignUpLayout = styled.div`
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

export const LogoImgBox = styled.img`
  width: 200px;
  margin-bottom: 30px;
`;
export const SignUpContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const SignUpInputBox = styled.input`
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
export const SignUpSubmitBox = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 70px;
  border-radius: var(--bd-rd);
  background-color: var(--blue);
  font-size: 20px;
  color: var(--white);
  font-weight: 600;
`;

export const ErrorMsg = styled.p`
  color: red;
  font-size: 15px;
  margin-top: 10px;
`;

export const HaveUser = styled.div`
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
