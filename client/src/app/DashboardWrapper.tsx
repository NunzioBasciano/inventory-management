"use client";
import React from "react";
import Navbar from "./(components)/Navbar";
import Sidebar from "./(components)";
import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  return (
    <div className={`light flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
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
