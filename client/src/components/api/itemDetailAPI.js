import axios from 'axios';

export const findProductByProductId = async (productId) => {
  try {
    const { data } = await axios.get(`/products/${productId}`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductReviews = async (productId) => {
  try {
    const { data } = await axios.get(`/reviews/${productId}?page=1&size=10`);
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
