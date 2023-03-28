import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

const Banner = ({ banner }: any) => {
  return (
    <div className="container">
      <div className="row text-center">
        <div className="mx-auto lg:col-10">
          <h1 className="font-primary font-bold">{banner.title}</h1>
          <h5>{markdownify(banner.content, "", "")}</h5>
          <div className={`service-carousel`}>
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              init={banner?.image ? false : true}
              className="mt-6"
            >
              {/* Slides */}
              {banner?.images.map((slide: any, index: any) => (
                <SwiperSlide key={index}>
                  <Image
                    src={slide}
                    alt=""
                    width={900}
                    height={500}
                    className="mb-2"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
