import styled from 'styled-components';

export const NologinUser = styled.div`
  font-size: 20px;
  margin-left: 150px;
  margin-top: 100px;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  margin-bottom: 30px;
  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  #imageBox {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: 50%;
    width: 100px;
    height: 100px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  button {
    position: absolute;
    top: 70px;
    left: 70px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--blue);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ProfileContainer = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  label {
    width: 100%;
  }
  span {
    color: var(--gray);
    width: 50%;
    text-align: right;
  }
  input {
    color: var(--black);
    width: 50%;
  }
  .profileBox {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
  }
  .iconCell {
    margin-left: 5px;
    width: 20px;
  }
`;

export const ListContainer = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 5px;
    border-bottom: 3px solid var(--border);
  }
  li {
    height: 100px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border);
    #price {
      font-size: x-large;
      font-weight: bold;
    }
    #date {
      margin-top: 5px;
      font-size: small;
      text-align: right;
      color: var(--gray);
    }
  }
  .delete-order {
    font-size: 20px;
  }
  .product-name {
    font-size: 20px;
    font-weight: bold;
  }
  .another-product {
    margin-left: 10px;
    font-size: 15px;
  }
`;

export const Toggle = styled.button`
  width: 50px;
  height: 25px;
  border-radius: 30px;
  border: none;
  background-color: ${(props) => (!props.toggle ? '#c9c9c9' : '#61a0ff')};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

export const Circle = styled.div`
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  transform: ${(props) => props.toggle && 'translate(22px, 0)'};
`;
export const Signout = styled.button`
  margin-top: 300px;
  font-size: 15px;
  color: var(--red);
`;
