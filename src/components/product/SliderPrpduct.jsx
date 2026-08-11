import Product from "./Product"
import './product.css'
import './sliderProduct.css'
import "../../pages/home/home.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
function SliderPrpduct({ title, data =[] }) {
  
    return (
        <div className="sldice_product slide" >
            <div className="container">
                <div className="top_slide">
                    <h2>{title}</h2>
                    <p>Add bestselling product to weekly line up</p>
                </div>
                <Swiper
                  loop={true}
                          spaceBetween={30}
                          // centeredSlides={true} BUg
                          autoplay={{
                          delay: 3500,
                          disableOnInteraction: false,
                          }}
                          breakpoints={{
                              '@0.00': {
                                slidesPerView: 1,
                                spaceBetween: 10,
                              },
                              '@0.75': {
                                slidesPerView: 2,
                                spaceBetween: 20,
                              },
                              '@1.00': {
                                slidesPerView: 3,
                                spaceBetween: 40,
                              },
                              '@1.50': {
                                slidesPerView: 5,
                                spaceBetween: 30,
                              },
                            }}
                          // pagination={{
                          // clickable: true,
                          // }}
                          navigation={true}
                          modules={[Autoplay, Pagination, Navigation]}
                          className="mySwiper"
                >
            {data.map(ele => {
              return (
                <SwiperSlide key={ele.id} > <Product  item={ele}/> </SwiperSlide>
              )
            })}
                </Swiper>
            </div>
        </div>
    )
}

export default SliderPrpduct