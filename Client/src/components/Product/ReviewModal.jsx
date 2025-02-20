import React, { useState } from "react";
import { productStore } from "../../store/productStore.js";
import { errorToast, successToast } from "../../Utility/helper.js";
import ReviewBtn from "../Button/ReviewBtn.jsx";
import validation from "../../Utility/validation.js";
import { FaStar } from "react-icons/fa";

const ReviewModal = (props) => {
    const { reviewForm, inputOnChange, createReview, setSubmit, isSubmitting } = productStore();
    const productID = props.id;
    const [hover, setHover] = useState(null);

    const handleSubmit = async () => {
        try {
            if (validation.IsEmpty(reviewForm.rating)) {
                errorToast("Rating is required");
            } else if (validation.IsEmpty(reviewForm.description)) {
                errorToast("Description is required");
            } else {
                setSubmit(true);
                let res = await createReview(productID, reviewForm);
                if (res.status === "success") {
                    setSubmit(false);
                    successToast(res.message);
                } else {
                    setSubmit(false);
                    errorToast(res.message);
                }
            }
        } catch (err) {
            setSubmit(false);
            errorToast(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="modal fade" id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-custom-width">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        <h5 className="modal-title" id="reviewModalLabel">Submit Your Review</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                        <form>
                            {/* ⭐ Star Rating Field */}
                            <div className="mb-3 text-center">
                                <label className="col-form-label d-block fw-bold">Rating:</label>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        size={30}
                                        className="mx-1"
                                        color={star <= (hover || reviewForm.rating) ? "#ffc107" : "#e4e5e9"}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(null)}
                                        onClick={() => inputOnChange("rating", star)}
                                        style={{ cursor: "pointer", transition: "color 0.2s ease-in-out" }}
                                    />
                                ))}
                            </div>

                            {/* Message Field */}
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label fw-bold">Message:</label>
                                <textarea
                                    value={reviewForm.description}
                                    onChange={(e) => inputOnChange("description", e.target.value)}
                                    className="form-control"
                                    id="message-text"
                                    placeholder="Write your review here..."
                                    rows="3"
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <ReviewBtn
                            onClick={handleSubmit}
                            type="button"
                            text="Submit"
                            className="btn btn-success w-25"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
