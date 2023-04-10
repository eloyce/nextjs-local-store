import { useState } from "react";

import { Product as ProductType } from "~/types";
import { ProductContextProvider } from "~/context";
import { CATEGORY_URL, ALL_PRODUCTS } from "~/utils/constants/api";

import Product from "~/components/Product";
import ProductsFilterHeader from "./ProductsFilterHeader";

const ProductGrid = ({
  initialProducts,
}: {
  initialProducts: ProductType[];
}) => {
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

      <section
        className="p-6 gap-6 grid-cols-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        data-test="productGrid"
      >
        {products.map((product) => (
          <ProductContextProvider key={product.id} product={product}>
            <Product />
          </ProductContextProvider>
        ))}
      </section>
    </>
  );
};

export default ProductGrid;
