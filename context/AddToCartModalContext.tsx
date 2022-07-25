import React from "react";

type Props = {
  children: React.ReactNode;
};

type ModalDataType = {
  id: number;
  title: string;
  price: number;
  image: string;
  isOpen: boolean;
};

type AppCTXType = {
  modalData: ModalDataType | null;
  openModal: (data: ModalDataType) => void;
  closeModal: () => void;
};

export const AddToCartModalContext = React.createContext<AppCTXType | null>(
  null
);

const AddToCartModalContextProvider = ({ children }: Props) => {
  const [modalData, setModalData] = React.useState<ModalDataType | null>(null);

  const openModal = (data: ModalDataType) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const memoedValue = React.useMemo(
    () => ({
      modalData,
      openModal,
      closeModal,
    }),
    [modalData]
  );
  return (
    <AddToCartModalContext.Provider value={memoedValue}>
      {children}
    </AddToCartModalContext.Provider>
  );
};

const useAddToCartModal = () => {
  const context = React.useContext(AddToCartModalContext);
  if (!context) {
    throw new Error(
      "useAddToCartModalContext can only be used inside ModalProvider"
    );
  }
  return context;
};

export { AddToCartModalContextProvider, useAddToCartModal };
