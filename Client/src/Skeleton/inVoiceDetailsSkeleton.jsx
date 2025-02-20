import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const InvoiceDetailsSkeleton = () => {
    return (
        <div className="container py-3">
            <div className="card p-4 border-0 rounded">

                {/* Order Details */}
                <div className="mb-3">
                    <h5>Order ID: <Skeleton width={100} height={15} /></h5>
                    <h5>Date: <Skeleton width={150} height={15} /></h5>
                    <h5>Status: <Skeleton width={80} height={15} /></h5>
                </div>

                {/* Customer Info */}
                <div className="mb-4">
                    <h4 className="fw-bold">Customer Information</h4>
                    <table className="table table-bordered">
                        <thead className="table-light">
                        <tr>
                            <th>Name</th><th>Phone</th><th>Fax</th><th>Address</th>
                            <th>City</th><th>Country</th><th>State</th><th>Post Code</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {[...Array(8)].map((_, i) => (
                                <td key={i}><Skeleton width="100%" /></td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* Shipping Info */}
                <div className="mb-4">
                    <h4 className="fw-bold">Shipping Information</h4>
                    <table className="table table-bordered">
                        <thead className="table-light">
                        <tr>
                            <th>Recipient</th><th>Phone</th><th>Address</th>
                            <th>City</th><th>State</th><th>Postal Code</th><th>Country</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {[...Array(7)].map((_, i) => (
                                <td key={i}><Skeleton width="100%" /></td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* Product List */}
                <div className="mb-4">
                    <h4 className="fw-bold">Items Purchased</h4>
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
                        {[...Array(4)].map((_, i) => (
                            <tr key={i} className="align-middle">
                                <td className="text-center"><Skeleton width={50} height={50}/></td>
                                <td><Skeleton width={150}/></td>
                                <td><Skeleton width={50}/></td>
                                <td><Skeleton width={50}/></td>
                                <td><Skeleton width={50}/></td>
                                <td><Skeleton width={50}/></td>
                                <td><Skeleton width={80}/></td>
                                <td><Skeleton width={80}/></td>
                                <td><Skeleton width={80}/></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Payment Summary */}
                <div className="mt-3">
                    <h4>Payment Summary</h4>
                    <div className="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <Skeleton width={50} />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Tax (5%):</span>
                        <Skeleton width={50} />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                        <span>Total:</span>
                        <Skeleton width={50} />
                    </div>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                    <button className="btn border-0" disabled>
                        <Skeleton width={120} height={30} />
                    </button>
                    <button className="btn border-0" disabled>
                        <Skeleton width={140} height={30} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetailsSkeleton;
