import Image from "next/image";
import Main from "../../components/main";
import { Poppins } from "next/font/google";
import StackWrapper from "./components/StackWrapper";

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    style: "normal",
    display: "swap",
    subsets: ["latin"],
});

export default function About() {
    return (
        <Main
            classNameInView="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-44 opacity-100 translate-y-0 transition-all duration-400 mb-6"
            classNameNotInView="opacity-0 translate-y-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-44 transition-all duration-400 mb-6"
            id="about"
        >
            <section className="space-y-6">
                <h1
                    className={` text-4xl font-bold uppercase tracking-wider 
                    

                    ${poppins.className}
                `}
                >
                    Hello, This is{" "}
                    <span className="text-stroke">
                        Boumedine Mohamed Touati
                    </span>
                </h1>
                <p>
                    also known as <strong>PLMohamed</strong>, I&apos;m a
                    full-stack web developer, I have a passion for web
                    development and love to create web applications using modern
                    technologies.
                </p>
                <p>
                    I have a strong foundation in web development and I&apos;m
                    on a journey to evolve into a DevOps , I &apos;m a fast
                    learner and I&apos;m always looking to learn new
                    technologies and improve my skills.
                </p>
            </section>
            <section className="space-y-4">
                <h2 className="text-lg font-medium">Tools and Techs</h2>
                <div className="relative max-w-full space-y-4">
                    <StackWrapper direction="left">
                        <Image
                            src="js.svg"
                            width={48}
                            height={48}
                            alt="javascript"
                        />
                        <Image
                            src="html.svg"
                            width={48}
                            height={48}
                            alt="html"
                        />
                        <Image src="css.svg" width={48} height={48} alt="css" />
                        <Image
                            src="nodejs.svg"
                            width={48}
                            height={48}
                            alt="node js"
                        />
                        <Image
                            src="tailwindcss.svg"
                            width={48}
                            height={48}
                            alt="tailwind css"
                        />
                        <Image
                            src="react.svg"
                            width={48}
                            height={48}
                            alt="react js"
                        />
                        <Image
                            src="electron.svg"
                            width={48}
                            height={48}
                            alt="electron js"
                        />
                        <Image
                            src="nextjs.svg"
                            width={48}
                            height={48}
                            alt="next js"
                        />
                        <Image
                            src="mysql.svg"
                            width={48}
                            height={48}
                            alt="mysql"
                        />
                        <Image
                            src="python.svg"
                            width={48}
                            height={48}
                            alt="python"
                        />
                        <Image src="php.svg" width={48} height={48} alt="php" />
                    </StackWrapper>
                    <StackWrapper direction="right" reset={19}>
                        <Image
                            src="vitejs.svg"
                            width={48}
                            height={48}
                            alt="vite js"
                        />
                        <Image
                            src="/drizzleorm.png"
                            width={48}
                            height={48}
                            alt="drizzle orm"
                        />

                        <Image src="git.svg" width={48} height={48} alt="git" />
                        <Image
                            src="/shadcn.png"
                            width={48}
                            height={48}
                            alt="shadcn"
                        />
                        <Image
                            src="vscode.svg"
                            width={48}
                            height={48}
                            alt="visual studio code"
                        />
                        <Image
                            src="/markdown.png"
                            width={48}
                            height={48}
                            alt="markdown"
                        />
                        <Image
                            src="docker.svg"
                            width={48}
                            height={48}
                            alt="docker"
                        />
                        <Image
                            src="insomnia.svg"
                            width={48}
                            height={48}
                            alt="insomnia"
                        />
                        <Image
                            src="github.svg"
                            width={48}
                            height={48}
                            alt="github"
                        />
                    </StackWrapper>
                </div>
            </section>
        </Main>
    );
}
