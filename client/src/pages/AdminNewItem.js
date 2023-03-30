import { useLocation } from 'react-router-dom';

import Main from '../components/main/Main';
import MainLayout from '../components/main/MainLayout';
import Footer from '../components/main/Footer';
import { PageName } from '../components/admin-new-item/AdminNewItem.styled'; //직관적으로 분리하는 게  맞다고 생각되면 분리하기(필요할 때 한다!)

import ItemInformationContainer from '../components/admin-new-item/ItemInformationContainer';

import useAdminNewItem from '../components/admin-new-item/useAdminNewItem';
import useEffectOnce from '../components/shared/useEffectOnce';

const AdminNewItem = () => {
  const { state } = useLocation();

  const { setItemInformation, setImage, setText, setMode, setProductId } =
    useAdminNewItem();

  // itemInformation, image, preview, text, mode, productId 갱신
  useEffectOnce(() => {
    setItemInformation((information) => {
      return {
        ...information,
        category: state.productCategory || '',
        status: state.productStatus || '',
        name: state.productName || '',
        subTitle: state.subtitle || '',
        price: state.price ? Number(state.price).toLocaleString('ko-KR') : '',
      };
    });
    setImage(state.tumbnailImageURL || '');
    setText(state.productDetail || '');
    setMode(state.productCategory ? 'edit' : 'create');
    setProductId(state.productId || '');
  });

  return (
    <Main>
      <MainLayout>
        <div>
          <PageName>
            {state.productCategory ? '상품 수정하기' : '상품 등록하기'}
          </PageName>
          <ItemInformationContainer />
        </div>
        <Footer />
      </MainLayout>
    </Main>
  );
};

export default AdminNewItem;

// const [itemInformation, setItemInformation] = useState({
//   category: state.productCategory || '',
//   status: state.productStatus || '',
//   name: state.productName || '',
//   subTitle: state.subtitle || '',
//   price: state.price ? Number(state.price).toLocaleString('ko-KR') : '',
// });
// const [image, setImage] = useState(state.thumbnailImageURL || '');
// const [preview, setPreview] = useState('');
// const [text, setText] = useState(state.productDetail || '');

// const { category, status, name, subTitle, price } = itemInformation;

// const handleImageChange = () => {
//   const file = imageRef.current.files[0];
//   if (file === null) {
//     return;
//   }
//   setImage(file);
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onloadend = () => {
//     setPreview(reader.result);
//   };
// };

// const handleItemInformationChange = (event) => {
//   const { value, name } = event.target;
//   if (name === 'price') {
//     const inputValue = value.replace(/[^0-9]/g, '');
//     const formattedPrice = Number(inputValue).toLocaleString('ko-KR');
//     return setItemInformation({
//       ...itemInformation,
//       [name]: formattedPrice,
//     });
//   }
//   setItemInformation({
//     ...itemInformation,
//     [name]: value,
//   });
// };

// const initializeImageState = () => {
//   imageRef.current.value = '';
//   setPreview('');
//   setImage('');
// };

// const initializeTextState = () => {
//   setItemInformation({
//     category: '',
//     status: '',
//     name: '',
//     subTitle: '',
//     price: '',
//   });
//   setText('');
// };

// const handleDismiss = (event) => {
//   event.preventDefault();
//   initializeImageState();
// };

// const handleCreateItem = () => {
//   const newItem = new FormData();
//   const itemDetails = {
//     productName: name,
//     subtitle: subTitle,
//     price: parseInt(price.replace(/,/g, '')),
//     productCategory: category,
//     productStatus: status,
//     productDetail: text,
//   };
//   newItem.append(
//     'productPostDto',
//     new Blob([JSON.stringify(itemDetails)], {
//       type: 'application/json',
//     })
//   );
//   newItem.append('thumbnailImageFile', image);

//   try {
//     instance.post('/products', newItem).then(() => {
//       navigate('/product');
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const handleEditItem = () => {
//   const editedItem = new FormData();
//   const editedItemDetails = {
//     productName: name,
//     subtitle: subTitle,
//     price: parseInt(price.replace(/,/g, '')),
//     productCategory: category,
//     productStatus: status,
//     productDetail: text,
//   };
//   editedItem.append(
//     'productPatchDto',
//     new Blob([JSON.stringify(editedItemDetails)], {
//       type: 'application/json',
//     })
//   );
//   editedItem.append('thumbnailImageFile', image);
//   try {
//     instance.patch(`/products/${state.productId}`, editedItem).then(() => {
//       navigate('/product');
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handleSubmit = (event) => {
//   event.preventDefault();

//   if (text === '') {
//     return alert('상품 상세 설명을 입력해주세요.');
//   }

//   state.productCategory ? handleEditItem() : handleCreateItem();

//   initializeImageState();
//   initializeTextState();
// };

// const categoryOptions = [
//   { value: 'TENT', label: '텐트' },
//   { value: 'CHAIR', label: '의자' },
//   { value: 'TABLE', label: '테이블' },
//   { value: 'LIGHT', label: '조명' },
//   { value: 'FIREPLACE', label: '화로대' },
// ];
