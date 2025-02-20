import React from 'react';
import {productStore} from "../../store/productStore.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import ReviewSkeleton from "../../Skeleton/reviewSkeleton.jsx";
import {formatDate, TimestampToDate} from "../../Utility/helper.js";

const Review = () => {
    const {reviewList} = productStore();
    if(reviewList === null ){
        return (
            <ReviewSkeleton/>
        )
    }
    return (
        <sction id="review_section">
            {
                reviewList?.map((review, i)=>{
                    return (
                        <div className="row">
                            <div className="col-md-8">
                                <div key={i} className="d-flex align-items-center gap-3 mt-5">
                                    <div className="profile-icon align-self-start">
                                        <img src={review?.user?.profileImage} alt="profileImage"/>
                                    </div>
                                    <div className="d-flex flex-column gap-2 justify-content-center">
                                        <StarRatings
                                            rating={review?.rating}
                                            starRatedColor="red"
                                            starDimension="15px"
                                            starSpacing="2px"
                                        />
                                        <p className="fs-5">{review?.description}</p>
                                        <h6 className="fw-bolder text-secondary">{review?.user?.name}</h6>
                                        <h6 className="text-muted">{TimestampToDate(review?.createdAt)}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </sction>
    );
};

export default Review;