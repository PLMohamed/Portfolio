import FadeIn from "@/components/Animations/FadeIn";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { Project } from "@/lib/projects/data";
import { cn } from "@/lib/utils";
import { DownloadIcon, ExternalLinkIcon, GithubIcon } from "lucide-react";
import Image from "next/image";

export default function ProjectCard({
  title,
  description,
  image,
  alt,
  previewLink,
  sourceLink,
  downloadLink,
}: Project) {
  const hasLinks = previewLink || sourceLink || downloadLink;

  return (
    <FadeIn
      classNameInView="opacity-100 translate-y-0"
      classNameNotInView="opacity-0 translate-y-10"
      className="transition-all duration-300"
    >
      <Card
        className={cn({
          "pt-0": !!image,
        })}
      >
        {image && (
          <Image
            className="rounded-t-xl"
            src={image}
            alt={alt || title}
            width={600}
            height={400}
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
          />
        )}
        <CardHeader>
          <CardTitle>
            <h3 className="text-lg font-bold tracking-tight md:text-xl lg:text-2xl">
              {title}
            </h3>
          </CardTitle>
          <CardDescription>
            <p className="md:text-base">{description}</p>
          </CardDescription>
        </CardHeader>
        {hasLinks && (
          <CardFooter className="flex-col flex-wrap gap-4 sm:flex-row lg:flex-col xl:flex-row">
            {sourceLink && (
              <Link
                href={sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="w-full sm:w-fit lg:w-full xl:w-fit"
              >
                <GithubIcon />
                <span>View Source</span>
              </Link>
            )}

            {previewLink && (
              <Link
                href={previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-fit lg:w-full xl:w-fit"
              >
                <ExternalLinkIcon />
                <span>View Live</span>
              </Link>
            )}

            {downloadLink && (
              <Link
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-fit lg:w-full xl:w-fit"
              >
                <DownloadIcon />
                <span>Download</span>
              </Link>
            )}
          </CardFooter>
        )}
      </Card>
    </FadeIn>
  );
}
