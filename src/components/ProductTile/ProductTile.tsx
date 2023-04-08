import { useState, useRef } from "react";
import classNames from "classnames";

import ProductModal from "~/components/ProductModal";

import { Product } from "~/types";

const ProductTile = ({
  product,
  isExpanded = false,
}: {
  product: Product;
  isExpanded?: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const titleButtonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    if (titleButtonRef.current) {
      // Return focus on modal dismiss to product
      setTimeout(() => {
        titleButtonRef.current?.focus();
      });
    }
    setIsModalOpen(false);
  };

  const { category, image, title } = product;
  const price = product.price;

  return (
    <>
      <article className="rounded-lg py-3 border border-slate-100 shadow-xl flex flex-col justify-between">
        <div>
          <button
            className="w-full"
            onClick={() => {
              if (!isExpanded) {
                setIsModalOpen(true);
              }
            }}
            type="button"
          >
            <img
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert m-auto"
              src={image}
              alt={`product ${title}`}
              width={120}
              height={52}
            />
          </button>
        </div>

        <div className="px-4 pt-2">
          <div
            className={classNames("flex flex-row justify-between", {
              ["mb-0"]: isExpanded,
              ["mb-3"]: !isExpanded,
            })}
          >
            <span className="capitalize text-xs">{category}</span>
            {!isExpanded && (
              <small className="bg-[#fee2c3] p-1 text-sm font-bold rounded">{`$${price}`}</small>
            )}
          </div>

          <div>
            <button
              className="text-base text-black-300 text-left mb-2 leading-6"
              onClick={() => setIsModalOpen(true)}
              ref={titleButtonRef}
              type="button"
            >
              <span>{title}</span>
            </button>

            {isExpanded && (
              <p className="mt-4 mb-8 text-base">{product.description}</p>
            )}

            <div
              className={classNames({
                ["flex flex-row gap-3"]: isExpanded,
              })}
            >
              {isExpanded && (
                <small className="bg-[#fee2c3] py-1 text-sm font-bold rounded items-center flex px-2.5">{`$${price}`}</small>
              )}
              <button
                className="bg-blue-600 py-2 text-white font-light text-base text-center w-full rounded tracking-wide"
                type="button"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </article>

      {isModalOpen && <ProductModal onClose={onClose} product={product} />}
    </>
  );
};

export default ProductTile;
