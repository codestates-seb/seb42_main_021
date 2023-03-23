import { useEffect, useState } from 'react';
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
  const [cookies, , removeCookie] = useCookies();

  const isSubmitClicked = true;
  const size = 10;

  const [items, setItems] = useState([]);

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);

  const [searchValue, setSearchValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [adminAccess, setAdminAccess] = useState();
  const { accessToken } = cookies;

  const [upDate, setUpDate] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!searchValue) {
        const getProductListFilter = async () => {
          const response = await getProductList(page, size);
          setItems(response.data.data);
          setCount(response.data.pageInfo.totalElements);
        };
        getProductListFilter();
      }
      setKeyword(searchValue);
    }
  };
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleAdmin = () => {
    navigate('/admin-item/0', { state: isSubmitClicked });
  };

  useEffect(() => {
    if (Object.keys(cookies).length) {
      const decodedAccessToken = jwt_decode(accessToken);

      if (decodedAccessToken.roles[0] === 'ADMIN') {
        console.log(String(decodedAccessToken.roles));
        setAdminAccess(String(decodedAccessToken.roles[0]));
      }
    }
  }, [accessToken, cookies]);

  useEffect(() => {
    const getProductListFilter = async () => {
      const response = await getProductList(page, size);
      setItems(response.data.data);
      setCount(response.data.pageInfo.totalElements);
    };
    getProductListFilter();
    setUpDate(0);
  }, [page, size, upDate]);

  useEffect(() => {
    if (!categoryFilter) return;
    if (categoryFilter === 'NO_CATEGORY') {
      setUpDate(1);
    }
    const categoryProductListFilter = async () => {
      const response = await categoryProductList(categoryFilter);
      setItems(response.data.data);
      setCount(response.data.data.length);
    };
    categoryProductListFilter();
  }, [categoryFilter]);

  useEffect(() => {
    if (!keyword) return;
    const searchProductListFilter = async () => {
      const response = await searchProductList(keyword);
      console.log(response.data.data);
      setItems(response.data.data);
      setCount(response.data.data.length);
    };
    searchProductListFilter();
  }, [keyword]);
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
