import { createContext, useContext, useState } from 'react';

export const BookmarkIconContext = createContext();

export const useBookmarkIcon = () => {return useContext(BookmarkIconContext);};


export function BookmarkIconProvider({ children }) {

    const [bookmarkIconState, setBookmarkIconState] = useState("far fa-bookmark");

    return (
      <BookmarkIconContext.Provider
        value={{
          bookmarkIconState,
          setBookmarkIconState
        }}
      >
        {children}
      </BookmarkIconContext.Provider>
    );
  }
