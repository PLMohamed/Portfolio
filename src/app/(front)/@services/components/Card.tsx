import FadeIn from "@/components/Animations/FadeIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export default function ServicesCard({
  icon: Icon,
  title,
  description,
}: CardProps) {
  return (
    <FadeIn
      classNameInView="opacity-100 translate-y-0"
      classNameNotInView="opacity-0 translate-y-10"
      className="transition-all duration-300"
    >
      <Card className="hover:animate-gradient-xy from-secondary dark:from-muted/80 to-secondary dark:to-muted/80 dark:via-secondary via-muted cursor-pointer gap-y-4 bg-linear-to-br overflow-ellipsis hover:bg-left last:md:col-span-2 md:hover:-translate-y-4 last:lg:col-span-1">
        <CardHeader className="text-center">
          <Icon className="mx-auto size-10 max-w-full md:size-12 lg:size-14" />
          <CardTitle>
            <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
              {title}
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
