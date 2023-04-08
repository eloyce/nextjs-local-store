import { useState } from "react";

import ProductTile from "~/components/ProductTile";

import { Product } from "~/types";
import { ProductContextProvider } from "~/context";
import { CATEGORY_URL, ALL_PRODUCTS } from "~/utils/constants/api";

import ProductsFilterHeader from "./ProductsFilterHeader";

const ProductGrid = ({ initialProducts }: { initialProducts: Product[] }) => {
  const [products, setProducts] = useState(initialProducts);

  const onCategoryFetch = async (category: string | string[]) => {
    try {
      if (typeof category === "string") {
        const response = await fetch(ALL_PRODUCTS);
        const data = await response.json();

        setProducts(data);
        return;
      }

      const data = await Promise.all(
        category.map((c) =>
          fetch(`${CATEGORY_URL}/${c}`).then((res) => res.json())
        )
      ).then((d) => d.filter(Boolean).flat());

      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ProductsFilterHeader
        onCategoryFetch={onCategoryFetch}
        totalProducts={products.length}
      />

      <section className="p-6 gap-6 grid-cols-1 grid md:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <ProductContextProvider key={product.id} product={product}>
            <ProductTile />
          </ProductContextProvider>
        ))}
      </section>
    </>
  );
};

export default ProductGrid;
