import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

// Funzione per eliminare tutti i dati dai modelli specificati in ordine
async function deleteAllData(orderedFileNames: string[]) {
    // Mappa i nomi dei file in nomi di modelli capitalizzati (es. 'products.json' -> 'Products')
    const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName)); // Rimuove estensione per ottenere il nome base
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);  // Capitalizza il primo carattere
  });

    // Itera sui nomi dei modelli per cancellare i dati da ciascuno
for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma]; // Ottiene il modello dal client Prisma
    if (model) {
      await model.deleteMany({}); ; // Cancella tutti i record dal modello
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

// Funzione principale per gestire l'operazione di seeding del database
async function main() {
    // Specifica la directory dove sono presenti i file JSON con i dati
    const dataDirectory = path.join(__dirname, "seedData");

    // è fondamentale l'ordine dei file poiché alcuni db saranno propedeutici per altri
  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

    // Elimina tutti i dati dai modelli corrispondenti prima di eseguire il seeding
    await deleteAllData(orderedFileNames);

    // Itera sui nomi dei file JSON e inserisce i dati nel database
for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);  // Crea il percorso completo del file
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));  // Legge e fa il parsing del file JSON
    const modelName = path.basename(fileName, path.extname(fileName));  // Ottiene il nome del modello dal nome del file
    const model: any = prisma[modelName as keyof typeof prisma]; // Ottiene il modello Prisma corrispondente
 
        // Verifica se il modello esiste nel client Prisma
    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

        // Itera su ciascun record nel file JSON e lo inserisce nel database
    for (const data of jsonData) {
      await model.create({
        data, // Inserisce il record nel database
      });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

// Esegue la funzione principale e gestisce eventuali errori
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();  // Disconnette il client Prisma dal database al termine
  });