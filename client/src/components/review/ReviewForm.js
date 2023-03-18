import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import { getProductReviews } from '../api/itemDetailAPI';

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
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: right;
  margin: 10px 0;
`;

const FormButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: var(--bd-rd);
  background-color: ${(props) => props.backgroundColor};
  color: var(--white);
  margin-left: 10px;
`;

function ReviewForm({
  productId,
  setProductReviews,
  isEditClicked,
  editingReview,
  setIsEditClicked,
}) {
  const [rating, setRating] = useState(editingReview?.score || 0);
  const [text, setText] = useState('');
  const [image, setImage] = useState(
    new Blob([], {
      type: 'image/jpg',
    })
  );

  const [cookies, setCookie, removeCookie] = useCookies();
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  const imgRef = useRef();

  useEffect(() => {
    if (!isEditClicked) {
      setText('');
    } else setText(editingReview.content);
  }, [editingReview?.content, isEditClicked]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (!image.length) {
      setImage(
        new Blob([], {
          type: 'image/jpg',
        })
      );
    }
    formData.append('imageFile', image);

    if (!isEditClicked) {
      formData.append(
        'requestBody',
        new Blob(
          [JSON.stringify({ productId, content: text, score: rating })],
          {
            type: 'application/json',
          }
        )
      );

      return axios
        .post('/reviews', formData, {
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
            Refresh: `${refreshToken}`,
          },
        })
        .then(() => {
          getProductReviews(productId).then((productReviewList) =>
            setProductReviews(productReviewList)
          );
          setRating(0);
          setImage(null);
          imgRef.current.value = '';
          setText('');
        })
        .catch((error) => {
          console.error(error);
        });
    }

    formData.append(
      'requestBody',
      new Blob(
        [
          JSON.stringify({
            reviewId: editingReview.reviewId,
            content: text,
            score: rating,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    );

    axios
      .patch(`/reviews/${editingReview.reviewId}`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
          Refresh: `${refreshToken}`,
        },
      })
      .then(() => {
        getProductReviews(productId).then((productReviewList) =>
          setProductReviews(productReviewList)
        );
        setRating(0);
        setImage(null);
        imgRef.current.value = '';
        setText('');
        setIsEditClicked(false);
      })
      .catch((error) => {
        console.error('리뷰 수정 실패:', error);
      });
  };

  const handleDismiss = (event) => {
    event.preventDefault();
    setRating(0);
    setImage(null);
    imgRef.current.value = '';
    setText('');
    setIsEditClicked(false);
  };

  return (
    <ReviewFormContainer onSubmit={handleSubmit}>
      <Rating
        size="25px"
        fillColor="#61a0ff"
        emptyColor="#C9C9C9"
        onClick={(rating) => setRating(rating)}
        initialValue={isEditClicked ? editingReview.score : rating}
        required
      />
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={() => setImage(imgRef.current.files[0])}
        ref={imgRef}
      />
      <ButtonBox>
        <FormButton type="submit" backgroundColor="#61a0ff">
          {isEditClicked ? '수정하기' : '등록하기'}
        </FormButton>
        <FormButton
          type="button"
          backgroundColor="#ff0000"
          onClick={handleDismiss}
        >
          취소
        </FormButton>
      </ButtonBox>
    </ReviewFormContainer>
  );
}

export default ReviewForm;
