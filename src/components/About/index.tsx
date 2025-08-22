import FadeIn from "@/components/Animations/FadeIn";
import { GetTechs, GetTools } from "@/lib/techs/utils";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Marquee from "react-fast-marquee";
import StackCard from "./Card";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

export default async function About() {
  const techs = GetTechs();
  const tools = GetTools();

  return (
    <article
      className="container grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-44"
      id="about"
    >
      <FadeIn
        className="transition-all duration-500"
        classNameNotInView="opacity-0 translate-y-10"
        classNameInView="opacity-100 translate-y-0"
      >
        <section className="space-y-6">
          <h1
            className={cn(
              "text-2xl font-bold tracking-wider uppercase md:text-3xl lg:text-4xl",
              poppins.className,
            )}
          >
            Hello, This is{" "}
            <span className="text-stroke">Boumedine Mohamed Touati</span>
          </h1>
          <p>
            Also known as <strong>PLMohamed</strong>, I am a dedicated
            full-stack web developer with a strong passion for building robust,
            scalable, and user-centric web applications using modern
            technologies.
          </p>
          <p>
            With a solid foundation in software engineering, I am continuously
            expanding my expertise towards DevOps practices. I am committed to
            continuous learning, staying up-to-date with industry trends, and
            delivering high-quality solutions that drive business value.
          </p>
        </section>
      </FadeIn>
      <FadeIn
        className="transition-all duration-500"
        classNameNotInView="opacity-0 translate-y-10"
        classNameInView="opacity-100 translate-y-0"
      >
        <section className="space-y-4">
          <h2 className="text-lg font-medium">Tools and Techs</h2>
          <div className="relative max-w-full space-y-4">
            <Marquee
              direction="left"
              autoFill={true}
              pauseOnHover={true}
              gradient
              gradientColor="var(--color-background)"
            >
              {techs.map((tech) => (
                <StackCard
                  key={tech.name}
                  imageUrl={tech.imageUrl}
                  name={tech.name}
                />
              ))}
            </Marquee>
            <Marquee
              direction="right"
              autoFill={true}
              pauseOnHover={true}
              gradient
              gradientColor="var(--color-background)"
            >
              {tools.map((tool) => (
                <StackCard
                  key={tool.name}
                  imageUrl={tool.imageUrl}
                  name={tool.name}
                />
              ))}
            </Marquee>
          </div>
        </section>
      </FadeIn>
    </article>
  );
}
