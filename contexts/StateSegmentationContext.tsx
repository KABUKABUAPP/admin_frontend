import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface DashboardStateType {
  dashboardState: any | null;
  setDashboardState: React.Dispatch<React.SetStateAction<any | null>>;
}

// Initialize the context with an undefined value
const StateSegmentationContext = createContext<DashboardStateType | undefined>(undefined);

// Define the provider props
interface StateSegmentationProviderProps {
  children: ReactNode;
}

// Create a context provider component
export const StateSegmentationProvider: React.FC<StateSegmentationProviderProps> = ({ children }) => {
  const [dashboardState, setDashboardState] = useState<any | null>(null);

  return (
    <StateSegmentationContext.Provider value={{ dashboardState, setDashboardState }}>
      {children}
    </StateSegmentationContext.Provider>
  );
};

// Custom hook to use the context
export const useDashboardState = () => {
  const context = useContext(StateSegmentationContext);
  if (context === undefined) {
    throw new Error('useDashboardState must be used within a StateSegmentationProvider');
  }
  return context;
};
