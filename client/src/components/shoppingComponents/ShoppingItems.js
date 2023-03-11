import { useEffect, useState } from 'react';
import styled from 'styled-components';
import shoppingCartItem from '../../img/shoppingCartItem.png';
import { useProduct } from '../store';

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

const ShoppingItemContainer = styled.div`
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
    cursor: pointer;
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

const ShoppingItems = ({ setOrderPrice }) => {
  //마이페이지에 주문 이력을 보내줘야함
  //상품명 , 수량 , 가격 ,아이디
  //id가 1이 체크드아이템에 존재 한다면
  //for(let i of checkdItem)
  //product.filter((el) => el.id === i)) 상품이름 가격 아이디값추출
  //counts[i]+1 수량 추출
  const { product, removeProduct } = useProduct((state) => state);
  const [counts, setCounts] = useState({});
  const [checkdItem, setCheckedItem] = useState(product.map((el) => el.id));

  function handleIncreaseCount(id) {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 1) + 1,
    }));
  }
  const handleDecreaseCount = (id) => {
    if (counts[id] > 1) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [id]: (prevCounts[id] || 0) - 1,
      }));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItem(product.map((el) => el.id));
    } else {
      setCheckedItem([]);
    }
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckedItem([...checkdItem, id]);
    } else {
      setCheckedItem(checkdItem.filter((el) => el !== id));
    }
  };

  const handleDelte = (id) => {
    removeProduct(id);
  };

  const totalPrice = () => {
    const itemArr = product.map((el) => el.id);
    let newTotalPrice = 0;
    for (let i of itemArr) {
      if (checkdItem.includes(i)) {
        let quantity = counts[i] || 1;
        let price = product.filter((el) => el.id === i)[0].price;
        newTotalPrice += quantity * price;
      }
    }
    return newTotalPrice;
  };
  const total = totalPrice();

  useEffect(() => {
    setOrderPrice(total);
  }, [total]);

  return (
    <ShoppingItemLayout>
      <AllCheckContainer>
        <CheckBoxContainer>
          <input
            type={'checkbox'}
            id={'allCheckBox'}
            checked={product.length === checkdItem.length ? true : false}
            onChange={(e) => handleAllCheck(e.target.checked)}
          />
        </CheckBoxContainer>
        <label className="allCheckText" htmlFor={'allCheckBox'}>
          {'전체선택'}
        </label>
      </AllCheckContainer>

      <h2 className="item">배송상품</h2>

      {product &&
        product.map((el) => (
          <ShoppingItemContainer>
            <EachItemContainer>
              <CheckBoxContainer>
                <input
                  type={'checkbox'}
                  id={el.id}
                  checked={checkdItem.includes(el.id) ? true : false}
                  onChange={(e) => {
                    handleSingleCheck(e.target.checked, el.id);
                  }}
                />
              </CheckBoxContainer>
              <ItemImgBox alt={'shoppingItem'} src={shoppingCartItem} />
              <ItemInformationBox>
                <label className="singleCheckText" htmlFor={el.id}>
                  {el.item}
                </label>
                <div className="itemPrice">{el.price}원</div>
              </ItemInformationBox>
              <div
                className="cancel"
                onClick={() => {
                  handleDelte(el.id);
                }}
              >
                x
              </div>
            </EachItemContainer>
            <ItemNumberChangeContainer>
              <button
                className="itemPlus"
                onClick={() => handleIncreaseCount(el.id)}
              >
                +
              </button>
              <div className="itemNumber">{counts[el.id] || 1}</div>
              <button
                className="itemMinus"
                onClick={() => handleDecreaseCount(el.id)}
              >
                -
              </button>
            </ItemNumberChangeContainer>
          </ShoppingItemContainer>
        ))}
    </ShoppingItemLayout>
  );
};

export default ShoppingItems;

//첫 화면에서 모두 체크박스는 표시되어 있다
//checkitem 에 아이디 값이 저장
//allcheck는 체크값이 프로덕트 길이 === 체크아이템 길이 참

//개별체크박스는
