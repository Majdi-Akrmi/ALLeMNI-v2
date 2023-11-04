"use client";

import { BookOpenCheck, GaugeCircle, BookMarked, TrendingUp } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: GaugeCircle ,
        label: "Dashboard",
        href: "/",
    },

    {
        icon: BookOpenCheck,
        label: "Discover",
        href: "/search",
    },
]

const teacherRoutes = [
    {
        icon:  BookMarked,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: TrendingUp,
        label: "Analytics",
        href: "/teacher/analytics",
    },
]

export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher")

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return(
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
       
    )
}