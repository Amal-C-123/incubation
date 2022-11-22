import { createContext, useState } from "react";

export const ModalContext = createContext(null);

export default function SlotModalContext({ children }) {
  const [modal, setSlotModal] = useState(null);
  const [slotBook, setSlotBook] = useState(true);
  const [companies, approvedCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [choosedSlotNo, setChoosedSlotNo]= useState('not now')


  return (
    <ModalContext.Provider
      value={{
        modal,
        setSlotModal,
        slotBook,
        setSlotBook,
        companies,
        approvedCompanies,
        showModal,
        setShowModal,
        choosedSlotNo, setChoosedSlotNo
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
