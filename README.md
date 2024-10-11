# Inventory Management

## Panoramica

L'**Applicazione Inventory Management** è una web app per la gestione dell'inventario e delle vendite sviluppato con **Next.js** per il frontend e **Node.js** per il backend, utilizzando **Prisma** come ORM per interfacciarsi con un database **PostgreSQL** ospitato su **AWS** **RDS**. L'app è pensata per fornire un'interfaccia moderna e scalabile per la gestione e il monitoraggio degli inventari.

### Funzionalità

- **Dashboard**: Visualizza una panoramica di vendite, prodotti popolari, spese e riepilogo degli acquisti.
- **Gestione inventario**: Elenco dettagliato dei prodotti con nome, prezzo, rating e quantità disponibile.
- **Gestione prodotti**: Visualizzazione a griglia dei prodotti con possibilità di aggiungere nuovi elementi.
- **Utenti**: Sezione per la gestione degli utenti.
- **Gestione spese**: Riepilogo delle spese suddiviso per tipologia (ufficio, professionale, salari).

## Tecnologie Utilizzate

### Frontend

- **Next.js**: Framework React per lo sviluppo del frontend con rendering lato server (SSR) e static site generation (SSG).
- **Tailwind CSS:** Libreria CSS utility-first per uno styling moderno e reattivo.
- **Redux Toolkit**: Gestione avanzata dello stato globale con Redux, inclusa l'integrazione di Redux Toolkit Query per le API.
- **Material UI Data Grid**: Tabella avanzata per la gestione e visualizzazione di dati in forma tabellare.

### Backend

- **Node.js**: Server-side runtime utilizzato per gestire le operazioni di backend.
- ***Prisma***: ORM moderno utilizzato per interfacciarsi con il database PostgreSQL.
- **PostgreSQL**: Database relazionale ospitato su AWS RDS per memorizzare i dati dell'inventario.
- **Nodemon & ts-node**: Strumenti per lo sviluppo continuo con supporto TypeScript.

### Cloud & DevOps
- **AWS EC2**: Infrastruttura di calcolo per ospitare il backend dell'applicazione.
- **AWS RDS** (PostgreSQL): Servizio di database relazionale utilizzato per la gestione dei dati.
- **AWS API** Gateway: Gestione sicura e scalabile delle API.
- **AWS S3**: Storage cloud utilizzato per il caricamento e la gestione delle immagini dei prodotti.
- **AWS Amplify**: Piattaforma utilizzata per distribuire l'applicazione frontend.

### Link Webapp

https://master.d1gzzbb3c9x22j.amplifyapp.com/expenses

## Contributi

Se desideri contribuire a questo progetto, sentiti libero di aprire una issue o inviare una pull request. Ogni contributo è ben accetto!


