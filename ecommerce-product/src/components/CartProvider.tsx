import React, { createContext, useState } from "react";

export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  thumnbnail: string;
}

export const CartContext = createContext<{
  active: boolean;
  products: Map<string, Product>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  addProduct: (newProduct: Product) => void;
  removeProduct: (productId: string) => void;
}>({
  active: false,
  products: new Map(),
  toggleCart: () => {},
  openCart: () => {},
  closeCart: () => {},
  addProduct: () => {},
  removeProduct: () => {},
});

const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [active, setActive] = useState(false);
  const [products, setProducts] = useState<Map<string, Product>>(new Map());

  const toggleCart = (): void => {
    setActive(!active);
  };

  const openCart = (): void => {
    setActive(true);
  };

  const closeCart = (): void => {
    setActive(false);
  };

  const addProduct = (newProduct: Product): void => {
    const newProducts = new Map(products);

    const existingProduct = newProducts.get(newProduct.id);
    newProducts.set(
      newProduct.id,
      existingProduct
        ? {
            ...existingProduct,
            quantity: newProduct.quantity + existingProduct.quantity,
          }
        : newProduct
    );
    setProducts(newProducts);
  };

  const removeProduct = (productId: string) => {
    const newProducts = new Map(products);
    newProducts.delete(productId);
    setProducts(newProducts);
  };

  return (
    <CartContext.Provider
      value={{
        active,
        products,
        toggleCart,
        openCart,
        closeCart,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
