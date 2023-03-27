import axios from 'axios';
const URI = process.env.REACT_APP_SERVER_URI;

export const findProductByProductId = async (productId) => {
  try {
    const { data } = await axios.get(`${URI}/products/${productId}`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductReviews = async (productId) => {
  try {
    const { data } = await axios.get(
      `${URI}/reviews/${productId}?page=0&size=100`
    );
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
