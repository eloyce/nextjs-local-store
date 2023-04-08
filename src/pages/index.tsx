import React from "react";
import { GetServerSideProps } from "next/types";

import Navigation from "~/components/Navigation";
import ProductGrid from "~/components/ProductsGrid";

import { Product } from "~/types";
import { ALL_PRODUCTS, CATEGORY_URL } from "~/utils/constants/api";

export default function Home({ products }: { products: Product[] }) {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <ProductGrid initialProducts={products} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query } = context;

    // Check for query params on request.
    if (typeof query.category === "string") {
      const categories = query.category.split(",");

      const data = await Promise.all(
        categories.map((c) =>
          fetch(`${CATEGORY_URL}/${c}`).then((res) => res.json())
        )
      ).then((d) => d.filter(Boolean).flat());

      return {
        props: {
          products: data,
        },
      };
    }

    const url = `${ALL_PRODUCTS}?` + new URLSearchParams({ limit: "25" });
    const response = await fetch(url);
    const data = await response.json();

    return {
      props: {
        products: data,
      },
    };
  } catch (err) {
    console.error("Unable to get products:: ", err);
    return {
      props: {
        products: [],
      },
    };
  }
};
