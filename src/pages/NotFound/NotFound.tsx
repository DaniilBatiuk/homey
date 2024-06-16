import { Link } from "react-router-dom";

import DevImage from "@/assets/images/DevelopmentImage.png";
import Errorimage from "@/assets/images/Error.png";

import styles from "./NotFound.module.scss";

type NotFoundProp = {
  type: "Not found" | "In progress";
};

const NotFound: React.FC<NotFoundProp> = ({ type }: NotFoundProp) => {
  return (
    <section className={styles.error__container} style={{ paddingInline: "0px" }}>
      {type === "Not found" ? (
        <>
          <div className={styles.error__header}>
            <h1 className={styles.error__title}>404</h1>
            <h2 className={styles.error__subtitle}>Page not found</h2>
          </div>
          <div className={styles.error__image}>
            <img src={Errorimage} alt="error.png" loading="lazy" />
          </div>
          <div className={styles.error__body}>
            <p className={styles.error__text}>
              Unfortunately, the page you requested cannot be found. This may be the result of a
              typo in the address or the page has been moved to a new address.
            </p>
            <Link to="/" className={styles.error__link}>
              GO HOME
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className={styles.error__development}>
            <div className={styles.error__body}>
              <h3 className={styles.error__subtitle_development}>The page in development"</h3>
              <p className={styles.error__text}>
                Our team is working hard to make this page available to you soon. We strive to
                provide you with the best experience using our site."
              </p>
              <Link to="/" className={styles.error__link}>
                GO HOME
              </Link>
            </div>
            <div className={styles.error__image}>
              <img src={DevImage} alt="dev.png" loading="lazy" />
            </div>
          </div>

          <div className={styles.error__development_mob}>
            <div className={styles.error__image}>
              <img src={DevImage} alt="dev.png" loading="lazy" />
            </div>
            <div className={styles.error__body}>
              <h3 className={styles.error__subtitle_development}>The page in development"</h3>
              <p className={styles.error__text}>
                Our team is working hard to make this page available to you soon. We strive to
                provide you with the best experience using our site."
              </p>
              <Link to="/" className={styles.error__link}>
                GO HOME
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default NotFound;
