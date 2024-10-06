"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Definizione di una funzione asincrona per recuperare le metriche del dashboard
const getDashboardMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Recupera i 15 prodotti più popolari ordinati per quantità di stock in modo decrescente
        const popularProducts = yield prisma.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: 'desc',
            },
        });
        // Recupera un riepilogo delle vendite ordinato per data in modo decrescente (ultimi 5)
        const salesSummary = yield prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        });
        // Recupera un riepilogo degli acquisti ordinato per data in modo decrescente (ultimi 5)
        const purchaseSummary = yield prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        });
        // Recupera un riepilogo delle spese per categoria ordinato per data in modo decrescente (ultimi 5)
        const expenseSummary = yield prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        });
        // Recupera un riepilogo delle spese per categoria ordinato per data in modo decrescente (ultimi 5)
        const expenseByCategorySummaryRow = yield prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: 'desc',
            },
        });
        // Mappa i risultati per convertire 'amount' in stringa
        const expenseByCategorySummary = expenseByCategorySummaryRow.map((item) => (Object.assign(Object.assign({}, item), { amount: item.amount.toString() // Converte 'amount' in stringa
         })));
        // Invia una risposta JSON contenente tutte le metriche raccolte
        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving dashboard metrics' });
    }
});
exports.getDashboardMetrics = getDashboardMetrics;
