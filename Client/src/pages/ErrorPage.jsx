import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <section className="bg-white vh-100 d-flex align-items-center">
            <div className="container d-flex justify-content-center">
                <div className="text-center">
                    <p className="h1 text-danger">404!</p>
                    <h1 className="mt-3 h3 text-dark">
                        Page not found
                    </h1>
                    <p className="mt-2 text-muted">
                        The page you are looking for doesn't exist. Here are some helpful links:
                    </p>
                    <div className="d-flex justify-content-center mt-4 gap-2">
                        <button className="btn btn-outline-secondary d-flex align-items-center gap-2"
                                onClick={() => window.history.back()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-5 h-5" style={{ width: "20px", height: "20px" }}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
                            </svg>
                            <span>Go back</span>
                        </button>
                        <Link to="/" className="btn btn-secondary">
                            Take me home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;
