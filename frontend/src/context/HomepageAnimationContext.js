import { createContext, useContext, useState } from 'react';

export const HomepageAnimationContext = createContext();

export const useHomepageAnimation = () => {return useContext(HomepageAnimationContext);};


export function HomepageAnimationProvider({ children }) {

    const [active, setActive] = useState("");

    return (
      <HomepageAnimationContext.Provider
        value={{
          active,
          setActive
        }}
      >
        {children}
      </HomepageAnimationContext.Provider>
    );
  }
