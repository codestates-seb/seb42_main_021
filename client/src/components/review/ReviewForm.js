import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';

const ReviewFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  > textarea {
    height: 150px;
    resize: none;
    margin: 10px 0;
  }
  #reviewButtonBox {
    margin-top: 50px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: right;
  margin: 10px 0;
  > button {
    margin-left: 10px;
  }
  #cancelButton {
    background-color: var(--red);
  }
`;

const ReviewFormButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: var(--bd-rd);
  background-color: var(--blue);
  color: var(--white);
`;

function ReviewForm({
  productId,
  isEditClicked,
  editingReview,
  setIsEditClicked,
}) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!isEditClicked) {
      setText('');
    } else setText(editingReview.content);
  }, [isEditClicked]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('score', rating);
    formData.append('content', text);
    formData.append('reviewImage', image);

    if (!isEditClicked) {
      formData.append('productId', productId);
      try {
        const response = await axios.post('/reviews', formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      return;
    }

    formData.append('reviewId', editingReview.reveiwId);
    try {
      const response = await axios.post(
        `/reviews/${editingReview.reveiwId}`,
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsEditClicked(false);
  };

  const handleDismiss = (event) => {
    event.preventDefault();
    setRating(0);
    setImage(null);
    setText('');
    setIsEditClicked(false);
  };

  return (
    <ReviewFormContainer onSubmit={handleSubmit}>
      <Rating
        size="25px"
        fillColor="#61a0ff"
        emptyColor="#C9C9C9"
        onClick={handleRating}
        initialValue={isEditClicked ? editingReview.score : rating}
      />
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleImage} />
      <ButtonBox>
        <ReviewFormButton type="submit">
          {isEditClicked ? '수정하기' : '등록하기'}
        </ReviewFormButton>
        <ReviewFormButton
          id="cancelButton"
          type="button"
          onClick={handleDismiss}
        >
          취소
        </ReviewFormButton>
      </ButtonBox>
    </ReviewFormContainer>
  );
}

export default ReviewForm;
