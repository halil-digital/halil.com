"use client";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import React from "react";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Entreprise",
    links: [
      { title: "FAQs", href: "/#faqs" },
      { title: "À propos de nous", href: "/about" },
      { title: "Politique de confidentialité", href: "/privacy" },
      { title: "Conditions d'utilisation", href: "/terms" },
    ],
  },
  {
    label: "Nous contacter",
    links: [{ title: "contact@halil.com", href: "mailto:contact@halil.com" }],
  },
  {
    label: "Réseaux sociaux",
    links: [
      { title: "LinkedIn", href: "#", icon: LinkedinIcon },
      {
        title: "Github",
        href: "https://github.com/halil-digital",
        icon: GithubIcon,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black text-white md:rounded-t-6xl relative w-full mx-auto flex flex-col items-center justify-center border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <span className="text-lg font-semibold">HALIL</span>
          <p className="mt-8 text-sm md:mt-0">Vous avez besoin d&apos;aide ?</p>
          <p className="mt-8 font-bold md:mt-0 mb-0">06 06 06 06 06</p>
          <p className="text-sm">Contactez maintenant</p>
          <p className="mt-8 text-sm md:mt-0">
            © {new Date().getFullYear()} halil.com. Tous droits réservés.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-bold">{section.label}</h3>
                <ul className="text-white mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="hover:text-muted-foreground inline-flex items-center transition-all duration-300"
                      >
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
