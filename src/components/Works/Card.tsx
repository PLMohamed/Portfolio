import FadeIn from "@/components/Animations/FadeIn";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { ActionResponseError } from "@/lib/server/actions";
import { ActionGetPublicProjects } from "@/lib/server/actions/projects";
import { techs, tools } from "@/lib/techs/data";
import { cn } from "@/lib/utils";
import { DownloadIcon, ExternalLinkIcon, GithubIcon } from "lucide-react";
import Image from "next/image";

export default function ProjectCard({
  title,
  description,
  download_link,
  image_url,
  preview_link,
  source_link,
  stack,
}: Exclude<
  Awaited<ReturnType<typeof ActionGetPublicProjects>>,
  ActionResponseError
>["data"]["data"][number]) {
  const hasLinks = preview_link || source_link || download_link;
  const hasStack = stack && stack.length > 0;

  return (
    <FadeIn
      classNameInView="opacity-100 translate-y-0"
      classNameNotInView="opacity-0 translate-y-10"
      className="transition-all duration-300"
    >
      <Card
        className={cn({
          "pt-0": !!image_url,
        })}
      >
        {image_url && (
          <Image
            className="rounded-t-xl"
            src={image_url}
            alt={title}
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
            {hasStack && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {stack.map((item) => {
                  const tech = [...techs, ...tools].find(
                    (entry) => entry.name === item,
                  );

                  return (
                    <Badge key={item} variant="secondary">
                      {tech && (
                        <Image
                          src={tech.imageUrl}
                          alt={tech.name}
                          width={12}
                          height={12}
                        />
                      )}
                      {item}
                    </Badge>
                  );
                })}
              </div>
            )}
          </CardDescription>
        </CardHeader>
        {hasLinks && (
          <CardFooter className="flex-col flex-wrap gap-4 sm:flex-row lg:flex-col xl:flex-row">
            {source_link && (
              <Link
                href={source_link}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="w-full sm:w-fit lg:w-full xl:w-fit"
              >
                <GithubIcon />
                <span>View Source</span>
              </Link>
            )}

            {preview_link && (
              <Link
                href={preview_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-fit lg:w-full xl:w-fit"
              >
                <ExternalLinkIcon />
                <span>View Live</span>
              </Link>
            )}

            {download_link && (
              <Link
                href={download_link}
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
