import axios from 'axios';

const URI = process.env.REACT_APP_SERVER_URI;

export const getProductList = async (page, size) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${URI}/products/all?page=${page}&size=${size}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const categoryProductList = async (categoryFilter) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${URI}/products/category?category=${categoryFilter}&page=0&size=10`,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const searchProductList = async (keyword) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${URI}/products/search?searchKeyword=${keyword}&page=0&size=10`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
