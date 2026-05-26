// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import Image from "../image/banner_Hero1.jpg";
import Image1 from "../image/banner_Hero2.jpg";
import Image2 from "../image/banner_Hero3.jpg";

// Import Swiper styles
import { Autoplay, Pagination  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
// import { Pagination } from 'swiper/modules';
function HeroSlider() {
    return (
        <>
            <div className="hero" style={{marginTop :"150px"}}>
                <div className="container">
                    <Swiper
                        loop={true}
                        spaceBetween={30}
                        // centeredSlides={true}  Bug
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper rounded-3"
                    >
                        <SwiperSlide>
                            <div className="content">
                                <h4>Introducing  the new</h4>
                                <h3>Microsoft Xbox <br /> 360 Controller</h3>
                                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                                <Link to="/" className="btn">Shop New</Link>
                            </div>
                            <img src={Image} alt="image" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="content">
                                <h4>Introducing  the new</h4>
                                <h3>Microsoft Xbox <br /> 360 Controller</h3>
                                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                                <Link to="/" className="btn">Shop New</Link>
                            </div>
                            <img src={Image1} alt="image" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="content">
                                <h4>Introducing  the new</h4>
                                <h3>Microsoft Xbox <br /> 360 Controller</h3>
                                <p>Windows Xp/10/7/8 Ps3, Tv Box</p>
                                <Link to="/" className="btn">Shop New</Link>
                            </div>
                            <img src={Image2} alt="image" />
                        </SwiperSlide>
                    </Swiper>   
                </div>
            </div>
        </>
    )
}

export default HeroSlider