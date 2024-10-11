"use client";
import React, { useEffect } from "react";
import Navbar from "./(components)/Navbar";
import Sidebar from "./(components)/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  // Usa il hook `useAppSelector` per accedere allo stato globale Redux, in particolare al valore `isSidebarCollapsed`.

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  // Usa il hook `useAppSelector` per accedere allo stato globale Redux, in particolare al valore `isDarkMode`.

  useEffect(() => {
    if (isDarkMode) {
      // Se `isDarkMode` è true, aggiunge la classe "dark" al documento HTML.
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        } `}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  // Definisce un componente chiamato DashboardWrapper che fornisce il contesto Redux.

  return (
    <StoreProvider>
      {/* Wrappa il contenuto nel StoreProvider per fornire lo stato Redux ai componenti interni */}
      <DashboardLayout>{children}</DashboardLayout>
      {/* Renderizza il DashboardLayout con i children passati */}
    </StoreProvider>
  );
};

export default DashboardWrapper;
