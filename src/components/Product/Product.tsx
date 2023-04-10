import { useState, useRef, useContext, RefObject } from "react";

import ProductTile from "./ProductTile";
import Modal from "~/components/Modal";
import { ProductContext } from "~/context/ProductContextProvider";

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prevNode = useRef<HTMLButtonElement | null>(null);

  const { title } = useContext(ProductContext);

  const onClose = () => {
    // Return focus on modal dismiss to product tile.
    setTimeout(() => {
      prevNode.current?.focus();
    });
    setIsModalOpen(false);
  };

  const onClick = (ref: RefObject<HTMLButtonElement>) => {
    if (ref) {
      prevNode.current = ref.current;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <ProductTile onClick={onClick} />

      {isModalOpen && (
        <Modal
          contentLabel={`Product modal for ${title}`}
          onClose={onClose}
          style={{ content: { maxWidth: "400px", margin: "auto" } }}
        >
          <div className="relative max-w-md m-auto">
            <button
              aria-label="dismiss modal"
              className="absolute top-2 right-2 w-[28px] h-[28px] text-sm rounded-full border-2 border-black text-black font-semibold z-10"
              onClick={onClose}
              type="button"
            >
              X
            </button>
            <div className="bg-white">
              <ProductTile isExpanded />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Product;
