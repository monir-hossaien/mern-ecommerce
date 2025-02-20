import React from 'react';
import {Link, useNavigate} from "react-router";
import UserButton from "./UserButton.jsx";
import {userStore} from "../../store/userStore.js";
import ValidationHelper from "../../Utility/validation.js";
import {errorToast, setEmail, successToast} from "../../Utility/helper.js";

const Login = () => {
    const navigate = useNavigate();
    const {formData, inputOnchange, sentOTPRequest, setSubmit} = userStore();

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if(ValidationHelper.IsEmpty(formData.email)){
                errorToast("Email must be required");
            }
            else if(!ValidationHelper.IsEmail(formData.email)){
                errorToast("Email not valid");
            }
            else{
                setSubmit(true)
                let res = await sentOTPRequest(formData.email);
                if(res){
                    setEmail(formData.email)
                    setSubmit(false)
                    successToast(res?.message);
                    navigate("/otp-verify");
                }
            }
        }catch(err){
            errorToast(err?.response?.data?.message);
            setSubmit(false)
        }
    }

    return (
        <div className="container section">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={formSubmitHandler} className="form-control py-5 px-3 shadow-sm">
                        <div className="mb-4">
                            <input value={formData.email} onChange={(e)=>inputOnchange("email", e.target.value)} type="email" id="form2Example1" className="form-control shadow-none focus-ring-success" placeholder="Email"  />
                        </div>
                        <UserButton type="submit" text="Send OTP" className="btn btn-success w-100 mb-4" />
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

export default Login;