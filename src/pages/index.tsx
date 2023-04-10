import { GetServerSideProps } from "next/types";
import { Roboto } from "next/font/google";
import React from "react";

import Navigation from "~/components/Navigation";
import ProductGrid from "~/components/ProductsGrid";

import { Product } from "~/types";
import { ALL_PRODUCTS, CATEGORY_URL } from "~/utils/constants/api";
import classNames from "classnames";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const Fold = () => (
  <div
    className="w-full h-40 md:h-[205px] flex flex-row items-center gap-2 px-4 relative md:justify-center"
    style={{
      background: "linear-gradient(180deg, #FFFFFF 0%, #FABE7C 100%)",
    }}
  >
    {/* Background image */}
    <div className="w-80 h-full bg-no-repeat bg-[length:280px_150px] bg-bottom bg-[url('../assets/localshop.png')] lg:absolute md:auto md:r-[50%] md:left-0 md:w-96 md:bg-[length:360px_200px]" />

    <h1 className="text-base text-[#46237A] font-light leading-none md:text-3xl lg:text-5xl">
      <span>
        This is a <strong className="font-medium">local</strong> shop
      </span>
      <span className="md:block md:pl-14 lg:pl-40">
        {" "}
        for <strong className="font-medium">local</strong> people.
      </span>
    </h1>
  </div>
);

export default function Home({ products }: { products: Product[] }) {
  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col bg-white",
        roboto.className
      )}
    >
      <Navigation />
      <Fold />

      <div className="w-full max-w-7xl m-auto bg-white">
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
