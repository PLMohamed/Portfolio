import Main from "@/components/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComputer,
    faFlaskVial,
    faEarth,
} from "@fortawesome/free-solid-svg-icons";

export default function Services() {
    return (
        <Main
            id="services"
            classNameInView="*:w-full *:lg:w-1/3 *:flex-wrap mt-12 flex max-w-full flex-col items-stretch  justify-center gap-4 md:flex-row translate-x-0 translate-y-0 opacity-100 transition-all duration-500"
            classNameNotInView="*:w-full *:lg:w-1/3 *:flex-wrap mt-12 flex max-w-full flex-col items-stretch  justify-center gap-4 md:flex-row opacity-0 translate-x-10 md:translate-x-0 md:translate-y-10 transition-all duration-500"
        >
            <section className="flex cursor-pointer flex-col space-y-4 rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100  px-4 py-6 text-center shadow-2xl transition-all duration-300  md:hover:-translate-y-4 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700 dark:shadow-zinc-900 ">
                <FontAwesomeIcon icon={faFlaskVial} size="3x" />
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-zinc-100">
                    Software Testing
                </h2>
                <p>
                    I test software applications to ensure they are free of bugs
                    and errors by perform manual and detailed testing.
                </p>
            </section>
            <section className="flex cursor-pointer flex-col space-y-4 rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100  px-4 py-6 text-center shadow-2xl transition-all duration-300  md:hover:-translate-y-4 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700 dark:shadow-zinc-900 ">
                <FontAwesomeIcon icon={faEarth} size="3x" />
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-zinc-100">
                    Web Development
                </h2>
                <p>
                    I build web applications using modern technologies and
                    frameworks. I specialize in both front-end and back-end web
                    development.
                </p>
            </section>
            <section className="flex cursor-pointer flex-col space-y-4 rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100  px-4 py-6 text-center shadow-2xl transition-all duration-300  md:hover:-translate-y-4 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700 dark:shadow-zinc-900 ">
                <FontAwesomeIcon icon={faComputer} size="3x" />
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-zinc-100">
                    Desktop Applications
                </h2>
                <p>
                    I build desktop applications with modern design and user
                    experience in mind.
                </p>
            </section>
        </Main>
    );
}
