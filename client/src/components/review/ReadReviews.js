import styled from 'styled-components';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import { Rating } from 'react-simple-star-rating';

const ReviewContainer = styled.ul`
  padding: 0 16px;
  #review-date {
    margin-top: 20px;
    color: var(--gray);
    font-size: x-small;
    text-align: right;
  }
`;

const ReviewBox = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 16px 0;
  padding: 20px 0;
  border-bottom: ${(props) => props.border};
  #review {
    margin-top: 20px;
  }
  > img {
    width: 100px;
    height: 100px;
  }
`;

const ReviewContents = styled.div`
  width: 75%;
  flex-direction: row;
  margin-right: 10px;
`;

const UserInformation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > * {
    margin-right: 10px;
  }
  > img {
    width: 40px;
    height: 40px;
  }
  #user-nickname {
    width: 70%;
  }
  #review-edit {
    display: flex;
    justify-content: center;
    width: 15%;
    margin-right: 0;
    > button {
      color: var(--gray);
      font-size: small;
      margin: auto;
    }
  }
`;

function ReadReviews({ productReviews, setEditingReview, setIsEditClicked }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  const handeleDeleteReview = (reviewId) => {
    axios
      .delete(`/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Refresh: `${refreshToken}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('리뷰 삭제 실패:', error);
      });
  };

  const handleEditReview = (reviewData) => {
    setEditingReview(reviewData);
    setIsEditClicked(true);
  };

  return (
    <ReviewContainer>
      {productReviews?.length === 0 && (
        <ReviewBox>
          <div>작성된 리뷰가 없습니다.</div>
        </ReviewBox>
      )}
      {productReviews?.map((review) => {
        return (
          <ReviewBox key={`${review.reviewId}`} border={`1px solid #c9c9c9`}>
            <ReviewContents>
              <UserInformation>
                <img
                  alt="유저 프로필"
                  src={review.reviewMember.memberImageURL}
                ></img>
                <div id="user-nickname">
                  <Rating
                    size="15px"
                    fillColor="#61a0ff"
                    emptyColor="#C9C9C9"
                    initialValue={review.score}
                    readonly="true"
                  />
                  <div>{review.reviewMember.nickname}</div>
                </div>
                <div id="review-edit">
                  <button
                    type="button"
                    onClick={() => handleEditReview(review)}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={() => handeleDeleteReview(review.reviewId)}
                  >
                    삭제
                  </button>
                </div>
              </UserInformation>
              <div id="review">{review.content}</div>
              <div id="review-date">
                <div>
                  작성일: {new Date(review.createdAt).toLocaleString('ko-KR')}
                </div>
                {review.createdAt !== review.modifiedAt && (
                  <div>
                    수정일:{' '}
                    {new Date(review.modifiedAt).toLocaleString('ko-KR')}
                  </div>
                )}
              </div>
            </ReviewContents>
            <img alt="리뷰사진" src={review.imageURL}></img>
          </ReviewBox>
        );
      })}
    </ReviewContainer>
  );
}

export default ReadReviews;
