import React from "react";

const Mathuram = () => {
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
                        <h2 className="section-title mb-0">Payasa Challenge</h2>
                        <p className="text-muted mb-0">Capturing moments of payasa challenge</p>
                    </div>

                    <div style={{ width: "120px" }}></div>
                </div>

                {/* Gallery Grid */}
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <a data-lightbox="gallery" data-title="Building inauguration">
                            <img
                                src="../img/mathuram-1.jpeg"
                                className="img-fluid w-100 shadow"
                                alt="Gallery Image 1"
                            />
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <a data-lightbox="gallery" data-title="Building inauguration">
                            <img
                                src="../img/mathuram-3.jpeg"
                                className="img-fluid w-100 shadow"
                                alt="Gallery Image 1"
                            />
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3 mb-4">
                        <a data-lightbox="gallery" data-title="Building inauguration">
                            <img
                                src="../img/mathuram4.jpeg"
                                className="img-fluid w-100 shadow"
                                alt="Gallery Image 1"
                            />
                        </a>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default Mathuram;
