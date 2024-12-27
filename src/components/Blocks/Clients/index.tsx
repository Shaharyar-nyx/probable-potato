import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./styles.module.css";
import { clientsContent } from "@/data/clients";

const Clients = () => {
  return (
    <div className={styles.clientsSection}>
      <h2 className={`${styles.title} font-primaryBold`}>
        {clientsContent.title}
      </h2>
      <div className={styles.carouselContainer}>
        <Slider {...clientsContent.sliderSettings}>
          {clientsContent.clients.map((client, index) => (
            <div key={`${client.name}-${index}`} className={styles.div}>
              <div className={styles.logoWrapper}>
                <img
                  src={client.logo.src}
                  alt={`${client.name} logo`}
                  className={styles.clientLogo}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Clients;
