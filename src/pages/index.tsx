import { GetServerSideProps } from "next/types";
import Image from "next/image";
import { Roboto } from "next/font/google";
import React from "react";
import storefrontPic from "../assets/storefront-bg.png";

import Navigation from "~/components/Navigation";
import ProductGrid from "~/components/ProductsGrid";

import { Product } from "~/types";
import { ALL_PRODUCTS, CATEGORY_URL } from "~/utils/constants/api";
import classNames from "classnames";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
})

export default function Home({ products }: { products: Product[] }) {
  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col bg-white",
        roboto.className
      )}
    >
      <Navigation />

      <div className="w-full max-w-7xl m-auto bg-white">
        <Image
          alt="Picture of the storefront"
          src={storefrontPic}
          className="max-h-56 md:h-80 md:max-h-72 md:w-full"
          priority
        />
        <ProductGrid initialProducts={products} />
      </div>
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
