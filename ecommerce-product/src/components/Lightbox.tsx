import { useState, useEffect, useCallback, useRef } from "react";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { IMAGES, SM_BREAKPOINT, THUMBNAILS } from "../constants";
import { ReactComponent as CloseIcon } from "../assets/icon-close.svg";
import { ReactComponent as PrevIcon } from "../assets/icon-previous.svg";
import { ReactComponent as NextIcon } from "../assets/icon-next.svg";

function Lightbox({
  initialImageIndex,
  open,
  closeLightbox,
}: {
  initialImageIndex: number;
  open: boolean;
  closeLightbox: () => void;
}) {
  const [activeImgIndex, setActiveImgIndex] = useState(initialImageIndex);
  const swiperRef = useRef<any>(null);

  const incrementActiveIndex = () => {
    setActiveImgIndex((activeImgIndex) =>
      activeImgIndex < IMAGES.length - 1 ? activeImgIndex + 1 : 0
    );
    swiperRef?.current?.swiper?.slideNext();
  };

  const decrementActiveIndex = () => {
    setActiveImgIndex((activeImgIndex) =>
      activeImgIndex > 0 ? activeImgIndex - 1 : IMAGES.length - 1
    );
    swiperRef?.current?.swiper?.slidePrev();
  };

  const close = () => {
    setActiveImgIndex(initialImageIndex);
    closeLightbox();
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        close();
        break;
      case "ArrowLeft":
        decrementActiveIndex();
        break;
      case "ArrowRight":
        incrementActiveIndex();
        break;
    }
  }, []);

  useEffect(() => {
    setActiveImgIndex(initialImageIndex);
  }, [initialImageIndex]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= SM_BREAKPOINT) {
        close();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return open ? (
    <div
      className={classNames(
        "fixed top-0 flex h-full w-full items-center justify-center bg-overlayBg sm:translate-x-[-25px] md:translate-x-[-100px] lg:translate-x-[-165px]",
        {
          hidden: !open,
        }
      )}
    >
      <div className="flex flex-col">
        <div className="mb-6 flex justify-end">
          <CloseIcon
            className="scale-150 cursor-pointer fill-white"
            onClick={close}
          />
        </div>

        <div
          className={classNames(
            "fixed z-[2] ml-[-20px] mt-[275px] flex w-[590px] justify-between"
          )}
        >
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
            onClick={decrementActiveIndex}
            aria-label="Previous"
          >
            <PrevIcon className="ml-[-2px] scale-[0.75]" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white "
            onClick={incrementActiveIndex}
            aria-label="Next"
          >
            <NextIcon className="mr-[-2px] scale-[0.75]" />
          </button>
        </div>
        <Swiper
          ref={swiperRef}
          className="h-[550px] w-[550px] rounded-xl"
          slidesPerView={1}
          spaceBetween={0}
          initialSlide={initialImageIndex}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          onActiveIndexChange={(swiper) => setActiveImgIndex(swiper.realIndex)}
        >
          {IMAGES.map((img, i) => (
            <SwiperSlide key={`Main image slide ${i}`}>
              <img
                src={img}
                className="h-full w-full"
                onClick={() => {}}
                alt="Lightbox active image"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-10 flex w-[550px] justify-center pl-[31px]">
          {THUMBNAILS.map((img, i) => (
            <div key={`thumb-${i}`} className="mr-[31px]">
              <div
                className={classNames("rounded-lg border-2 ", {
                  "border-orange ": i === activeImgIndex,
                  "border-transparent": i != activeImgIndex,
                })}
                onClick={() => {
                  swiperRef?.current?.swiper?.slideToLoop(i);
                }}
              >
                <div
                  className={classNames(
                    " fixed h-[88px] min-w-[88px] rounded-lg bg-white opacity-0",
                    {
                      "cursor-pointer hover:opacity-50": i != activeImgIndex,
                    },
                    { "opacity-75": i === activeImgIndex }
                  )}
                ></div>
                <img
                  src={img}
                  className={classNames("h-[88px] min-w-[88px] rounded-lg")}
                  alt={`Lightbox thumbnail ${i}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}

export default Lightbox;
