import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
}

export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}

export interface ExpenseSummary {
    expenseSummaryId: string;
    totalExpenses: number;
    date: string;
}

export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
}

export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
        // `baseQuery` specifica come verranno effettuate le richieste API.
    // `fetchBaseQuery` è una funzione che crea una base per le chiamate API, 
    // utilizzando l'URL base definito in una variabile di ambiente.

    reducerPath: 'api',
        // `reducerPath` è il nome del percorso nel Redux store dove verrà memorizzato lo stato dell'API.

    tagTypes:["DashboardMetrics"],
        // `tagTypes` è un array che permette di definire dei tag per le invalidazioni delle cache.
    // Attualmente è vuoto, ma può essere utilizzato in futuro per invalidare specifiche parti dello stato.
 
    endpoints: (build) => ({
        getDashboardMetrics: build.query<DashboardMetrics, void>({
            query: () => '/dashboard',            
            providesTags: ['DashboardMetrics']
        })
    }),
        // `endpoints` è una funzione che permette di definire i vari endpoint dell'API.
    // In questo caso è una funzione che restituisce un oggetto vuoto, 
    // il che significa che non ci sono endpoint definiti al momento.
});

export const {
    useGetDashboardMetricsQuery,
    // `useGetDashboardMetricsQuery` è una funzione che permette di ottenere lo stato e le azioni per la richiesta `getDashboardMetrics`.
} = api;

