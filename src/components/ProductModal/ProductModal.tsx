import Modal from "~/components/Modal";
import ProductTile from "~/components/ProductTile";

import { Product } from "~/types";

const ProductModal = ({
  onClose,
  product,
}: {
  onClose: () => void;
  product: Product;
}) => {
  return (
    <Modal
      onClose={onClose}
      style={{ content: { maxWidth: "400px", margin: "auto" } }}
    >
      <div className="relative max-w-md m-auto">
        <button
          aria-label="dismiss modal"
          className="absolute top-2 right-2 w-[28px] h-[28px] text-sm rounded-full border-2 border-black text-black font-semibold"
          onClick={onClose}
          type="button"
        >
          X
        </button>

        <div className="bg-white">
          <ProductTile product={product} isExpanded />
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
