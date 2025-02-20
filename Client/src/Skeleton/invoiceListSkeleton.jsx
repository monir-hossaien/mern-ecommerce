import React from 'react';
import Skeleton from "react-loading-skeleton";

const InvoiceListSkeleton = () => {
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
                            <th className="py-3 text-center">Status</th>
                            <th className="py-3 text-end">Total</th>
                            <th className="py-3 text-end">Payable</th>
                            <th className="py-3 text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Array.from({length: 4}).map((_, i)=>{
                                return (
                                    <tr key={i}>
                                        <td><Skeleton width={120}/></td>
                                        <td><Skeleton width={150}/></td>
                                        <td className="text-center"><Skeleton width={90} height={20}/></td>
                                        <td className="text-end"><Skeleton width={100}/></td>
                                        <td className="text-end"><Skeleton width={100}/></td>
                                        <td className="text-center"><Skeleton width={90} height={30}/></td>
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

export default InvoiceListSkeleton;