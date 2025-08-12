"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/models/user.model";
import { CheckSquare, LogOut, Menu, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  user: User;
  onLogout: () => void;
}

export default function DashboardNavbar({ user, onLogout }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-400 bg-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* NavLinks à gauche sur desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu />
          </Button>
        </div>

        {/* Menu burger rouge sur desktop avec DropdownMenu */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <span>{user.email}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-red-500 p-2 cursor-pointer">
                <Menu className="text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2">
              <DesktopActionLinks onLogout={onLogout} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile menu: NavLinks + juste Déconnecter */}
      {isMobileMenuOpen && (
        <div className="flex flex-col md:hidden border-t border-gray-300 bg-white p-4 space-y-3">
          <NavLinks />
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-2 py-1 font-semibold text-red-600 hover:underline"
          >
            <LogOut size={18} />
            Déconnecter
          </button>
        </div>
      )}
    </nav>
  );
}

function NavLinks() {
  const pathname = usePathname();
  const links = [
    { href: "/dashboard/clients", label: "CLIENTS" },
    { href: "/dashboard/tasks", label: "TÂCHES" },
    { href: "/dashboard/appointments", label: "RDV" },
    { href: "/dashboard/options", label: "OPTIONS" },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`uppercase text-sm font-semibold tracking-wide px-2 py-1 rounded ${
              isActive
                ? "bg-gray-200 text-[#006680]"
                : "text-[#006680] hover:underline"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

function DesktopActionLinks({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();
  const links = [
    { href: "/dashboard/clients", label: "Clients", icon: <Users size={24} /> },
    {
      href: "/dashboard/tasks",
      label: "Tâches",
      icon: <CheckSquare size={24} />,
    },
    {
      href: "/dashboard/options",
      label: "Options",
      icon: <Settings size={24} />,
    },
    {
      href: "#logout",
      label: "Déconnecter",
      icon: <LogOut size={24} />,
      onClick: onLogout,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {links.map((link) =>
        link.href === "#logout" ? (
          <button
            key={link.label}
            onClick={link.onClick}
            className="flex flex-col items-center justify-center gap-1 p-3 rounded cursor-pointer hover:bg-gray-100 text-red-600"
          >
            {link.icon}
            <span className="text-xs font-semibold">{link.label}</span>
          </button>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center gap-1 p-3 rounded hover:bg-gray-100 ${
              pathname.startsWith(link.href)
                ? "bg-gray-200 text-[#006680]"
                : "text-[#006680]"
            }`}
          >
            {link.icon}
            <span className="text-xs font-semibold">{link.label}</span>
          </Link>
        )
      )}
    </div>
  );
}
