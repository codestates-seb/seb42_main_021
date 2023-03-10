import DaumPostcode from 'react-daum-postcode';

const DaumPostCode = ({ address, setAddress }) => {
  const onCompletePost = (data) => {
    setAddress(data.address);
  };
  const postCodeStyle = {
    display: 'block',
    position: 'absolute',
    top: '20%',
    width: '400px',
    height: '400px',
    padding: '7px',
    zIndex: 100,
  };
  return (
    <DaumPostcode
      style={postCodeStyle}
      onComplete={onCompletePost}
      autoClose
    ></DaumPostcode>
  );
};

export default DaumPostCode;
