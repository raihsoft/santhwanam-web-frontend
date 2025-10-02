import React from "react";

const Building = () => {
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
                        <h2 className="section-title mb-0">Building Inauguration</h2>
                        <p className="text-muted mb-0">Capturing moments of care and compassion</p>
                    </div>

                    <div style={{ width: "120px" }}></div>
                </div>

                {/* Gallery Grid */}
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <a data-lightbox="gallery" data-title="Building inauguration">
                            <img
                                src="../img/Building-inauguration.2.jpeg"
                                className="img-fluid w-100 shadow"
                                alt="Gallery Image 1"
                            />
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <a data-lightbox="gallery" data-title="Building inauguration">
                            <img
                                src="../img/Building-inauguration.3.jpeg"
                                className="img-fluid w-100 shadow"
                                alt="Gallery Image 2"
                            />
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <a data-lightbox="gallery" data-title="Building inauguration">
                            <img
                                src="../img/Building-inauguration.5.jpeg"
                                className="img-fluid w-100 shadow"
                                alt="Gallery Image 3"
                            />
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <a data-lightbox="gallery" data-title="Building inauguration">
                            <img
                                src="../img/Building-inauguration.6.jpeg"
                                className="img-fluid w-100 shadow"
                                alt="Gallery Image 4"
                            />
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <a data-lightbox="gallery" data-title="Building inauguration">
                            <img
                                src="../img/Building-inauguration.7.jpeg"
                                className="img-fluid w-100 shadow"
                                alt="Gallery Image 5"
                            />
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <a data-lightbox="gallery" data-title="Building inauguration">
                            <img
                                src="../img/Building-inauguration.8.jpeg"
                                className="img-fluid w-100 shadow"
                                alt="Gallery Image 6"
                            />
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <a data-lightbox="gallery" data-title="Building inauguration">
                            <img
                                src="../img/Building-inauguration.9.jpeg"
                                className="img-fluid w-100 shadow"
                                alt="Gallery Image 7"
                            />
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <a data-lightbox="gallery" data-title="Building inauguration">
                            <img
                                src="../img/Building-inauguration1.jpeg"
                                className="img-fluid w-100 shadow"
                                alt="Gallery Image 8"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Building;
