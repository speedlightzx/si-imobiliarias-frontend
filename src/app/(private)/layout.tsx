import type { Metadata } from "next";
import "../globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import FloatingChat from "@/components/chatbot/FloatingChat";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Soluções Imobiliárias",
  description: "Teste prático estágio full stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        <SidebarProvider>
          <AppSidebar />
          <TooltipProvider>
            <FloatingChat />
            {children}
          </TooltipProvider>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
