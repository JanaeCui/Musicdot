import { createContext, useContext, useState } from 'react';

export const SearchBarContext = createContext();

export const useSearchBar = () => {return useContext(SearchBarContext);};


export function SearchBarProvider({ children }) {

    const [searchTerm, setSearchTerm] = useState("");

    return (
      <SearchBarContext.Provider
        value={{
          searchTerm,
          setSearchTerm
        }}
      >
        {children}
      </SearchBarContext.Provider>
    );
  }
