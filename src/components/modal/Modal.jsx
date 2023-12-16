import { useCallback, useEffect, useRef } from "react";

export default function Modal({ children, isOpen, setIsOpen }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setIsOpen(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [setIsOpen, isOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return isOpen ? (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      ref={modalRef}
      onClick={closeModal}
    >
      <div className="mt-40 bg-white w-11/12 h-3/5 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        {children}
      </div>
    </div>
  ) : null;
}
