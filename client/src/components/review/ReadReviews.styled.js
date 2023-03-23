import styled from 'styled-components';

export const ReviewContainer = styled.ul`
  padding: 0 16px;
  #review-date {
    margin-top: 20px;
    color: var(--gray);
    font-size: x-small;
    text-align: right;
  }
`;

export const ReviewBox = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 16px 0;
  padding: 20px 0;
  border-bottom: ${(props) => props.border};
  #review {
    margin-top: 20px;
  }
  > img {
    width: 100px;
    height: 100px;
  }
`;

export const ReviewContents = styled.div`
  width: 75%;
  flex-direction: row;
  margin-right: 10px;
`;

export const UserInformation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > * {
    margin-right: 10px;
  }
  > img {
    width: 40px;
    height: 40px;
  }
  #user-nickname {
    width: 70%;
  }
  #review-edit {
    display: flex;
    justify-content: center;
    width: 15%;
    margin-right: 0;
    > button {
      color: var(--gray);
      font-size: small;
      margin: auto;
    }
  }
`;
