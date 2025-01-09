"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { Button } from "../button";
import { ModalProps } from "@/types";

export const Modal: React.FC<ModalProps> = ({ cta, children, buttonStyle, buttonSize, buttonVariant, className }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Button
        onClick={(e: { preventDefault: () => void }) => {
          openModal();
          e.preventDefault();
        }}
        iconName={cta.icon}
        className={buttonStyle}
        size={buttonSize}
        variant={buttonVariant}
      >
        {cta.label}
      </Button>

      <Dialog open={isOpenModal} onClose={closeModal} className="relative z-[99999]">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center md:p-4">
          <DialogPanel className={`relative mx-auto h-full w-full overflow-y-auto bg-white p-5 md:h-auto md:max-h-[90vh] md:max-w-screen-xl md:rounded-[12px] ${className}`}>
            <Button
              onClick={closeModal}
              iconName="XMarkIcon"
              className="absolute right-4 top-4 bg-primary-800 p-1 text-neutral-50"
            />
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
