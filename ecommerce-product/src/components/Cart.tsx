import { useState, useEffect, useContext } from "react";
import classNames from "classnames";
import { ReactComponent as CartIcon } from "../assets/icon-cart.svg";
import { ReactComponent as TrashIcon } from "../assets/icon-delete.svg";
import { CartContext, Product } from "./CartProvider";
import { getPriceStr } from "../utils";

function Cart() {
  const { active, products, toggleCart, removeProduct } =
    useContext(CartContext);

  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const newProducts = Array.from(products.values());
    setProductsInCart(Array.from(products.values()));
    setTotal(newProducts.reduce((sum, p) => sum + p.quantity * p.price, 0));
    setQuantity(newProducts.reduce((sum, p) => sum + p.quantity, 0));
  }, [products]);

  return (
    <div>
      <label htmlFor="modal" className="cursor-pointer">
        {quantity > 0 && (
          <div className="absolute ml-[10px] mt-[-7px] flex min-w-[19px] items-center justify-center rounded-xl bg-orange sm:ml-[20px]">
            <span className="font-kumbhSans text-[10px] font-bold text-white">
              {quantity}
            </span>
          </div>
        )}
        <CartIcon
          className={classNames(
            "hover:fill-black sm:ml-2.5",
            { "fill-black": active },
            {
              "fill-darkGrayishBlue": !active,
            }
          )}
        />
      </label>
      <input
        className="modal-state peer hidden"
        id="modal"
        type="checkbox"
        checked={active}
        onChange={toggleCart}
      />
      <div className="modal invisible fixed inset-0 z-20 text-left opacity-0 transition-opacity duration-[0.2s] ease-[ease] peer-checked:visible peer-checked:opacity-100">
        <label className="absolute inset-0" htmlFor="modal"></label>
        <div className="modal-inner absolute inset-x-0 bottom-0 top-[-60%] m-auto h-[256px] w-[95%] overflow-auto rounded-lg bg-white shadow-2xl transition-[top] duration-[0.2s] ease-[ease] sm:left-[40%] sm:w-[360px] md:left-[50%] lg:left-[64%]">
          <div className="px-6 pb-[27px] pt-6">
            <h2 className="font-kumbhSans text-base font-bold">Cart</h2>
          </div>
          <div className="h-[1px] w-full bg-dividerColor"></div>
          <div
            className={classNames("flex h-[180px] w-full px-6 pb-8 pt-6", {
              "items-center justify-center": productsInCart.length === 0,
            })}
          >
            {productsInCart.length ? (
              <div className="flex w-full flex-col justify-between">
                {productsInCart.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex">
                      <img
                        src={prod.thumnbnail}
                        className="mr-4 h-[50px] w-[50px] rounded-lg"
                        alt={`${prod.name} thumbnail`}
                      />
                      <div className="flex flex-col">
                        <span className="font-kumbhSans text-base text-darkGrayishBlue">
                          {prod.name}
                        </span>
                        <div className="flex">
                          <span className="font-kumbhSans text-base text-darkGrayishBlue">
                            {`$${getPriceStr(prod.price)} x ${prod.quantity}`}
                          </span>
                          &nbsp;&nbsp;
                          <span className="font-kumbhSans text-base font-bold text-black">
                            {`$${getPriceStr(total)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex h-full w-[33px] items-center justify-end"
                      onClick={() => removeProduct("1")}
                      aria-label={"Remove"}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
                <button className="mt-2 h-[56px] w-full rounded-lg bg-orange font-kumbhSans text-base font-bold text-white hover:bg-hoverOrange">
                  Checkout
                </button>
              </div>
            ) : (
              <span className="font-kumbhSans text-base font-bold leading-[26px] text-darkGrayishBlue">
                Your cart is empty.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
