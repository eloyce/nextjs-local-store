import Link from "next/link";
import Image from "next/image";

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
          <button className="flex flex-row items-center gap-1" type="button">
            <Image
              src="/shopping-cart.svg"
              alt="shopping cart"
              width={18}
              height={18}
            />
            <span className="text-xs">Your cart is empty</span>
          </button>

          <div className="w-[1px] border border-slate-500 mx-2" />

          <a className="text-blue-400 underline text-xs" href="#">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
