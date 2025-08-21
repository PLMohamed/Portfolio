import ServicesCard from "./Card";
import FlaskIcon from "@/assets/FlaskIcon";
import EarthIcon from "@/assets/EarthIcon";
import ComputerIcon from "@/assets/ComputerIcon";

export default function Services(): React.JSX.Element {
  return (
    <article
      id="services"
      className="container grid grid-cols-1 items-stretch justify-center gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <ServicesCard
        icon={FlaskIcon}
        title="Software Testing"
        description="I test software applications to ensure they are free of bugs and errors by perform manual and detailed testing."
      />
      <ServicesCard
        icon={EarthIcon}
        title="Web Development"
        description="I build web applications using modern technologies and frameworks. I specialize in both front-end and back-end web development."
      />
      <ServicesCard
        icon={ComputerIcon}
        title="Desktop Applications"
        description="I build desktop applications with modern design and user experience in mind."
      />
    </article>
  );
}
