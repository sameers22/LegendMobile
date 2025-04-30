import React, { createContext, useState, useContext } from 'react';
import { createCheckout } from '../shopify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (variant) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.variant.id === variant.id);
      if (existing) {
        return prev.map((item) =>
          item.variant.id === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { variant, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (variantId) => {
    setCartItems((prev) => prev.filter((item) => item.variant.id !== variantId));
  };

  const clearCart = () => setCartItems([]);

  const getCheckout = async () => {
    const lineItems = cartItems.map((item) => ({
      variantId: item.variant.id,
      quantity: item.quantity,
    }));

    const checkout = await createCheckoutFromCart(lineItems);
    return checkout.webUrl;
  };

  const createCheckoutFromCart = async (lineItems) => {
    const mutation = `
      mutation checkoutCreate($lineItems: [CheckoutLineItemInput!]!) {
        checkoutCreate(input: { lineItems: $lineItems }) {
          checkout {
            id
            webUrl
          }
        }
      }
    `;
    const response = await fetch('https://legendchefsauce.com/api/2023-10/graphql.json', {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': '58c098147cc1c2cb3e339cd586b9eaac',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables: { lineItems } }),
    });
    const data = await response.json();
    return data.data.checkoutCreate.checkout;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCheckout }}>
      {children}
    </CartContext.Provider>
  );
};
