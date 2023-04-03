import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import {
  getProductList,
  searchProductList,
  categoryProductList,
} from '../../components/api/itemAPI';

const useItemList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const { accessToken } = cookies;

  const size = 10;

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [adminAccess, setAdminAccess] = useState();

  const [upDate, setUpDate] = useState(0);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (!searchValue) {
          getProductListFilter(page, size);
        }
        setKeyword(searchValue);
      }
    },
    [searchValue, page, size]
  );
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleAdmin = () => {
    navigate('/admin-item/0', { state: true });
  };

  const getProductListFilter = async (page, size) => {
    const response = await getProductList(page, size);
    setItems(response.data.data);
    setCount(response.data.pageInfo.totalElements);
    setUpDate(0);
  };
  const categoryProductListFilter = async (categoryFilter) => {
    const response = await categoryProductList(categoryFilter);
    setItems(response.data.data);
    setCount(response.data.data.length);
  };

  const searchProductListFilter = async (keyword) => {
    const response = await searchProductList(keyword);
    setItems(response.data.data);
    setCount(response.data.data.length);
  };

  useEffect(() => {
    getProductListFilter(page, size, upDate);
  }, [page, size, upDate]);

  useEffect(() => {
    if (!categoryFilter) return;
    if (categoryFilter === 'NO_CATEGORY') {
      setUpDate(1);
    }
    categoryProductListFilter(categoryFilter);
  }, [categoryFilter]);

  useEffect(() => {
    if (!keyword) return;
    searchProductListFilter(keyword);
  }, [keyword]);

  useEffect(() => {
    if (Object.keys(cookies).length) {
      const decodedAccessToken = jwt_decode(accessToken);

      if (decodedAccessToken.roles[0] === 'ADMIN') {
        setAdminAccess(String(decodedAccessToken.roles[0]));
      }
    }
  }, [accessToken, cookies]);

  return {
    handleChange,
    handleKeyDown,
    handleAdmin,
    page,
    items,
    count,
    searchValue,
    setPage,
    adminAccess,
    setCategoryFilter,
    categoryFilter,
  };
};

export default useItemList;
