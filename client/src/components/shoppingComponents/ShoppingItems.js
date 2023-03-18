import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import styled from 'styled-components';

import shoppingCartItem from '../../img/shoppingCartItem.png';
import { useProduct } from '../store';

const ShoppingItemLayout = styled.div`
  border-bottom: 1px solid rgb(201, 201, 201);
  .no-product {
    margin: 50px 0 50px 150px;
    font-size: 20px;
    color: var(--gray);
  }
`;

const AllCheckContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(201, 201, 201);
  .all-checkText {
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
  .single-checkText {
    font-size: 18px;
    color: var(--black);
  }
  .item-price {
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
  .item-plus,
  .item-minus {
    width: 40px;
    height: 40px;
    font-size: 20px;
    color: var(--gray);
  }
  .item-number {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
`;

const ShoppingItems = ({ setOrderPrice }) => {
  const [product, setProduct] = useState([]);
  const [counts, setCounts] = useState({});
  const [checkedItem, setCheckedItem] = useState([]);
  //delete나 patch 시 화면에 반영되도록 하는 state 값
  const [updateProduct, setUpdateProdcut] = useState(1);

  const [cookies, setCookie, removeCookie] = useCookies();

  const accesseToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;
  const doneAllCheckd = product.length === checkedItem.length ? true : false;

  //수량 변화가 있을 때마다 서버에 저장(post) => 다시 get해서 내용 뿌려주기 => 비효율적
  //화면에서 벗어났을 때만 변경 내용을 서버에 저장하고싶음
  //마운트 언마운트 ???
  // useEffect winddow.location.path로 현재 경로페이지 확인하기

  const readProductList = async () => {
    const { data } = await axios.get(`/carts`, {
      headers: {
        Authorization: `Bearer ${accesseToken} `,
        Refresh: `${refreshToken}`,
      },
    }); //사이드이펙트 방지하기위해 return값 주고

    setProduct(data.data);

    setCheckedItem(data.data.map((element) => element.productId));

    data.data.forEach((element) => {
      setCounts((previosCount) => ({
        ...previosCount,
        [element.productId]: element.quantity,
      }));
    });
  };

  const sendCountInformation = async (cartId, quantity) => {
    await axios.patch(
      `/carts/${cartId}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${accesseToken} `,
          Refresh: `${refreshToken}`,
        },
      }
    );
    setUpdateProdcut(0);
  };

  useEffect(() => {
    (async () => {
      await readProductList();
    })();
    setUpdateProdcut(1);
  }, [updateProduct]);

  const handleIncreaseCount = ({ productId, cartId }) => {
    setCounts((previosCount) => ({
      ...previosCount,
      [productId]: previosCount[productId] + 1,
    }));

    sendCountInformation(cartId, counts[productId] + 1);
  };

  const handleDecreaseCount = ({ productId, cartId }) => {
    if (counts[productId] <= 1) return;

    setCounts((previosCount) => ({
      ...previosCount,
      [productId]: previosCount[productId] - 1,
    }));
    sendCountInformation(cartId, counts[productId] - 1);
  };

  const handleAllCheck = (checked) => {
    if (!checked) return setCheckedItem([]);

    return setCheckedItem(product.map((el) => el.productId));
  };

  const handleSingleCheck = (checked, id) => {
    if (!checked) return setCheckedItem(checkedItem.filter((el) => el !== id));

    return setCheckedItem([...checkedItem, id]);
  };

  const handleDelte = async (cartId) => {
    await axios.delete(`/carts/${cartId}`, {
      headers: {
        Authorization: `Bearer ${accesseToken} `,
        Refresh: `${refreshToken}`,
      },
    });
    setUpdateProdcut(0);
  };

  const totalPrice = () => {
    const productIds = product.map((element) => element.productId);

    let newTotalPrice = productIds.reduce((output, currentValue) => {
      if (checkedItem.includes(currentValue)) {
        let quantity = counts[currentValue];
        let price = product.filter(
          (element) => element.productId === currentValue
        )[0].price;
        output += quantity * price;
      }
      return output;
    }, 0);
    return newTotalPrice.toLocaleString('ko-KR');
  };
  const total = totalPrice();

  useEffect(() => {
    setOrderPrice(total);
  }, [total, setOrderPrice]);

  return (
    <ShoppingItemLayout>
      <AllCheckContainer>
        <CheckBoxContainer>
          <input
            type={'checkbox'}
            id={'allCheckBox'}
            checked={doneAllCheckd}
            onChange={(e) => handleAllCheck(e.target.checked)}
          />
        </CheckBoxContainer>
        <label className="all-checkText" htmlFor={'allCheckBox'}>
          {'전체선택'}
        </label>
      </AllCheckContainer>

      <h2 className="item">배송상품</h2>
      {product.length === 0 ? (
        <div className="no-product">주문 할 제품이 없습니다</div>
      ) : (
        product?.map((element) => (
          <ShoppingItemContainer key={element.productId}>
            <EachItemContainer>
              <CheckBoxContainer>
                <input
                  type={'checkbox'}
                  id={element.productId}
                  checked={checkedItem.includes(element.productId)}
                  onChange={(event) => {
                    handleSingleCheck(event.target.checked, element.productId);
                  }}
                />
              </CheckBoxContainer>
              <ItemImgBox alt={'shoppingItem'} src={shoppingCartItem} />
              <ItemInformationBox>
                <label className="single-checkText" htmlFor={element.productId}>
                  {element.productName}
                </label>
                <div className="item-price">
                  {element.price.toLocaleString('ko-KR')}원
                </div>
              </ItemInformationBox>
              <div
                className="cancel"
                onClick={() => {
                  handleDelte(element.cartId);
                }}
              >
                x
              </div>
            </EachItemContainer>
            <ItemNumberChangeContainer>
              <button
                className="item-plus"
                onClick={() => handleIncreaseCount(element)}
              >
                +
              </button>
              <div className="item-number">{counts[element.productId]}</div>
              <button
                className="item-minus"
                onClick={() => handleDecreaseCount(element)}
              >
                -
              </button>
            </ItemNumberChangeContainer>
          </ShoppingItemContainer>
        ))
      )}
    </ShoppingItemLayout>
  );
};

export default ShoppingItems;
