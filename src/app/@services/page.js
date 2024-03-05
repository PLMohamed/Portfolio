import Main from "@/components/main";
import {
    faComputer,
    faFlaskVial,
    faEarth,
} from "@fortawesome/free-solid-svg-icons";
import Card from "./components/Card";

export default async function Services() {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return (
        <Main
            id="services"
            classNameInView="*:w-full *:lg:w-1/3 *:flex-wrap mt-12 flex max-w-full flex-col items-stretch  justify-center gap-4 md:flex-row translate-x-0 translate-y-0 opacity-100 transition-all duration-500"
            classNameNotInView="*:w-full *:lg:w-1/3 *:flex-wrap mt-12 flex max-w-full flex-col items-stretch  justify-center gap-4 md:flex-row opacity-0 translate-x-10 md:translate-x-0 md:translate-y-10 transition-all duration-500"
        >
            <Card
                icon={faFlaskVial}
                title="Software Testing"
                description="I test software applications to ensure they are free of bugs and errors by perform manual and detailed testing."
            />
            <Card
                icon={faEarth}
                title="Web Development"
                description="I build web applications using modern technologies and frameworks. I specialize in both front-end and back-end web development."
            />
            <Card
                icon={faComputer}
                title="Desktop Applications"
                description="I build desktop applications with modern design and user experience in mind."
            />
        </Main>
    );
}
