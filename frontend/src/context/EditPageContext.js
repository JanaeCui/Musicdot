import { createContext, useContext, useState } from 'react';

export const EditPageContext = createContext();

export const useEditPage = () => {return useContext(EditPageContext);};


export function EditPageProvider({ children }) {

    const [eventIdForEdit, setEventIdForEdit] = useState();




    return (
      <EditPageContext.Provider
        value={{
          eventIdForEdit,
          setEventIdForEdit
        }}
      >
        {children}
      </EditPageContext.Provider>
    );
  }
