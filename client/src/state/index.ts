import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
}

const initialState: initialStateTypes = {
    isSidebarCollapsed: false,
    isDarkMode: false,
};

// Crea uno slice globale con `createSlice`
export const globalSlice = createSlice({
    name: 'global', // Nome dello slice (verrà utilizzato nel Redux store)
    initialState, // Stato iniziale per lo slice
    reducers: {  // Definisce i reducer (modificatori di stato) per lo slice
        setIsSidebarCollapsed:(state, action:PayloadAction<boolean> ) => {
             // Questo reducer modifica lo stato `isSidebarCollapsed` in base al valore del payload
            state.isSidebarCollapsed = action.payload;
                        // `action.payload` è il nuovo valore (true o false) che viene passato quando l'azione viene dispatchata
        },
        setIsDarkMode:(state, action:PayloadAction<boolean> ) => {
            // Questo reducer modifica lo stato `isSidebarCollapsed` in base al valore del payload
           state.isDarkMode = action.payload;
                       // `action.payload` è il nuovo valore (true o false) che viene passato quando l'azione viene dispatchata
        }
    }
})

export const {setIsSidebarCollapsed, setIsDarkMode} = globalSlice.actions;

export default globalSlice.reducer; // Esporta lo reducer per essere utilizzato nello store Redux