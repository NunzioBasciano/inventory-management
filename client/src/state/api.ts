import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
        // `baseQuery` specifica come verranno effettuate le richieste API.
    // `fetchBaseQuery` è una funzione che crea una base per le chiamate API, 
    // utilizzando l'URL base definito in una variabile di ambiente.

    reducerPath: 'api',
        // `reducerPath` è il nome del percorso nel Redux store dove verrà memorizzato lo stato dell'API.

    tagTypes:[],
        // `tagTypes` è un array che permette di definire dei tag per le invalidazioni delle cache.
    // Attualmente è vuoto, ma può essere utilizzato in futuro per invalidare specifiche parti dello stato.
 
    endpoints: (build) => ({}),
        // `endpoints` è una funzione che permette di definire i vari endpoint dell'API.
    // In questo caso è una funzione che restituisce un oggetto vuoto, 
    // il che significa che non ci sono endpoint definiti al momento.
});

export const {} = api;

