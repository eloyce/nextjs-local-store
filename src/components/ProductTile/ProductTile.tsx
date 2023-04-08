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

  const price = productPrice.toFixed(2);

  const onClose = () => {
    if (titleButtonRef.current) {
      // Return focus on modal dismiss to product
      setTimeout(() => {
        titleButtonRef.current?.focus();
      });
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <article className="rounded-lg py-3 border border-slate-100 shadow-xl flex flex-col">
        <div>
          <button
            className={classNames("w-full overflow-hidden", {
              ["h-24 max-h-[100px]"]: !isExpanded,
              ["h-44 max-h-none	"]: isExpanded,
            })}
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
              width={100}
              height={10}
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
              className="text-sm text-black-300 text-left mb-2 leading-5"
              onClick={() => {
                if (!isExpanded) {
                  setIsModalOpen(true);
                }
              }}
              ref={titleButtonRef}
              type="button"
            >
              <span
                className={classNames({
                  ["overflow-hidden text-ellipsis h-10 text-clip break-words block"]:
                    !isExpanded,
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
