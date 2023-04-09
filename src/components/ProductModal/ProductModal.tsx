import { useContext } from "react";
import Modal from "~/components/Modal";
import ProductTile from "~/components/ProductTile";

import { ProductContext } from "~/context/ProductContextProvider";

const ProductModal = ({ onClose }: { onClose: () => void }) => {
  const { title } = useContext(ProductContext);

  return (
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
  );
};

export default ProductModal;
