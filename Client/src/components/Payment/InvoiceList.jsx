
import React, {useEffect} from 'react';
import {invoiceStore} from "../../store/invoiceStore.js";
import InvoiceListSkeleton from "../../Skeleton/invoiceListSkeleton.jsx";
import NoData from "../Product/NoData.jsx";
import {paymentStatusColor} from "../../Utility/helper.js";
import {NavLink} from "react-router";

const InvoiceList = () => {
    const {invoiceList, getInvoiceList} = invoiceStore()


    useEffect(()=>{
        (async ()=>{
            await getInvoiceList();
        })()
    },[])



    if(invoiceList === null){
        return <InvoiceListSkeleton/>
    }else if(invoiceList.length === 0){
        return  <NoData/>
    }

    return (
        <div className="container mt-5">
            <div className="card rounded">

                <div className="card-header bg-secondary text-white">
                    <h3 className="mb-0">Invoices</h3>
                </div>


                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle mb-0">
                        <thead className="table-light">
                        <tr>
                            <th className="py-3">Invoice ID</th>
                            <th className="py-3">Customer</th>
                            <th className="py-3 text-center">Payment</th>
                            <th className="py-3 text-center">Delivery</th>
                            <th className="py-3 text-end">Total</th>
                            <th className="py-3 text-end">Vat(5%)</th>
                            <th className="py-3 text-end">Payable</th>
                            <th className="py-3 text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            invoiceList.map((invoice, i) =>{
                                const {_id, transactionId, customerDetails, paymentStatus, total, vat, payable, deliveryStatus} = invoice;
                                return (
                                    <tr key={i}>
                                        <td className="fw-semibold">{transactionId}</td>
                                        <td>{customerDetails?.name}</td>
                                        <td className="text-center">
                                            <span
                                                className={`badge ${paymentStatusColor(paymentStatus)}`}>{paymentStatus}</span>
                                        </td>
                                        <td className="text-center">
                                            <span
                                                className={`badge ${paymentStatusColor(deliveryStatus)}`}>{deliveryStatus}</span>
                                        </td>
                                        <td className="text-end fw-medium">${total}</td>
                                        <td className="text-end fw-medium">${vat}</td>
                                        <td className="text-end fw-medium">${payable}</td>
                                        <td className="text-center">
                                            <NavLink to={`/invoice-details/${_id}`} className="btn text-white px-4" style={{ background: "#00234D"}}>View</NavLink>
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

    );
};

export default InvoiceList;
