import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SideBar } from "./Components/Sidebar.tsx/Sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen">
    <SidebarProvider>
      <SideBar />
     
      <SidebarInset>
      <main className="flex-1 p-4 bg-white overflow-auto">
        {children}
      </main>
      </SidebarInset>
      </SidebarProvider>
    </div>

      </body>
    </html>
  );
}
