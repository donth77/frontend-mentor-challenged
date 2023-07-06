import { useState, useContext } from "react";
import classNames from "classnames";
import Lightbox from "./Lightbox";
import { CartContext, Product } from "./CartProvider";
import { IMAGES, SM_BREAKPOINT, THUMBNAILS } from "../constants";
import { ReactComponent as CartIcon } from "../assets/icon-cart.svg";
import { ReactComponent as MinusIcon } from "../assets/icon-minus.svg";
import { ReactComponent as PlusIcon } from "../assets/icon-plus.svg";
import { ReactComponent as PrevIcon } from "../assets/icon-previous.svg";
import { ReactComponent as NextIcon } from "../assets/icon-next.svg";

function ProductDetail() {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { active: cartActive, addProduct, openCart } = useContext(CartContext);

  const [lightboxOpen, setLightboxOpen] = useState(false);

  const incrementActiveIndex = () => {
    setActiveImgIndex((activeImgIndex) =>
      activeImgIndex < IMAGES.length - 1 ? activeImgIndex + 1 : 0
    );
  };

  const decrementActiveIndex = () => {
    setActiveImgIndex((activeImgIndex) =>
      activeImgIndex > 0 ? activeImgIndex - 1 : IMAGES.length - 1
    );
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleClickActiveImg = () => {
    if (window.innerWidth > SM_BREAKPOINT) {
      openLightbox();
    }
  };

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const addToCart = () => {
    const newProduct: Product = {
      id: "1",
      name: "Fall Limited Edition Sneakers",
      quantity,
      price: 125,
      thumnbnail: THUMBNAILS[0],
    };
    addProduct(newProduct);
    setQuantity(0);
    openCart();
  };

  return (
    <main className="h-full w-full sm:pt-[90px]">
      <div className="flex flex-col justify-center sm:flex-row">
        <div className="flex flex-col">
          <div
            className={classNames(
              "absolute top-[200px]  my-[0px] flex w-full justify-between px-4 sm:hidden",
              {
                "z-[-1]": cartActive,
              }
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
          <img
            src={IMAGES[activeImgIndex]}
            className={classNames(
              "h-[300px] object-cover object-top sm:h-[260px] sm:w-[260px] sm:cursor-pointer sm:rounded-xl md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px] xl:h-[445px] xl:w-[445px]",
              {
                "z-[-2]": cartActive,
              }
            )}
            onClick={handleClickActiveImg}
            alt="Product detail active image"
          />

          <div className="mt-8 hidden justify-between sm:flex">
            {THUMBNAILS.map((img, i) => (
              <div key={`thumb-${i}`} className="mr-[31px]">
                <div
                  className={classNames("rounded-lg ", {
                    "border-2 border-orange ": i === activeImgIndex,
                  })}
                  onClick={() => setActiveImgIndex(i)}
                >
                  <img
                    src={img}
                    className={classNames(
                      "rounded-lg opacity-100 sm:h-[44px] sm:min-w-[44px] md:h-[55px] md:min-w-[55px] lg:h-[69px] lg:min-w-[69px] xl:h-[88px] xl:min-w-[88px]",
                      {
                        "cursor-pointer hover:opacity-50": i != activeImgIndex,
                      },
                      {
                        "opacity-25": i === activeImgIndex,
                      }
                    )}
                    alt={`Product detail thumbnail ${i}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col p-6 sm:w-[490px] sm:p-0 md:m-0 lg:m-9 lg:ml-[100px] xl:ml-[125px]">
          <h2 className="font-kumbhSans font-bold uppercase tracking-[2px] text-orange sm:text-[12px] sm:text-[13px]">
            Sneaker Company
          </h2>
          <h1 className="mt-[27px] font-kumbhSans text-[28px] font-bold leading-[32px] text-black sm:text-[44px] sm:leading-[48px]">
            Fall Limited Edition Sneakers
          </h1>
          <p className="mt-8 font-kumbhSans text-[15px] leading-[25px] text-darkGrayishBlue sm:text-base sm:leading-[26px]">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className="flex items-baseline justify-between sm:flex-col">
            <div className="mt-7 flex items-center">
              <h2 className="font-kumbhSans text-[28px] font-bold">$125.00</h2>
              <div className="ml-4 mt-[6px] flex h-[27px] w-[51px] items-center justify-center rounded-md bg-paleOrange">
                <span className="font-kumbhSans text-base font-bold font-bold text-orange">
                  50%
                </span>
              </div>
            </div>
            <h3 className="font-kumbhSans text-base font-bold leading-[26px] text-grayishBlue">
              <s>$250.00</s>
            </h3>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row">
            <div className="mr-4 flex h-[56px] w-full items-center rounded-lg bg-lightGrayishBlue sm:w-[157px]">
              <button
                className="group flex h-full w-full cursor-pointer items-center justify-center"
                onClick={decrementQuantity}
                aria-label="Decrement"
              >
                <MinusIcon className="fill-orange group-hover:fill-hoverOrange" />
              </button>
              <span className="w-full text-center font-kumbhSans text-base font-bold text-veryDarkBlue">
                {quantity}
              </span>
              <button
                className="group flex h-full w-full cursor-pointer items-center justify-center"
                onClick={incrementQuantity}
                aria-label="Increment"
              >
                <PlusIcon className="fill-orange group-hover:fill-hoverOrange" />
              </button>
            </div>

            <button
              className="mt-4 flex h-[56px] items-center justify-center rounded-lg bg-orange p-2 hover:bg-hoverOrange sm:mt-0 md:w-[150px] lg:w-[225px] xl:w-[272px]"
              onClick={addToCart}
            >
              <CartIcon className="mr-[15px] scale-[0.79] fill-white" />
              <span className="font-kumbhSans font-bold text-white sm:text-sm lg:text-base">
                Add to cart
              </span>
            </button>
          </div>
        </div>
      </div>
      <Lightbox
        initialImageIndex={activeImgIndex}
        open={lightboxOpen}
        closeLightbox={closeLightbox}
      />
    </main>
  );
}

export default ProductDetail;
