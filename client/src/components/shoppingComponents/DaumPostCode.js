import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  background-color: var(--midgray);
  z-index: 300;
  top: 30%;
  margin-left: 10px;
  padding: 10px;
  border-radius: var(--bd-rd);

  .closeButton {
    padding-bottom: 10px;
    color: var(--white);
    font-size: 20px;
    font-weight: bold;
    z-index: 100;
  }
`;

const DaumPostCode = ({ setAddress, setPopAddress, popAddress }) => {
  const onCompletePost = (data) => {
    setAddress(data.address);
    setPopAddress(!popAddress);
  };
  const postCodeStyle = {
    width: '400px',
    height: '400px',
    padding: '7px',
  };
  return (
    <Container>
      <button
        className="closeButton"
        onClick={() => setPopAddress(!popAddress)}
      >
        닫기
      </button>
      <DaumPostcode
        style={postCodeStyle}
        onComplete={onCompletePost}
        autoClose
      ></DaumPostcode>
    </Container>
  );
};

export default DaumPostCode;
