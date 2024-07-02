import React, { createContext, useState, useContext, ReactNode, FunctionComponent } from 'react';


interface StepContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

interface StepProviderProps {
  children: ReactNode;
}

export const StepProvider: FunctionComponent<StepProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1); 

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useSteps = (): StepContextType => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useSteps must be used within a StepProvider');
  }
  return context;
};
