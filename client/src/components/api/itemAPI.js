import axios from 'axios';

export const getProductList = async (page, size) => {
  try {
    const response = await axios({
      method: 'get',
      url: `/products/all?page=${page}&size=${size}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(response);
    console.log('getItemList 받아오기 성공');
    return response;
  } catch (error) {
    console.log('getItemList 받아오기 실패');
    console.log(error);
  }
};

export const categoryProductList = async (categoryFilter) => {
  try {
    const response = await axios({
      method: 'get',
      url: `/products/category?category=${categoryFilter}&page=0&size=10`,
    });
    console.log('categoryProductList 받아오기 성공');
    // console.log(response);
    return response;
  } catch (error) {
    console.log('categoryProductList 받아오기 실패');
    console.log(error);
  }
};

export const searchProductList = async (keyword) => {
  try {
    const response = await axios({
      method: 'get',
      url: `/products/search?searchKeyword=${keyword}&page=0&size=10`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('searchProductList 받아오기 성공');
    // console.log(response);
    return response;
  } catch (error) {
    console.log('searchProductList 받아오기 실패');
    console.log(error);
  }
};
