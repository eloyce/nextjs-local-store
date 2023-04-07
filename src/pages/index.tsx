import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next/types";
import { allProducts } from "./utils/mock-data";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const Navigation = () => {
  return (
    <nav className="p-4 flex flex-row items-center justify-between w-full">
      <Link href="/">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={120}
          height={37}
          priority
        />
      </Link>

      <div>
        <div className="flex justify-between">
          <button type="button">Your cart is empty</button>
          <div className="border border-2 border-r-slate-400 w-[2px]" />
          <a className="text-blue-400 underline" href="#">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

const GridHeader = ({ totalProducts }: { totalProducts: number }) => {
  return (
    <section className="pb-2 border-b border-b-slate-400 px-2 flex-col flex gap-2">
      <div className="flex flex-row justify-between items-center">
        <h1 className="uppercase tracking-wide text-sm">Our local products</h1>
        <button className="" type="button">
          Filtered by all
        </button>
      </div>

      <div className="flex-row flex items-center md:border-l-2 md:border-l-slate-400 md:pl-4">
        <p className="m-0">{totalProducts} Products</p>
      </div>
    </section>
  );
};

const Product = ({
  id,
  category,
  image,
  price,
  title,
  onClick,
}: {
  id: number;
  category: string;
  price: number;
  image: string;
  title: string;
  onClick: () => void;
}) => {
  return (
    <article className="rounded-lg py-3 border border-slate-100 shadow-xl flex flex-col justify-between">
      <div>
        <button className="w-full border-b" onClick={onClick} type="button">
          <img
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert m-auto"
            src={image}
            alt={`product ${title}`}
            width={120}
            height={52}
          />
        </button>
      </div>

      <div className="px-2 pt-2">
        <div className="flex flex-row justify-between mb-3">
          <span className="capitalize text-xs">{category}</span>
          <small className="bg-[#fee2c3] p-1 text-sm font-bold rounded">{`$${String(
            price
          )}`}</small>
        </div>

        <div>
          <button
            className="text-base text-black-300 text-left mb-2 leading-6"
            onClick={onClick}
            type="button"
          >
            <span>{title}</span>
          </button>
          <button
            className="bg-blue-500 py-1.5 text-white text-lg text-center w-full rounded tracking-wide	"
            type="button"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

const ProductGrid = ({ products }: { products: Product[] }) => {
  const onClick = (product: Product) => {
    // TODO: show modal
    return product;
  };

  return (
    <section className="p-6 gap-6 grid-cols-1 grid md:grid-cols-3 lg:grid-cols-6">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          category={product.category}
          image={product.image}
          price={product.price}
          title={product.title}
          onClick={() => onClick(product)}
        />
      ))}
    </section>
  );
};

export default function Home({ products }: { products: Product[] }) {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <GridHeader totalProducts={products.length} />
      <ProductGrid products={products} />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      products: allProducts,
    },
  };
};
