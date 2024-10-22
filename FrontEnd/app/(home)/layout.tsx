import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "../providers"; // Asegúrate de la ruta correcta
import { Navbar } from "@/components/navbar"; // Ruta al componente Navbar

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";


export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar /> {/* Solo para Home */}
      <main className="container mx-auto max-w-7xl pt-10 px-6 flex-grow">
        {children}
      </main>
    </div>
  );
}
