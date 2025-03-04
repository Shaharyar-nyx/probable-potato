"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import React, { useMemo, useState } from "react";

import { Button } from "../button";
import { ModalProps } from "@/types";
import { ReportForm } from "@/sections/home/report-form";
import { ContactSalesForm, DemoForm } from "@/sections";

export const Modal: React.FC<ModalProps> = ({
  cta,
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

  const getModalContent = useMemo(() => {
    switch (cta?.isModal) {
      case "contact_sales_form":
        return <ContactSalesForm />;
      case "demo_form":
        return <DemoForm />;
      case "free_report_form":
        return <ReportForm />;
      default:
        return null;
    }
  }, [cta]);

  return (
    <>
      <Button
        className={`paragraph-md ${buttonStyle}`}
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
            className={`relative mx-auto h-full w-full overflow-y-auto bg-white p-6 md:h-auto md:max-h-[90vh] md:max-w-screen-xl md:rounded-[12px] ${className}`}
          >
            <Button
              className="absolute right-4 top-4 bg-primary-800 p-1 text-neutral-50"
              iconName="XMarkIcon"
              onClick={closeModal}
            />
            {getModalContent}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
