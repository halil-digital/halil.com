import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface FaqItem {
  id: string;
  question: string;
  answer: string[];
}

interface Faq3Props {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  supportHeading?: string;
  supportDescription?: string;
  supportButtonText?: string;
  supportButtonUrl?: string;
}

const faqItems = [
  {
    id: "faq-1",
    question: "Quels types de produits proposez-vous ?",
    answer: [
      "Chez HALIL, nous proposons une large gamme de produits alimentaires et de fournitures destinés aux professionnels de la restauration, traiteurs et commerces de bouche.",
      "‎ ",
      "Notre catalogue comprend notamment :",
      "• Volailles et viandes de qualité pour vos plats principaux",
      "• Produits laitiers, huiles, et sauces pour la cuisine du quotidien",
      "• Frites surgelées, appetizers, desserts et autres spécialités prêtes à l’emploi",
      "• Pains et spécialités internationales, notamment turques",
      "• Conserves pour une conservation longue durée",
      "• Emballages alimentaires et vaisselle jetable pour la vente à emporter ou les événements",
      "‎ ",
      "Nous mettons un point d’honneur à offrir des produits fiables, adaptés aux besoins des professionnels, livrés dans le respect des normes d’hygiène et de fraîcheur.",
    ],
  },
  {
    id: "faq-2",
    question: "Comment puis-je passer commande chez HALIL ?",
    answer: [
      "Pour passer commande chez HALIL, contactez nous par téléphone au 06 20 35 76 67 / 07 81 35 09 09.",
    ],
  },
  {
    id: "faq-3",
    question: "Quel est le délai de livraison de nos produits ?",
    answer: [
      "Nous garantissons un délai de livraison de 24 heures après la validation de votre commande, afin d'assurer une réception rapide et efficace.",
    ],
  },
  {
    id: "faq-4",
    question:
      "Quels sont les modes de paiement acceptés et les délais de règlement ?",
    answer: [
      "Nous acceptons les paiements par virement bancaire, chèque ou en espèces. Le règlement peut être effectué dans un délai maximum de 45 jours.",
    ],
  },
  {
    id: "faq-5",
    question: "Nos produits sont-ils certifiés Halal ?",
    answer: [
      "Oui, l’ensemble de nos produits sont certifiés Halal Achahada. Nous nous engageons à respecter les normes les plus strictes pour garantir une consommation conforme aux exigences religieuses.",
    ],
  },
  {
    id: "faq-6",
    question: "Comment nos produits sont-ils conditionnés ?",
    answer: [
      "Nos produits sont conditionnés avec le plus grand soin, dans le respect strict de la chaîne du froid. Cela permet de préserver leur fraîcheur, leur qualité et leur sécurité alimentaire jusqu’à la livraison",
    ],
  },
];

const Faq = ({
  heading = "FAQs",
  description = "Trouvez des réponses aux questions fréquentes sur nos produits et services. Vous ne trouvez pas ce que vous cherchez ? Contactez-nous.",
  items = faqItems,
  supportHeading = "Vous avez d'autres questions ?",
  supportDescription = "Notre équipe est là pour répondre à toutes vos questions. Contactez-nous pour une assistance personnalisée.",
  supportButtonText = "Contactez-nous",
  supportButtonUrl = "mailto:sasuhalill@gmail.com",
}: Faq3Props) => {
  return (
    <section className="py-32" id="faqs">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {Array.isArray(item.answer) ? (
                    item.answer.map((line, index) => <p key={index}>{line}</p>)
                  ) : (
                    <p>{item.answer}</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
          <div className="relative">
            <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-3.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="mb-4 size-16 border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
          </div>
          <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
            {supportHeading}
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            {supportDescription}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto" asChild>
              <a href={supportButtonUrl} target="_blank">
                {supportButtonText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq };
