import Image from "next/image";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import md from "markdown-it";

const OverviewCard = ({ service, isOdd }: any) => {
  return (
    <div className="container">
      <div className="items-center gap-8 md:grid md:grid-cols-2">
        {/* Carousel */}
        <div className={`service-carousel ${!isOdd && "md:order-2"}`}>
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={service.images.length > 1 ? { clickable: true } : false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            init={service?.images > 1 ? false : true}
          >
            {/* Slides */}
            {service?.images.map((slide: any, index: any) => (
              <SwiperSlide key={index}>
                <Image src={slide} alt="" width={300} height={250} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Content */}
        <div
          className={`service-content mt-5 md:mt-0 ${!isOdd && "md:order-1"} text-md`}
        >
          <h2 className="font-bold leading-[40px]">{service?.title}</h2>
          <div
            className="mt-4 mb-2 text-md"
            dangerouslySetInnerHTML={{
              __html: md({
                html: true,
                linkify: true,
                typographer: true,
              }).render(service?.content),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
