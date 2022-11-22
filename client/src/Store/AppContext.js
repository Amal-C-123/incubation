import { createContext, useState } from "react";

export const ApplicationContext = createContext(null);

export default function AppContext({ children }) {
  const [applications, setApplications] = useState(null);
  const [modal, setAppModal] = useState(null);

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        setApplications,
        modal, setAppModal
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
