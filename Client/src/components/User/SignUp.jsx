import React from 'react';
import {Link} from "react-router";

const SignUp = () => {
    return (
        <div className="container section">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form className="form-control py-5 px-3 shadow-sm">
                        <div className="mb-4">
                            <input type="email" id="form2Example1"
                                   className="form-control shadow-none focus-ring-success" placeholder="Email" required/>
                        </div>
                        <div className="mb-4">
                            <input type="email" id="form2Example1"
                                   className="form-control shadow-none focus-ring-success" placeholder="Name" required/>
                        </div>
                        <div className="mb-4">
                            <input type="file" id="form2Example1"
                                   className="form-control shadow-none focus-ring-success"/>
                        </div>
                        <button type="button"
                                className="btn btn-success mb-4 w-100">
                            Register
                        </button>
                        <div className="text-center">
                            <p>
                                Already have an account?
                                <Link to="/login">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;