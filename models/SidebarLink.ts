import { ReactNode } from "react";

export interface SidebarLink {
    title: string;
    link: string;
    isActive: boolean;
    icon: ReactNode
}