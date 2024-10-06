import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Definizione di una funzione asincrona per recuperare le metriche del dashboard
export const getDashboardMetrics = async (req: Request, res: Response): Promise<void> => {

    try {
        // Recupera i 15 prodotti più popolari ordinati per quantità di stock in modo decrescente
        const popularProducts = await prisma.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: 'desc',
            },
        });
        // Recupera un riepilogo delle vendite ordinato per data in modo decrescente (ultimi 5)
        const salesSummary = await prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        });
        // Recupera un riepilogo degli acquisti ordinato per data in modo decrescente (ultimi 5)
        const purchaseSummary = await prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        });
        // Recupera un riepilogo delle spese per categoria ordinato per data in modo decrescente (ultimi 5)
        const expenseSummary = await prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        });
        // Recupera un riepilogo delle spese per categoria ordinato per data in modo decrescente (ultimi 5)
        const expenseByCategorySummaryRow = await prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        });
        
        // Mappa i risultati per convertire 'amount' in stringa
        const expenseByCategorySummary = expenseByCategorySummaryRow.map(
            (item) => ({
                ...item, // Mantiene tutte le proprietà esistenti dell'oggetto
                amount: item.amount.toString() // Converte 'amount' in stringa
        }));

                // Invia una risposta JSON contenente tutte le metriche raccolte
        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary,
        })

    } catch (error) {
        res.status(500).json({message: 'Error retrieving dashboard metrics'});
    }
}