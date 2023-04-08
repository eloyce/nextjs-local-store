import React, { createContext } from "react";
import { Product } from "~/types";

export const ProductContext = createContext<Product>({} as Product);

const ProductContextProvider = ({
  children,
  product,
}: {
  children: React.ReactNode;
  product: Product;
}) => (
  <ProductContext.Provider value={product}>{children}</ProductContext.Provider>
);

export default ProductContextProvider;
