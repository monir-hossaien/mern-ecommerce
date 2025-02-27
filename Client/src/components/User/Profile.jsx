import React, {useEffect, useState} from 'react';
import { userStore } from "../../store/userStore.js";
import { errorToast, successToast, TimestampToDate } from "../../Utility/helper.js";
import ProfileSkeleton from "../../Skeleton/profileSkeleton.jsx";
import UserButton from "./UserButton.jsx";
import validation from "../../Utility/validation.js";

const Profile = () => {
    const {
        formData,
        isLogin,
        profile,
        inputOnchange,
        saveProfile,
        getProfileDetails,
        setSubmit,
        user,
        getUserDetails,
        districtList,
        getDistrictList,
        postList,
        getPostList,
        divisionList,
        getDivisionList
    } = userStore();

    // State to track the selected division ID
    const [selectedCustomerDivisionId, setSelectedCustomerDivisionId] = useState('');

    // State to track the selected division ID
    const [selectedCustomerDistrictId, setSelectedCustomerDistrictId] = useState('');

    // State to track the selected division ID
    const [selectedShippingDivisionId, setSelectedShippingDivisionId] = useState('');

    // State to track the selected division ID
    const [selectedShippingDistrictId, setSelectedShippingDistrictId] = useState('');

    useEffect(() => {
        (async () => {
            if (isLogin()) {
                await getUserDetails();
                await getProfileDetails();
                await getDivisionList();
            }
        })();
    }, []);

    // Fetch customer districts when the selected division changes
    useEffect(() => {
        (async () => {
            if (selectedCustomerDivisionId) {
                await getDistrictList(selectedCustomerDivisionId);
            }
        })();
    }, [selectedCustomerDivisionId]);

    // Fetch customer posts when the selected district changes
    useEffect(() => {
        (async () => {
            if (selectedCustomerDistrictId) {
                await getPostList(selectedCustomerDistrictId);
            }
        })();
    }, [selectedCustomerDistrictId]);

    // Fetch shipping districts when the selected division changes
    useEffect(() => {
        (async () => {
            if (selectedShippingDivisionId) {
                await getDistrictList(selectedShippingDivisionId);
            }
        })();
    }, [selectedShippingDivisionId]);

    // Fetch shipping posts when the selected district changes
    useEffect(() => {
        (async () => {
            if (selectedShippingDistrictId) {
                await getPostList(selectedShippingDistrictId);
            }
        })();
    }, [selectedShippingDistrictId]);

    // Handle customer division change
    const handleDivisionChange = (e) => {
        const divisionId = e.target.value;
        setSelectedCustomerDivisionId(divisionId);
        inputOnchange("division", e.target.options[e.target.selectedIndex].text);
    };

    // Handle customer district change
    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedCustomerDistrictId(districtId);
        inputOnchange("district", e.target.options[e.target.selectedIndex].text);
    };


    // Handle shipping division change
    const handleShippingDivisionChange = (e) => {
        const divisionId = e.target.value;
        setSelectedShippingDivisionId(divisionId);
        inputOnchange("shippingDivision", e.target.options[e.target.selectedIndex].text);
    };

    // Handle shipping district change
    const handleShippingDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedShippingDistrictId(districtId);
        inputOnchange("shippingDistrict", e.target.options[e.target.selectedIndex].text);
    };


    const handleChange = async () => {
        try {
            if (validation.IsEmpty(formData.name)) {
                errorToast("Please enter name");
            } else if (validation.IsEmpty(formData.division)) {
                errorToast("Please enter division");
            } else if (validation.IsEmpty(formData.district)) {
                errorToast("Please enter district");
            } else if (validation.IsEmpty(formData.post)) {
                errorToast("Please enter post name");
            } else if (validation.IsEmpty(formData.area)) {
                errorToast("Please enter union");
            } else if (validation.IsEmpty(formData.phone)) {
                errorToast("Please enter phone");
            } else if (validation.IsEmpty(formData.shippingName)) {
                errorToast("Please enter shipping name");
            } else if (validation.IsEmpty(formData.shippingDivision)) {
                errorToast("Please enter division");
            } else if (validation.IsEmpty(formData.shippingDistrict)) {
                errorToast("Please enter district");
            } else if (validation.IsEmpty(formData.shippingPost)) {
                errorToast("Please enter post name");
            } else if (validation.IsEmpty(formData.shippingArea)) {
                errorToast("Please enter Union");
            } else if (validation.IsEmpty(formData.shippingPhone)) {
                errorToast("Please enter phone");
            } else {
                setSubmit(true);
                const res = await saveProfile(formData);
                if (res.status === "success") {
                    setSubmit(false);
                    successToast(res?.message);
                    await getProfileDetails();
                } else {
                    setSubmit(false);
                    errorToast(res?.message);
                }
            }
        } catch (error) {
            errorToast(error?.response?.data?.message);
            setSubmit(false);
        }
    };

    return (
        <>
            {
                user === null ? (<ProfileSkeleton />) : (
                    <div className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="rounded bg-white card pt-4">
                                        <div className="position-relative mx-auto w-36 rounded-circle d-flex justify-content-center align-items-center">
                                            <span className="position-absolute end-0 m-3 h-3 w-3 rounded-circle bg-success"></span>
                                            <img className="mx-auto img-fluid rounded-circle w-50 border border-secondary-subtle"
                                                 src={user?.profileImage || "images/default-avatar.png"}
                                                 alt="profile image" />
                                        </div>
                                        <h1 className="my-1 text-center fs-5 font-weight-bold">{profile?.name || "Guest"}</h1>
                                        <p className="text-center small font-weight-bold">{user?.email || "guest@gmail.com"}</p>
                                        <ul className="mt-3 list-group rounded bg-light py-4 px-3 text-muted shadow-sm">
                                            <li className="list-group-item d-flex justify-content-between py-3 small">
                                                <span>Status</span>
                                                <span><span
                                                    className="rounded bg-success py-1 px-2 small font-weight-medium text-white">{
                                                    user?.isActive === true ? "Active" : "Inactive"
                                                }</span></span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between py-3 small">
                                                <span>Joined On</span>
                                                <span>{TimestampToDate(user?.createdAt)}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="wrapper">
                                        <div className="card p-4 rounded-3">
                                            <h6 className="fw-bolder">Customer Details</h6>
                                            <hr />
                                            <div className="row mb-4">
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Name<span
                                                        className="text-danger">*</span></label>
                                                    <input value={formData?.name}
                                                           onChange={(e) => inputOnchange("name", e.target.value)}
                                                           type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Division<span
                                                        className="text-danger">*</span></label>
                                                    <select
                                                        className="form-select form-control"
                                                        value={formData?.division}
                                                        onChange={handleDivisionChange}
                                                    >
                                                        <option value="">{formData?.division}</option>
                                                        {divisionList.map((division, i) => (
                                                            <option value={division?._id}
                                                                    key={i}>{division?.name}</option>
                                                        ))}
                                                    </select>

                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">District<span
                                                        className="text-danger">*</span></label>
                                                    <select
                                                        className="form-select form-control"
                                                        value={formData?.district}
                                                        onChange={handleDistrictChange}
                                                    >
                                                        <option value="">{formData?.district}</option>
                                                        {districtList.map((district, i) => (
                                                            <option value={district?._id}
                                                                    key={i}>{district?.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Post<span
                                                        className="text-danger">*</span></label>
                                                    <select
                                                        className="form-select form-control"
                                                        value={formData?.post}
                                                        onChange={(e) => inputOnchange("post", e.target.value)}
                                                    >
                                                        <option value="">{formData?.post}</option>
                                                        {postList.map((post, i) => (
                                                            <option value={post?.name}
                                                                    key={i}>{post?.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Area<span
                                                        className="text-danger">*</span></label>
                                                    <input value={formData?.area}
                                                           onChange={(e) => inputOnchange("area", e.target.value)}
                                                           type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Contact<span
                                                        className="text-danger">*</span></label>
                                                    <input value={formData?.phone}
                                                           onChange={(e) => inputOnchange("phone", e.target.value)}
                                                           type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Post Code</label>
                                                    <input value={formData?.postalCode}
                                                           onChange={(e) => inputOnchange("postalCode", e.target.value)}
                                                           type="text" className="form-control "/>
                                                </div>
                                            </div>

                                            <h6 className="fw-bolder">Shipping Details</h6>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Recipient Name<span
                                                        className="text-danger">*</span></label>
                                                    <input value={formData?.shippingName}
                                                           onChange={(e) => inputOnchange("shippingName", e.target.value)}
                                                           type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping Division<span
                                                        className="text-danger">*</span></label>
                                                    <select
                                                        className="form-select form-control"
                                                        value={formData?.shippingDivision}
                                                        onChange={handleShippingDivisionChange}
                                                    >
                                                        <option value="">{formData?.shippingDivision}</option>
                                                        {divisionList.map((division, i) => (
                                                            <option value={division?._id}
                                                                    key={i}>{division?.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping District<span
                                                        className="text-danger">*</span></label>
                                                    <select
                                                        className="form-select form-control"
                                                        value={formData?.shippingDistrict}
                                                        onChange={handleShippingDistrictChange}
                                                    >
                                                        <option value="">{formData?.shippingDistrict}</option>
                                                        {districtList.map((district, i) => (
                                                            <option value={district?._id}
                                                                    key={i}>{district?.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping Post<span
                                                        className="text-danger">*</span></label>
                                                    <select
                                                        className="form-select form-control"
                                                        value={formData?.shippingPost}
                                                        onChange={(e) => inputOnchange("shippingPost", e.target.value)}
                                                    >
                                                        <option value="">{formData?.shippingPost}</option>
                                                        {postList.map((post, i) => (
                                                            <option value={post.name}
                                                                    key={i}>{post?.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping Area<span
                                                        className="text-danger">*</span></label>
                                                    <input value={formData?.shippingArea}
                                                           onChange={(e) => inputOnchange("shippingArea", e.target.value)}
                                                           type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Shipping Contact<span
                                                        className="text-danger">*</span></label>
                                                    <input value={formData?.shippingPhone}
                                                           onChange={(e) => inputOnchange("shippingPhone", e.target.value)}
                                                           type="text" className="form-control "/>
                                                </div>
                                                <div className="col-md-3 p-2">
                                                    <label className="form-label">Post Code</label>
                                                    <input value={formData?.shippingPostalCode}
                                                           onChange={(e) => inputOnchange("shippingPostalCode", e.target.value)}
                                                           type="text" className="form-control "/>
                                                </div>
                                            </div>

                                            <div className="row mt-4">
                                                <div className="col-md-3 p-2">
                                                    <UserButton onClick={() => handleChange()} text="Save Change"
                                                                className="btn btn-success"/>
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
