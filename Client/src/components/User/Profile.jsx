import React, {useEffect} from 'react';
import {userStore} from "../../store/userStore.js";
import {errorToast, successToast, TimestampToDate} from "../../Utility/helper.js";
import ProfileSkeleton from "../../Skeleton/profileSkeleton.jsx";
import UserButton from "./UserButton.jsx";
import validation from "../../Utility/validation.js";

const Profile = () => {
    const {profile, formData, inputOnchange, saveProfile,getProfileDetails, setSubmit} = userStore();


    const handleChange = async () => {
        try {
            if(validation.IsEmpty(formData.name)){
                errorToast("Please enter name");
            }else if(validation.IsEmpty(formData.phone)){
                errorToast("Please enter phone");
            }
            else if(validation.IsEmpty(formData.country)){
                errorToast("Please enter country name");
            }
            else if(validation.IsEmpty(formData.city)){
                errorToast("Please enter city");
            }
            else if(validation.IsEmpty(formData.address)){
                errorToast("Please enter address");
            }
            else if(validation.IsEmpty(formData.shippingName)){
                errorToast("Please enter shipping name");
            }
            else if(validation.IsEmpty(formData.shippingPhone)){
                errorToast("Please enter shipping phone");
            }
            else if(validation.IsEmpty(formData.shippingCountry)){
                errorToast("Please enter shipping country");
            }
            else if(validation.IsEmpty(formData.shippingCity)){
                errorToast("Please enter shipping city");
            }
            else if(validation.IsEmpty(formData.shippingAddress)){
                errorToast("Please enter shipping address");
            }
            else{
                setSubmit(true)
                const res = await saveProfile(formData);
                if(res.status === "success"){
                    setSubmit(false)
                    successToast(res?.message)
                    await getProfileDetails()
                }
                else{
                    setSubmit(false)
                    errorToast(res?.message)
                }

            }
        }catch (error) {
            errorToast(error?.response?.data?.message);
            setSubmit(false)
        }
    }

    return (
        <>
            {
                profile === null ? (<ProfileSkeleton/>): (
                    <div className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="rounded  bg-white card pt-4">
                                        <div
                                            className="position-relative mx-auto w-36 rounded-circle d-flex justify-content-center align-items-center">
                                            <span
                                                className="position-absolute end-0 m-3 h-3 w-3 rounded-circle bg-success"></span>
                                            <img className="mx-auto img-fluid rounded-circle w-50"
                                                 src={profile?.user?.profileImage || "images/default-avatar.png"}
                                                 alt="profile image"/>
                                        </div>
                                        <h1 className="my-1 text-center fs-5 font-weight-bold">{profile?.name || "Guest"}</h1>
                                        <p className="text-center small font-weight-bold">{profile?.user?.email || "guest@gmail.com"}</p>
                                        <ul className="mt-3 list-group rounded bg-light py-4 px-3 text-muted shadow-sm">
                                            <li className="list-group-item d-flex justify-content-between py-3 small">
                                                <span>Status</span>
                                                <span><span
                                                    className="rounded bg-success py-1 px-2 small font-weight-medium text-white">{
                                                    profile?.user?.isActive === true ? "Active" : "In active"
                                                }</span></span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between py-3 small">
                                                <span>Joined On</span>
                                                <span>{TimestampToDate(profile?.user?.createdAt)}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="wrapper">
                                        <div className="card p-4 rounded-3">
                                            <h6>Customer Details</h6>
                                            <hr/>
                                            <div className="row mb-4">
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Customer Name </label>
                                                    <input value={formData?.name} onChange={(e)=>{inputOnchange("name", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Customer Phone </label>
                                                    <input value={formData?.phone} onChange={(e)=>{inputOnchange("phone", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Customer Fax </label>
                                                    <input value={formData?.fax} onChange={(e)=>{inputOnchange("fax", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Customer Country </label>
                                                    <input value={formData?.country} onChange={(e)=>{inputOnchange("country", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Customer City </label>
                                                    <input value={formData?.city} onChange={(e)=>{inputOnchange("city", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Customer State </label>
                                                    <input value={formData?.state} onChange={(e)=>{inputOnchange("state", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Customer Post Code </label>
                                                    <input value={formData?.postalCode} onChange={(e)=>{inputOnchange("postalCode", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Customer Address</label>
                                                    <input value={formData?.address} onChange={(e)=>{inputOnchange("address", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                            </div>
                                            <h6>Shipping Details</h6>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping Name </label>
                                                    <input value={formData?.shippingName} onChange={(e)=>{inputOnchange("shippingName", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping Phone </label>
                                                    <input value={formData?.shippingPhone} onChange={(e)=>{inputOnchange("shippingPhone", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping Country </label>
                                                    <input value={formData?.shippingCountry} onChange={(e)=>{inputOnchange("shippingCountry", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping City </label>
                                                    <input value={formData?.shippingCity} onChange={(e)=>{inputOnchange("shippingCity", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping State </label>
                                                    <input value={formData?.shippingState} onChange={(e)=>{inputOnchange("shippingState", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping Post Code </label>
                                                    <input value={formData?.shippingPostalCode} onChange={(e)=>{inputOnchange("shippingPostalCode", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping Address</label>
                                                    <input value={formData?.shippingAddress} onChange={(e)=>{inputOnchange("shippingAddress", e.target.value)}} type="text" className="form-control "/>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-md-3 p-2">
                                                    <UserButton onClick={()=>handleChange()} text="Save Change" className="btn btn-success"  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Profile;