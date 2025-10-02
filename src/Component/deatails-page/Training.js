import React from "react";

const Training = () => {
    return (
        <div>
            <div className="container py-5">
                {/* Back Button + Title */}
                <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                    <button
                        className="btn btn-outline-primary mb-2"
                        onClick={() => window.history.back()}
                    >
                        X
                    </button>

                    <div className="mx-auto text-center">
                        <h2 className="section-title mb-0">Training Program</h2>
                        <p className="text-muted mb-0">Capturing moments of care and compassion</p>
                    </div>

                    <div style={{ width: "120px" }}></div>
                </div>

                {/* Gallery Grid */}
                <div className="row">
                    {Array.from({ length: 8 }, (_, i) => (
                        <div className="col-12 col-sm-6 col-md-3 mb-4" key={i}>
                            <a data-lightbox="gallery">
                                <img
                                    src={`../img/training${i + 1}.jpeg`}
                                    className="img-fluid w-100 shadow"
                                    alt={`Gallery Image ${i + 1}`}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Training;
