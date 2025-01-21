"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import React, { useState } from "react";

import { Button } from "../button";
import { ModalProps } from "@/types";

export const Modal: React.FC<ModalProps> = ({
  cta,
  children,
  buttonStyle,
  buttonSize,
  buttonVariant,
  buttonTransparent,
  className,
}) => {
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
        className={buttonStyle}
        iconName={cta?.icon}
        size={buttonSize}
        transparent={buttonTransparent}
        variant={buttonVariant}
        onClick={(e: { preventDefault: () => void }) => {
          openModal();
          e.preventDefault();
        }}
      >
        {cta?.label}
      </Button>

      <Dialog className="relative z-[99999]" open={isOpenModal} onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center md:p-4">
          <DialogPanel
            className={`relative mx-auto h-full w-full overflow-y-auto bg-white p-5 md:h-auto md:max-h-[90vh] md:max-w-screen-xl md:rounded-[12px] ${className}`}
          >
            <Button
              className="absolute right-4 top-4 bg-primary-800 p-1 text-neutral-50"
              iconName="XMarkIcon"
              onClick={closeModal}
            />
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
