import { useState, useRef } from 'react';
import instance from '../components/newAxios';
import { useNavigate } from 'react-router-dom';

export const CATEGORY_OPTIONS = [
  { value: 'TENT', label: '텐트' },
  { value: 'CHAIR', label: '의자' },
  { value: 'TABLE', label: '테이블' },
  { value: 'LIGHT', label: '조명' },
  { value: 'FIREPLACE', label: '화로대' },
];

const useAdminNewItem = () => {
  const navigate = useNavigate();
  const imageRef = useRef();

  const [itemInformation, setItemInformation] = useState({
    category: '',
    status: '',
    name: '',
    subTitle: '',
    price: '',
  });

  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const [text, setText] = useState('');
  const [mode, setMode] = useState('create');
  const [productId, setProductId] = useState('');

  const { category, status, name, subTitle, price } = itemInformation;

  const onImageChange = () => {
    const file = imageRef.current.files[0];
    if (file === null) {
      return;
    }
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const onItemInformationChange = (event) => {
    const { value, name } = event.target;
    if (name === 'price') {
      const inputValue = value.replace(/[^0-9]/g, '');
      const formattedPrice = Number(inputValue).toLocaleString('ko-KR');
      return setItemInformation({
        ...itemInformation,
        [name]: formattedPrice,
      });
    }
    setItemInformation({
      ...itemInformation,
      [name]: value,
    });
  };

  const initializeImageState = () => {
    imageRef.current.value = '';
    setPreview('');
    setImage('');
  };

  const initializeTextState = () => {
    setItemInformation({
      category: '',
      status: '',
      name: '',
      subTitle: '',
      price: '',
    });
    setText('');
  };

  const onDismiss = (event) => {
    event.preventDefault();
    initializeImageState();
  };

  const handleCreateItem = () => {
    const newItem = new FormData();
    const itemDetails = {
      productName: name,
      subtitle: subTitle,
      price: parseInt(price.replace(/,/g, '')),
      productCategory: category,
      productStatus: status,
      productDetail: text,
    };
    newItem.append(
      'productPostDto',
      new Blob([JSON.stringify(itemDetails)], {
        type: 'application/json',
      })
    );
    newItem.append('thumbnailImageFile', image);

    try {
      instance.post('/products', newItem).then(() => {
        navigate('/product');
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditItem = () => {
    const editedItem = new FormData();
    const editedItemDetails = {
      productName: name,
      subtitle: subTitle,
      price: parseInt(price.replace(/,/g, '')),
      productCategory: category,
      productStatus: status,
      productDetail: text,
    };
    editedItem.append(
      'productPatchDto',
      new Blob([JSON.stringify(editedItemDetails)], {
        type: 'application/json',
      })
    );
    editedItem.append('thumbnailImageFile', image);
    try {
      instance.patch(`/products/${productId}`, editedItem).then(() => {
        navigate('/product');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (text === '') {
      return alert('상품 상세 설명을 입력해주세요.');
    }

    mode === 'edit' ? handleEditItem() : handleCreateItem();

    initializeImageState();
    initializeTextState();
  };

  return {
    setItemInformation,
    setImage,
    setText,
    setMode,
    setProductId,
    imageRef,
    onImageChange,
    onItemInformationChange,
    onDismiss,
    onSubmit,
    category,
    price,
    preview,
    text,
    subTitle,
    status,
    name,
  };
};

export default useAdminNewItem;
