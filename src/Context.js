//We will create a container for our entire app that all of our containers will use it
import {createContext, useContext} from 'react';

export const AppContext = createContext(null)

export function useAppContext(){
    return useContext(AppContext);
}



// Helper methods for reference
// import React from 'react'
// export const MyContext = React.createContext()
// export const Provider = MyContext.Provider