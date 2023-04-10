import Image from "next/image";
import { useRef, useContext, RefObject } from "react";
import classNames from "classnames";

import { ProductContext } from "~/context/ProductContextProvider";

const ProductTile = ({
  isExpanded = false,
  onClick,
}: {
  isExpanded?: boolean;
  onClick?: (ref: RefObject<HTMLButtonElement>) => void;
}) => {
  const titleButtonRef = useRef<HTMLButtonElement | null>(null);

  const {
    category,
    description,
    image,
    price: productPrice,
    title,
  } = useContext(ProductContext);

  const price = Number(Number(productPrice).toFixed(2));

  const onOpen = () => {
    if (onClick) {
      onClick(titleButtonRef);
    }
  };

  return (
    <article className="rounded-lg pt-3 border border-slate-100 shadow-xl flex flex-col">
      <div>
        <button
          className={classNames("w-full overflow-hidden relative", {
            ["h-24 max-h-[100px]"]: !isExpanded,
            ["h-44 max-h-none	"]: isExpanded,
          })}
          disabled={isExpanded}
          aria-haspopup={isExpanded ? "false" : "dialog"}
          onClick={onOpen}
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

      <div
        className={classNames("overflow-hidden", {
          ["p-4"]: isExpanded,
          ["p-2"]: !isExpanded,
        })}
      >
        <div
          className={classNames("flex flex-row justify-between gap-1", {
            ["mb-0"]: isExpanded,
            ["mb-3"]: !isExpanded,
          })}
        >
          <span className="capitalize text-xs" data-test="productCategory">
            {category}
          </span>
          {!isExpanded && (
            <small className="bg-[#fee2c3] p-1 text-sm font-bold rounded">{`$${price}`}</small>
          )}
        </div>

        <div>
          <button
            aria-haspopup={isExpanded ? "false" : "dialog"}
            className="text-base text-black-300 text-left mb-2 leading-5"
            disabled={isExpanded}
            onClick={onOpen}
            ref={titleButtonRef}
            type="button"
          >
            <span
              className={classNames({
                ["line-clamp-2 h-10"]: !isExpanded,
              })}
              data-test="productTitle"
            >
              {title}
            </span>
          </button>

          {isExpanded && (
            <p className="mt-4 mb-8 text-base leading-[21px]">{description}</p>
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
              className="bg-blue-600 py-2 text-white font-normal text-base text-center w-full rounded tracking-wide"
              type="button"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductTile;
