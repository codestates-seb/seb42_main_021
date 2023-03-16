import axios from 'axios';

export const getProductList = async (page, size) => {
  try {
    const response = await axios({
      method: 'get',
      url: `/products/all?page=${page}&size=${size}`,
      headers: {
        'ngrok-skip-browser-warning': '12',
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    console.log('getItemList 받아오기 성공');
    return response.data;
  } catch (error) {
    console.log('getItemList 받아오기 실패');
    console.log(error);
  }
};

export const categoryProductList = async (categoryFilter) => {
  try {
    const response = await axios({
      method: 'get',
      url: `/products/category/${categoryFilter}?&page=1&size=10`,
      headers: {
        'ngrok-skip-browser-warning': '12',
        'Content-Type': 'application/json',
      },
    });
    console.log('categoryProductList 받아오기 성공');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('categoryProductList 받아오기 실패');
    console.log(error);
  }
};

export const searchProductList = async (keyword) => {
  try {
    const response = await axios({
      method: 'get',
      url: `/products/search?keyword=${keyword}&page=1&size=5`,
      headers: {
        'ngrok-skip-browser-warning': '12',
        'Content-Type': 'application/json',
      },
    });
    console.log('searchProductList 받아오기 성공');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('searchProductList 받아오기 실패');
    console.log(error);
  }
};
