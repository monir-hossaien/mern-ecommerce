import React from 'react';
import UserButton from "./UserButton.jsx";
import {Link, useNavigate} from "react-router";
import {userStore} from "../../store/userStore.js";
import ValidationHelper from "../../Utility/validation.js";
import {errorToast, getEmail, removeEmail, successToast} from "../../Utility/helper.js";


const OtpVerify = () => {
    const navigate = useNavigate();
    const {inputOnchange, formData, setSubmit, OTPVerifyRequest, sentOTPRequest } = userStore();

    //resend otp handler
    const resendOTPHandler = async () => {
        try {
            let email = getEmail()
            let res = await sentOTPRequest(email);
            if(res){
                successToast(res?.message)
            }else{
                errorToast(res?.message);
            }
        }catch(err){
            errorToast(err?.response?.data?.message);
        }
    }

    let formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if(ValidationHelper.IsEmpty(formData.otp)){
                errorToast("OTP must be required");
            }
            else{
                setSubmit(true)
                let res = await OTPVerifyRequest(formData.otp);
                console.log(res)
                if(res.status === "success"){
                    //email remove from local storage
                    removeEmail()
                    setSubmit(false)
                    successToast(res?.message);
                    navigate("/");
                }else{
                    errorToast(res?.message);
                    setSubmit(false)
                }
            }
        }catch(err){
            errorToast(err?.response?.data?.message);
            setSubmit(false)
        }
    }

    return (
        <div className="container section" id="otp_section">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={formSubmitHandler} className="form-control py-5 px-3 shadow-sm">
                        <div className="mb-3">
                            <input value={formData?.otp} onChange={(e) => inputOnchange("otp", e.target.value)}
                                   type="text" id="form2Example1"
                                   className="form-control shadow-none focus-ring-success" placeholder="OTP"/>
                        </div>
                        <div className="mb-4">
                            <Link onClick={()=> resendOTPHandler()} className="text-secondary small resend_link">Resend OTP</Link>
                        </div>
                        <UserButton type="submit" text="Next" className="btn btn-success w-100 mb-4"/>
                        <div className="text-center">
                            <p>
                                Not a member?
                                <Link to="/sign-up">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OtpVerify;