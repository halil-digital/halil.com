"use client";

import { useState } from "react";

interface MenuSectionProps {
  title: string;
  items: string[];
  bgColor?: string;
}

const SettingsPage: React.FC = () => {
  const [mesParametres] = useState<string[]>([
    "Horaires de travail",
    "Domicile",
    "Changer mot de passe",
  ]);

  const [parametresVisites] = useState<string[]>(["Heures d'ouverture"]);
  const [portatour] = useState<string[]>(["A propos de"]);

  const MenuSection: React.FC<MenuSectionProps> = ({
    title,
    items,
    bgColor = "[#dfca70]",
  }) => (
    <div className="bg-white rounded-sm shadow-sm">
      <div
        className={`${bgColor} text-white px-4 py-2 font-medium text-sm rounded-t-sm`}
      >
        {title}
      </div>
      <div className="p-0">
        {items.map((item: string, index: number) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
          >
            <span className="text-blue-600 text-sm cursor-pointer hover:underline">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Mes Paramètres */}
          <div>
            <MenuSection
              title="MES PARAMÈTRES"
              items={mesParametres}
              bgColor="bg-[#dfca70]"
            />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <MenuSection
              title="PARAMÈTRES DE VISITES"
              items={parametresVisites}
              bgColor="bg-[#dfca70]"
            />
          </div>
          <div className="space-y-6">
            <MenuSection
              title="PORTATOUR"
              items={portatour}
              bgColor="bg-[#dfca70]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
