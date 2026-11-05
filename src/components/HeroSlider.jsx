import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Image from "../image/banner_Hero1.jpg";
import Image1 from "../image/banner_Hero2.jpg";
import Image2 from "../image/banner_Hero3.jpg";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function HeroSlider() {
  return (
    <section className="hero">
      <div className="container">
        <Swiper
          loop
          spaceBetween={30}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="content">
              <h4>Introducing the new</h4>
              <h3>Microsoft Xbox<br />360 Controller</h3>
              <p>Discover your next-level gaming experience.</p>
              <Link to="/search" className="btn">Shop now</Link>
            </div>
            <img src={Image} alt="Featured Xbox controller collection" />
          </SwiperSlide>

          <SwiperSlide>
            <div className="content">
              <h4>Upgrade your setup</h4>
              <h3>Technology<br />made simple</h3>
              <p>Find the essentials for your everyday life.</p>
              <Link to="/search" className="btn">Explore products</Link>
            </div>
            <img src={Image1} alt="Featured technology products" />
          </SwiperSlide>

          <SwiperSlide>
            <div className="content">
              <h4>Discover something new</h4>
              <h3>Smart choices<br />start here</h3>
              <p>Shop your favorites in one convenient place.</p>
              <Link to="/search" className="btn">Start shopping</Link>
            </div>
            <img src={Image2} alt="Featured products and shopping collection" />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default HeroSlider;
