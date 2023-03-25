import React, { useEffect, useState } from 'react';
import instance from '../newAxios';

const useMypageOrderItems = () => {
  const [orderProdcut, setOrderProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);

  const readOrderData = async () => {
    const { data } = await instance.get(`/orders/all?page=${page}&size=10`);

    return data;
  };

  useEffect(() => {
    const orderProduct = async () => {
      const data = await readOrderData();
      setItmes(data);
    };
    orderProduct();
  }, [page, count]);

  const setItmes = (data) => {
    const orderProductData = data.data.orderDtoList.map((element) => ({
      id: element.orderId,
      totalPrice: element.totalPrice,
      createdAt: element.createdAt.slice(0, 10),
      orederProductCounts: element.orderProductDtos.length - 1,
      productName: element.orderProductDtos[0].productName,
    }));

    setOrderProduct(orderProductData);
    setCount(data.data.totalElements);
  };
  return {
    orderProdcut,
    page,
    setPage,
    count,
  };
};

export default useMypageOrderItems;
