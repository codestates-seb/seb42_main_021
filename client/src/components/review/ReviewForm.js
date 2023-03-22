import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import newAxios from '../newAxios';
import { useNavigate } from 'react-router-dom';

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
  isEditClicked,
  setIsEditClicked,
  editingReview,
}) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [image, setImage] = useState(
    new Blob([], {
      type: 'image/jpg',
    })
  );

  const [cookies] = useCookies();
  const refreshToken = cookies.refreshToken;

  const imgRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditClicked) {
      setText('');
    } else setText(editingReview.content);
  }, [isEditClicked, editingReview]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!refreshToken) {
      window.alert('리뷰를 작성하기 전에 로그인 해주세요.');
      return navigate('/login');
    }

    const formData = new FormData();
    if (image === null) {
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

      return newAxios
        .post('/reviews', formData)
        .then(() => {
          window.location.reload();
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

    newAxios
      .patch(`/reviews/${editingReview.reviewId}`, formData)
      .then(() => {
        window.location.reload();
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
