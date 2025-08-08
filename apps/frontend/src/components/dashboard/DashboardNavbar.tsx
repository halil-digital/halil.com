"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/models/user.model";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
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
    <nav className="border-b p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left nav - links */}
        <div className="hidden md:flex space-x-6">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
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
        <div className="flex flex-col md:hidden mt-4 space-y-2 px-2">
          <NavLinks />
        </div>
      )}
    </nav>
  );
}

function NavLinks() {
  return (
    <>
      <Link
        href="/dashboard/clients"
        className="font-semibold text-[#ebc834] hover:underline"
      >
        Clients
      </Link>
    </>
  );
}
