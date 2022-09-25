import React from "react";
import styles from "./Card.module.scss";

const Card = ({images}) => {
    let display;

    if (images.length) {
        display = images.map((image) => {
            let { urls, id } = image;

            return (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative">
                        <div className={`${styles.card} d-flex flex-column justify-content-center`}>
                            <img className={`${styles.img} img-fluid`} src={urls.small_s3} alt="" />
                        </div>
                    </div>
            );
        });
    } else {
        display = "No Images Found :/";
    }

    return <>{display}</>;
};

export default Card;