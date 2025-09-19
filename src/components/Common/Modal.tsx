import { useModalContext } from "@/app/context/ModalContext";
import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: false;
  onClose?: () => void;
  children: React.ReactElement;
}

const Modal = ({ isOpen, onClose, children }) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        if (onClose) onClose();
        else setOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen ? "z-99999" : "hidden"
      } fixed inset-0 flex items-center justify-center bg-dark/30 sm:px-8 px-4`}
    >
      <div className="max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
