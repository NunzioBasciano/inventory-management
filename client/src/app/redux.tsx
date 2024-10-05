import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import globalReducer from "@/state";
import { api } from "@/state/api";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/* REDUX PERSISTENCE
   La funzione `createNoopStorage` viene usata per creare uno storage vuoto (un "noop" storage, che non fa nulla)
   in contesti dove lo storage del browser non è disponibile, come durante il server-side rendering (SSR).
*/ const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null); // Simula il recupero di un item, restituendo sempre `null`
    },
    setItem(_key: any, value: any) {
      // Simula il salvataggio di un item, restituendo il valore passato senza salvarlo
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      // Simula la rimozione di un item, ma non fa nulla
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage() //  Usa `createNoopStorage` in contesti SSR dove `localStorage` non è disponibile
    : createWebStorage("local"); // Usa `localStorage` quando l'app gira nel browser

// Configurazione di `redux-persist` per specificare quale parte dello stato deve essere persistita
const persistConfig = {
  key: "root", // Chiave per identificare lo stato persistito nel `localStorage`
  storage, // Specifica il tipo di storage da usare, basato sulla variabile `storage` definita sopra
  whitelist: ["global"], // Lista di slice dello stato che devono essere persistiti, qui solo "global"
};
// Combina i vari reducer dell'applicazione in un unico `rootReducer`
const rootReducer = combineReducers({
  global: globalReducer, // Slice globale definita dall'utente
  [api.reducerPath]: api.reducer, // Slice creata da RTK Query per gestire le chiamate API
});

// Crea un `persistedReducer` utilizzando la configurazione e il `rootReducer` combinato
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* REDUX STORE 
   Crea e configura lo store Redux. Usa `persistedReducer` per garantire la persistenza dello stato tra refresh.
*/
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

/* REDUX TYPES
   Definisce i tipi per il dispatch, lo stato e i selettori per usare correttamente TypeScript con Redux.
*/
export type AppStore = ReturnType<typeof makeStore>; // Tipo dello store Redux
export type RootState = ReturnType<AppStore["getState"]>; // Tipo dello stato globale (RootState)
export type AppDispatch = AppStore["dispatch"]; // Tipo per il dispatch di azioni
// Hook personalizzato per usare il dispatch con il tipo corretto
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Hook personalizzato per selezionare lo stato con il tipo corretto
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER 
   Componente StoreProvider che avvolge l'intera app, fornendo lo store Redux e gestendo la persistenza.
*/
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
