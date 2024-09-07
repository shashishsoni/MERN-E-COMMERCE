import React, { createContext, useState, useContext, ReactNode } from 'react';
import { T_Product, T_UserProfile } from '../@types/Types';


//Define thr shape of the context data
type MyContextProps = {
     isloggedin: boolean | null;
     setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
     accessToken: string | null;
     setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
     userData: T_UserProfile | null;
     setUserData: React.Dispatch<React.SetStateAction<T_UserProfile | null>>
     logout: () =>  void;
     Cart: T_Product[];
     setUserCart: React.Dispatch<React.SetStateAction<T_Product[]>>
}
// Create a Context
const AppContext = createContext<MyContextProps | undefined>(undefined);

// Create a Provider component
export const AppContextProvider = ({ children }: {children: ReactNode}) => {
  // State that you want to share
  const [isloggedin, setLoggedIn] = useState<boolean | null>(
     localStorage .getItem('isloggedin')
     ?JSON.parse(localStorage.getItem('isloggedin') || 'false')
     :false
  )

  const [accessToken, setAccessToken] = useState<string | null>(
       localStorage.getItem('accessToken')
       ?localStorage.getItem('accessToken')
       : ''
  )

  const [userData, setUserData] =  useState<T_UserProfile| null> (
     localStorage.getItem('userData')
     ?JSON.parse(localStorage.getItem('userData') || 'null')
     : null
  )

  const [Cart, setUserCart] = useState<T_Product[]>([])

  const logout = (): void => {
     setLoggedIn(false);
     setAccessToken(null);
     setUserData(null);
     localStorage.clear();
  }

  return (
    <AppContext.Provider 
          value={{ 
               isloggedin,
               setLoggedIn,

               accessToken,
               setAccessToken,

               userData,
               setUserData,

               Cart,
               setUserCart,
               
               logout
          }}>
      {children}
    </AppContext.Provider>
  );
};

//Create a custom hooks to use the context
export const useAppContext = () => {
     const context = useContext(AppContext);
     if(!context) {
          throw new Error('useAppContext must be used within a AppProvider');
     }
     return context;
}   
 