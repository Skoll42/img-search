import React from "react";
import styles from "./Card.module.scss";

const Card = ({ results }) => {
    let display;

    if (results?.results) {
        display = results.results.map((x) => {
            let { urls } = x;

            return (
                    <a class="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative">
                        <div
                            className={`${styles.card} d-flex flex-column justify-content-center`}
                        >
                            <img className={`${styles.img} img-fluid`} src={urls.small_s3} alt="" />
                        </div>
                    </a>
            );
        });
    } else {
        display = "No Images Found :/";
    }

    return <>{display}</>;
};

export default Card;