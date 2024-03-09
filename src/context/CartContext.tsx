import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";
import { Users } from "../data/Users";

type Product = {
  title: string;
  price: number;
  country: string;
  description: string;
  isFavorite: boolean;
  isInCart: boolean;
  img: undefined;
  isPiece: false; // Продается по весу
};

type CartType = {
  email: string;
  cart?: any[];
  addToCart?: (product: Product) => void;
  removeFromCart?: (product: Product) => void;
};

type CartContextType = {
  cart: any[];
  addToCart?: (product: Product) => void;
  removeFromCart?: (product: Product) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: (product: Product) => {},
  removeFromCart: (product: Product) => {}
});

export const useCart = () => {
  return useContext(CartContext);
};

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({
  children,
}: CartProviderProps) => {
  const userData = useAuth();
  const user = userData.getUser(userData.email, userData.password);
  const cart = userData.getCart(userData.email, userData.password);

  function filterUniqueTitles(products: any) {
    const uniqueTitles: { [key: string]: boolean } = {};
    const result = products.filter((product : any) => {
      if (!uniqueTitles[product.title]) {
        uniqueTitles[product.title] = true;
        return true;
      }
      return false;
    });
    return result;
  }
  

  const addToCart = (product: Product) => {
    const ucart = cart;
    product.isInCart = true;
    ucart.push(product);

    const ncart = ucart.filter((p : any) => p.isInCart == true)

    const newCart = filterUniqueTitles(ncart)

    let index = null;
    Users.forEach((u, i) =>
      u.email == user.email ? (index = i) : (index = null)
    );

    if (index != null) {
      Users[index].cart = newCart;
      // console.log(Users[index].cart);
    }
  };

  const removeFromCart = (product: Product) => {
    const ucart = cart;
    product.isInCart = false;
    const ncart = ucart.filter((p : any) => p.title !== product.title && p.isInCart==true)

    const newCart = filterUniqueTitles(ncart)

    let index = null;
    Users.forEach((u, i) =>
      u.email == user.email ? (index = i) : (index = null)
    );

    if (index != null) {
      Users[index].cart = newCart;
      // console.log(Users[index].cart)
    }
  }

  const contextValue = { cart, addToCart, removeFromCart };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;