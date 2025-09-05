import { Menu, PhoneCall } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { JSX } from "react";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: JSX.Element;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src?: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup?: {
      text: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    alt: "HALIL logo",
    title: "",
    src: "/images/halil-distribution-logo.png",
  },
  menu = [
    {
      title: "À propos de nous",
      url: "/about",
    },
    {
      title: "Tous les produits",
      url: "/products",
    },
    { title: "Nous contacter", url: "mailto:sasuhalill@gmail.com" },
  ],
  mobileExtraLinks = [],
  auth = {
    login: { text: "Se connecter", url: "/login" },
  },
}: Navbar1Props) => {
  return (
    <section className=" bg-[#ebc834]">
      <div className="container max-w-none w-full py-1 px-10 md:px-20">
        <nav className="hidden justify-between lg:flex ">
          <div className="flex items-center gap-6 ">
            <a href={logo.url} className="flex items-center gap-2">
              {logo.src && (
                <img src={logo.src} className="w-17" alt={logo.alt} />
              )}
              <span className="text-lg font-semibold">{logo.title}</span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-2 text-sm">
              <PhoneCall size={16} />
              Vous pouvez nous contacter{" "}
              <a href="tel:+33620357667">
                <b>06 20 35 76 67</b>
              </a>
            </span>
            <Button asChild variant={"default"}>
              <Link href={auth.login.url}>{auth.login.text}</Link>
            </Button>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              {logo.src && (
                <img
                  src={logo.src}
                  className="w-17 bg-[#e4c84d] p-1 rounded"
                  alt={logo.alt}
                />
              )}
              <span className="text-lg font-semibold">{logo.title}</span>
            </a>
            <span className="flex items-center gap-1 text-sm whitespace-nowrap">
              <PhoneCall size={13} strokeWidth={2.5} />
              <a href="tel:+33620357667">
                <b>06 20 35 76 67</b>
              </a>
            </span>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-[#ebc834]">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      {logo.src && (
                        <img src={logo.src} className="w-17" alt={logo.alt} />
                      )}
                      <span className="text-lg font-semibold">
                        {logo.title}
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {mobileExtraLinks.length > 0 && (
                    <div className="border-t py-4">
                      <div className="grid grid-cols-2 justify-start">
                        {mobileExtraLinks.map((link, idx) => (
                          <a
                            key={idx}
                            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                            href={link.url}
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-3">
                    <span className="flex items-center gap-2 text-xs whitespace-nowrap">
                      <PhoneCall size={13} />
                      Vous pouvez nous contacter{" "}
                      <a href="tel:+33620357667">
                        <b>06 20 35 76 67</b>
                      </a>
                    </span>
                    <Button asChild variant={"default"}>
                      <Link href={auth.login.url}>{auth.login.text}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground">
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <a
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                    href={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <a
      key={item.title}
      className="bg-[#ebc834] group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#dfca70] hover:text-accent-foreground"
      href={item.url}
    >
      {item.title}
    </a>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
              href={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="font-semibold">
      {item.title}
    </a>
  );
};

export { Navbar };
