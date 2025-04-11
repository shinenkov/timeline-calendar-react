import { useContext } from "react";
import { SelectContext } from "./SelectContextDefinition";

export const useSelectContext = () => useContext(SelectContext);
