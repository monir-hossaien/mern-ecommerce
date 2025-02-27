import React, {useEffect, useState} from "react";
import InvoicePDF from "./InvoicePDF.jsx";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {invoiceStore} from "../../store/invoiceStore.js";
import {cartStore} from "../../store/cartStore.js";
import {NavLink, useParams} from "react-router";
import {paymentStatusColor, TimestampToDate} from "../../Utility/helper.js";
import InVoiceDetailsSkeleton from "../../Skeleton/inVoiceDetailsSkeleton.jsx";
import CartBtn from "../Button/CartBtn.jsx";
import ReviewModal from "../Product/ReviewModal.jsx";

const InvoiceDetails = () => {
    const [selected, setSelected] = useState(null);
    const {invoiceDetailsData, getInvoiceDetails} = invoiceStore()
    const {invoiceID} = useParams()
    // const {setCartSubmit} = cartStore()
    useEffect(() => {
        (async ()=>{
            await getInvoiceDetails(invoiceID)
        })()
    },[invoiceID])

    // //create invoice
    // const invoiceHandler = async () => {
    //     try {
    //         setCartSubmit(true);
    //         let res = await createInvoice();
    //         if (res?.status === "success"){
    //             setCartSubmit(false);
    //             window.location.href= res?.data?.['GatewayPageURL'];
    //         }
    //     }catch(err){
    //         errorToast(err?.response?.data?.message);
    //         setCartSubmit(false);
    //     }
    // }

    if(invoiceDetailsData === null){
        return <InVoiceDetailsSkeleton/>
    }
    const {invoice, products} = invoiceDetailsData;
    const {transactionId, total, vat, payable, createdAt, paymentStatus, customerDetails, shippingDetails} = invoice

    return (
        <div className="container py-3">
            <div className="card p-4 border-0 rounded">
                {/* Order Details */}
                <div className="mb-3">
                    <h5>Order ID: <span className="text-muted">{transactionId}</span></h5>
                    <h5>Date: <span className="text-muted">{TimestampToDate(createdAt)}</span></h5>
                    <h5>Status: <p className={`badge ${paymentStatusColor(paymentStatus)}`}>{paymentStatus}</p></h5>
                </div>

                <div>
                    <div>

                        {/* Customer Info */}
                        <div className="mb-4">
                            <h4 className="fw-bold">Customer Information</h4>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Division</th>
                                        <th>District</th>
                                        <th>Post</th>
                                        <th>Area</th>
                                        <th>Contact</th>
                                        <th>Post Code</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{customerDetails?.name}</td>
                                        <td>{customerDetails?.division}</td>
                                        <td>{customerDetails?.district}</td>
                                        <td>{customerDetails?.post}</td>
                                        <td>{customerDetails?.area}</td>
                                        <td>{customerDetails?.phone}</td>
                                        <td>{customerDetails?.postalCode}</td>

                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="mb-4">
                            <h4 className="fw-bold">Shipping Information</h4>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                    <tr>
                                        <th>Recipient Name</th>
                                        <th>Shipping Division</th>
                                        <th>Shipping District</th>
                                        <th>Shipping Post</th>
                                        <th>Shipping Area</th>
                                        <th>Shipping Contact</th>
                                        <th>Post Code</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{shippingDetails?.shippingName}</td>
                                        <td>{shippingDetails?.shippingDivision}</td>
                                        <td>{shippingDetails?.shippingDistrict}</td>
                                        <td>{shippingDetails?.shippingPost}</td>
                                        <td>{shippingDetails?.shippingArea}</td>
                                        <td>{shippingDetails?.shippingPhone}</td>
                                        <td>{shippingDetails?.shippingPostalCode}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Product List */}
                        <div className="mb-4">
                            <h4 className="fw-bold">Items Purchased</h4>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                    <tr>
                                        <th>Product</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Size</th>
                                        <th>Color</th>
                                        <th>Price</th>
                                        <th>Discount Price</th>
                                        <th>Net Price</th>
                                        <th>Review</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/* Product List */}
                                    {
                                        products?.map((item, i) => {
                                            return (
                                                <tr key={i} className="align-middle">
                                                    <td className="text-center">
                                                        <img
                                                            src={item.product.productImg[0]}
                                                            alt="Product Image"
                                                            style={{width: "50px", height: "50px", objectFit: "cover"}}
                                                        />
                                                    </td>
                                                    <td>{item.product.title}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.size}</td>
                                                    <td>{item.color}</td>
                                                    <td>{item.product.price}</td>
                                                    <td>{item.product.discountPrice}</td>
                                                    {
                                                        item.product.discount === true ? (
                                                            <td>{item.quantity * item.product.discountPrice}</td>
                                                        ) : (
                                                            <td>{item.quantity * item.product.price}</td>
                                                        )
                                                    }
                                                    <td>
                                                        <button onClick={() => setSelected(item.product._id)}
                                                                type="button" data-bs-toggle="modal"
                                                                data-bs-target="#reviewModal"
                                                                className="btn btn-success btn-sm">Review
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Payment Summary */}
                <div className="mt-3">
                    <h4>Payment Summary</h4>
                    <div className="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <span>${total}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Tax (5%):</span>
                        <span>${vat}</span>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between fw-bold">
                        <span>Total:</span>
                        <span>${payable}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
                    <NavLink to="/all-products" className="btn btn-success mb-2 mb-md-0">Continue Shopping</NavLink>
                    {paymentStatus === "Success" ? (
                        <PDFDownloadLink
                            document={<InvoicePDF/>}
                            fileName="invoice.pdf"
                            className="btn btn-secondary"
                        >
                            {({loading}) => (loading ? "Generating..." : "Download Invoice")}
                        </PDFDownloadLink>
                    ) : (
                        <CartBtn text="Pay" className="btn btn-success px-5"/>
                    )}
                </div>
            </div>
            <ReviewModal id={selected}/>
        </div>
    );
};

export default InvoiceDetails;
