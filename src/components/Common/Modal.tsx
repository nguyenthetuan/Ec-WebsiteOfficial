import { useModalContext } from "@/app/context/ModalContext";
import { useEffect } from "react";

const Modal = ({ children }) => {
  const { isModalOpen, closeModal } = useModalContext();

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div
      className={`${
        isModalOpen ? "z-99999" : "hidden"
      } fixed inset-0 flex items-center justify-center bg-dark/30 sm:px-8 px-4`}
    >
      <div className="max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
