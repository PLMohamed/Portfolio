import Main from "@/components/main";
import Card from "./components/Card";

export default function Projects() {
    const projects = [
        {
            title: "Crafti E-Commerce",
            image: "/crafti.png",
            link: "https://github.com/PLMohamed/Crafti",
            description:
                "A simple e-commerce website with a simple design and user experience.",
        },
    ];

    return (
        <Main>
            <div>
                {projects.map((project, index) => (
                    <Card key={index} {...project} />
                ))}
            </div>
        </Main>
    );
}
