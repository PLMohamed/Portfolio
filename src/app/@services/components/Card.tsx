import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface CardProps {
  icon: IconDefinition;
  title: string;
  description: string;
}

export default function Card({ icon, title, description }: CardProps) {
  return (
    <section className="flex cursor-pointer flex-col space-y-4 rounded-xl bg-linear-to-br from-white  via-neutral-100 to-white px-4 py-6 text-center shadow-2xl transition-all duration-300 hover:animate-gradient-xy hover:bg-left md:hover:-translate-y-4 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700 dark:shadow-zinc-900">
      <FontAwesomeIcon icon={icon} size="3x" />
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-zinc-100">
        {title}
      </h2>
      <p>{description}</p>
    </section>
  );
}
