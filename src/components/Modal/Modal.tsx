import ReactModal from "react-modal";

ReactModal.setAppElement("#__next");

const Modal = ({
  children,
  onClose,
  style,
}: {
  children: React.ReactNode;
  onClose: () => void;
  style?: ReactModal.Styles;
}) => {
  return (
    <ReactModal
      isOpen
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      style={{
        content: {
          background: "transparent",
          border: 0,
          padding: 0,
          ...style?.content,
        },
        overlay: { background: "rgba(0, 0, 0, 0.4)" },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
