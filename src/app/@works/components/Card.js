import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Card({ title, description, image, alt, link }) {
    const disabled = link === "/";
    return (
        <div className=" w-full rounded-lg border border-gray-200 bg-white shadow dark:border-zinc-700 dark:bg-zinc-900">
            <Link
                href={link}
                className={`flex h-full flex-col justify-between ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
                <div>
                    {image && (
                        <Image
                            className="rounded-t-lg"
                            src={image}
                            alt={alt}
                            width={600}
                            height={400}
                            style={{ width: "100%", height: "auto" }}
                            loading="lazy"
                        />
                    )}
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {description}
                        </p>
                    </div>
                </div>
                <span
                    href={link}
                    className={` m-5 flex w-fit content-center items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600  dark:focus:ring-blue-800
                    ${disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:bg-blue-800 dark:hover:bg-blue-700"}
                    `}
                >
                    <span>
                        {disabled ? "Not Available" : "Source Code & Preview"}
                    </span>
                    {disabled ? null : <FontAwesomeIcon icon={faArrowRight} />}
                </span>
            </Link>
        </div>
    );
}
