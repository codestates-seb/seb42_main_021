import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../newAxios';

const FormButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: var(--bd-rd);
  background-color: ${(props) => props.backgroundColor};
  color: var(--white);
  margin-left: 10px;
`;

export default function AdminButtonGroup({ productDetail }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEditProductDetail = () => {
    navigate(`/admin-item/${id}`, { state: productDetail });
  };

  const handleDeleteProductDetail = () => {
    instance.delete(`../products/${productDetail.productId}`);
    navigate('/product');
  };

  return (
    <div>
      <FormButton
        type="button"
        backgroundColor="#61a0ff"
        onClick={handleEditProductDetail}
      >
        상품 수정하기
      </FormButton>
      <FormButton
        type="button"
        backgroundColor="#ff0000"
        onClick={handleDeleteProductDetail}
      >
        상품 삭제하기
      </FormButton>
    </div>
  );
}
