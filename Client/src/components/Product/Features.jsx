import React, { useEffect } from 'react';
import FeatureSkeleton from "../../Skeleton/featureSkeleton.jsx";
import { featureStore } from "../../store/featureStore.js";

const Features = () => {
    let { featureList, getFeatureList } = featureStore();

    useEffect(() => {
        (async () => {
            await getFeatureList();
        })();
    }, []);

    if (featureList === null) {
        return <FeatureSkeleton />;
    } else {
        return (
            <div className="container section">
                <div className="row">
                    {
                        featureList.map((item, i) => {
                            let { name, image, description } = item;
                            return (
                                <div key={i} className="col-12 col-sm-6 col-md-3 col-lg-3 p-2">
                                    <div className="card shadow-sm h-100 text-center text-md-start">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="d-md-flex justify-content-center align-items-center gap-3">
                                                    {/* Image (Center on Small Devices) */}
                                                    <div className="col-12 col-md-3 d-flex justify-content-center">
                                                        <img className="img-fluid" src={image} alt={name} />
                                                    </div>

                                                    {/* Text Content */}
                                                    <div className="col-12 col-md-9 mt-2 mt-md-0">
                                                        <h3 className="bodyXLarge">{name}</h3>
                                                        <span className="bodySmal">{description}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
};

export default Features;
