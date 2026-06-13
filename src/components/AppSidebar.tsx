'use client'
import { ClipboardList, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useRouter } from "next/navigation";

export default function AppSidebar() {

    const router = useRouter()

    return (
        <Sidebar>
            <SidebarHeader className="p-2">
                <div className="bg-white shadow-sm rounded-lg p-2">
                    <h1 className="text-sm text-center">Soluções Imobiliárias</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Início</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="flex justify-between items-center">
                                Gerenciamento de Leads
                                <ClipboardList />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button 
                onClick={() => {
                    //aqui simula um logout, apenas redirecionando para a pagina do login
                    //também estou ciente de remover cookies e aplicar estratégias de logout
                    router.push('/')
                }}
                variant={'destructive'} 
                className="flex gap-x-1.5 items-center justify-center">
                    Sair
                    <LogOut />
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}