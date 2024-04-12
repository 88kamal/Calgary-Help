/* eslint-disable react/prop-types */
import { Carousel } from "@material-tailwind/react";

export function RoomImageCarousel({ roomDetail }) {
    return (
        <Carousel
            navigation={false}
            transition={{ type: "tween", duration: 2 }}
            autoplay={true}
            autoplayDelay={5000}
            loop={true}
            className="rounded-none mt-1 z-10"
        >
            <img
                src={roomDetail.image1}
                alt="image 1"
                className="w-[100%] h-[9em] xl:h-[33em] lg:h-[18em] md:h-[20em] sm:h-[12em] rounded-lg "
            />
            <img
                src={roomDetail.image2}
                alt="image 2"
                className="w-[100%] h-[9em] xl:h-[33em] lg:h-[18em]  md:h-[20em] sm:h-[12em] rounded-lg"
            />
            <img
                src={roomDetail.image3}
                alt="image 3"
                className="w-[100%] h-[9em] xl:h-[33em] lg:h-[18em]  md:h-[20em] sm:h-[12em] rounded-lg"
            />
            <img
                src={roomDetail.image4}
                alt="image 4"
                className="w-[100%] h-[9em] xl:h-[33em] lg:h-[18em]  md:h-[20em] sm:h-[12em] rounded-lg"
            />
        </Carousel>
    );
}