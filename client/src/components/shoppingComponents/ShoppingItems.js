import { useState } from 'react';
import styled from 'styled-components';
import shoppingCartItem from '../../img/shoppingCartItem.png';

const ShoppingItemLayout = styled.div`
  border-bottom: 1px solid rgb(201, 201, 201);
`;

const AllCheckContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(201, 201, 201);
  .allCheckText {
    margin-left: 20px;
    font-size: 15px;
    color: var(--gray);
  }
`;

const CheckBoxContainer = styled.div`
  margin-left: 20px;
  input {
    width: 20px;
    height: 20px;
    border: var(--border);
    cursor: pointer;
  }
`;

const ShoppingItemContainerWrap = styled.div`
  height: 200px;
  margin-bottom: 30px;
`;

const EachItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  width: 530px;
  .cancel {
    margin-left: 20px;
    font-size: 25px;
    color: var(--gray);
  }
`;

const ItemInformationBox = styled.div`
  margin-left: 30px;
  width: 230px;
  flex-wrap: wrap;
  .singleCheckText {
    font-size: 18px;
    color: var(--black);
  }
  .itemPrice {
    margin-top: 30px;
    font-size: 20px;
  }
`;

const ItemImgBox = styled.img`
  width: 130px;
  height: 130px;
  border-radius: var(--bd-rd);
  margin-left: 20px;
`;

const ItemNumberChangeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 150px;
  margin-left: 200px;
  margin-top: 20px;
  border: 1px solid rgb(201, 201, 201);
  border-radius: var(--bd-rd);
  .itemPlus,
  .itemMinus {
    width: 40px;
    height: 40px;
    font-size: 20px;
    color: var(--gray);
  }
  .itemNumber {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
`;
const CheckBox = ({ id }) => {
  return (
    <CheckBoxContainer>
      <input type={'checkbox'} id={id} />
    </CheckBoxContainer>
  );
};
const goodsName = '팅탱동캠핑아이템 어쩌구 저쩌구 이거 짱 좋은데 웨 않 삼?';

const ShoppingItems = () => {
  const [number, setNumber] = useState(1);

  const itemPlus = () => {};
  const itemMinus = () => {};

  return (
    <ShoppingItemLayout>
      <AllCheckContainer>
        <CheckBox id="allCheckBox" />
        <label className="allCheckText" htmlFor={'allCheckBox'}>
          {'전체선택'}
        </label>
      </AllCheckContainer>

      <h2 className="item">배송상품</h2>
      <ShoppingItemContainerWrap>
        {/* map으로 뿌려주기 */}
        <EachItemContainer>
          <CheckBox id={'1'} />
          <ItemImgBox alt={'shoppingItem'} src={shoppingCartItem} />
          <ItemInformationBox>
            <label className="singleCheckText" htmlFor={'1'}>
              {goodsName}
            </label>
            <div className="itemPrice">{'35,000'}</div>
          </ItemInformationBox>
          <div className="cancel">x</div>
        </EachItemContainer>

        <ItemNumberChangeContainer>
          <button
            className="itemPlus"
            onClick={(e) => itemPlus(e.target.value)}
          >
            +
          </button>
          <div className="itemNumber">{number}</div>
          <button
            className="itemMinus"
            onClick={(e) => itemMinus(e.target.value)}
          >
            -
          </button>
        </ItemNumberChangeContainer>
      </ShoppingItemContainerWrap>
    </ShoppingItemLayout>
  );
};

export default ShoppingItems;
