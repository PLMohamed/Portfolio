import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card({ icon, title, description }) {
    return (
        <section className="hover:animate-gradient-xy flex cursor-pointer flex-col space-y-4 rounded-xl bg-gradient-to-br  from-neutral-200 via-neutral-100 to-neutral-200 px-4 py-6 text-center shadow-2xl transition-all duration-300 hover:bg-left md:hover:-translate-y-4 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700 dark:shadow-zinc-900">
            <FontAwesomeIcon icon={icon} size="3x" />
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-zinc-100">
                {title}
            </h2>
            <p>{description}</p>
        </section>
    );
}
