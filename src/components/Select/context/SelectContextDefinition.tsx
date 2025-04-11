import { createContext } from "react";

type SelectContextType = {
  activeSelectId: string | null;
  setActiveSelectId: (id: string | null) => void;
};

export const SelectContext = createContext<SelectContextType>({
  activeSelectId: null,
  setActiveSelectId: () => {},
});
