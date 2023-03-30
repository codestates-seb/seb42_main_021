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

  // const handleKeyDown = useCallback(
  //   (event) => {
  //     if (event.key === 'Enter') {
  //       event.preventDefault();
  //       if (!searchValue) {
  //         getProductListFilter(page, size);
  //       }
  //       setKeyword(searchValue);
  //     }
  //   },
  //   [searchValue, page, size]
  // );

  const onSubmit = (event) => {
    event.preventDefault();

    if (!searchValue) {
      return getProductListFilter(page, size);
    }

    return searchProductListFilter(searchValue);
  };

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

  // 1. ItemList 컴포넌트가 렌더링된다.
  // 2. useEffect는 컴포넌트가 생성되고나면, 다시 실행된다.
  // 3. 아래에는 useEffect가 4개가 있어서 4개의 useEffect가 실행된다.
  // 4. 리액트 인터널 큐가 있다. 거기서 useEffect를 관리한다.

  // 상품 목록 페이지 접속시 전체 상품 리스트 조회
  // useEffect(() => {
  //   getProductListFilter(page, size);
  // }, [page, size]);

  // 상품 목록 페이지에서 카테고리 키워드에 맞는 상품 리스트 조회
  useEffect(() => {
    getProductListFilter(page, size);
  }, [page, size]);

  // 상품 목록 페이지에서 키워드 검색에 맞는 상품 리스트 조회
  // useEffect(() => {
  //   if (!keyword) return;
  //   searchProductListFilter(keyword);
  // }, [keyword]);

  // admin계정 전용 ㅡ ADMIN이라는 role이 존재하면 상품 등록 버튼 나타나게 하기
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
    onSubmit,
    handleAdmin,
    page,
    items,
    count,
    searchValue,
    setPage,
    adminAccess,
    setCategoryFilter,
    categoryFilter,
    getProductListFilter,
    categoryProductListFilter,
  };
};

export default useItemList;
