import { createContext, useContext, useState } from 'react';

export const BookmarkIconContext = createContext();

export const useBookmarkIcon = () => {return useContext(BookmarkIconContext);};


export function BookmarkIconProvider({ children }) {

    const [bookmarkDisplay1, setBookmarkDisplay1] = useState("display");
    const [bookmarkEvent, setBookmarkEvent] = useState()
    const [liked, setLiked] = useState(false)
    const [bookmarkState, setBookmarkState] = useState()



    return (
      <BookmarkIconContext.Provider
        value={{
            // liked,
            // setLiked,
            // bookmarkDisplay1,
            // setBookmarkDisplay1,
            // bookmarkEvent,
            // setBookmarkEvent
        }}
      >
        {children}
      </BookmarkIconContext.Provider>
    );
  }
