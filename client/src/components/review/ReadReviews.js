import { useState } from 'react';
import instance from '../newAxios';

import { Rating } from 'react-simple-star-rating';
import {
  ReviewBox,
  ReviewContainer,
  ReviewContents,
  UserInformation,
} from './ReadReviews.styled';

function ReadReviews({
  userNickName,
  productReviews,
  setEditingReview,
  setIsEditClicked,
}) {
  const [deletedReviews, setDeletedReviews] = useState([]);

  const handeleDeleteReview = (reviewId) => {
    instance
      .delete(`/reviews/${reviewId}`)
      .then(() => {
        setDeletedReviews([...deletedReviews, reviewId]);
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
      {productReviews
        ?.filter((review) => !deletedReviews.includes(review.reviewId))
        .map((review) => {
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
                    <div>{review.reviewMember?.nickname}</div>
                  </div>
                  <div id="review-edit">
                    {userNickName === review.reviewMember.nickname && (
                      <>
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
                      </>
                    )}
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
