import { useState } from 'react';
import { SelectContext } from './SelectContextDefinition';

export const SelectProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSelectId, setActiveSelectId] = useState<string | null>(null);

  return (
    <SelectContext.Provider value={{ activeSelectId, setActiveSelectId }}>
      {children}
    </SelectContext.Provider>
  );
};
