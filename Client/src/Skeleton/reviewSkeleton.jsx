import React from 'react';
import Skeleton from "react-loading-skeleton";

const ReviewSkeleton = () => {
    return (
        <div>
            <div className="container">
                <div className="row justify-content-start align-items-start">
                    <div className="col-md-8">
                        {
                            Array.from(({length: 10})).map(() => {
                                return (
                                    <Skeleton count={1} width={400}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSkeleton;