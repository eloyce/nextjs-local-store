import Image from "next/image";
import { useState, useRef, useContext } from "react";
import classNames from "classnames";

import ProductModal from "~/components/ProductModal";

import { ProductContext } from "~/context/ProductContextProvider";

const ProductTile = ({ isExpanded = false }: { isExpanded?: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const titleButtonRef = useRef<HTMLButtonElement>(null);

  const {
    category,
    description,
    image,
    price: productPrice,
    title,
  } = useContext(ProductContext);

  const price = Number(Number(productPrice).toFixed(2));

  const onClose = () => {
    if (titleButtonRef.current) {
      // Return focus on modal dismiss to product tile.
      setTimeout(() => {
        titleButtonRef.current?.focus();
      });
    }
    setIsModalOpen(false);
  };

  const onClick = () => {
    if (!isExpanded) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <article className="rounded-lg py-3 border border-slate-100 shadow-xl flex flex-col">
        <div>
          <button
            className={classNames("w-full overflow-hidden relative", {
              ["h-24 max-h-[100px]"]: !isExpanded,
              ["h-44 max-h-none	"]: isExpanded,
            })}
            disabled={isExpanded}
            aria-haspop={isExpanded ? "" : "dialog"}
            onClick={onClick}
            type="button"
          >
            <Image
              className="relative m-auto"
              src={image}
              alt={`product ${title}`}
              style={{ objectFit: "contain" }}
              fill
            />
          </button>
        </div>

        <div className="px-4 pt-2 overflow-hidden">
          <div
            className={classNames("flex flex-row justify-between gap-1", {
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
              aria-haspop={isExpanded ? "" : "dialog"}
              className="text-sm text-black-300 text-left mb-2 leading-5"
              disabled={isExpanded}
              onClick={onClick}
              ref={titleButtonRef}
              type="button"
            >
              <span
                className={classNames({
                  ["line-clamp-2 h-10"]: !isExpanded,
                })}
              >
                {title}
              </span>
            </button>

            {isExpanded && <p className="mt-4 mb-8 text-base">{description}</p>}

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

      {isModalOpen && <ProductModal onClose={onClose} />}
    </>
  );
};

export default ProductTile;
