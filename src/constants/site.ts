export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://plmohamed.vercel.app";

export const SITE_NAME = "PLMohamed";

export const SITE_AUTHOR = "Boumedine Mohamed Touati";

export const SITE_TITLE = `${SITE_AUTHOR} | Full Stack Developer`;

export const SITE_DESCRIPTION =
  "Portfolio of Boumedine Mohamed Touati 'aka' PLMohamed - Full Stack Developer";

export const SITE_KEYWORDS = [
  "Boumedine Mohamed Touati",
  "PLMohamed",
  "Full Stack Developer",
  "Developer",
  "Devops",
  "JavaScript",
  "JS",
  "React",
  "Node.js",
  "Next.js",
  "TailwindCSS",
  "Express",
  "HTML",
  "CSS",
  "MYSQL",
  "Docker",
];

export const SOCIAL_LINKS = {
  github: "https://github.com/PLMohamed",
  linkedin: "https://www.linkedin.com/in/mohamed-touati-boumedine/",
  email: "mohamedtouati.boumedine@gmail.com",
};

export const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_AUTHOR,
  alternateName: SITE_NAME,
  url: SITE_URL,
  email: `mailto:${SOCIAL_LINKS.email}`,
  jobTitle: "Full Stack Developer",
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
  knowsAbout: [
    "Web Development",
    "DevOps",
    "Software Testing",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Docker",
  ],
};
