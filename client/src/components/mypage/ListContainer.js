import React from 'react';

import useMypageOrderItems from './useMypageOrderItems';

import Paging from '../ui/Pagination';

function ListContainer() {
  const { count, orderProdcut, page, setPage } = useMypageOrderItems();

  return (
    <ListContainer>
      <h1>최근 주문내역</h1>
      <ul>
        {orderProdcut?.map((items) => (
          <li key={items.id}>
            {items.orederProductCounts !== 0 ? (
              <>
                <div className="product-name">
                  {items.productName}
                  <span className="another-product">
                    외 {items.orederProductCounts}건
                  </span>
                </div>
              </>
            ) : (
              <div className="product-name">{items.productName}</div>
            )}
            <div>
              <div id="price">{items.totalPrice.toLocaleString('ko-KR')}원</div>
              <div id="date">{items.createdAt}</div>
            </div>
          </li>
        ))}
      </ul>
      <Paging page={page} count={count} setPage={setPage} />
    </ListContainer>
  );
}

export default ListContainer;
