"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/models/user.model";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  user: User;
  onLogout: () => void;
}

export default function DashboardNavbar({ user, onLogout }: Props) {
  const displayName =
    user?.name && user?.surname ? `${user.name} ${user.surname}` : user?.email;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-400 bg-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-1">
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </Button>
        </div>

        {/* Right side - user info */}
        <div className="flex items-center space-x-4">
          <span className="font-medium text-gray-800">{displayName}</span>
          <Button variant="destructive" onClick={onLogout} title="Log out">
            <LogOut strokeWidth={3} />
          </Button>
        </div>
      </div>

      {/* Mobile nav links */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden border-t border-gray-300 bg-white p-2 space-y-2">
          <NavLinks />
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
