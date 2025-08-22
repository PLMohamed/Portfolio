import ContactForm from "@/components/Contact";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

export default function ContactPage() {
  return (
    <article className="container space-y-8 md:space-y-10 lg:space-y-16">
      <section className="space-y-1">
        <h1
          className={cn(
            "text-center text-2xl font-bold tracking-wider md:text-3xl lg:text-4xl",
            poppins.className,
          )}
        >
          Contact Me
        </h1>
        <p className="text-center max-md:text-sm">
          I’m always open to new opportunities, collaborations, or just a
          friendly chat.
          <br />
          If you have any questions or ideas, feel free to reach out!
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-10">
        <div className="space-y-6">
          <h2
            className={cn(
              "text-xl font-bold tracking-tight max-lg:text-center md:text-2xl lg:text-3xl",
              poppins.className,
            )}
          >
            My Contact Information
          </h2>
          <Link
            href="mailto:mohamedtouati.boumedine@gmail.com"
            className="flex w-fit items-center gap-2"
          >
            <div className="bg-primary/80 text-primary-foreground flex size-6 items-center justify-center rounded-full sm:size-10">
              <MailIcon className="h-3.5 sm:h-5" />
              <span className="sr-only">Mail</span>
            </div>
            <span className="font-medium hover:underline max-sm:text-sm">
              mohamedtouati.boumedine@gmail.com
            </span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/mohamed-touati-boumedine/"
            className="flex w-fit max-w-full items-center gap-2"
          >
            <div className="bg-primary/80 text-primary-foreground flex size-6 items-center justify-center rounded-full sm:size-10">
              <LinkedinIcon className="h-3.5 sm:h-5" />
              <span className="sr-only">LinkedIn</span>
            </div>
            <span className="font-medium hover:underline max-sm:text-sm">
              Mohamed Touati Boumedine
            </span>
          </Link>
          <Link
            href="https://github.com/PLMohamed"
            className="flex w-fit max-w-full items-center gap-2"
          >
            <div className="bg-primary/80 text-primary-foreground flex size-6 items-center justify-center rounded-full sm:size-10">
              <GithubIcon className="h-3.5 sm:h-5" />
              <span className="sr-only">GitHub</span>
            </div>
            <span className="font-medium hover:underline max-sm:text-sm">
              PLMohamed
            </span>
          </Link>
        </div>
        <ContactForm />
      </section>
    </article>
  );
}
