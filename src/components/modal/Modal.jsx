import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, isOpen, setClose }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setClose();
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && isOpen) {
        setClose();
      }
    },
    [setClose, isOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return isOpen
    ? createPortal(
        <div
          className="z-50 fixed p-5 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="mt-10 min-h-64 max-h-96  bg-white w-full  md:max-w-md mx-auto rounded shadow-lg  overflow-y-auto"
            ref={modalRef}
          >
            {children}
          </div>
        </div>,
        window.document.body
      )
    : null;
}
