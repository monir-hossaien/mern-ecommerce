import React, { useState } from "react";
import { Link } from "react-router";
import { MdAttachFile } from "react-icons/md";
import { userStore } from "../../store/userStore.js";
import UserButton from "./UserButton.jsx";
import { errorToast, successToast } from "../../Utility/helper.js";
import {useNavigate} from "react-router-dom";
import validation from "../../Utility/validation.js";

const SignUp = () => {
    const [image, setImage] = useState("images/default-avatar.png");
    const { signUpRequest, formData, inputOnchange, setSubmit} = userStore(); // Add resetForm
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
            inputOnchange("profileImage", file); // Update the state properly
        }
    };

    const formBody = new FormData();
    formBody.append("email", formData.email);
    formBody.append("profileImage", formData.profileImage || "images/default-avatar.png");

    const handleSubmit = async () => {
        try {
            if(validation.IsEmpty(formData.email)) {
                errorToast("Email must be required");
            }else{
                setSubmit(true);
                let res = await signUpRequest(formBody);
                if (res.status === "success") {
                    // Reset image after successful submission
                    setImage("images/default-avatar.png");
                    setSubmit(false);
                    successToast(res?.message);
                    navigate("/login");
                } else {
                    setSubmit(false);
                    errorToast(res?.message);
                }
            }
        } catch (err) {
            setSubmit(false);
            errorToast(err?.response?.data?.message);
        }
    };

    return (
        <div className="container section">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form className="form-control py-4 px-3 shadow-sm" encType={"multipart/form-data"}>
                        {/* Profile Image Preview */}
                        <div className="d-flex flex-column justify-content-center align-items-center mb-4">
                            <label htmlFor="fileInput" className="position-relative">
                                <img
                                    src={image}
                                    alt="Profile"
                                    className="rounded-circle card border border-secondary-subtle"
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        objectFit: "cover",
                                    }}
                                />
                                <div
                                    className="position-absolute bottom-0 end-0 text-dark border border-secondary-subtle bg-light rounded-circle p-1 d-flex align-items-center justify-content-center"
                                    style={{ width: "30px", height: "30px", cursor: "pointer" }}
                                >
                                    <MdAttachFile />
                                </div>
                            </label>

                            {/* Hidden File Input */}
                            <input
                                type="file"
                                name="profileImage"
                                id="fileInput"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="d-none"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                value={formData.email}
                                onChange={(e) => inputOnchange("email", e.target.value)}
                                type="email"
                                className="form-control shadow-none focus-ring-success"
                                placeholder="Email"
                                required
                            />
                        </div>

                        <UserButton onClick={handleSubmit} text="Register" type="button" className="btn btn-success mb-4 w-100" />

                        <div className="text-center">
                            <p>
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
