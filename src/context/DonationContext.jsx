import React, { createContext, useContext, useState } from "react";

const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(1000);
  const [receiptData, setReceiptData] = useState(null);

  const openDonateModal = (amount) => {
    if (amount && !isNaN(amount)) {
      setDonationAmount(Number(amount));
    }
    setReceiptData(null);
    setIsModalOpen(true);
  };

  const closeDonateModal = () => {
    setIsModalOpen(false);
    setReceiptData(null);
  };

  return (
    <DonationContext.Provider
      value={{
        isModalOpen,
        donationAmount,
        setDonationAmount,
        receiptData,
        setReceiptData,
        openDonateModal,
        closeDonateModal,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonation must be used within a DonationProvider");
  }
  return context;
};
