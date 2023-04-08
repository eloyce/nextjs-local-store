import React from "react";
import { GetStaticProps } from "next/types";

import { allProducts } from "./utils/mock-data";

import Navigation from "~/components/Navigation";
import ProductGrid from "~/components/ProductsGrid";

import { Product } from "~/types";

export default function Home({ products }: { products: Product[] }) {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <ProductGrid initialProducts={products} />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      products: allProducts,
    },
  };
};
